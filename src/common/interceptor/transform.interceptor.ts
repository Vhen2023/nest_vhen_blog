import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from 'rxjs/operators';

interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        return next.handle().pipe(
            map((data) => ({
                code: 0, //状态码
                data,//返回数据
                pagination: { // 分页
                    total: 100,
                    pageSize: 10,
                    pages: 10,
                    page: 1,
                },
                extra: {}, // 拓展
                message: 'success',// 返回结果
            })),
        );
    }
}