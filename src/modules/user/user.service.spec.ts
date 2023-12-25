/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2023-12-25 17:56:22
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\user.service.spec.ts
 * 
 */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
