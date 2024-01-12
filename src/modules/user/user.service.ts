/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2024-01-12 14:36:47
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\user.service.ts
 * 
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, Like, EntityManager, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as uuid from 'uuid';
import { plainToInstance } from 'class-transformer'
import { genSaltSync, hashSync } from "bcryptjs";

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User as UserEntity } from './entities/user.entity';
import { Role as RoleEntity } from '../role/entities/role.entity';
import { Dept as DeptEntity } from '../dept/entities/dept.entity';

import { LoggerService } from '@/common/libs/logger/logger.service';
import { ApiResult } from '@/utils/apiResult';
import { CodeEnum } from '@/common/enum/error-code';
@Injectable()
export class UserService {
  // 通过构造函数注入
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    @InjectRepository(DeptEntity) private deptRepo: Repository<DeptEntity>,
    @InjectEntityManager()
    private readonly userManager: EntityManager,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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
      return ApiResult.fail(CodeEnum.ACCOUNT_REPEAT.code, CodeEnum.ACCOUNT_REPEAT.msg)
    }
    if (await this.findOneByUserName(dto.phoneNumber)) {
      return ApiResult.fail(CodeEnum.ACCOUNT_PHONE_NUMBER_EXIT.code, CodeEnum.ACCOUNT_PHONE_NUMBER_EXIT.msg)
    }

    dto.businessId = `U${uuid.v4()}`
    dto.salt = genSaltSync(10)
    dto.password = hashSync(dto.password, dto.salt)
    let roles = [], depts = []
    if (dto?.roleIds && dto.roleIds.length) {
      // 角色集合
      roles = await this.roleRepo.find({ where: { id: In(dto.roleIds) } })
    }
    if (dto?.deptIds && dto.deptIds.length) {
      // 部门集合
      depts = await this.deptRepo.find({ where: { id: In(dto.deptIds) } })
    }
    const newUser = await this.userRepo.create({
      depts,
      roles,
      ...dto
    });
    // plainToInstance  忽略转换 @Exclude 装饰器
    // const user = plainToInstance(UserEntity, dto, { ignoreDecorators: true })
    const res = await this.userManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.save<UserEntity>(newUser)
    })
    if (!res) return ApiResult.fail()
    return ApiResult.success()
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
      relations: {
        roles: true,
        depts: true
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    })
    const total = await this.userRepo.count({
      where: {
        username: Like(`%${query.keyWord}%`)
      },
    })
    return ApiResult.success({ list: data, total: +total, page: +query.page, pageSize: +query.pageSize })
  }
  /**
   * 查询单个用户
   * @param id 用户id
   * @returns 
   */
  async findOne(id: number) {
    const user = await this.findOneById(id)
    if (!user) return ApiResult.fail(CodeEnum.ACCOUNT_NOT_EXIST.code, CodeEnum.ACCOUNT_NOT_EXIST.msg);
    return ApiResult.success(user)
  }
  /**
   * 更新用户信息
   * @param dto 
   * @param currUser 
   * @returns 
   */
  async update(dto: UpdateUserDto): Promise<ApiResult> {
    const userTemp = await this.userRepo.findOne({
      where: {
        id: dto.id,
      },
      relations: {
        roles: true,
        depts: true
      },
    });
    if (!userTemp) return ApiResult.fail(CodeEnum.ACCOUNT_NOT_EXIST.code, CodeEnum.ACCOUNT_NOT_EXIST.msg)
    if (userTemp.status === 0) return ApiResult.fail(CodeEnum.ACCOUNT_DISABLED.code, CodeEnum.ACCOUNT_DISABLED.msg)
    if (dto.password) {
      dto.salt = genSaltSync(10)
      dto.password = hashSync(dto.password, dto.salt)
    }
    let roles = [], depts = []
    if (dto?.roleIds && dto.roleIds.length) {
      // 角色集合
      roles = await this.roleRepo.find({ where: { id: In(dto.roleIds) } })
    }
    if (dto?.deptIds && dto.deptIds.length) {
      // 部门集合
      depts = await this.deptRepo.find({ where: { id: In(dto.deptIds) } })
    }
    const newUser = await this.userRepo.merge(userTemp, dto);
    newUser.roles = roles
    newUser.depts = depts
    // 删除原有用户，解决主键冲突问题，暂时解决方案
    await this.userRepo.delete(dto.id)
    const res = await this.userRepo.save(newUser)
    if (!res) return ApiResult.fail()
    return ApiResult.success()
  }

  /**
   * 根据id删除用户
   * @param id 用户id
   * @returns 
   */
  async deleteUser(id: number): Promise<ApiResult> {
    const existing = await this.findOneById(id)
    if (!existing) return ApiResult.fail(CodeEnum.ACCOUNT_NOT_EXIST.code, CodeEnum.ACCOUNT_NOT_EXIST.msg)
    const { affected } = await this.userManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.delete(UserEntity, id)
    })
    if (!affected) return ApiResult.fail()
    return ApiResult.success()
  }
  /**
   *  校验 token
   * @param token 
   * @returns 
   */
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
