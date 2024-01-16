// 首页配置
<template>
  <div class="home_conf_wrapper">
    <el-card class="top_card">
      <div class="home_module_list">
        <div
          v-for="item in moduleList"
          :key="item.label"
          class="item_box"
        >
          <div
            class="module_name"
            :class="item.isShow ? 'item_normal' : 'item_disabled'"
            @click="handleClickItem(item)"
          >
            {{ item.label }}
          </div>

          <div class="nodule_btn">
            <span
              :style="{color: `${item.isShow ? 'rgb(255, 89, 0)' : 'green'}`, fontSize: '12px'}"
              @click="item.isShow = !item.isShow"
            > {{ item.isShow ? '不展示' : '展示' }} </span>
          </div>
        </div>
      </div>
    </el-card>

    <BannerConf id="bannerDom"/>
  </div>
</template>
<script>
import BannerConf from './bannerConf.vue'
export default {
  components: {
    BannerConf
  },

  data() {
    return {
      moduleList: [
        { label: '轮播图', ref: 'bannerDom', isShow: true },
      ],
    };
  },

  mounted() {

  },

  methods: {
    handleClickItem(item) {
      alert(item.ref)

      const element = document.getElementById(item); // 根据元素ID来选择元素
      // 调用 scrollIntoView() 函数进行滚动操作
      element.scrollIntoView();
    }
  },
};
</script>

<style scoped lang="less">
.home_conf_wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  .top_card {
    margin-bottom: 20px;
    .home_module_list {
      width: 100%;
      overflow-y: hidden;
      overflow-x: auto;
      display: flex;
      .item_box {
        flex-shrink: 0;
        margin-right: 20px;
        width: fit-content;
        border: 1px solid #ccc;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        .module_name {
          height: 80px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .nodule_btn {
          width: 100%;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px dashed #ccc;
          box-sizing: border-box;
        }
      }

      .item_disabled {
        background-color: #ccc;
        opacity: 0.5;
      }
    }
  }
}
</style>

