/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2023-12-22 20:14:24
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\dto\create-user.dto.ts
 * 版权声明：未经授权，任何商业用途均须联系原作者【微信：zq2019-8888】
 */
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({
        example: 'admin',
        description: '用户名',
    })
    username: string;
    @ApiProperty({
        example: '18',
        description: '年龄',
    })
    age: number;
}
