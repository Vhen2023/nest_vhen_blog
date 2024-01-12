/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2024-01-12 13:37:50
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\user.module.ts
 * 
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { User as UserEntity } from './entities/user.entity'
import { Role as RoleEntity } from '../role/entities/role.entity';
import { Dept as DeptEntity } from '../dept/entities/dept.entity';

import { LoggerModule } from '@/common/libs/logger/logger.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, DeptEntity]), LoggerModule, JwtModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
