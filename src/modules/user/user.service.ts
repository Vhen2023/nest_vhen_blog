/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2023-12-25 18:02:19
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\user.service.ts
 * 
 */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
@Injectable()
export class UserService {
  // 通过构造函数注入
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return [{
      username: 'vhen',
      age: 18
    }, {
      username: '小星',
      age: 28
    }];
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
