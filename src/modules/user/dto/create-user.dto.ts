/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2024-01-12 14:10:24
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\dto\create-user.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsNumber, MinLength, MaxLength, IsArray, IsOptional } from 'class-validator'
export class CreateUserDto {
    @ApiProperty({ description: '用户业务id' })
    businessId: string
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
    // @ApiProperty({ description: '头像地址' })
    // @IsString() //是否为字符串
    // avatar: string;
    // @ApiProperty({ description: '邮箱' })
    // @IsString() //是否为字符串
    // email: string;
    // @ApiProperty({ description: '地址' })
    // @IsString() //是否为字符串
    // address: string;
    @ApiProperty({ description: '手机号' })
    @IsString() //是否为字符串
    @Length(0, 11)
    phoneNumber: string;
    @ApiProperty({ description: '盐' })
    // @IsString() //是否为字符串
    salt: string;
    @ApiProperty({ description: '用户密码' })
    @IsString() //是否为字符串
    password: string;
    @ApiProperty({ description: '状态', default: 1 })
    @IsNumber()
    status: number;
    // @ApiProperty({ description: '创建者' })
    // @IsString() //是否为字符串
    // createBy: string;
    // @ApiProperty({ description: '更新者' })
    // @IsString() //是否为字符串
    // @IsDefined()
    // updateBy: string;
    @ApiProperty({ description: '备注' })
    @IsString()
    remark: string;


    @ApiProperty({ description: '角色 id 集合', required: false })
    @IsString({ each: true, message: '角色id集合中存在类型错误，正确类型 string[]' })
    @IsOptional()
    readonly roleIds?: string[]

    @ApiProperty({ description: '部门 id 集合', required: false })
    @IsString({ each: true, message: '部门id集合中存在类型错误，正确类型 string[]' })
    @IsOptional()
    readonly deptIds?: string[]
}
