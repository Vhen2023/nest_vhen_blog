/*
 * @Author: vhen
 * @Date: 2023-12-29 20:02:41
 * @LastEditTime: 2024-01-10 15:17:34
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\libs\logger\logger.module.ts
 * 
 */
import { Module } from '@nestjs/common';
import * as winston from 'winston';
import { WinstonModule, WinstonModuleOptions, utilities as nestWinstonModuleUtilities, } from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { Console } from 'winston/lib/winston/transports';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger.service';
import { join } from 'path';
function createDailyRotateTrasnport(level: string, filename: string, dir: string) {
    return new DailyRotateFile({
        level, // 日志等级，不设置所有日志将在同一个文件
        dirname: join(process.cwd(), dir),  // 日志文件文件夹
        filename: `${filename}-%DATE%.log`, // 日志文件名 %DATE% 会自动设置为当前日期
        datePattern: 'YYYY-MM-DD-HH', // 日期格式
        zippedArchive: true, // 压缩文档，用于定义是否对存档的日志文件进行 gzip 压缩 默认值 false
        maxSize: '10m', // 设置日志文件的最大大小，m 表示 mb 。可以是bytes、kb、mb、gb
        maxFiles: '7d', // 保留日志文件的最大天数，此处表示自动删除超过 7 天的日志文件。
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', }),
            winston.format.json(),
        ),
    });
}

@Module({
    imports: [
        WinstonModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const timestamp = configService.get('log').timestamp === 'true';
                const conbine = [];
                if (timestamp) {
                    conbine.push(winston.format.timestamp());
                }
                conbine.push(nestWinstonModuleUtilities.format.nestLike());
                const consoleTransports = new Console({
                    level: configService.get('log').level || 'info',
                    format: winston.format.combine(...conbine),
                });
                const writeTransport = configService.get('log').on ? [
                    createDailyRotateTrasnport('info', 'application', configService.get('log').dir),
                    createDailyRotateTrasnport('warn', 'error', configService.get('log').dir),
                ]
                    : []
                return {
                    transports: [
                        consoleTransports,
                        ...writeTransport,
                    ],
                } as WinstonModuleOptions;
            },
        }),
    ],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule { }