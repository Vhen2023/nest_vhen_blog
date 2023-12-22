/*
 * @Author: vhen
 * @Date: 2023-12-20 19:28:09
 * @LastEditTime: 2023-12-22 19:44:16
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\main.ts
 * 版权声明：未经授权，任何商业用途均须联系原作者【微信：zq2019-8888】
 */
import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import {SwaggerModule,DocumentBuilder} from "@nestjs/swagger"
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  })
  const swaggerOptions=new DocumentBuilder().setTitle("nest_vhen_blog博客接口文档").setDescription("描述...").setVersion("1.0").build();
  const swaggerDoc=SwaggerModule.createDocument(app,swaggerOptions);
  SwaggerModule.setup('/api-docs',app,swaggerDoc);
  await app.listen(3000);
}
bootstrap();
