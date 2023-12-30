/*
 * @Author: vhen
 * @Date: 2023-12-24 16:05:52
 * @LastEditTime: 2023-12-30 15:05:34
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\filters\exceptions\http-exception.filter.ts
 * 
 */
import {
    Inject,
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    LoggerService
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService) { }
    async catch(exception: HttpException, host: ArgumentsHost) {
        const request = host.switchToHttp().getRequest<Request>();
        const response = host.switchToHttp().getResponse<Response>();
        this.logger.error(exception.message, exception.stack);
        // http异常处理
        response.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            timestamp: new Date().getTime(),
            path: request.url,
            message: exception.getResponse() || exception.message || exception.name,
        });
    }
}