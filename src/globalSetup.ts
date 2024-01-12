/*
 * @Author: vhen
 * @Date: 2023-12-23 19:10:48
 * @LastEditTime: 2024-01-10 15:41:31
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\globalSetup.ts
 * 全局注册文件
 */
import { ValidationPipe, VersioningType, INestApplication } from '@nestjs/common'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'
// import * as session from 'express-session';
import * as cors from 'cors'
import { json, urlencoded } from 'express'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export const GlobalSetup = (app: INestApplication, config: any) => {
    const flag: boolean = config.get('log').on;
    flag && app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    // 接口版本化管理
    app.enableVersioning({
        type: VersioningType.URI,
    })
    app.enableCors({
        origin: true,
        credentials: true,
        maxAge: 1728000,
    })
    app.setGlobalPrefix(config.get('app').prefix)
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,// 去除在类上不存在的字段
    }))
    // 设置访问频率
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15分钟
            max: 1000, // 限制15分钟内最多只能访问1000次
        }),
    )
    // cors 处理跨域
    app.use(cors())
    // web 安全，防常见漏洞
    // 注意： 开发环境如果开启 nest static module 需要将 crossOriginResourcePolicy 设置为 false 否则 静态资源 跨域不可访问
    // { crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' }, crossOriginResourcePolicy: false }
    app.use(helmet({ crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' }, crossOriginResourcePolicy: false }))
    // 使用session
    // app.use(
    //     session({
    //         secret: 'sishi',
    //         resave: false,
    //         saveUninitialized: false,
    //     }),
    // );
    // 文件上传大小限制
    app.use(json({ limit: '5mb' }))
    app.use(urlencoded({ extended: true, limit: '5mb' }))
}