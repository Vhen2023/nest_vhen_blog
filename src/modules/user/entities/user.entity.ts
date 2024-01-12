/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2024-01-12 14:38:47
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\entities\user.entity.ts
 * 
 */
import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

import { Role } from '@/modules/role/entities/role.entity';
import { Dept } from '@/modules/dept/entities/dept.entity';
@Entity()
export class User {
    @ApiProperty({ description: '用户主键ID' })
    @PrimaryGeneratedColumn({
        type: 'bigint',
        comment: '用户主键ID'
    })
    id: number;
    @ApiProperty({ description: '用户名业务id' })
    @Column({ type: 'varchar', length: 100, nullable: true, comment: '用户名业务id' })
    businessId: string
    @ApiProperty({ description: '用户名' })
    @Column({ type: 'varchar', length: 80, comment: '用户名' })
    username: string;
    @ApiProperty({ description: '昵称' })
    @Column({ type: 'varchar', length: 80, nullable: true, comment: '昵称' })
    nickname: string;
    @ApiProperty({ description: '头像地址' })
    @Column({ type: 'varchar', length: 255, nullable: true, comment: '头像地址' })
    avatar: string;
    @ApiProperty({ description: '邮箱' })
    @Column({ type: 'varchar', length: 255, nullable: true, comment: '邮箱' })
    email: string;
    @ApiProperty({ description: '地址' })
    @Column({ type: 'varchar', length: 255, nullable: true, comment: '地址' })
    address: string;
    @ApiProperty({ description: '手机号' })
    @Column({ length: 11, comment: '手机号' })
    phoneNumber: string;
    @ApiProperty({ description: '盐' })
    @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
    @Column({ comment: "盐", nullable: true, })
    salt: string;
    @ApiProperty({ description: '用户密码' })
    @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
    @Column({ comment: "用户密码" })
    password: string;
    @ApiProperty({ description: '状态', })
    @Column({ type: 'tinyint', default: 1, comment: '状态：1-有效，0-禁用' })
    status: number
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
    /**
     * cascade: true，插入和更新启用级联，也可设置为仅插入或仅更新
     */
    @ManyToMany(() => Role, (roles) => roles.users, { cascade: true })
    @JoinTable({
        name: 'user_role',
        // joinColumn: { name: 'business_id' },
        // inverseJoinColumn: { name: 'menu_id' }
    })
    roles: Role[]; //用户与角色关系

    @ManyToMany(() => Dept, (depts) => depts.users, { cascade: true })
    @JoinTable({
        name: 'user_dept',
    })
    @Expose()
    depts: Dept[]; //用户与部门关系

}
