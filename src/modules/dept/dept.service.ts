import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from "class-transformer";

import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { Dept as DeptEntity } from './entities/dept.entity';

import { ApiResult } from '@/utils/apiResult';
import { CodeEnum } from '@/common/enum/error-code';
import { listToTree } from '@/utils/tree';

@Injectable()
export class DeptService {
  constructor(@InjectRepository(DeptEntity) private readonly deptRepo: Repository<DeptEntity>, @InjectEntityManager()
  private readonly deptManager: EntityManager) { }
  /**
   * 创建部门
   * @param dto 
   * @returns 
   */
  async create(dto: CreateDeptDto): Promise<ApiResult> {
    if (await this.deptRepo.findOne({ where: { deptName: dto.deptName } })) return ApiResult.fail(CodeEnum.DEPT_EXIST.code, CodeEnum.DEPT_EXIST.msg)
    if (dto.parentId !== 0) {
      const existing = await this.deptRepo.findOne({ where: { id: dto.parentId } })
      if (!existing) return ApiResult.fail(CodeEnum.DEPT_NOT_FOUND.code, CodeEnum.DEPT_NOT_FOUND.msg)
    }
    const res = await this.deptManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.save(DeptEntity, dto);

    })
    if (!res) return ApiResult.fail()
    return ApiResult.success();
  }
  /**
   * 查询所有部门
   * @returns 
   */
  async findAll(): Promise<ApiResult> {
    const depts = await this.deptRepo.find()
    return ApiResult.success(listToTree(depts))
  }
  /**
   * 更新部门
   * @param dto 
   * @returns 
   */
  async update(dto: UpdateDeptDto): Promise<ApiResult> {
    const existing = await this.deptRepo.findOne({ where: { id: dto.id } })
    if (!existing) return ApiResult.fail(CodeEnum.DEPT_NOT_FOUND.code, CodeEnum.DEPT_NOT_FOUND.msg)
    const { affected } = await this.deptManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.update(DeptEntity, dto.id, dto);
    })
    if (!affected) return ApiResult.fail()
    return ApiResult.success();

    // await this.roleRepo
    //   .createQueryBuilder('dept')
    //   .update(Dept)
    //   .set({ desc: dept.remark, name: dept.deptName })
    //   .where('id = :id', { id: dept.id })
    //   .execute();
  }

  /**
   * 删除部门
   * @param id 
   * @returns 
   */
  async remove(id: number): Promise<ApiResult> {
    const existing = await this.deptRepo.findOne({ where: { id } })
    if (!existing) return ApiResult.fail(CodeEnum.DEPT_NOT_FOUND.code, CodeEnum.DEPT_NOT_FOUND.msg)
    const { affected } = await this.deptManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.delete(DeptEntity, id)
    })
    if (!affected) return ApiResult.fail()
    return ApiResult.success();
  }
}
