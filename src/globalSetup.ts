/*
 * @Author: vhen
 * @Date: 2023-12-23 19:10:48
 * @LastEditTime: 2023-12-25 17:02:45
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\globalSetup.ts
 * 全局注册文件
 */
import helmet from 'helmet';
import * as cors from 'cors'
import { logger } from '@/common/middleware/logger.middleware';

export const GlobalSetup = (app) => {
    // cors 处理跨域
    app.use(cors())
    // web 安全，防常见漏洞
    // 注意： 开发环境如果开启 nest static module 需要将 crossOriginResourcePolicy 设置为 false 否则 静态资源 跨域不可访问
    // { crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' }, crossOriginResourcePolicy: false }
    app.use(helmet({ crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' }, crossOriginResourcePolicy: false }))
    // 日志
    app.use(logger);
}