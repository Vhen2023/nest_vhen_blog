import { DemoPipe } from '@/common/pipe/demo.pipe';

/*
 * @Author: vhen
 * @Date: 2023-12-23 19:22:25
 * @LastEditTime: 2023-12-25 00:03:59
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\demo\demo.controller.ts
 * 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { SwaggerDoc } from '@/common/decorator/swagger.decorator'


@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) { }

  @Post()
  @SwaggerDoc("创建demo", "demo描述", "创建demo请求", String)
  create(@Body(new DemoPipe()) createDemoDto: CreateDemoDto) {
    return this.demoService.create(createDemoDto);
  }

  @Get()
  findAll() {
    return this.demoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demoService.update(+id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoService.remove(+id);
  }
}