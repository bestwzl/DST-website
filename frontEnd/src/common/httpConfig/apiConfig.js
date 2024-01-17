/*
 * 配置后端接口请求地址
 */
import { urlConfig } from './ipConfig';

const { baseUrl } = urlConfig;
const baseURL = `${baseUrl}`


/**
 * 拼接请求的url
 */

const urlUtils = {
    // 首页 - 配置轮播图
    getBannerList: `${baseURL}/admin/getBannerList`, // 获取轮播图列表 get


}

export {
    urlUtils
}
