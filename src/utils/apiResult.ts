/*
 * @Author: vhen
 * @Date: 2023-12-31 18:33:01
 * @LastEditTime: 2024-01-11 01:35:55
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\utils\apiResult.ts
 * 
 */
import { ApiProperty } from '@nestjs/swagger'
export class ApiResult {
    @ApiProperty({ type: 'number', default: 200 })
    code: number

    @ApiProperty({ type: 'string', default: 'OK' })
    message?: string

    data?: any
    constructor(code: number = 200, message?: string, data?: any) {
        this.code = code
        this.message = message || 'OK'
        this.data = data || null
    }
    static success(data?: any, message?: string, code: number = 200): ApiResult {
        return new ApiResult(code, message, data)
    }
    static fail(code: number = 0, message: string = 'fail', data?: any): ApiResult {
        return new ApiResult(code, message, data)
    }
}