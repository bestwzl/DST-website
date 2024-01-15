import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import HttpUtils from "./common/httpConfig/HttpUtils";
import { commonUtils } from "./common/util"; // 公用方法
import setSysTheme from "./common/theme"; // 公用方法
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import constants from "./common/constants"; // 常量枚举

Vue.use(ElementUI);
Vue.use(HttpUtils); // 服务请求
Vue.prototype.$constants = constants; // 常量
Vue.prototype.$commonUtils = commonUtils; // 将公用方法放进原型
Vue.prototype.$setSysTheme = setSysTheme; // 修改主题

router.beforeEach((to, from, next) => {
  next(); // 不校验登录
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
