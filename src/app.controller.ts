/*
 * @Author: vhen
 * @Date: 2023-12-20 19:28:09
 * @LastEditTime: 2023-12-25 17:28:59
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\app.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { AppService } from './app.service';
import { AllowAnon } from '@/common/decorator/allow-anon.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService,) { }

  @Get()
  @AllowAnon()
  getHello(): string {
    return this.configService.get('APP')
    // return this.appService.getHello();
  }
}
