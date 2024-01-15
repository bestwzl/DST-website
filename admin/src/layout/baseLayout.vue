n// 基础布局
<template>
  <div class="baseLayoutWrapper">
    <el-container style="height: 100%;">
      <el-header height="50px">
        <div class="baseLayoutHeader">
          <div class="baseLayoutHeaderLeft">
            <div class="skLogoWrapper"  @click="isCollapse = !isCollapse">
              <img src="@/assets/img/gcp_logo.png" alt="">
              <!-- <SKLogo /> -->
            </div>
            <p>UST-配置中心</p>
          </div>

          <div class="baseLayoutHeaderInfo">
            <div class="baseLayoutHeaderInfoItem">
              <p class="adminPeople">
                登录人: {{ loginUserInfo.userName }}
              </p>
            </div>

            <div class="baseLayoutHeaderInfoTools">
              <el-dropdown @command="handleClickDropdown" trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-s-operation"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="theme" icon="el-icon-moon-night">切换主题</el-dropdown-item>
                  <el-dropdown-item command="edit" icon="el-icon-edit-outline">修改密码</el-dropdown-item>
                  <el-dropdown-item command="help" icon="el-icon-s-custom">文档与帮助</el-dropdown-item>
                  <el-dropdown-item command="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>

      <el-container style="height: calc(100% - 50px);">
        <!-- <el-aside :width="isCollapse ? '50px' : '300px'" style="transition: 0.2s;"> -->
        <el-aside width="auto" style="transition: 0.2s;">
          <MenuList :isCollapse.sync="isCollapse"/>
        </el-aside>
        <el-container style="height: 100%;">
          <el-main>
            <keep-alive>
                <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="800px">
      <ChangePassword :dialogFormVisible.sync="dialogFormVisible" />
    </el-dialog>
  </div>
</template>
<script>
import ChangePassword from '../components/changePassword.vue'
import SKLogo from '../components/SKLogo_75.vue'
import MenuList from '../components/docMenu.vue'
export default {
  components: {
    ChangePassword,
    SKLogo,
    MenuList
  },

  data() {
    return {
      isCollapse: false,
      dialogFormVisible: false, // 修改密码弹窗
      loginUserInfo: {},
    };
  },

  mounted() {
    const operatorInfo = this.$commonUtils.getSessionItem("operatorInfo") || '{}';
    this.loginUserInfo = JSON.parse(operatorInfo);
  },

  methods: {
    handleSelectPage(path) {
      this.$router.push(path);
    },

    handleClickDropdown(type) {
      switch (type) {
        case 'theme': {
          this.changeSysTheme();
          break;
        }
        case "edit": {
          this.dialogFormVisible = true;
          break;
        }
        case "help":{
          window.open("https://docs.qq.com/doc/DRmhIemd4a0NPd2xz")
          break;
        }
        case "logout": {
          this.goToLoginPage();
          break;
        }
      }

    },

    // 退出登录 并清除缓存
    goToLoginPage() {
      // this.$httpPost("userLogout", {}).then((res) => {
      //   if (res.code == 200) {
      //     this.$router.push("/login");
      //   } else {
      //     this.$message({
      //       message: res.message,
      //       type: "error",
      //     });
      //   }
      // })
      // .catch((err) => {
      //   this.$message({
      //     message: err.message || "请求异常",
      //     type: "error",
      //   });
      // })
      // .finally(() => {
      //   this.$router.push("/login");
      // });

      this.$router.push("/login");
    },

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
.baseLayoutWrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .baseLayoutHeader {
    left: 0px;
    top: 0px;
    height: 50px;
    width: 100%;
    flex-shrink: 0;
    background: var(--main-header-bg-color);
    box-shadow: var(--box-shadow-bottom);
    display: flex;
    justify-content: space-between;
    background-size: 100% 100%;
    .baseLayoutHeaderInfo {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      padding: 0 30px;
      .baseLayoutHeaderMapType {
        .el-dropdown-link {
          // color: #fff;
          cursor: pointer;
        }
      }
      .baseLayoutHeaderInfoItem {
        margin: 0 15px;
        cursor: pointer;
        font-size: 14px;
        // color: #fff;
        border-right: 1px solid #ddd;
        .adminPeople {
          width: 100%;
          margin: 3px 15px;
        }
      }
      .baseLayoutHeaderInfoTools {
        cursor: pointer;
        // color: #fff;
        display: flex;
        align-items: center;
        span {
          font-size: 24px;
          // color: #fff;
          display: flex;
          align-items: center;
        }
      }
    }

    .baseLayoutHeaderLeft {
      width: 300px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 20px;
      .skLogoWrapper {
        width: 100px;
        height: 50px;
        transform: scale(0.9);
        cursor: pointer;
        img {
          height: 100%;
          width: auto;
        }
      }
      p {
        font-size: 18px;
        font-family: PingFangSC-Semibold;
      }
    }
  }
}
</style>

<style lang="less">
.el-dropdown-menu {
  background: var(--background-color);
  border-color: var(--border-color);
  .el-dropdown-menu__item {
    color: var(--font-color-3);
    &:hover{
      background: var(--background-hover-color);
    }
  }
}
.el-header {
  padding: 0;
  z-index: 2;
}
.el-aside {
  // border-right: 1px solid var(--border-color);
  box-shadow: var(--box-shadow-right);
}
.el-container {
  .el-main {
    padding: 20px 20px 0px;
  }
}
</style>
