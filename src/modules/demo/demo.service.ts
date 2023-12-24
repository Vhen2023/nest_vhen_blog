/*
 * @Author: vhen
 * @Date: 2023-12-23 19:22:25
 * @LastEditTime: 2023-12-23 20:39:50
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\demo\demo.service.ts
 * 
 */
import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';

@Injectable()
export class DemoService {
  create(createDemoDto: CreateDemoDto) {
    return 'This action adds a new demo';
  }

  findAll() {
    return `This action returns all demo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} demo`;
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
