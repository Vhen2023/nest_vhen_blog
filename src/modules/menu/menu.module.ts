import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu as MenuEntity } from './entities/menu.entity';
import { LoggerModule } from '@/common/libs/logger/logger.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity]), LoggerModule, JwtModule
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule { }
