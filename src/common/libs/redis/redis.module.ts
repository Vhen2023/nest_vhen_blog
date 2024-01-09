/*
 * @Author: vhen
 * @Date: 2024-01-02 15:11:26
 * @LastEditTime: 2024-01-02 20:04:54
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\libs\redis\redis.module.ts
 * 
 */
import { Module, Global } from '@nestjs/common'
import { RedisService } from './redis.service'
@Global()
@Module({
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisModule { }