/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2024-01-01 12:38:15
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\dto\create-user.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsIn, IsNumber, MinLength, MaxLength } from 'class-validator'
export class CreateUserDto {
    userId: string
    @ApiProperty({ description: '用户名' })
    @IsNotEmpty({ message: '用户名不能为空' })//验证是否为空
    @IsString() //是否为字符串
    @MinLength(1, { message: '用户名至少1个字符' })
    @MaxLength(50, { message: '用户名最多50个字符' })
    username: string;
    @ApiProperty({ description: '昵称' })
    @IsString() //是否为字符串
    @Length(0, 50)
    nickname: string;
    @ApiProperty({ description: '手机号' })
    @IsString() //是否为字符串
    @Length(0, 11)
    phone: string;
    @ApiProperty({ description: '用户密码' })
    @IsString() //是否为字符串
    password: string;
    @ApiProperty({ description: '状态', default: 1 })
    @IsNumber()
    status: number;
    @ApiProperty({ description: '备注' })
    @IsString() //是否为字符串
    remark: string;
}
