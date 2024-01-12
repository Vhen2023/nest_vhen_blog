import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { Dept as DeptEntity } from './entities/dept.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeptEntity])
  ],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule { }
