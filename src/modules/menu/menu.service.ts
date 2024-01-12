/*
 * @Author: vhen
 * @Date: 2024-01-10 02:49:43
 * @LastEditTime: 2024-01-12 21:00:15
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\modules\menu\menu.service.ts
 * 
 */
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu as MenuEntity } from './entities/menu.entity';

import { ApiResult } from '@/utils/apiResult';
import { CodeEnum } from '@/common/enum/error-code';
import { listToTree } from '@/utils/tree';

@Injectable()
export class MenuService {
  constructor(@InjectRepository(MenuEntity) private readonly menuRepo: Repository<MenuEntity>, @InjectEntityManager()
  private readonly menuManager: EntityManager) { }
  /**
   * 创建菜单
   * @param dto 菜单信息
   * @returns 
   */
  async create(dto: CreateMenuDto): Promise<ApiResult> {
    if (dto.parentId !== 0) {
      // 查询当前父级菜单是否存在
      const parentMenu = await this.menuRepo.findOne({ where: { id: dto.parentId } });
      if (!parentMenu) {
        return ApiResult.fail(CodeEnum.MENU_NOT_EXIST.code, CodeEnum.MENU_NOT_EXIST.msg);
      }
    }
    const menuExist = await this.menuRepo.findOne({ where: { menuName: dto.menuName } });
    if (menuExist) {
      return ApiResult.fail(CodeEnum.MENU_EXIST.code, CodeEnum.MENU_EXIST.msg);
    }
    const menu = await this.menuManager.transaction(async (manager) => {
      return await manager.save<MenuEntity>(plainToInstance(MenuEntity, dto))
    });
    if (!menu) {
      return ApiResult.fail();
    }
    return ApiResult.success();
  }
  /**
   * 获取菜单列表
   * @returns 
   */
  async findAll(): Promise<ApiResult> {
    const menuList = await this.menuRepo.find({ order: { orderNum: 'DESC', id: 'ASC' } });
    return ApiResult.success(listToTree(menuList))
  }

  /**
   * 更新菜单
   * @param dto 
   * @returns 
   */
  async update(dto: UpdateMenuDto): Promise<ApiResult> {
    const existing = await this.menuRepo.findOne({ where: { id: dto.id } })
    if (!existing) return ApiResult.fail(CodeEnum.MENU_NOT_EXIST.code, CodeEnum.MENU_NOT_EXIST.msg)
    const { affected } = await this.menuManager.transaction(async (manager) => {
      return await manager.update<MenuEntity>(MenuEntity, { id: dto.id }, dto)
    })
    if (!affected) return ApiResult.fail()
    return ApiResult.success();
  }
  /**
   * 删除菜单
   * @param id 菜单id
   * @returns 
   */
  async remove(id: number): Promise<ApiResult> {
    const existing = await this.menuRepo.findOne({ where: { id } })
    if (!existing) return ApiResult.fail(CodeEnum.MENU_NOT_EXIST.code, CodeEnum.MENU_NOT_EXIST.msg)
    const { affected } = await this.menuManager.transaction(async (manager) => {
      return await manager.delete<MenuEntity>(MenuEntity, { id })
    })
    if (!affected) return ApiResult.fail()
    return ApiResult.success()
  }
}
