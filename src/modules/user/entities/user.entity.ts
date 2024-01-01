/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2024-01-01 12:12:51
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\entities\user.entity.ts
 * 
 */
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity({ name: "sys_user" })
export class User {
    @ApiProperty({ description: '用户主键ID' })
    @PrimaryGeneratedColumn({
        type: 'bigint',
        comment: '用户主键ID'
    })
    id: number;
    @ApiProperty({ description: '用户名业务id' })
    @Column({ type: 'varchar', name: 'user_id', comment: '用户名业务id' })
    userId: string
    @ApiProperty({ description: '用户名' })
    @Column({ type: 'varchar', length: 50, comment: '用户名' })
    username: string;
    @ApiProperty({ description: '昵称' })
    @Column({ type: 'varchar', length: 50, comment: '昵称' })
    nickname: string;
    @ApiProperty({ description: '手机号' })
    @Column({ length: 11, comment: '手机号' })
    phone: string;
    @ApiProperty({ description: '用户密码' })
    @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
    @Column({ comment: "用户密码" })
    password: string;
    @ApiProperty({ description: '状态', })
    @Column({ type: 'tinyint', default: 1, comment: '状态：1-有效，0-禁用' })
    status: number
    @ApiProperty({ description: '备注' })
    @Column({ type: 'text', comment: '备注' })
    remark: string;
    @ApiProperty({ description: '创建时间' })
    @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
    createTime: Date;
    @ApiProperty({ description: '更新时间' })
    @UpdateDateColumn({ type: 'timestamp', comment: '更新时间' })
    updateTime: Date;
}
