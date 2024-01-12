/*
 * @Author: vhen
 * @Date: 2024-01-10 02:49:43
 * @LastEditTime: 2024-01-11 02:55:46
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\menu\dto\create-menu.dto.ts
 * 
 */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateMenuDto {
    @ApiProperty({ description: '菜单名称' })
    @IsString({ message: 'menuName 类型错误, 正确类型 string' })
    @IsNotEmpty({ message: 'menuName 不能为空' })
    @Length(2, 20, { message: 'menuName 字符长度在 2~80' })
    public menuName: string

    @ApiProperty({ description: '菜单类型：D-目录， M-菜单， B-按钮' })
    @IsString({ message: 'menuType 类型错误, 正确类型 string' })
    @IsNotEmpty({ message: 'name 不能为空' })
    public menuType: 'D' | 'M' | 'B'

    @ApiProperty({ description: '菜单图标' })
    @IsString({ message: 'icon 类型错误, 正确类型 string' })
    public icon?: string

    @ApiProperty({
        description: '上级菜单 id',
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    public parentId: number;

    @ApiProperty({ description: '排序' })
    @IsNumber({}, { message: 'orderNum 类型错误， 正确类型 number ' })
    @Min(0)
    public orderNum: number

    @ApiProperty({ description: '前端路由名称' })
    @IsString({ message: 'routeName 类型错误, 正确类型 string' })
    public routeName?: string

    @ApiProperty({ description: '路由地址' })
    @IsString({ message: 'path 类型错误, 正确类型 string' })
    public path?: string

    @ApiProperty({ description: '路由参数' })
    @IsString({ message: 'query 类型错误, 正确类型 string' })
    public query?: string

    @ApiProperty({ description: '组件路径' })
    @IsString({ message: 'component 类型错误, 正确类型 string' })
    public component?: string

    @ApiProperty({ description: '权限标识' })
    @IsString({ message: 'permission 类型错误, 正确类型 string' })
    public permission?: string

    @ApiProperty({ description: '面包屑：0-不显示在面包屑， 1-显示', default: 1 })
    @IsNumber()
    public breadcrumb: number;

    @ApiProperty({ description: '缓存：0-是， 1-否', default: 1 })
    @IsNumber()
    public iskeepalive: number;

    @ApiProperty({ description: '外链：0-是， 1-否', default: 1 })
    @IsNumber()
    public isExternalLink: number;

    @ApiProperty({ description: '固定到标签栏：0-不固定到标签栏， 1-固定', default: 1 })
    @IsNumber()
    public affix: number;

    @ApiProperty({ description: '	菜单状态：0-显示， 1-隐藏', default: 1 })
    @IsNumber()
    public visible: number;

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
