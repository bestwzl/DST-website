// 基础布局-头部
<template>
  <div class="layout_header_wrapper" v-scroll="handleScroll">

    <div class="header_banner_wrapper">
      <BannerModule :bannerList="bannerList" />
    </div>

    <div
      class="header_tool_wrapper"
      :class="headerToolShow ? 'header_show' : 'header_hide'"
      :style="`opacity: ${opcityNum}`"
    >
      <div class="header_center">
        <div class="header_logo">
          <img src="@/assets/img/gcp_logo.png" alt="" @click="changeSysTheme">
          <p>数据科学团队</p>
        </div>
        <div class="header_tab_list">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            menu-trigger="hover"
            @select="handleSelect"
          >
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

  </div>
</template>
<script>
import BannerModule from './bannerModule.vue';
export default {
  components: {
    BannerModule
  },

  data() {
    return {
      activeIndex: '1',
      headerToolShow: true,
      opcityNum: 1,
      bannerList: [],
    };
  },

  mounted() {
    this.getBannerList();
  },

  methods: {
    getBannerList(){
      this.btnLoading = true;
      this.$httpGet('getBannerList')
        .then((res) => {
          if(res.code == 0) {
            this.bannerList = res.data || []
          } else {
            this.$message({
                type: 'error',
                message: res.msg
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    handleScroll(scrollTop) {
      if (scrollTop <= 240) {
        if (!this.headerToolShow) {
          this.headerToolShow = true;
        }
        this.opcityNum = 1 - (scrollTop / 240).toFixed(2);
        // console.log('scrollTop:',scrollTop, '比例：', this.opcityNum);
        return;
      } else {
        this.headerToolShow = false;
        return;
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    changeSysTheme() {
      const skTheme = this.$commonUtils.getSessionItem('SK_theme');
      const targetTheme = skTheme === 'dark' ? 'light' : 'dark';

      this.$commonUtils.setSessionItem('SK_theme', targetTheme);
      this.$setSysTheme(targetTheme);
    },
  },
};
</script>

<style scoped lang="less">
.layout_header_wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 500px;
  position: relative;
  .header_banner_wrapper {
    width: 100%;
    height: 100%;
  }
  .header_tool_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 80px;
    width: 100%;
    background-color: var(--background-color);
    transition: 0.6s;
    .el-menu--horizontal {
      border-bottom: none!important;
    }
  }
  .header_hide {
    top: -100px;
  }
  .header_show {
    top: 0px;
  }
  .header_center {
    height: 80px;
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
      display: flex;
      align-items: center;
    }
  }
}
</style>

<style lang="less">

.el-menu--horizontal {
  border-bottom: none!important;
  .el-menu {
    background-color: var(--el-bg-color);
    .el-menu-item,
    .el-submenu__title {
      background-color: var(--el-bg-color);
      float: none;
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
    }
  }
  .el-menu--popup {
    .el-menu-item {
      &:hover{
        background-color: var(--el-bg-hover-color);
        color: var(--font-color-1);
      }
    }
  }
}
.header_tool_wrapper{
  .el-menu--horizontal {
      background-color: var(--el-bg-color);
      .el-menu-item {
        background-color: var(--el-bg-color)!important;
        color: var(--font-color-2);
        &:hover{
          color: var(--font-color-1);
        }
      }
      .el-submenu {
        .el-submenu__title {
          color: var(--font-color-2);
          &:hover{
            background-color: var(--el-bg-color);
            color: var(--font-color-1);
          }
        }
      }
      .is-active {
        background-color: var(--el-bg-color);
        color: var(--font-color-1);
      }
      .is-opened {
        color: var(--font-color-1);
        .el-submenu__title {
          color: var(--font-color-1);
        }
      }
  }
}


</style>

