/*
 * @Author: vhen
 * @Date: 2023-12-23 19:45:24
 * @LastEditTime: 2023-12-24 15:00:46
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\middleware\logger.middleware.ts
 * 
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logger/log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const code = res.statusCode; //响应状态吗
        next();
        //  组装日志信息
        const logFormat = `Method:${req.method}
      Request original url: ${req.originalUrl}
      IP:${req.ip}
      Status code:${code} `;
        // 根据状态码进行日志类型区分
        if (code >= 500) {
            Logger.error(logFormat);
        } else if (code >= 400) {
            Logger.warn(logFormat);
        } else {
            Logger.access(logFormat);
            Logger.log(logFormat);
        }
    }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
    const code = res.statusCode; //响应状态码
    next();
    // 组装日志信息
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params, null, 2)}
    Query: ${JSON.stringify(req.query, null, 2)}
    Body: ${JSON.stringify(
        req.body,
        null,
        2,
    )} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    //根据状态码，进行日志类型区分
    if (code >= 500) {
        Logger.error(logFormat);
    } else if (code >= 400) {
        Logger.warn(logFormat);
    } else {
        Logger.access(logFormat);
        // Logger.log(logFormat);
    }
}