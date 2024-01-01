/*
 * @Author: vhen
 * @Date: 2023-12-30 17:14:40
 * @LastEditTime: 2024-01-01 12:56:09
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\auth\auth.service.ts
 * 
 */
import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from "bcryptjs"
import { User as UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { ApiResult } from '@/utils/apiResult';
@Injectable()
export class AuthService {
    constructor(@Inject(UserService) private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService) { }
    /**
     * 登录
     * @param signinUser 
     * @returns 
     */
    async signin(signinUser: SigninUserDto): Promise<ApiResult> {
        const user = await this.userService.findOneByUserName(signinUser.username);
        if (!user) {
            return ApiResult.fail(20001, '用户不存在，请注册')
        }
        // 用户密码进行比对
        const checkPassword = await compareSync(signinUser.password, user.password)
        if (!checkPassword) {
            return ApiResult.fail(20002, '用户名或者密码错误')
        }
        if (!user.status) {
            // throw new ForbiddenException('用户未激活，请先激活');
            return ApiResult.fail(20003, '用户未激活，请先激活')
        }
        let data = await this.getToken({ username: user.password, userId: user.userId })
        return ApiResult.success(data);
    }
    /**
     * 注册
     * @param user 
     * @returns 
     */
    async signup(user): Promise<ApiResult> {
        const newUser = await this.userService.create(user);
        return newUser;
    }
    /**
     * 获取token
     * @param payload 
     * @returns 
     */
    async getToken(payload: {
        userId: string,
        username: string
    }) {
        const access_token = `Bearer ${await this.jwtService.signAsync({
            username: payload.username,
            sub: payload.userId,
        }, {
            expiresIn: this.configService.get('jwt.expires')
        })}`
        const refresh_token = await this.jwtService.signAsync({
            username: payload.username,
            sub: payload.userId,
        }, {
            expiresIn: this.configService.get('jwt.refresh')
        })
        return { access_token, refresh_token }
    }
    /**
     * 验证用户
     * @param payload 
     * @returns 
     */
    async validateUser(payload: { id: number }): Promise<UserEntity> {
        return await this.userService.findOneById(payload.id);
    }
}
