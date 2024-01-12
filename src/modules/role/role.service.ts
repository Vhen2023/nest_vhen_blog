import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role as RoleEntity } from './entities/role.entity';
import { Menu as MenuEntity } from '../menu/entities/menu.entity';

import { ApiResult } from '@/utils/apiResult';
import { CodeEnum } from '@/common/enum/error-code';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(MenuEntity) private readonly menuRepo: Repository<MenuEntity>,
    @InjectEntityManager() private readonly roleManager: EntityManager
  ) { }

  /**
   * 创建角色
   * @param dto 
   * @returns 
   */
  async create(dto: CreateRoleDto): Promise<ApiResult> {
    if (await this.roleRepo.findOne({ where: { roleName: dto.roleName } })) {
      return ApiResult.fail(CodeEnum.ROLE_EXIST.code, CodeEnum.ROLE_EXIST.msg);
    }
    let menus = []
    if (dto?.menuIds && dto?.menuIds.length > 0) {
      menus = await this.menuRepo.find({ where: { id: In(dto.menuIds) } });
    }
    const newMenu = await this.roleRepo.create({
      menus,
      ...dto
    });
    const res = await this.roleManager.transaction(async (manager) => {
      return await manager.save(RoleEntity, newMenu);
    });
    if (!res) return ApiResult.fail()
    return ApiResult.success();
  }
  /**
   * 获取角色列表
   * @returns 
   */
  async findAll(): Promise<ApiResult> {
    // 这里关联没法指定显示字段
    // const roleList = await this.roleRepo.find({
    //   relations: {
    //     menus: true
    //   }, order: { orderNum: 'DESC', id: 'ASC' }
    // });
    const roleList = await this.roleRepo.createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menus')
      .select(['role.id', 'role.roleName', 'role.orderNum', 'role.remark', "menus.id", "menus.menuName"])
      .orderBy('role.orderNum', 'DESC')
      .addOrderBy('role.id', 'ASC')
      .getMany();
    return ApiResult.success(roleList);
  }

  /**
   * 更新角色
   * @param dto 
   * @returns 
   */
  async update(dto: UpdateRoleDto): Promise<ApiResult> {
    const roleTemp = await this.roleRepo.findOne({
      where: {
        id: dto.id,
      },
      relations: {
        menus: true,
      },
    });
    if (!roleTemp) return ApiResult.fail(CodeEnum.ROLE_NOT_EXIST.code, CodeEnum.ROLE_NOT_EXIST.msg)

    let menus = []
    if (dto?.menuIds && dto?.menuIds.length > 0) {
      menus = await this.menuRepo.find({ where: { id: In(dto.menuIds) } });
    }
    const newRole = await this.roleRepo.merge(roleTemp, dto);
    newRole.menus = menus
    // 删除原有角色，解决主键冲突问题，暂时解决方案
    await this.roleRepo.delete(dto.id)
    // 暂留bug放这里，角色有用户关联会把bug，
    // 目前想法是先把关联数据删除，更新成功在这里再保存删除的数据，暂时不处理，后续想想有没有刚好方案
    const res = await this.roleManager.transaction(async (manager) => {
      return await manager.save(RoleEntity, newRole);
    });
    if (!res) return ApiResult.fail()
    return ApiResult.success();
  }
  /**
   * 删除角色
   */
  async remove(id: number): Promise<ApiResult> {
    const existing = await this.roleRepo.findOne({ where: { id } })
    console.log(existing);
    if (!existing) return ApiResult.fail(CodeEnum.ROLE_NOT_EXIST.code, CodeEnum.ROLE_NOT_EXIST.msg)
    const { affected } = await this.roleManager.transaction(async (manager) => {
      return await manager.delete(RoleEntity, id);
    });
    if (!affected) return ApiResult.fail()
    return ApiResult.success();
  }
}
