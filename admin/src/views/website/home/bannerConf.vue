// 首页配置
<template>
  <div class="banner_conf_wrapper">
    <el-card v-loading="cardLoading">
      <div slot="header" class="card_header">
        <span>轮播图配置</span>
        <div>
          <el-button type="success" icon="el-icon-plus" @click="handleClickAdd">新增</el-button>
          <el-button  type="text" @click="isOpen = !isOpen">
            <span>{{ isOpen ? '收起' : '展开' }}</span>
            <i :class="isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
          </el-button>
        </div>
      </div>

      <div class="card_list_wrapper" :class="isOpen ? 'card_show' : 'card_hide'">
        <div v-for="(item, index) in bannerList" :key="`${index}_${item.backGroundUrl}`" class="img_card" >
            <div class="card_left"> <span>{{ index+1 }}</span> </div>
            <div class="card_content">
              <div class="card_img">
                <el-image
                  style="width: 100%; height: auto"
                  :src="item.backGroundUrl"
                  :preview-src-list="[item.backGroundUrl]">
                </el-image>
              </div>
            </div>
            <div class="card_info">
              <p class="card_title">
                <span style="font-weight: 600;">标题：</span>
                {{ item.title }}
              </p>
              <p class="card_subTitle">
                <span style="font-weight: 600;">副标题：</span>
                {{ item.subTitle }}
              </p>
              <p class="card_desc">
                <span style="font-weight: 600;">描述标题：</span>
                {{ item.desc }}
              </p>
              <p class="card_link">
                <span style="color: #000; font-weight: 600;">跳转链接：</span>
                {{ item.link }}
              </p>
            </div>

            <div class="card_tool">
              <el-button type="text" @click="handleClickEdit(item)">编辑</el-button>
              <el-button type="text" style="color: rgb(255, 89, 0);"  @click="handleClickDelete(item)">删除</el-button>
            </div>
          </div>
      </div>
    </el-card>

    <el-dialog
      :title="`${handleType==='add' ? '新增':'修改'}轮播图`"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="800px"
    >
      <AddBanner
        v-if="dialogVisible"
        :handleType="handleType"
        :targetBanner="targetBanner"
        @closeAndRefreshList="closeAndRefreshList"
      />
    </el-dialog>
  </div>
