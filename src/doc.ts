/*
 * @Author: vhen
 * @Date: 2023-12-23 15:03:14
 * @LastEditTime: 2023-12-24 17:00:32
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\doc.ts
 *swagger接口文档
 */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { knife4jSetup } from 'nestjs-knife4j';
import * as packageConfig from '../package.json'
const ENV = process.env.NODE_ENV;
export const GenerateSwaggerDoc = (app) => {
    if (ENV !== 'prod') {
        const options = new DocumentBuilder().setTitle('nest-vhen-blog博客接口文档').setDescription(packageConfig.description).setVersion(packageConfig.version).build()
        const document = SwaggerModule.createDocument(app, options)
        SwaggerModule.setup('/api-docs', app, document)
        knife4jSetup(app, {
            urls: [
                {
                    name: '7.X版本',
                    url: `api-docs`,
                    swaggerVersion: '7.1.17',
                    location: `api-docs`,
                },
            ],
        });
    }
}