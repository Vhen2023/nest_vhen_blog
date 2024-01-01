/*
 * @Author: vhen
 * @Date: 2023-12-24 18:27:46
 * @LastEditTime: 2024-01-01 00:38:20
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\decorator\swagger.decorator.ts
 * 
 */
import { applyDecorators, Type } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { ApiResult } from '@/utils/apiResult'
const baseTypeNames = ['String', 'Number', 'Boolean']
/**
 * 封装 swagger 返回统一结构
 * 支持复杂类型 {  code, message, data }
 * @param model    返回的 data 的数据类型
 * @param isArray   data 是否是数组
 * @param isPage   设置为 true, 则 data 类型为 { list, total } ,  false data 类型是纯数组
 * @returns 
 */
export const SwaggerApi = <TModel extends Type<any>>(model?: TModel, isArray?: boolean, isPage?: boolean) => {
    let items = null
    let prop = null
    const modelIsBaseType = model && baseTypeNames.includes(model.name)
    if (modelIsBaseType) {
        items = { type: model.name.toLocaleLowerCase }
    } else {
        items = { $ref: getSchemaPath(model) }
    }
    if (isArray && isPage) {
        prop = {
            type: 'object',
            properties: {
                list: {
                    type: 'array',
                    items
                },
                total: {
                    type: 'number',
                    default: 0
                }
            }
        }
    } else if (isArray) {
        prop = {
            type: 'array',
            items
        }
    } else if (model) {
        prop = items
    } else {
        prop = { type: 'null', default: null }
    }
    return applyDecorators(
        ApiExtraModels(...(model && !modelIsBaseType ? [ApiResult, model] : [ApiResult])),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResult) },
                    {
                        properties: {
                            data: prop,
                        },
                    },
                ],
            },
        })
    )
}