import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
@Injectable()
export class DemoPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        //这个里面可以修改传入的值以及验证转入值的合法性
        console.log("我是处理Demo参数管道");
        return value;
    }
}