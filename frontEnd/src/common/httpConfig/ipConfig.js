/**
 * 配置不同环境下的请求地址
 * @type {string}
 */

const env = process.env.VUE_APP_CURRENTMODE || 'DEV';
console.log("当前环境："  , env);


const GlobalConfig = {
    DEV: {
        env: 'DEV',
        baseUrl: '/apis',  // 走代理
    },
    TEST: {
        env: 'TEST',
        baseUrl: 'http://gcp-backend',
    },
    PROD: {
        env: 'PROD',
        // baseUrl: 'http://gcp-backend',
        baseUrl: `${window.location.origin}/backend`,
    },
}

let urlConfig = GlobalConfig[env];

export {
    urlConfig,
    env
}
