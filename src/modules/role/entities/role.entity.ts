/*
 * @Author: vhen
 * @Date: 2024-01-10 02:50:05
 * @LastEditTime: 2024-01-12 15:42:18
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\role\entities\role.entity.ts
 * 
 */
import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Expose } from 'class-transformer';

import { Menu } from '@/modules/menu/entities/menu.entity';
import { User } from '@/modules/user/entities/user.entity';

@Entity()
export class Role {
    @ApiProperty({ description: '角色ID' })
    @PrimaryGeneratedColumn({
        type: 'bigint',
        comment: '角色ID'
    })
    public id: number;
    @ApiProperty({ description: '角色名称' })
    @Column({ type: 'varchar', length: 80, comment: '角色名称' })
    public roleName: string;
    @ApiProperty({ description: '角色值' })
    @Column({ type: 'varchar', length: 80, nullable: true, comment: '角色值' })
    public roleValue: string;
    @ApiProperty({ description: '排序' })
    @Column({ type: 'int', default: 0, comment: '排序' })
    public orderNum: number;
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

    @ManyToMany(() => Menu, (menu) => menu.roles, { cascade: true })
    @JoinTable({
        name: 'role_menu'
    })
    menus: Menu[]; // 角色菜单关系

    @ManyToMany(() => User, (user) => user.roles)
    @Expose()
    users: User[];
}
