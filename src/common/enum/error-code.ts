/*
 * @Author: vhen
 * @Date: 2023-12-24 15:50:41
 * @LastEditTime: 2024-01-11 11:48:59
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\common\enum\error-code.ts
 * 
1~9999 为保留错误码 或者 常用错误码
10000~19999 为内部错误码
20000~29999 客户端错误码 （客户端异常调用之类的错误）
30000~39999 为第三方错误码 （代码正常，但是第三方异常）
40000~49999 为业务逻辑 错误码 （无异常，代码正常流转，并返回提示给用户）
 */
export const CodeEnum = {
    // 账号模块
    ACCOUNT_REPEAT: {
        code: 10001,
        msg: '账号已存在，请调整后重新注册！'
    },
    ACCOUNT_NOT_EXIST: {
        code: 10002,
        msg: '账号不存在，请先注册！'
    },
    ACCOUNT_PASSWORD_ERROR: {
        code: 10003,
        msg: '账号或者密码错误！'
    },
    ACCOUNT_DISABLED: {
        code: 10004,
        msg: '您账号已被禁用，如需正常使用请联系管理员！'
    }
    ,
    ACCOUNT_NOT_LOGIN: {
        code: 10005,
        msg: '请先登录！'
    },
    ACCOUNT_NOT_ADMIN: {
        code: 10006,
        msg: '您不是管理员，无权限操作！'
    },
    ACCOUNT_PHONE_NUMBER_EXIT: {
        code: 10007,
        msg: '手机号码已存在，请调整后重新注册！'
    },
    // 部门模块
    DEPT_NOT_FOUND: {
        code: 10101,
        msg: '上级部门不存在，请修改后重新添加！'
    },
    DEPT_EXIST: {
        code: 10102,
        msg: '该部门已存在，请修改后重新添加！'
    },
    // 菜单模块
    MENU_EXIST: {
        code: 10201,
        msg: '该菜单已存在，请修改后重新添加！'
    },
    MENU_NOT_EXIST: {
        code: 10202,
        msg: '该菜单不存在，请修改后重新添加！'
    },
    MENU_PARENT_EXIST: {
        code: 10203,
        msg: '该菜单的上级菜单已存在，请修改后重新添加！'
    },
    //角色模块
    ROLE_EXIST: {
        code: 10301,
        msg: '该角色已存在，请修改后重新添加！'
    },
    ROLE_NOT_EXIST: {
        code: 10302,
        msg: '该角色不存在，请修改后重新添加！'
    }
}