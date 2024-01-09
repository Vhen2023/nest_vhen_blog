/*
 * @Author: vhen
 * @Date: 2023-12-23 19:22:25
 * @LastEditTime: 2024-01-05 15:52:08
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\demo\demo.service.ts
 * 
 */
import { Injectable, Inject } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
// import { RedisService } from '@/common/libs/redis/redis.service';
@Injectable()
export class DemoService {

  // constructor(@Inject(RedisService) private readonly redisService: RedisService) {

  // }
  create(createDemoDto: CreateDemoDto) {
    return 'This action adds a new demo';
  }

  async findAll() {
    // this.redisService.set('nest_redis_test', '测试redis')
    // console.log('nest_redis_test', await this.redisService.get('nest_redis_test'));
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
