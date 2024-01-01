/*
 * @Author: vhen
 * @Date: 2023-12-24 18:46:30
 * @LastEditTime: 2023-12-31 19:23:19
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\guard\auth.guard.ts
 * 
 */

import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '@/modules/user/user.service';
import { ALLOW_ANON } from '@/common/decorator/allow-anon.decorator'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector, @Inject(UserService)
    private readonly userService: UserService) {
        super()
    }
    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const allowAnon = this.reflector.getAllAndOverride<boolean>(ALLOW_ANON, [ctx.getHandler(), ctx.getClass()])
        if (allowAnon) return true
        const req = ctx.switchToHttp().getRequest()
        const accessToken = req.get('Authorization')
        if (!accessToken) throw new ForbiddenException('您还没登录,请先登录')
        const UserId = this.userService.verifyToken(accessToken)
        if (!UserId) throw new UnauthorizedException('当前登录已过期，请重新登录！')
        return this.activate(ctx)

    }
    async activate(ctx: ExecutionContext): Promise<boolean> {
        return super.canActivate(ctx) as Promise<boolean>
    }
}