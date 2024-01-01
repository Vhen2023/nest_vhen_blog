/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2024-01-01 12:38:54
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\user.service.ts
 * 
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, Like, EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as uuid from 'uuid';
import { plainToInstance } from 'class-transformer'
import { genSaltSync, hashSync } from "bcryptjs";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
import { LoggerService } from '@/common/libs/logger/logger.service';
import { ApiResult } from '@/utils/apiResult';
@Injectable()
export class UserService {
  // 通过构造函数注入
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    @InjectEntityManager()
    private readonly userManager: EntityManager,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService
  ) { }
  /**
   * 通过id查询用户
   * @param id 
   * @returns 
   */
  async findOneById(id: number): Promise<UserEntity> {
    return this.userRepo.findOne({
      where: {
        id
      }
    })
  }
  /**
   * 通过用户名查询用户
   * @param username 
   * @returns 
   */
  async findOneByUserName(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } })
  }
  /**
   * 新增用户
   * @param dto 
   * @returns 
   */
  async create(dto: CreateUserDto): Promise<ApiResult> {
    if (await this.findOneByUserName(dto.username)) {
      return ApiResult.fail(20001, '用户名已存在')
    }
    dto.userId = `U${uuid.v4()}`
    const salt = genSaltSync(10)
    dto.password = hashSync(dto.password, salt)
    // plainToInstance  忽略转换 @Exclude 装饰器
    const user = plainToInstance(UserEntity, { salt, ...dto }, { ignoreDecorators: true })
    const result = await this.userManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.save<UserEntity>(user)
    })
    return ApiResult.success(result)
  }
  /**
   * 查询用户list
   * @param query 查询条件
   * @returns 
   */
  async findAll(query: { keyWord: string, page: number, pageSize: number }): Promise<ApiResult> {
    const data = await this.userRepo.find({
      where: {
        username: Like(`%${query.keyWord}%`)
      },
      order: {
        id: "DESC"
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    })
    const total = await this.userRepo.count({
      where: {
        username: Like(`%${query.keyWord}%`)
      },
    })
    return ApiResult.success({ list: data, total: total, page: query.page, pageSize: query.pageSize })
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    delete updateUserDto.password
    this.userRepo.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepo.delete(id)
  }
  /** 校验 token */
  verifyToken(token: string): string {
    try {
      if (!token) return null
      const id = this.jwtService.verify(token.replace('Bearer ', ''))
      return id
    } catch (error) {
      return null
    }
  }
}
