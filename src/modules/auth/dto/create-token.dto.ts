/*
 * @Author: vhen
 * @Date: 2024-01-01 00:54:52
 * @LastEditTime: 2024-01-01 01:04:18
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\auth\dto\create-token.dto.ts
 * 
 */
import { ApiProperty } from '@nestjs/swagger'
export class CreateTokenDto {
    @ApiProperty({ description: 'token' })
    access_token: string
    @ApiProperty({ description: '刷新 token' })
    refresh_token: string
}