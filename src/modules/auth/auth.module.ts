/*
 * @Author: vhen
 * @Date: 2023-12-30 17:14:21
 * @LastEditTime: 2024-01-11 03:02:15
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\auth\auth.module.ts
 * 
 */
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt').secret,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthStrategy],
  exports: [
    AuthService,
    PassportModule],
  controllers: [AuthController]
})
export class AuthModule { }
