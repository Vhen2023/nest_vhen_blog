/*
 * @Author: vhen
 * @Date: 2024-01-10 02:50:28
 * @LastEditTime: 2024-01-12 18:51:06
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\dept\entities\dept.entity.ts
 * 
 */

import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, Tree, TreeParent, TreeChildren, BaseEntity } from 'typeorm';
import { Expose } from 'class-transformer';

import { User } from '@/modules/user/entities/user.entity';

// @Tree('materialized-path') // 物理路径
@Entity()
export class Dept extends BaseEntity {
    @ApiProperty({ description: '部门id' })
    // @PrimaryGeneratedColumn('uuid')
    @PrimaryGeneratedColumn({ type: 'bigint', })
    public id: number

    @ApiProperty({ description: '部门名称' })
    @Column({ type: 'varchar', length: 80, comment: '部门名称' })
    public deptName: string;

    @ApiProperty({ description: '部门负责人' })
    @Column({ type: 'varchar', length: 80, nullable: true, comment: '部门负责人' })
    public leader: string;

    @ApiProperty({ description: '父级部门ID' })
    @Column({ type: 'bigint', comment: '父级部门ID' })
    public parentId: number;

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

    // @TreeChildren({ cascade: true })
    // children!: Dept[];

    // @TreeParent()
    // parent?: Dept | null;

    @ManyToMany(() => User, (user) => user.depts)
    @Expose()
    users: User[];
}
