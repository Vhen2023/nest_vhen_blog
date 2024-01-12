/*
 * @Author: vhen
 * @Date: 2024-01-10 02:50:28
 * @LastEditTime: 2024-01-11 02:33:06
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\dept\dept.controller.ts
 * 
 */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiHeader } from "@nestjs/swagger"

import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { Dept as DeptEntity } from './entities/dept.entity';

import { AllowAnon } from '@/common/decorator/allow-anon.decorator'
import { SwaggerApi } from '@/common/decorator/swagger.decorator';
import { ApiResult } from '@/utils/apiResult';

@Controller({
  path: "dept",
  version: '1'
})
@ApiTags("部门管理")
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: '本次请求请带上token',
})
@AllowAnon()
export class DeptController {
  constructor(private readonly deptService: DeptService) { }

  @Post('create')
  @ApiResponse({ description: '创建部门', type: DeptEntity })
  @SwaggerApi(DeptEntity)
  create(@Body() createDeptDto: CreateDeptDto): Promise<ApiResult> {
    return this.deptService.create(createDeptDto);
  }

  @Get('getDeptList')
  @ApiResponse({ description: '获取所有部门', type: DeptEntity })
  @SwaggerApi()
  findAll(): Promise<ApiResult> {
    return this.deptService.findAll();
  }


  @Put('update')
  @ApiResponse({ description: '更新部门', type: DeptEntity })
  @SwaggerApi(DeptEntity)
  update(@Body() updateDeptDto: UpdateDeptDto): Promise<ApiResult> {
    return this.deptService.update(updateDeptDto);
  }

  @Delete('delete/:id')
  @ApiResponse({ description: '删除部门' })
  @SwaggerApi()
  remove(@Param('id') id: number): Promise<ApiResult> {
    return this.deptService.remove(+id);
  }
}
