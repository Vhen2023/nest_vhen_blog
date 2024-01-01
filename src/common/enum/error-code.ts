/*
 * @Author: vhen
 * @Date: 2023-12-24 15:50:41
 * @LastEditTime: 2024-01-01 11:49:09
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\enum\error-code.ts
 * 
1~9999 为保留错误码 或者 常用错误码
10000~19999 为内部错误码
20000~29999 客户端错误码 （客户端异常调用之类的错误）
30000~39999 为第三方错误码 （代码正常，但是第三方异常）
40000~49999 为业务逻辑 错误码 （无异常，代码正常流转，并返回提示给用户）
 */
export enum ErrorCode {
    OK = 200
}
export enum ErrorCodeMsg {
    OK = '请求成功'
}