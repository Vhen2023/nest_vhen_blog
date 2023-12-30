/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2023-12-30 04:30:22
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\user.service.ts
 * 
 */
import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
import { LoggerService } from '@/common/libs/logger/logger.service';
@Injectable()
export class UserService {
  // 通过构造函数注入
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>, private readonly logger: LoggerService) { }
  create(createUserDto: CreateUserDto) {
    const data = new UserEntity()
    data.userId = `U${uuid.v4()}`
    data.username = createUserDto.username
    data.nickname = createUserDto.nickname
    data.phone = createUserDto.phone
    data.password = createUserDto.password
    data.status = createUserDto.status
    data.remark = createUserDto.remark
    return this.userRepo.save(data)
  }

  async findAll(query: { keyWord: string, page: number, pageSize: number }) {
    const data = this.userRepo.find({
      where: {
        username: Like(`%${query.keyWord}%`)
      },
      order: {
        id: "DESC"
      },
      // skip: (query.page - 1) * query.pageSize,
      // take: query.pageSize,
    })
    // const total = await this.userRepo.count({
    //   where: {
    //     username: Like(`%${query.keyWord}%`)
    //   },
    // })
    return data
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
      // 
    } catch (error) {
      return null
    }
  }
}
