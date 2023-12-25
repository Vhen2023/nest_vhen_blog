/*
 * @Author: vhen
 * @Date: 2023-12-24 13:28:58
 * @LastEditTime: 2023-12-25 13:51:32
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
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        const response: FastifyReply = context
            .switchToHttp()
            .getResponse<FastifyReply>();
        return next.handle().pipe(
            map((originalData: any) => {
                if (
                    originalData &&
                    originalData.code &&
                    originalData.message &&
                    "data" in originalData
                ) {
                    return originalData; // 如果是，直接返回
                }
                // 获取响应状态码
                const statusCode: number = response.statusCode;
                // 获取对应状态码的标准消息
                const message: string = getReasonPhrase(statusCode);
                return {
                    code: statusCode, //  响应的 HTTP 状态码
                    message: message, // 基于状态码的标准消息。
                    data: instanceToPlain(originalData) || null, // 转换为简单的 JavaScript 对象
                    timestamp: getCurrentTimestamp(), //  当前的 UNIX 时间戳
                }
            }),
        );
    }
}