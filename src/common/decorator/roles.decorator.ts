/*
 * @Author: vhen
 * @Date: 2024-01-12 18:04:19
 * @LastEditTime: 2024-01-12 18:22:41
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\decorator\roles.decorator.ts
 * 
 */
import { SetMetadata } from '@nestjs/common'
// import { Role } from 'src/enum/roles.enum'

export const ROLES_KEY = 'roles'

// 装饰器Roles SetMetadata将装饰器的值缓存
export const Roles = (...roles: number[]) => SetMetadata(ROLES_KEY, roles)
