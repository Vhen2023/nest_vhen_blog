/*
 * @Author: vhen
 * @Date: 2024-01-10 02:49:43
 * @LastEditTime: 2024-01-11 11:16:34
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\menu\menu.controller.ts
 * 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, LoggerService, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiResponse, ApiHeader } from "@nestjs/swagger"
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu as MenuEntity } from './entities/menu.entity';

import { AllowAnon } from '@/common/decorator/allow-anon.decorator'
import { SwaggerApi } from '@/common/decorator/swagger.decorator';
import { ApiResult } from '@/utils/apiResult';

@Controller({
  path: "menu",
  version: '1'
})
@ApiTags("菜单管理")
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: '本次请求请带上token',
})
@AllowAnon()
export class MenuController {
  constructor(private readonly menuService: MenuService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) { }

  @Post('create')
  @ApiResponse({ description: '创建菜单', type: MenuEntity })
  @SwaggerApi(MenuEntity)
  async create(@Body() createMenuDto: CreateMenuDto): Promise<ApiResult> {
    return await this.menuService.create(createMenuDto);
  }

  @Get('getMenuList')
  @ApiOperation({ summary: "获取菜单列表", description: "获取菜单列表接口" })
  @SwaggerApi(MenuEntity, true, true)
  findAll(): Promise<ApiResult> {
    return this.menuService.findAll();
  }

  @Put('update')
  @ApiOperation({ summary: "更新菜单", description: "更新菜单" })
  @ApiResponse({ status: 200, description: '更新菜单', type: MenuEntity })
  @SwaggerApi()
  async update(@Body() updateMenuDto: UpdateMenuDto): Promise<ApiResult> {
    return await this.menuService.update(updateMenuDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: '删除菜单' })
  @SwaggerApi()
  async remove(@Param('id') id: number): Promise<ApiResult> {
    return await this.menuService.remove(+id);
  }
}
