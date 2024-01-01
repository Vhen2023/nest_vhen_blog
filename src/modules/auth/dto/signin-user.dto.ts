/*
 * @Author: vhen
 * @Date: 2023-12-31 14:25:19
 * @LastEditTime: 2023-12-31 15:03:14
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\auth\dto\signin-user.dto.ts
 * 
 */
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20, {
        // $value: 当前用户传入的值
        // $property: 当前属性名
        // $target: 当前类
        // $constraint1: 最小长度 ...
        message: `用户名长度必须在$constraint1到$constraint2之间，当前传递的值是：$value`,
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 64)
    password: string;
}
