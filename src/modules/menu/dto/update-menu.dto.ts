import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
    @ApiProperty({ description: '菜单id' })
    @IsNotEmpty({ message: 'id 不能为空' })
    readonly id: number
}
