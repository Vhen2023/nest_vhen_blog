import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";


export class CreateRoleDto {

    @ApiProperty({ description: '角色名称' })
    @IsString({ message: 'roleName 类型错误, 正确类型 string' })
    @IsNotEmpty({ message: 'roleName 不能为空' })
    @Length(2, 20, { message: 'roleName 字符长度在 2~20' })
    public roleName: string

    @ApiProperty({ description: '角色值' })
    @IsString({ message: 'roleValue 类型错误, 正确类型 string' })
    @IsNotEmpty({ message: 'roleValue 不能为空' })
    public roleValue: string

    @ApiProperty({ description: '排序' })
    @IsNumber({}, { message: 'orderNum 类型错误， 正确类型 number ' })
    @Min(0)
    public orderNum: number

    @ApiProperty({ description: '状态', default: 1 })
    @IsNumber()
    public status: number;

    @ApiProperty({ description: '创建者' })
    @IsString() //是否为字符串
    public createBy?: string;

    @ApiProperty({ description: '更新者' })
    @IsString() //是否为字符串
    public updateBy?: string;

    @ApiProperty({ description: '备注', required: false })
    @IsString({ message: 'remark  类型错误，正确类型 string' })
    @IsOptional()
    public remark?: string

    @ApiProperty({ description: '菜单 id 集合', required: false })
    @IsString({ each: true, message: '菜单id集合中存在类型错误，正确类型 string[]' })
    @IsOptional()
    readonly menuIds?: string[]
}
