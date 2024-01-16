/*
 * 配置后端接口请求地址
 */
import { urlConfig } from './ipConfig';

const {baseUrl} = urlConfig;
const baseURL = `${baseUrl}/api/v1`
const mockURL = `/mock`;


/**
 * 拼接请求的url
 */

const urlUtils = {
    // 登录相关
    userLogin: `${baseURL}/login/access-token`, // 登录
    changePassword: `${baseURL}/reset-password/`, // 用户主动修改密码


    // 用户管理
    getUserList: `${baseURL}/getUserList`, // 获取用户列表 get
    getUserById: `${baseURL}/getUserById`, // 通过id获取用户详情:id get
    searchUser: `${baseURL}/searchUser`, // 条件搜索用户
    creatUser: `${baseURL}/creatUser`, // 新建用户 post
    updateUser: `${baseURL}/updateUser`, // 编辑用户信息 post
    deleteUser: `${baseURL}/deleteUser`, // 删除用户 delete



    // ===== 配置信息 =====
    // 首页 - 配置轮播图
    getBannerList: `${baseURL}/getBannerList`, // 获取轮播图列表 get
    addBanner: `${baseURL}/addBanner`, // 新建轮播图 post
    updateBanner: `${baseURL}/updateBanner`, // 修改轮播图 post
    deleteBanner: `${baseURL}/deleteBanner`, // 删除轮播图 get

}




// =========== mockData ==========
urlUtils.getTestData  = `${mockURL}/testApi` ;    //


export {
    urlUtils
}
