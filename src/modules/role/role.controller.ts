import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, LoggerService, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiResponse, ApiHeader } from "@nestjs/swagger"
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role as RoleEntity } from './entities/role.entity';

import { AllowAnon } from '@/common/decorator/allow-anon.decorator'
import { SwaggerApi } from '@/common/decorator/swagger.decorator';
import { ApiResult } from '@/utils/apiResult';

@Controller({
  path: "role",
  version: '1'
})
@ApiTags("角色管理")
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: '本次请求请带上token',
})
@AllowAnon()
export class RoleController {
  constructor(private readonly roleService: RoleService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) { }

  @Post('create')
  @ApiResponse({ description: '创建角色', type: RoleEntity })
  @SwaggerApi(RoleEntity)
  async create(@Body() createRoleDto: CreateRoleDto): Promise<ApiResult> {
    return await this.roleService.create(createRoleDto);
  }

  @Get("getRoleList")
  @ApiResponse({ description: '获取角色列表', type: RoleEntity })
  @SwaggerApi()
  async findAll(): Promise<ApiResult> {
    return await this.roleService.findAll();
  }

  @Put('update')
  @ApiResponse({ description: '更新角色', type: RoleEntity })
  @SwaggerApi(RoleEntity)
  async update(@Body() updateRoleDto: UpdateRoleDto): Promise<ApiResult> {
    return await this.roleService.update(updateRoleDto);
  }

  @Delete('delete/:id')
  @ApiResponse({ description: '删除角色' })
  @SwaggerApi()
  async remove(@Param('id') id: number): Promise<ApiResult> {
    return await this.roleService.remove(+id);
  }
}
