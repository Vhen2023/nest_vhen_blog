/*
 * @Author: vhen
 * @Date: 2023-12-23 19:10:48
 * @LastEditTime: 2023-12-24 15:06:35
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\globalSetup.ts
 * 全局注册文件
 */
import { logger } from '@/common/middleware/logger.middleware';

export const GlobalSetup = (app) => {
    // 日志
    app.use(logger);
}