// 开发流程
<template>
  <div :class="topOpen ? 'process_list_wrapper' : 'process_list_wrapper_hide'">
    <div
      v-for="(el, index) in dataList"
      :key="el.title"
      :class="index >= dataList.length - 1 ? 'process_item_last' : 'process_item' "
    >
      <div class="process_item_content" @click="handleLink(el)">
        <div class="process_item_img">
          <i :class="el.img"></i>
        </div>
        <div class="process_item_info">
          <p class="process_item_title">{{ el.title }}</p>
          <p class="process_item_subtitle">{{ el.subTitle }}</p>
        </div>
      </div>
      <div v-if="index < dataList.length - 1" class="process_item_arrow">
        <i class="el-icon-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    topOpen: {
      type: Boolean,
      required: false,
      default: () => false
    },
  },
  data() {
    return {
      dataList: [
        {
          path: '/overview',
          img: 'el-icon-c-scale-to-original',
          title: 'nameSpace',
          subTitle: '创建属于您的nameSpace'
        },
        {
          path: '/gruntime',
          img: 'el-icon-set-up',
          title: 'Session',
          subTitle: '创建您的Session'
        },
        {
          path: '/datamanage',
          img: 'el-icon-document-copy',
          title: '添加数据',
          subTitle: '添加您的节点数据和关系数据'
        },
        {
          path: '/graphconfig',
          img: 'el-icon-connection',
          title: '创建graph',
          subTitle: '自定义配置数据，创建新的graph'
        },
        {
          path: '/session',
          img: 'el-icon-upload',
          title: 'Load',
          subTitle: '载入您的session'
        },
      ],
    };
  },
  created() {},
  mounted() {

  },
  methods: {
    handleLink(path) {
      this.$router.push(path)
    },

  },
};
</script>

<style lang="less" scoped>

.process_list_wrapper {
  height: 120px;
  opacity: 1;
}

.process_list_wrapper_hide {
  height: 0;
  overflow: hidden;
  opacity: 0;
}

.process_list_wrapper_hide,
.process_list_wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  transition: 0.3s;
  .process_item,
  .process_item_last {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .process_item_content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        transform: scale(1.05);
      }
      .process_item_img {
        height: 100%;
        width: 120px;
        font-size: 80px;
        color: var(--font-color-4);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .process_item_info {
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .process_item_title {
          padding: 10px 0;
          font-size: 18px;
          color: var(--font-color-1);
        }
        .process_item_subtitle {
          padding: 10px 0;
          font-size: 12px;
          color: var(--font-color-3);
        }
      }
    }
  }
  .process_item{
    margin-right: 20px;

    .process_item_arrow {
      font-size: 40px;
      color: var(--font-color-4);
      width: 36px;
    }
  }
}
</style>
