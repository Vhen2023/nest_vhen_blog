/*
 * @Author: vhen
 * @Date: 2023-12-20 19:28:09
 * @LastEditTime: 2024-01-12 02:10:09
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\app.module.ts
 * 
 */
import { Module, ValidationPipe, Logger } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';

import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '@/common/filters/exceptions/http-exception.filter';

import { JwtAuthGuard } from '@/common/guard/auth.guard'
import { getYmlConfig } from '@/utils/ymlConfig';

// import { RedisModule } from '@/common/libs/redis/redis.module';
//系统模块
import { LoggerModule } from '@/common/libs/logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MenuModule } from './modules/menu/menu.module';
import { RoleModule } from './modules/role/role.module';
import { DeptModule } from './modules/dept/dept.module';
// @Global()
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
          ...config.get('db').mysql,
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
    }), LoggerModule, AuthModule, UserModule, MenuModule, RoleModule, DeptModule],
  controllers: [],
  providers: [{
    // 全局验证管道
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },
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
  }, Logger],
  exports: [Logger],
})
export class AppModule { }
