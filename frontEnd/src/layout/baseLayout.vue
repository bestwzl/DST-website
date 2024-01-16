// 基础布局
<template>
  <div class="base-layout_wrapper" >
    <Header />

    <div class="layout_body_wrapper">
      <keep-alive>
          <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>

    <Footer />

  </div>
</template>
<script>
import Header from './header/index.vue'
import Footer from './footer/index.vue'
export default {
  components: {
    Header,
    Footer
  },

  data() {
    return {
      isCollapse: false,
      dialogFormVisible: false, // 修改密码弹窗
    };
  },

  mounted() {

  },

  methods: {


    changeSysTheme() {
      const skTheme = this.$commonUtils.getSessionItem('SK_theme');
      let targetTheme = 'light';
      if (skTheme === 'light') {
        targetTheme = 'dark';
      } else if (skTheme === 'dark') {
        targetTheme = 'light';
      }

      this.$commonUtils.setSessionItem('SK_theme', targetTheme);
      this.$setSysTheme(targetTheme);
    },
  },
};
</script>

<style scoped lang="less">
.base-layout_wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background-color: var(--background-color);
  .layout_body_wrapper {
    width: 100%;
    background-color: var(--background-color);
  }
}
</style>

