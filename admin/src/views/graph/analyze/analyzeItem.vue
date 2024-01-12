// analyze
<template>
  <div class="analyzePageWrapper">
    <div
      class="analyze_item_wrapper"
      :class="el.id === targetAnalyzeDetail.id ? 'item_avtive' : el.disabled ? 'item_disabled' : 'item_normal'"
    >
      {{ el.label }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'analyzeItem',
  props: {
    taskStackList: {
      type: Array,
      required: false
    },
    analyzeInfo: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      btnLoading: false,
    };
  },
  watch: {
      "taskStackList": {
        handler(nVal){
          nVal && nVal.length > 0 && this.checkIsInRunning(nVal);
        },
        deep: true,
        immediate: true,
      }
  },
  created() {},
  mounted() {},
  methods: {
    // 检测是否在运行中，以添加遮罩
    checkIsInRunning(taskList) {
    },
  },
};
</script>

<style lang="less" scoped>
  .analyze_item_wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    transition: 0.5s;
  }
  .item_normal {
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    cursor: pointer;
    &:hover{
      // transform: scale(1.03);
      width: calc(100% + 15px);
    }
  }
  .item_disabled {
    background-color: rgb(238, 238, 238);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    opacity: 0.8;
    user-select: none;
    cursor: not-allowed;
  }

  .item_avtive {
    border: 1px solid #009fff;
    box-shadow: 0 2px 12px 0 #008ee05e;
    // transform: scale(1.03);
    width: calc(100% + 15px);
  }
</style>

