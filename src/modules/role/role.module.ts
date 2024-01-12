/*
 * @Author: vhen
 * @Date: 2024-01-10 02:50:05
 * @LastEditTime: 2024-01-12 14:47:35
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\role\role.module.ts
 * 
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';

import { Role as RoleEntity } from './entities/role.entity';
import { Menu as MenuEntity } from '../menu/entities/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, MenuEntity])
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
