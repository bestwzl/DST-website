// 新增 Session
<template>
  <div class="add_item_wrapper">
    <div class="item_title">{{ title }}</div>
    <div class="item_config">
      <div class="item_request">
        <p class="item_label">CPU_request</p>
        <p class="item_value">{{ cpuRequest }}</p>
      </div>
      <div class="item_limit">
        <p class="item_label">CPU_limit</p>
        <p class="item_value">{{ cpuLimit }}</p>
      </div>
      <div class="item_request">
        <p class="item_label">Memory_request</p>
        <p class="item_value">{{ memoryRequest }}</p>
      </div>
      <div class="item_limit" style="border-bottom: none;">
        <p class="item_label">Memory_limit</p>
        <p class="item_value">{{ memoryLimit }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'infoItem',
  props: {
    title: {
      type: String,
      required: false,
    },
    cpuRequest: {
      type: Number,
      required: false,
    },
    cpuLimit: {
      type: Number,
      required: false,
    },
    memoryRequest: {
      type: Number,
      required: false,
    },
    memoryLimit: {
      type: Number,
      required: false,
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="less" scoped>
.add_item_wrapper {
  width: 100%;
  border: 1px solid var(--border-color);
  margin-bottom: 30px;
  border-radius: 4px;
  box-sizing: border-box;
  transition: 0.3s;
  &:hover {
    // transform: scale(1.03);
    .item_title {
      background-color:rgb(233, 255, 244);
    }
  }
  .item_title {
    height: 41px;
    line-height: 40px;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    // background-color: var(--theme-color-1);
    background-color:rgb(233, 248, 255);
    border-bottom: 1px solid var(--border-color);
  }
  .item_config {
    .item_request,
    .item_limit {
      height: 36px;
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      .item_label {
        height: 100%;
        width: 150px;
        text-align: center;
        line-height: 40px;
        border-right: 1px solid var(--border-color);
      }
      .item_value {
        flex: 1;
        height: 100%;
        line-height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
  }

}
</style>
