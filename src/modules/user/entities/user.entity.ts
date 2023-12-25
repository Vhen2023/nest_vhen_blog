import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn({
        comment: '用户主键ID'
    })
    id: number;
    @Column({ type: 'varchar', comment: '用户名' })
    username: string;
    @Column({ type: 'varchar', comment: '昵称' })
    nickname: string;
    @Column({ length: 11, comment: '手机号' })
    phone: string;
    @Column({ comment: "用户密码" })
    password: string;
    @Column({ type: 'text', comment: '备注' })
    remark: string;
    @Column({ type: 'time', comment: '创建时间' })
    createTime: string;
    @Column({ type: 'time', comment: '更新时间' })
    updateTime: string;
}
