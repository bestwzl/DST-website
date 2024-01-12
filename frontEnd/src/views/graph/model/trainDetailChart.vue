// 图表展示 metrics
<template>
  <div class="train_chart_wrapper">
    <div slot="header" class="card_header">
      <span>Metrics</span>
      <div class="card_header_tool">
        <el-button style="float: right; padding: 3px 0" type="text" @click="$emit('update:targetChart', {})">返回列表</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button style="float: right; padding: 3px 0" type="text" @click="openChart = !openChart">{{ openChart ? '回位' : '全屏' }}</el-button>
      </div>
    </div>

    <div class="train_chart_body_wrapper">
      <ChartModule :targetChart="targetChart"/>
    </div>

    <el-dialog
      title="Metrics"
      :visible.sync="openChart"
      width="90%"
      append-to-body
    >
      <ChartModuleDialog :targetChart="targetChart" />
    </el-dialog>
  </div>
</template>
<script>
import ChartModule from './chartModule.vue';
import ChartModuleDialog from './chartModuleDialog.vue';
export default {
  name: "trainDetailChart",
  components: {
    ChartModule,
    ChartModuleDialog
  },
  props: {
    targetChart: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      openChart: false,
      paramsList: [],
    };
  },
  created() {},
  mounted() {
    const {trainInfo, targetMetric} = this.targetChart;

  },
  methods: {

  },
};
</script>

<style lang="less" scoped>
.train_chart_wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  box-sizing: border-box;
  padding: 0 20px 20px;
  .card_header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
    .card_header_tool {
      display: flex;
      align-items: center;
    }
  }
  .train_chart_body_wrapper {
    width: 100%;
    height: calc(100% - 60px);
    box-sizing: border-box;
    padding-top: 20px;

  }
}

</style>