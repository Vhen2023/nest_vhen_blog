/*
 * @Author: vhen
 * @Date: 2023-12-20 19:28:09
 * @LastEditTime: 2023-12-25 20:31:35
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\main.ts
 * 
 */
import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { initializeTransactionalContext } from 'typeorm-transactional';
import { GenerateSwaggerDoc } from '@/doc'
import { AppModule } from '@/app.module';
import { GlobalSetup } from '@/globalSetup'
declare const module: any

async function bootstrap() {
  // 开启事务
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.enableCors({
    origin: true,
    credentials: true,
    maxAge: 1728000,
  })
  app.setGlobalPrefix(config.get('APP').prefix)
  //全局注册类
  GlobalSetup(app)
  // 创建文档
  GenerateSwaggerDoc(app)
  await app.listen(config.get('APP').port);

  // 热更新
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap();
