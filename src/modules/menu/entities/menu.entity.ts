/*
 * @Author: vhen
 * @Date: 2024-01-10 02:49:43
 * @LastEditTime: 2024-01-12 14:51:43
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\menu\entities\menu.entity.ts
 * 
 */

import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

import { Role } from '@/modules/role/entities/role.entity';

@Entity()
export class Menu {
    @ApiProperty({ description: '菜单id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number
    @ApiProperty({ description: '菜单名称' })
    @Column({ type: 'varchar', length: 80, comment: '菜单名称' })
    public menuName: string;
    @ApiProperty({ description: '菜单类型：D-目录， M-菜单， B-按钮' })
    @Column({ type: 'char', length: 1, comment: '菜单类型：D-目录， M-菜单， B-按钮' })
    public menuType: 'D' | 'M' | 'B';
    @ApiProperty({ description: '菜单图标' })
    @Column({ type: 'varchar', length: 100, nullable: true, comment: '菜单图标' })
    public icon: string;
    @ApiProperty({ description: '父级菜单ID' })
    @Column({ type: 'bigint', comment: '父级菜单ID' })
    public parentId: number;
    @ApiProperty({ description: '排序' })
    @Column({ type: 'int', default: 0, comment: '排序' })
    public orderNum: number;
    @ApiProperty({ description: '前端路由名称' })
    @Column({ type: 'varchar', length: 80, nullable: true, comment: '前端路由名称' })
    public routeName: string;
    @ApiProperty({ description: '路由地址' })
    @Column({ type: 'varchar', length: 255, nullable: true, comment: '路由地址' })
    public path: string;
    @ApiProperty({ description: '路由参数' })
    @Column({ type: 'varchar', length: 255, nullable: true, comment: '路由参数' })
    public query: string;
    @ApiProperty({ description: '组件路径' })
    @Column({ type: 'varchar', length: 255, nullable: true, comment: '组件路径' })
    public component: string;
    @ApiProperty({ description: '	权限标识' })
    @Column({ type: 'varchar', length: 255, nullable: true, comment: '	权限标识' })
    public permission: string;
    @ApiProperty({ description: '面包屑：0-不显示在面包屑， 1-显示' })
    @Column({ type: 'tinyint', default: 1, comment: '面包屑：0-不显示在面包屑， 1-显示' })
    public breadcrumb: number;
    @ApiProperty({ description: '缓存：0-是， 1-否' })
    @Column({ type: 'tinyint', default: 1, comment: '缓存：0-是， 1-否' })
    public isKeepalive?: number;
    @ApiProperty({ description: '外链：0-是， 1-否' })
    @Column({ type: 'tinyint', default: 1, comment: '外链：0-是， 1-否' })
    public isExternalLink: number;
    @ApiProperty({ description: '固定到标签栏：0-不固定到标签栏， 1-固' })
    @Column({ type: 'tinyint', default: 1, comment: '固定到标签栏：0-不固定到标签栏， 1-固' })
    public affix: number;
    @ApiProperty({ description: '菜单状态：0-显示， 1-隐藏' })
    @Column({ type: 'tinyint', default: 1, comment: '菜单状态：0-显示， 1-隐藏' })
    public visible: number;
    @ApiProperty({ description: '状态: 1-启用，0-禁用' })
    @Column({ type: 'tinyint', default: 1, comment: '状态: 1-启用，0-禁用' })
    public status: number;

    @ApiProperty({ description: '创建者' })
    @Column({ type: 'varchar', length: 30, nullable: true, comment: '创建者' })
    createBy: string;
    @ApiProperty({ description: '创建时间' })
    @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
    createTime: Date;
    @ApiProperty({ description: '更新者' })
    @Column({ type: 'varchar', length: 30, nullable: true, comment: '更新者' })
    updateBy: string;
    @ApiProperty({ description: '更新时间' })
    @UpdateDateColumn({ type: 'timestamp', comment: '更新时间' })
    updateTime: Date;
    @ApiProperty({ description: '备注' })
    @Column({ type: 'text', nullable: true, comment: '备注' })
    remark: string;

    @ManyToMany(() => Role, (role) => role.menus)
    @Expose()
    roles: Role[];
}
