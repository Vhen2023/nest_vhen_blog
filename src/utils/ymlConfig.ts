/*
 * @Author: vhen
 * @Date: 2023-12-25 16:19:57
 * @LastEditTime: 2023-12-25 16:52:56
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\utils\ymlConfig.ts
 * 
 */
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const env = process.env.NODE_ENV
export const getYmlConfig = (key?: string) => {
    const ymlInfo = yaml.load(
        readFileSync(join(process.cwd(), `.config/.${env}.yml`), 'utf-8'),
    ) as Record<string, any>;
    if (key) {
        return ymlInfo[key];
    }
    return ymlInfo;
};