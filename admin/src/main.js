import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import HttpUtils from "./common/httpConfig/HttpUtils";
import { commonUtils } from "./common/util"; // 公用方法
import setSysTheme from "./common/theme"; // 公用方法
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import md5 from "js-md5";
import constants from "./common/constants"; // 常量枚举

Vue.use(ElementUI);
Vue.use(HttpUtils); // 服务请求
Vue.prototype.$constants = constants; // 常量
Vue.prototype.$commonUtils = commonUtils; // 将公用方法放进原型
Vue.prototype.$setSysTheme = setSysTheme; // 修改主题
Vue.prototype.$encryptionByMD5 = md5; // 将md5加密放到vue原型中

const TIMEOUTLONG = 2 * 60 * 60 * 1000; // 设置的超时时间

router.beforeEach((to, from, next) => {
  // next(); // 不校验登录

  const whiteList = ['/login', '/resetPassword', '/404', '/welcome' ];
  if (whiteList.includes(to.path)) {
    next();
  } else {
    const operatorInfo = commonUtils.getSessionItem("operatorInfo") || '{}';
    const { userName, token } = JSON.parse(operatorInfo);
    if (userName && token) {
      // 校验是否超时
      const nowTime = new Date().getTime(); // 现在时间
      const operatorTime = commonUtils.getSessionItem('operatorTime') || nowTime; // 最后活跃的时间
      const outTimeLong = (nowTime - operatorTime) > TIMEOUTLONG; // 是否超时
      if (outTimeLong) {
        next({path: "/login"});
      } else {
        next();
      }
    } else {
      next({path: "/login"});
    }
  }

})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
