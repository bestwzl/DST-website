// 我的服务
<template>
  <div :class="topOpen ? 'process_list_wrapper' : 'process_list_wrapper_hide'">
    <div
      v-for="el in dataList"
      :key="el.title"
      class="process_item"
    >
      <p class="process_item_title">{{ el.title }}</p>
      <p class="process_item_subtitle">{{ el.value || '--' }}</p>
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
    serverInfo: {
      type: Array,
      required: false,
      default: () => false
    },
  },
  data() {
    return {
      dataList: this.serverInfo,
    };
  },
  created() {},
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="less" scoped>

.process_list_wrapper {
  height: 100px;
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
  .process_item{
    flex: 1;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    .process_item_title {
      text-align: center;
      padding: 10px 0;
      font-size: 18px;
      color: var(--font-color-1);
    }
    .process_item_subtitle {
      text-align: center;
      padding: 10px 0;
      font-size: 30px;
      color: rgb(252, 162, 36);
    }

  }
}
</style>
