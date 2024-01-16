/*
 * 配置后端接口请求地址
 */
import { urlConfig } from './ipConfig';

const { baseUrl } = urlConfig;
const baseURL = `${baseUrl}/api`


/**
 * 拼接请求的url
 */

const urlUtils = {
    // 登录相关
    userLogin: `${baseURL}/login/access-token`, // 登录
    getUserMe: `${baseURL}/users/me`, // 获取用户信息
    changePassword: `${baseURL}/reset-password/`, // 用户主动修改密码
    userLogout: `${baseURL}/auth/logout`, // 登出 -----缺省


}

export {
    urlUtils
}
