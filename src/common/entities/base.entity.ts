import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
export class BaseEntity {
    @ApiProperty({ description: '创建者' })
    @Column({ type: 'varchar', length: 30, default: '', comment: '创建者' })
    createBy: string;
    @ApiProperty({ description: '创建时间' })
    @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
    createTime: Date;
    @ApiProperty({ description: '更新者' })
    @Column({ type: 'varchar', length: 30, default: '', comment: '更新者' })
    updateBy: string;
    @ApiProperty({ description: '更新时间' })
    @UpdateDateColumn({ type: 'timestamp', comment: '更新时间' })
    updateTime: Date;
    @ApiProperty({ description: '备注' })
    @Column({ type: 'text', comment: '备注' })
    remark: string;
}