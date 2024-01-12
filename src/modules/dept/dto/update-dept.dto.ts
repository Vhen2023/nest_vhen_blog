/*
 * @Author: vhen
 * @Date: 2024-01-10 02:50:28
 * @LastEditTime: 2024-01-11 02:59:54
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\dept\dto\update-dept.dto.ts
 * 
 */
/*
 * @Author: vhen
 * @Date: 2024-01-10 02:50:28
 * @LastEditTime: 2024-01-11 00:08:11
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\dept\dto\update-dept.dto.ts
 * 
 */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateDeptDto } from './create-dept.dto';

export class UpdateDeptDto extends PartialType(CreateDeptDto) {
    @ApiProperty({ description: '部门id' })
    @IsNotEmpty({ message: 'id 不能为空' })
    readonly id: number
}
