/*
 * @Author: vhen
 * @Date: 2023-12-20 19:28:09
 * @LastEditTime: 2023-12-25 00:18:01
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\app.module.ts
 * 
 */
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DemoModule } from './modules/demo/demo.module';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '@/common/filters/exceptions/http.exception.filter';
import { JwtAuthGuard } from '@/common/guard/auth.guard'
import { DemoPipe } from '@/common/pipe/demo.pipe';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DemoModule,],
  controllers: [AppController],
  providers: [AppService, {
    // 全局验证管道
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },
    { provide: APP_PIPE, useClass: DemoPipe },
    {
      // 全局权限认证
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      // 全局拦截器
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    }, {
      // Http异常
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },],

})
export class AppModule { }