</template>
<script>
import AddBanner from './addBanner.vue'
export default {
  components: {
    AddBanner
  },

  data() {
    return {
      dialogVisible: false,
      isOpen: true,
      handleType: 'add',
      targetBanner: {},
      bannerList: [],
      bannerListApi: [
        {
            id: 5001,
            backGroundType: 'img', // img, color, video
            backGroundUrl: 'https://img1.pconline.com.cn/piclib/200901/03/batch/1/20508/1230998863053xr0fs0rlo1.jpg', // 背景图片/视屏地址 ｜ 纯色的颜色
            title: '这是一级标题', // 标题
            subTitle: '这里是二级标题，文字多一些', // 二级标题
            desc: '这里是简单的描述文案，文字会更多一些，更多一些，更多一些', // 描述文案
            link: 'https://www.baidu.com' // 跳转链接
        },
        {
            id: 5002,
            backGroundType: 'img',
            backGroundUrl: 'https://www.sketchupbar.com/data/attachment/forum/201104/05/214753o73biezon08fj3bu.jpg',
            title: '智慧城市',
            subTitle: '用数据打造智慧城市',
            desc: '运用我们成熟的大数据技术，协助打造科技型的智慧城市',
            link: 'https://www.JD.com'
        },
        {
            id: 5003,
            backGroundType: 'img',
            backGroundUrl: 'https://img1.pconline.com.cn/piclib/200901/03/batch/1/20508/1230998863053zrfuw2fqnd.jpg',
            title: '环境与生态',
            subTitle: '智能数据监测',
            desc: '这里是一段文字描述，不知道该写什么，就是一段相对较长的文案',
            link: 'https://www.taobao.com'
        },
        {
            id: 5004,
            backGroundType: 'img',
            backGroundUrl: 'https://b.zol-img.com.cn/soft/6/616/ceHlJ6dRjw6H.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            id: 5005,
            backGroundType: 'img',
            backGroundUrl: 'https://img0.baidu.com/it/u=3995006546,2760268670&fm=253&fmt=auto&app=138&f=JPEG?w=1563&h=500',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            id: 5006,
            backGroundType: 'img',
            backGroundUrl: 'https://img0.baidu.com/it/u=1960276615,4184663836&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            id: 5007,
            backGroundType: 'img',
            backGroundUrl: 'https://img1.pconline.com.cn/piclib/200901/03/batch/1/20508/1230998863053bnorgfxvrk.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            id: 5008,
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
    this.getBannerList();
  },

  methods: {
    // 获取banner列表
    getBannerList() {
      this.bannerList = [];
      this.cardLoading = true;
      // this.$httpPost("getBannerList")
      //   .then((res) => {
      //     this.bannerList = [];
      //   })
      //   .catch((err) => {
      //     this.$message({
      //       message: err.message || "请求异常",
      //       type: "error",
      //     });
      //   })
      //   .finally(() => {
      //     this.cardLoading = false;
      //   });

      setTimeout(() => {
        this.bannerList = this.bannerListApi;
        this.cardLoading = false;
      }, 1000)
    },

    // 新增
    handleClickAdd() {
      this.handleType='add';
      this.targetBanner = {};
      this.dialogVisible = true;
    },

    // 编辑
    handleClickEdit(row) {
      this.handleType='edit';
      this.targetBanner = row;
      this.dialogVisible = true;
    },

    handleClickDelete(row) {
      this.$confirm('您正在删除该轮播图, 是否继续?', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$httpPost("deleteBanner", {id: row.id})
          .then((res) => {
            this.$message({
              type: 'success',
              message: '已删除'
            });
            this.getBannerList();
          })
          .catch((err) => {
            this.$message({
              message: err.message || "请求异常",
              type: "error",
            });
          })
          .finally(() => {
            this.cardLoading = false;
          });
      });
    },

    // 关闭窗口并刷新列表
    closeAndRefreshList(){
      this.targetBanner = {};
      this.dialogVisible = false;
      this.getBannerList();
      this.isOpen = true;
    },
  },
};
</script>

<style scoped lang="less">
.banner_conf_wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  .card_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card_list_wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .card_show {
    height: 100%;
  }
  .card_hide {
    height: 0;
  }
  .img_card {
    width: 100%;
    height: 240px;
    display: flex;
    border: 1px solid #ccc;
    margin-bottom: 30px;
    border-radius: 10px 0 0 10px;
    overflow: hidden;
    box-sizing: border-box;
    transition: 0.6s;
    &:hover {
      transform: scale(0.98);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
      border: 1px solid #02ab48;
      .card_tool {
        transform: translateX(0px);
      }
    }
    .card_left {
      width: 50px;
      background-color: #e7eafe;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      border-right: 2px dashed rgb(158, 158, 158);
      cursor: move;
    }
    .card_content {
      height: 100%;
      width: 500px;
      padding: 10px;
      border-right: 2px dashed rgb(158, 158, 158);
      box-sizing: border-box;
      .card_img {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
    .card_info {
      padding: 0px 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: self-start;
      justify-content: space-evenly;
      .card_title {
        font-size: 30px;
      }
      .card_subTitle {
        font-size: 20px;
      }
      .card_desc {
        font-size: 16px;
      }

      .card_link {
        color: #009fff;
        font-size: 16px;
      }
    }
    .card_tool {
      transform: translateX(100px);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      border-left: 1px dashed #ccc;
      transition: 0.6s;
      .el-button {
        margin: 0;
      }
    }
  }
}
</style>

