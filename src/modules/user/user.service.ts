import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
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
