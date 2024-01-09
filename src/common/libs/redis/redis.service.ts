/*
 * @Author: vhen
 * @Date: 2024-01-02 15:11:35
 * @LastEditTime: 2024-01-05 15:57:32
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\libs\redis\redis.service.ts
 * 
 */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis'

@Injectable()
export class RedisService {
    private redis: Redis
    constructor(private readonly configService: ConfigService) {
        // this.getClient()
    }
    getClient() {
        const redis = new Redis({
            host: this.configService.get('redis.host'), // Redis 服务器的主机名
            port: this.configService.get('redis.port'), // Redis 服务器的端口
            password: this.configService.get('redis.password'), // Redis 服务器的密码
            db: this.configService.get('redis.db'), // Redis 服务器的数据库
        });
        // 连接成功提示
        redis.on('connect', () =>
            console.log(
                `redis连接成功，端口${this.configService.get<number>(
                    'REIDS_PORT',
                    3306,
                )}`,
            ),
        );
        redis.on('error', (err) => console.error('Redis Error', err));
        this.redis = redis;
    }
    /**
     * 设置值
     * @param key 存储的key
     * @param value 对应的值
     * @param time 可选的过期时间，单位秒
     * @returns 
     */
    async set(key: string, value: any, time: number = 0): Promise<any> {
        if (time) {
            return await this.redis.set(key, value, 'EX', time)
        } else {
            return await this.redis.set(key, value)
        }
    }
    /**
     * 获取值
     * @param key 存储的key
     * @returns 
     */
    async get(key: string): Promise<string> {
        return await this.redis.get(key)
    }
    /**
     * 删除值
     * @param key 存储的key
     * @returns 
     */
    async del(key: string): Promise<number | null> {
        return await this.redis.del(key)
    }
    /**
     * hash 设置 key 下单个 field value
     * @param key 
     * @param field 
     * @param value 
     * @returns 
     */
    async hset(key: string, field: string, value: string): Promise<string | number | null> {
        if (!key || !field) return null
        return await this.redis.hset(key, field, value)
    }
    /**
     * hash 设置 key 下多个 field value
     * @param key 
     * @param data 
     * @param expire 单位秒
     * @returns 
     */
    async hmset(key: string, data: Record<string, string | number | boolean>, expire?: number): Promise<number | any> {
        if (!key || !data) return 0
        const result = await this.redis.hmset(key, data)
        if (expire) {
            await this.redis.expire(key, expire)
        }
        return result
    }
    /**
     * hash 获取单个 field 的 value
     * @param key 
     * @param field 
     * @returns 
     */
    async hget(key: string, field: string): Promise<number | string | null> {
        if (!key || !field) return null
        return await this.redis.hget(key, field)
    }
    /**
     *  hash 获取 key 下所有field 的 value
     * @param key 
     * @returns 
     */
    async hvals(key: string): Promise<string[]> {
        if (!key) return null
        return await this.redis.hvals(key)
    }
    /**
     * hash 获取所有的字段和值
     * @param key 
     * @returns 
     */
    async hgetAll(key: string): Promise<Record<string, string>> {
        if (!key) return null
        return await this.redis.hgetall(key)
    }
    /**
     * hash 删除 key 下 一个或多个 fields value
     * @param key 
     * @param field 
     * @returns 
     */
    async hdel(key: string, field: string): Promise<string[] | number | null> {
        if (!key || !field) return null
        return await this.redis.hdel(key, field)
    }
}