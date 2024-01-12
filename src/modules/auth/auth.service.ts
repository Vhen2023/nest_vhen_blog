/*
 * @Author: vhen
 * @Date: 2023-12-30 17:14:40
 * @LastEditTime: 2024-01-11 03:02:49
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\auth\auth.service.ts
 * 
 */
import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from "bcryptjs"

import { SigninUserDto } from './dto/signin-user.dto';
import { User as UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

import { ApiResult } from '@/utils/apiResult';
import { CodeEnum } from '@/common/enum/error-code';
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
            return ApiResult.fail(CodeEnum.ACCOUNT_NOT_EXIST.code, CodeEnum.ACCOUNT_NOT_EXIST.msg)
        }
        // 用户密码进行比对
        const checkPassword = await compareSync(signinUser.password, user.password)
        if (!checkPassword) {
            return ApiResult.fail(CodeEnum.ACCOUNT_PASSWORD_ERROR.code, CodeEnum.ACCOUNT_PASSWORD_ERROR.msg)
        }
        if (!user.status) {
            return ApiResult.fail(CodeEnum.ACCOUNT_DISABLED.code, CodeEnum.ACCOUNT_DISABLED.msg)
        }
        let data = await this.getToken({ username: user.password, businessId: user.businessId })
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
        businessId: string,
        username: string
    }) {
        const access_token = `Bearer ${await this.jwtService.signAsync({
            username: payload.username,
            sub: payload.businessId,
        }, {
            expiresIn: this.configService.get('jwt.expires')
        })}`
        const refresh_token = await this.jwtService.signAsync({
            username: payload.username,
            sub: payload.businessId,
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
