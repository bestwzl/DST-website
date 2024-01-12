// 列表展开的详情
<template>
  <div class="main_wrapper">
    <el-collapse>
      <el-collapse-item title="Params" name="Params">
        <template slot="title">
          <i class="el-icon-arrow-right"></i>
          <span style="margin-left: 10px;">Params</span>
        </template>
        <div class="detail_info_List">
          <div v-for="ele in paramsList" :key="ele.label" class="detail_info_item">
            <span class="detail_info_label">{{ ele.label }}:</span>
            <span class="detail_info_value">{{ ele.value }}</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Metrics" name="Metrics">
        <template slot="title">
          <i class="el-icon-arrow-right"></i>
          <span style="margin-left: 10px;">Metrics</span>
        </template>
        <div class="detail_info_List">
          <div v-for="ele in metricsList" :key="ele.label" class="detail_info_item detail_info_link">
            <span class="detail_info_label" @click="handleClickMetricItem(ele)">{{ ele.label }}:</span>
            <span class="detail_info_value">{{ ele.value }}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: "trainDetailInfo",
  props: {
    detailInfo: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      paramsList: [],
      metricsList: [],
    };
  },
  created() {},
  mounted() {
    const {params, metrics} = this.detailInfo;
    const paramsArr = [];
    const metricsArr = [];
    for (let key in params) {
      paramsArr.push({
        label: key,
        value: params[key]
      })
    }
    for (let key in metrics) {
      metricsArr.push({
        label: key,
        value: metrics[key]
      })
    }
    this.paramsList = paramsArr;
    this.metricsList = metricsArr;
  },
  methods: {
    handleClickMetricItem(ele){
      const params = {
        trainInfo: this.detailInfo,
        targetMetric: ele
      }
      this.$emit("handleCheckChart", params)
    }
  },
};
</script>

<style lang="less" scoped>
.main_wrapper {
  padding: 10px 30px;
}
.detail_info_List {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 30px;
  .detail_info_item {
    width: 50%;
    flex-shrink: 0;
    padding: 5px;
    .detail_info_label {
      color: #000;
      font-weight: 600;
      margin-right: 12px;
    }
  }
  .detail_info_link {
    .detail_info_label {
      cursor: pointer;
      color: #009fff;
    }
  }
}

</style>

<style>
  .el-collapse-item__arrow {
    display: none;
  }
</style>
