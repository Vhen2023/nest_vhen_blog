/*
 * @Author: vhen
 * @Date: 2023-12-21 17:39:47
 * @LastEditTime: 2023-12-22 22:23:16
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\user\user.controller.ts
 * 版权声明：未经授权，任何商业用途均须联系原作者【微信：zq2019-8888】
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {ApiTags,ApiOperation,ApiParam,ApiQuery,ApiBody,ApiResponse,ApiHeader} from "@nestjs/swagger"
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  path: "user",
  version: '1'
})
@ApiTags("用户管理")
// username: string
// @Controller('user')
@ApiHeader({
  name: 'authoriation',
  required: true,
  description: '本次请求请带上token',
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({summary:"创建用户",description:"创建用户接口"})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @Version('1')
  @ApiOperation({summary:"获取用户列表",description:"获取用户列表接口"})
  // @ApiQuery({name:"username",description:"用户名称"})
  @ApiResponse({status:401,description:"自定义返回信息",type:CreateUserDto})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:"根据Id获取用户信息",description:"用户信息接口"})
  @ApiParam({name:"id",description:"用户id",required:true})
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
