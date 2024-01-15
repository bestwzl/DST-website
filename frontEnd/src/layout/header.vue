// 基础布局-头部
<template>
  <div class="layout-header_wrapper">
    <div class="header_center">
      <div class="header_logo">
        <img src="../assets//img/gcp_logo.png" alt="">
        <p>数据科学团队</p>
      </div>
      <div class="header_tab_list">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">研究布局</template>
            <el-menu-item index="2-1">智能</el-menu-item>
            <el-menu-item index="2-2">计算</el-menu-item>
            <el-menu-item index="2-3">大模型</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">合作生态</template>
            <el-menu-item index="3-1">文旅</el-menu-item>
            <el-menu-item index="3-2">政务</el-menu-item>
            <el-menu-item index="3-3">通信</el-menu-item>
            <el-menu-item index="3-4">教育</el-menu-item>
            <el-menu-item index="3-5">金融</el-menu-item>
            <el-menu-item index="3-6">智慧城市</el-menu-item>
          </el-submenu>

          <el-menu-item index="4">社会责任</el-menu-item>
          <el-menu-item index="5">关于我们</el-menu-item>
          <el-menu-item index="6">招贤纳士</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      activeIndex: '1',
    };
  },

  mounted() {

  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
};
</script>

<style scoped lang="less">
.layout-header_wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 80px;
  .header_center {
    height: 100%;
    width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header_logo {
      height: 40px;
      width: 200px;
      display: flex;
      align-items: center;
      img {
        height: 100%;
        width: auto;
      }
      p {
        margin-left: 10px;
        font-weight: 700;
        font-family: "楷体", KaiTi, "Microsoft YaHei", sans-serif;
      }
    }
    .header_tab_list {
      .el-menu.el-menu--horizontal {
          border-bottom: none;
      }
    }
  }
}
</style>

