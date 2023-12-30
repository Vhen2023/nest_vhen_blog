/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2023-12-30 15:06:22
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\user.controller.ts
 */
import { Controller, Inject, Get, Post, Body, Query, Patch, Param, Delete, HttpCode, HttpStatus, LoggerService } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiBody, ApiResponse, ApiHeader } from "@nestjs/swagger"
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AllowAnon } from '@/common/decorator/allow-anon.decorator'
import { User as UserEntity } from './entities/user.entity';

@Controller({
  path: "user",
  version: '1'
})
@ApiTags("用户管理")
@ApiBearerAuth()
@ApiHeader({
  name: 'authoriation',
  required: true,
  description: '本次请求请带上token',
})
@AllowAnon()
export class UserController {
  constructor(private readonly userService: UserService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) { }
  @ApiResponse({ status: 201, description: '创建用户', type: UserEntity })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get("getUserList")
  // @Version('1')
  @ApiOperation({ summary: "获取用户列表", description: "获取用户列表接口" })
  @ApiParam({ name: "page", description: "分页", required: true })
  @ApiParam({ name: "pageSize", description: "页码", required: true })
  @ApiParam({ name: "keyWord", description: "关键词", required: true })
  findAll(@Query() query: { keyWord: string, page: number, pageSize: number }) {
    this.logger.error('用户控制器初始化...');
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: "根据Id获取用户信息", description: "用户信息接口" })
  @ApiParam({ name: "id", description: "用户id", required: true })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @ApiOperation({ summary: "更新用户", description: "更新用户" })
  @ApiResponse({ status: 200, description: '更新用户', type: UserEntity })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @ApiOperation({ summary: "删除用户", description: "根据id删除用户" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
