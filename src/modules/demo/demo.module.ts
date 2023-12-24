
/*
 * @Author: vhen
 * @Date: 2023-12-23 19:22:25
 * @LastEditTime: 2023-12-24 14:10:14
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\demo\demo.module.ts
 * 
 */
import { Module, NestMiddleware, MiddlewareConsumer } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';

@Module({
  controllers: [DemoController],
  providers: [DemoService],
  exports: [DemoService],
})
export class DemoModule { }