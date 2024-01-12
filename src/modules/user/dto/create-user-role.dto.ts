/*
 * @Author: vhen
 * @Date: 2024-01-11 19:06:06
 * @LastEditTime: 2024-01-11 19:15:56
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\dto\create-user-role.dto.ts
 * 
 */
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateUserRoleDto {
    @ApiProperty({ description: '角色id' })
    @IsNumber()
    roleIds: number[];

    @ApiProperty({ description: '用户id' })
    @IsNumber()
    userId: number;
}