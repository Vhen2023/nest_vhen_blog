/*
 * @Author: vhen
 * @Date: 2023-12-24 13:28:58
 * @LastEditTime: 2024-01-01 12:48:03
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\interceptor\transform.interceptor.ts
 * 
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common"
import { FastifyReply } from "fastify";
import { getReasonPhrase } from "http-status-codes";
import { Observable } from "rxjs"
import { map } from 'rxjs/operators';
import { instanceToPlain } from "class-transformer";

interface Response<T> {
    data: T;
}
function getCurrentTimestamp(): number {
    return Date.parse(new Date().toString()) / 1000;
}
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Response<any>> | Promise<Observable<Response<any>>> {
        const response: FastifyReply = context
            .switchToHttp()
            .getResponse<FastifyReply>();
        return next.handle().pipe(
            map((originalData: any) => {
                console.log('originalData', originalData);
                if (!originalData || !originalData?.data) {
                    // originalData.timestamp = getCurrentTimestamp()
                    return originalData
                }
                // 获取响应状态码
                const statusCode: number = response.statusCode;
                // 获取对应状态码的标准消息
                const message: string = getReasonPhrase(statusCode);
                return {
                    code: originalData.code || statusCode, //  响应的 HTTP 状态码
                    message: originalData.message || message, // 基于状态码的标准消息。
                    data: instanceToPlain(originalData.data) || originalData || null, // 转换为简单的 JavaScript 对象
                    timestamp: getCurrentTimestamp(), //  当前的 UNIX 时间戳
                }
            }),
        );
    }
}