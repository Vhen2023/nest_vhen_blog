/*
 * @Author: vhen
 * @Date: 2023-12-24 20:26:42
 * @LastEditTime: 2023-12-24 20:27:12
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\decorator\allow-anon.decorator.ts
 * 
 */
import { SetMetadata } from '@nestjs/common'

export const ALLOW_ANON = 'allowAnon'
/**
 * 允许 接口 不校验 token
 */
export const AllowAnon = () => SetMetadata(ALLOW_ANON, true)