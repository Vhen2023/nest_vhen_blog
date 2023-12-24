/*
 * @Author: vhen
 * @Date: 2023-12-24 16:05:52
 * @LastEditTime: 2023-12-24 17:17:19
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\filters\exceptions\http.exception.filter.ts
 * 
 */
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const request = host.switchToHttp().getRequest<Request>();
        const response = host.switchToHttp().getResponse<Response>();
        // http异常处理
        response.status(HttpStatus.NOT_FOUND).send({
            statusCode: HttpStatus.NOT_FOUND,
            timestamp: new Date().getTime(),
            path: request.url,
            message: exception.getResponse(),
        });
    }
}