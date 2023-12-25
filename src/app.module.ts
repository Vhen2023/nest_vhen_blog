/*
 * @Author: vhen
 * @Date: 2023-12-20 19:28:09
 * @LastEditTime: 2023-12-25 21:44:09
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\app.module.ts
 * 
 */
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DemoModule } from './modules/demo/demo.module';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '@/common/filters/exceptions/http.exception.filter';
import { JwtAuthGuard } from '@/common/guard/auth.guard'
import { DemoPipe } from '@/common/pipe/demo.pipe';
import { getYmlConfig } from '@/utils/ymlConfig';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getYmlConfig],
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          // 可能不再支持这种方式，entities 将改成接收 实体类的引用
          // entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          autoLoadEntities: true,
          keepConnectionAlive: true,
          ...config.get('MYSQL'),
          namingStrategy: new SnakeNamingStrategy(),
          // cache: {
          //   type: 'ioredis',
          //   ...config.get('redis'),
          //   alwaysEnabled: true,
          //   duration: 3 * 1000, // 缓存3s
          // },
        } as TypeOrmModuleOptions
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      }
    }),
    UserModule, DemoModule,],
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
