// 基础布局-头部
<template>
  <div class="layout_header_wrapper" v-scroll="handleScroll">

    <div class="header_banner_wrapper">
      <BannerModule :bannerList="bannerList" />
    </div>

    <div
      v-if="headerToolShow"
      class="header_tool_wrapper"
      :style="`opacity: ${opcityNum}`"
    >
      <div class="header_center">
        <div class="header_logo">
          <img src="@/assets/img/gcp_logo.png" alt="">
          <p>数据科学团队</p>
        </div>
        <div class="header_tab_list">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            menu-trigger="click"
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
      bannerList: [
        {
            backGroundType: 'img', // img, color, video
            backGroundUrl: 'https://img0.baidu.com/it/u=3995006546,2760268670&fm=253&fmt=auto&app=138&f=JPEG?w=1563&h=500', // 背景图片/视屏地址 ｜ 纯色的颜色
            title: '这是一级标题', // 标题
            subTitle: '这里是二级标题，文字多一些', // 二级标题
            desc: '这里是简单的描述文案，文字会更多一些，更多一些，更多一些', // 描述文案
            link: 'https://www.baidu.com' // 跳转链接
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img1.pconline.com.cn/piclib/200901/03/batch/1/20508/1230998863053xr0fs0rlo1.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img0.baidu.com/it/u=3018234987,951664061&fm=253&fmt=auto&app=138&f=JPEG?w=1563&h=500',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://b.zol-img.com.cn/soft/6/616/ceHlJ6dRjw6H.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://www.sketchupbar.com/data/attachment/forum/201104/05/214753o73biezon08fj3bu.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img0.baidu.com/it/u=1960276615,4184663836&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img1.baidu.com/it/u=1025798450,2201938949&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=209',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img1.pconline.com.cn/piclib/200901/03/batch/1/20508/12309988630535b9l0wqvao.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
      ],
    };
  },

  mounted() {
    // window.addEventListener()
  },

  methods: {
    handleScroll(scrollTop) {
      if (scrollTop <= 160) {
        if (!this.headerToolShow) {
          this.headerToolShow = true;
        }
        this.opcityNum = 1 - (scrollTop / 160).toFixed(2);
        console.log('scrollTop:',scrollTop, '比例：', this.opcityNum);
        return;
      } else {
        this.headerToolShow = false;
        return;
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
};
</script>

<style scoped lang="less">
.layout_header_wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 450px;
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
    .el-menu--horizontal {
      border-bottom: none!important;
    }
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
  }
}
</style>

<style lang="less">

// .el-menu--horizontal {
//   border-bottom: none!important;
//   .el-menu {
//     background-color: var(--el-bg-color);
//     .el-menu-item,
//     .el-submenu__title {
//       background-color: var(--el-bg-color);
//       float: none;
//       height: 36px;
//       line-height: 36px;
//       padding: 0 10px;
//       color: #909399;
//     }
//   }
// }
// .header_tool_wrapper{
//   .el-menu--horizontal {
//       background-color: var(--el-bg-color);
//       .el-menu-item {
//         &:hover{
//           // background-color: var(--el-bg-hover-color);
//           background-color: var(--el-bg-color)!important;
//         }
//       }
//       .el-submenu {
//         .el-submenu__title {
//           &:hover{
//             // background-color: var(--el-bg-hover-color)!important;
//             background-color: var(--el-bg-color);
//           }
//         }
//       }
//       .is-active {
//         // background-color: var(--el-bg-hover-color);
//         background-color: var(--el-bg-color);
//       }
//       .is-opened {
//         background-color: var(--el-bg-active-color)!important;
//       }
//   }
// }


</style>

