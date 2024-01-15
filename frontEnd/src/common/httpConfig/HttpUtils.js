// 配置请求方法

import axios from "axios";
import { urlUtils } from "./apiConfig";
import { commonUtils } from "../util";
import router from "../../router";

/**
 * 拦截请求
 */
axios.interceptors.request.use(
  function (config) {
    const newTime = new Date().getTime();
    commonUtils.setSessionItem("operatorTime", newTime);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * 拦截响应
 */

const errMsg = {
  400: '请求错误(400)',
  401: '请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  409: 'dataset被引用(409)', // 自定义
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
}
axios.interceptors.response.use(
  function (response) {
    if(response.data.code === 401){
      router.push('/login');
    }
    return response;
  },
  function (err) {
    if (err && err.response) {
      if(err.response.status === 401) {
        err.message = "token失效，请重新登录(401)";
        router.push('/login');
      } else {
        err.message = errMsg[err.response.status] || `连接出错(${err.response.status})!`
      }
    } else {
      if (err && err.message.includes("timeout")) {
        // 判断请求异常信息中是否含有超时timeout字符串
        err.message = "网络连接超时"; // reject这个错误信息
      } else {
        err.message = "连接服务器失败!";
      }
    }
    return Promise.reject(err);
  }
);

function splicingUrlString(baseUrl, obj) {
  let pageUrl = baseUrl;
  for (let key in obj) {
    if (obj[key] && obj[key] !== "undefined" && obj[key] !== "null") {
      pageUrl = pageUrl + `${encodeURIComponent(obj[key])}`;
    }
  }

  return pageUrl;
}

/**
 * 暴露请求方法
 * url 请求的链接
 * data 请求的数据
 * header 自定义请求头
 */
export default {
  install(Vue, options) {
    Vue.prototype.$httpPost = (url, data, header = {}, params = {}) => {
      let targetUrl = url;
      const operatorInfo = commonUtils.getSessionItem("operatorInfo") || '{}';
      const { userName, token, token_type, userRole } = JSON.parse(operatorInfo);
      if (url.indexOf("http") === -1 && !url.includes("/apis")) {
        // targetUrl = urlUtils[url];
        targetUrl = splicingUrlString(urlUtils[url], params);
      }
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: targetUrl || "",
          headers: Object.assign(
            {
              timeout: 30 * 1000,
              Authorization: `${token_type} ${token}`,
              // 'Content-Type': 'application/json;charset=UTF-8',
            },
            header
          ),
          data,
        }).then(
            (data) => {
              if (data.status && data.status === 200) {
                resolve(data.data);
              } else {
                reject(data);
              }
            },
            (e) => {
              reject(e);
            }
          )
          .catch((err) => {
            reject(err);
          });
      });
    };

    Vue.prototype.$httpGet = (url, data, header = {}, params = {}) => {
      let targetUrl = url;
      const operatorInfo = commonUtils.getSessionItem("operatorInfo") || '{}';
      const { token, token_type } = JSON.parse(operatorInfo);
      if (url.indexOf("http") === -1 && !url.includes("/apis")) {
        targetUrl = splicingUrlString(urlUtils[url], params);
      }
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: targetUrl || "",
          headers: Object.assign(
            {
              timeout: 30 * 1000,
              Authorization: `${token_type} ${token}`,
              // 'Content-Type': 'application/json;charset=UTF-8',
            },
            header
          ),
          params: {
            ...data,
          },
        })
          .then(
            (promiseData) => {
              if (promiseData.status && promiseData.status === 200) {
                resolve(promiseData.data);
              } else {
                reject(promiseData);
              }
            },
            (e) => {
              reject(e);
            }
          )
          .catch((err) => {
            reject(err);
          });
      });
    };

    Vue.prototype.$httpPut = (url, data, header = {}, params) => {
      let targetUrl = url;
      const operatorInfo = commonUtils.getSessionItem("operatorInfo") || '{}';
      const { token, token_type } = JSON.parse(operatorInfo);
      if (url.indexOf("http") === -1 && !url.includes("/apis")) {
        targetUrl = splicingUrlString(urlUtils[url], params);
      }
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: targetUrl || "",
          headers: Object.assign(
            {
              timeout: 30 * 1000,
              Authorization: `${token_type} ${token}`,
              // 'Content-Type': 'application/json;charset=UTF-8',
            },
            header
          ),
          data: {
            ...data,
          },
        })
          .then(
            (promiseData) => {
              if (promiseData.status && promiseData.status === 200) {
                resolve(promiseData.data);
              } else {
                reject(promiseData);
              }
            },
            (e) => {
              reject(e);
            }
          )
          .catch((err) => {
            reject(err);
          });
      });
    };

    Vue.prototype.$httpDelete = (url, data, header = {}, params) => {
      let targetUrl = url;
      const operatorInfo = commonUtils.getSessionItem("operatorInfo") || '{}';
      const { token, token_type } = JSON.parse(operatorInfo);
      if (url.indexOf("http") === -1 && !url.includes("/apis")) {
        targetUrl = splicingUrlString(urlUtils[url], params);
      }
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: targetUrl || "",
          headers: Object.assign(
            {
              timeout: 30 * 1000,
              Authorization: `${token_type} ${token}`,
              // 'Content-Type': 'application/json;charset=UTF-8',
            },
            header
          ),
          data: {
            ...data,
          },
        })
          .then(
            (promiseData) => {
              if (promiseData.status && promiseData.status === 200) {
                resolve(promiseData.data);
              } else {
                reject(promiseData);
              }
            },
            (e) => {
              reject(e);
            }
          )
          .catch((err) => {
            reject(err);
          });
      });
    };

    Vue.prototype.$formData = (url, data, header = {}) => {
      let targetUrl = url;
      const operatorInfo = commonUtils.getSessionItem("operatorInfo") || '{}';
      const { token, token_type } = JSON.parse(operatorInfo);
      if (url.indexOf("http") === -1 && !url.includes("/apis")) {
        targetUrl = urlUtils[url];
      }
      return new Promise((resolve, reject) => {
          axios({
              method: 'post',
              url: targetUrl || '',
              headers: Object.assign(
                {
                    timeout: 60 * 1000,
                    Authorization: `${token_type} ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                header
              ),
              data: data,
          }).then((data) => {
              if (data.status && data.status === 200) {
                  resolve(data.data)
              } else {
                  reject (data)
              }
          }, (e) => {
              reject (e)
          }).catch((err) => {
              reject (err)
          })
      })
    };

  },
};
