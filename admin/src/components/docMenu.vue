// 文件目录
<template>
    <div class="doc_menu_wrapper" :class="!isCollapse ? 'doc_menu_wrapper_withWidth' : ''">
      <el-menu
        :default-active="targetPath"
        @open="handleOpen"
        @select="handleClickMenuItem"
        :collapse="isCollapse"
      >
        <el-menu-item-group>
          <span slot="title" v-if="!isCollapse">全局</span>
          <el-menu-item index="/overview">
            <i class="el-icon-menu"></i>
            <span slot="title">概览</span>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <span slot="title" v-if="!isCollapse">页面配置</span>
          <el-menu-item index="/home">
            <i class="el-icon-odometer"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/shehuizeren">
            <i class="el-icon-odometer"></i>
            <span slot="title">社会责任</span>
          </el-menu-item>

          <el-menu-item index="/aboutUs">
            <i class="el-icon-odometer"></i>
            <span slot="title">关于我们</span>
          </el-menu-item>

          <el-menu-item index="/zhaoxiannashi">
            <i class="el-icon-odometer"></i>
            <span slot="title">招贤纳士</span>
          </el-menu-item>
        </el-menu-item-group>

        <el-submenu index="parent_menu_1">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span slot="title">研究布局</span>
          </template>
          <el-menu-item index="/datamanage">智能</el-menu-item>
          <el-menu-item index="/graphconfig">计算</el-menu-item>
          <el-menu-item index="/modalmanage">大模型</el-menu-item>
        </el-submenu>

        <el-submenu index="parent_menu_2">
          <template slot="title">
            <i class="el-icon-share"></i>
            <span slot="title">合作生态</span>
          </template>
          <el-menu-item index="/session">文旅</el-menu-item>
          <el-menu-item index="/zhengwu">政务</el-menu-item>
          <el-menu-item index="/tongxin">通信</el-menu-item>
          <el-menu-item index="/jiaoyu">教育</el-menu-item>
          <el-menu-item index="/jinrong">金融</el-menu-item>
          <el-menu-item index="/zhihuichengshi">智慧城市</el-menu-item>
          <!-- <el-menu-item index="/explore">explore</el-menu-item> -->
          <!-- 自研 -->
          
        </el-submenu>

        <el-menu-item-group>
          <span slot="title" v-if="!isCollapse">用户中心</span>
          <el-menu-item index="/user">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户总览</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>

    </div>
</template>
<script>


export default {
  components: {
  },
  props: {
    isCollapse: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  watch: {
      '$route': { // $route可以用引号，也可以不用引号  监听的对象
          handler(to){
            this.targetPath = to.fullPath;
          },
          deep: true, // 深度观察监听 设置为 true
          immediate: true, // 第一次初始化渲染就可以监听到
      }
  },
  data() {
    return {
      menuList: [],
      targetPath: '/overview',
    };
  },

  mounted() {
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClickMenuItem( index, indexPath){
      const parentsMenu = ['parent_menu_1', 'parent_menu_1'];
      // console.log( index, indexPath);
      if (!parentsMenu.includes(index)) {
        this.$router.push(index);
      }
    }
  },
};
</script>

<style scoped lang="less">
  .doc_menu_wrapper {
    // min-width: 200px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .doc_menu_wrapper_withWidth {
    min-width: 200px;
  }

</style>

<style lang="less">
  .el-menu {
    color: var(--font-color-3);
    background: var(--background-color);
    height: 100%;
    border: none;

    .el-submenu,
    .el-menu-item {
      color: var(--font-color-3);
      &:hover{
        background: var(--background-hover-color);
      }
    }
    .el-submenu {
      .el-submenu__title {
        color: var(--font-color-3);
        &:hover{
          background: var(--background-hover-color);
        }
      }
    }

    .is-active {
      color: var(--font-color-active);
    }
    .is-opened {
      background: rgba(0, 0, 0, 0);
      color: var(--font-color-active);
    }

  }

</style>