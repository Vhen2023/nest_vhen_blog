/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2023-12-24 20:23:27
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\user.module.ts
 * 
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
