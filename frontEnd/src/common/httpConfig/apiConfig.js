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
    getUserMe: `${baseURL}/users/me`, // 获取用户信息
    changePassword: `${baseURL}/reset-password/`, // 用户主动修改密码
    userLogout: `${baseURL}/auth/logout`, // 登出 -----缺省

    // 概览页
    getNameSpaceByUserId: `${baseURL}/namespaces/me`, // 获取自己的namespace
    addServer: `${baseURL}/namespaces/`, // 获取自己的namespace
    editServer: `${baseURL}/namespaces/`, // 编辑namespace - put
    deleteServer: `${baseURL}/namespaces/`, // 删除namespace -delete

    getServerList: `${baseURL}/namespaces/`, // 获取namespace列表 -get

    // G-runtime

    creatSession: `${baseURL}/sessions/`, // 新建session -post
    getSessionList: `${baseURL}/sessions/`, // 获取session列表 -get
    deleteSession: `${baseURL}/sessions/`, // 删除session -delete
    putSessionGraph: `${baseURL}/sessions/`, // 给session配置图 -put

    // analyze
    getAnalyzeList: `${baseURL}/analyze/`, // 获取analyze列表 -get
    runAnalyze: `${baseURL}/analyze/`, // 执行一个算法 -post

    // dataset
    getDatasetList: `${baseURL}/datasets/`, // 获取dataset数据 - get
    addDataset: `${baseURL}/datasets/`, // 新增dataset数据 - post
    deleteDataset: `${baseURL}/datasets/`, // 删除dataset数据 - delete
    getGraphList: `${baseURL}/graphs/`, // 获取graph列表 - get
    addGraph: `${baseURL}/graphs/`, // 新增graph配置 - post
    editGraph: `${baseURL}/graphs/`, // 编辑graph配置 - put
    deleteGraph: `${baseURL}/graphs/`, // 删除graph配置 - delete


    getModelList: `${baseURL}/models/`, // 获取模型列表 - get
    getModelConfig: `${baseURL}/models/config`, // 获取模型列表 - get
    creatModel: `${baseURL}/models/`, // 新增模型配置 - post
    getTrainHistory: `${baseURL}/models/`, // 获取模型训练历史记录 - get
    getMetricsDetail: `${baseURL}/models/`, // 模型训练的图形数据 - get

    queryInteractive: `${baseURL}/interactive/`, // 查询 expore



    runModel: `${baseURL}/train/`, // 运行模型



    // 用户管理
    getUserList: `${baseURL}/users/`, // 获取用户列表 get
    addUser: `${baseURL}/users/`, // 新建用户 post
    getUserDetail: `${baseURL}/users/`, // 获取用户详情:id get
    editUser: `${baseURL}/users/`, // 编辑用户信息 put


}




// =========== mockData ==========
urlUtils.getTestData  = `${mockURL}/testApi` ;    //


export {
    urlUtils
}
