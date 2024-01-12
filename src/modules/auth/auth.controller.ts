/*
 * @Author: vhen
 * @Date: 2023-12-31 13:50:24
 * @LastEditTime: 2024-01-10 15:25:54
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\auth\auth.controller.ts
 * 
 */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { SigninUserDto } from './dto/signin-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateTokenDto } from './dto/create-token.dto';

import { AuthService } from './auth.service';

import { AllowAnon } from '@/common/decorator/allow-anon.decorator'
import { SwaggerApi } from '@/common/decorator/swagger.decorator';
import { ApiResult } from '@/utils/apiResult';

@Controller('auth')
@ApiTags('登录注册')
@AllowAnon()
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('/signin')
    @ApiOperation({ summary: '登录' })
    @SwaggerApi(CreateTokenDto)
    async signin(@Body() signinUser: SigninUserDto): Promise<ApiResult> {
        return await this.authService.signin(signinUser);
    }
    @Post('/signup')
    @ApiOperation({ summary: '用户注册' })
    @SwaggerApi()
    async signup(@Body() dto: CreateUserDto): Promise<ApiResult> {
        return await this.authService.signup(dto);
    }
}
