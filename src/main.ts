/*
 * @Author: vhen
 * @Date: 2023-12-20 19:28:09
 * @LastEditTime: 2024-01-09 00:01:47
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\main.ts
 * 
 */
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'
import { initializeTransactionalContext } from 'typeorm-transactional';
import { GenerateSwaggerDoc } from '@/doc'
import { AppModule } from '@/app.module';
import { GlobalSetup } from '@/globalSetup'
declare const module: any

async function bootstrap() {
  // 开启事务
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    // 开启全局日志
    // logger: false,
    // logger: ['error', 'warn'],
  });
  const config = app.get(ConfigService)
  //全局注册类
  GlobalSetup(app, config)
  // 创建文档
  GenerateSwaggerDoc(app)
  await app.listen(config.get('app.port'), () => {
    console.log(`http://${config.get('app.host')}:${config.get('app.port')}`)
  });
  await app.init();
  // 热更新
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap();
