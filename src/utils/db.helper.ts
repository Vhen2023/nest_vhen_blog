/*
 * @Author: vhen
 * @Date: 2024-01-11 00:41:11
 * @LastEditTime: 2024-01-11 00:41:24
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\utils\db.helper.ts
 * 
 */
import { SelectQueryBuilder } from 'typeorm';

export const conditionUtils = <T>(
    queryBuilder: SelectQueryBuilder<T>,
    obj: Record<string, unknown>,
) => {
    // 后面的.where会替换前面的.where
    // WHERE 1=1 AND ...
    Object.keys(obj).forEach((key) => {
        if (obj[key]) {
            queryBuilder.andWhere(`${key} = :${key}`, { [key]: obj[key] });
        }
    });
    return queryBuilder;
};
