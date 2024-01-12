import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

import { UserService } from '@/modules/user/user.service'
import { ROLES_KEY } from '../decorator/roles.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly userService: UserService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<number[]>(ROLES_KEY, context.getHandler())
        if (!roles) {
            return true
        }
        // 2.获取req拿到鉴权后的用户数据
        const req = context.switchToHttp().getRequest()
        // 3.通过用户数据从数据查询权限
        const user = await this.userService.findOneByUserName(req.user.username)
        const roleIds = user.roles.map((item) => item.id)
        // 4.判断用户权限是否为装饰器的权限 的some返回boolean
        const flag = roles.some((role) => roleIds.includes(role))
        return flag
    }
}
