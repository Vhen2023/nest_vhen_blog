/*
 * @Author: vhen
 * @Date: 2024-01-10 02:50:28
 * @LastEditTime: 2024-01-12 18:49:03
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\dept\dto\create-dept.dto.ts
 * 
 */
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min, ValidateIf } from "class-validator";

export class CreateDeptDto {
    @ApiProperty({
        description: '部门名称',
        example: '开发部',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 20, { message: '部门名称长度必须在2-20之间' })
    public deptName: string;

    @ApiProperty({ description: '部门负责人' })
    @IsString({ message: 'leader 类型错误，正确类型 string' })
    @IsNotEmpty({ message: 'leader 不能为空' })
    public leader: string


    // @IsUUID('all', { message: 'parentId 类型错误，正确类型 uuid' })
    // @ValidateIf((v) => v.parentId !== null && v.parentId, { message: 'parentId 不能为空' })
    // @IsOptional({ always: true })
    // @Transform((v) => v == null ? null : v)
    @ApiProperty({
        description: '上级部门 id',
        required: true,
    })
    @IsNumber()
    public parentId: number;

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
}
