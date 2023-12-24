/*
 * @Author: vhen
 * @Date: 2023-12-23 19:22:25
 * @LastEditTime: 2023-12-25 00:09:31
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\demo\dto\create-demo.dto.ts
 * 
 */

import { IsNotEmpty, IsString, Length, IsIn, IsNumber } from 'class-validator'
export class CreateDemoDto {

    @IsNotEmpty()//验证是否为空
    @IsString() //是否为字符串
    username: string;
    @IsNotEmpty()
    @IsNumber()
    age: number
    @IsIn([0, 1])
    status: number;
}
