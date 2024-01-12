import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingShow: false,
    toastObj: {
      showToast: false,
      msg: "",
      duration: 2000,
    },
  },
  mutations: {
    setLoadingState(state, loadingState) {
      state.loadingShow = loadingState;
    },
    setToastObj(state, toastObj) {
      if (!toastObj.showToast) {
        toastObj.showToast = false;
      }
      if (!toastObj.msg) {
        toastObj.msg = "";
      }
      if (
        !toastObj.duration ||
        isNaN(toastObj.duration) ||
        toastObj.duration < 500
      ) {
        toastObj.duration = 2000;
      }
      state.toastObj = toastObj;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getLoadingState(state) {
      return state.loadingShow;
    },
    getToastObj(state) {
      return state.toastObj;
    },
  },
});
