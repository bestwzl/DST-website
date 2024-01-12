// 图表
<template>
  <div class="chart_module_dialog_wrapper">
    <div class="config_wrapper">
      <div class="form_item_wrapper">
        <p class="form_item_label">X轴：</p>
        <div class="form_item_content">
          <el-radio-group v-model="configForm.x_axis" @input="setChartOption">
            <el-radio label="step">Step</el-radio>
            <el-radio label="timestamp">Time</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="form_item_wrapper">
        <p class="form_item_label">Y轴：</p>
        <div class="form_item_content">
          <el-select
            v-model="configForm.y_axis"
            multiple
            placeholder="选择Y轴数据"
            style="width: 100%;"
            @change="getDetailInfo"
          >
            <el-option
              v-for="el in yAxisList"
              :key="el.value"
              :label="el.label"
              :value="el.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>

    <div class="content_wrapper">

      <div class="chart_dom" id="chartDomDialog"></div>

      <div class="table_dom">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'latest', order: 'descending'}"
          >
          <el-table-column
            prop="metricName"
            label="Metric">
          </el-table-column>
          <el-table-column
            prop="latest"
            label="Latest"
            sortable>
          </el-table-column>
          <el-table-column
            prop="min"
            label="Min"
            sortable>
          </el-table-column>
          <el-table-column
            prop="max"
            label="Max"
            sortable>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  name: "chartModule",
  props: {
    targetChart: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      configForm: {
        x_axis: 'step',
        y_axis: [],
      },
      metricDetailInfo: {}, // 详细信息
      yAxisList: [],
      tableData: [],

      myChart: null,

      option : {
        title: {
          text: '趋势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [], // 动态设置
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [], // 动态设置
        },
        yAxis: {
          type: 'value'
        },
        series: [], // 动态设置
      },
    };
  },
  created() {},
  mounted() {
    const {trainInfo, targetMetric} = this.targetChart;
    if (trainInfo) {
      const { metrics } = trainInfo;
      if ( metrics ) {
        const metricList = [];
        for(let key in metrics){
          metricList.push({
            label: key,
            value: key
          })
        }
        this.yAxisList = metricList
      }
    }
    if (targetMetric && targetMetric.label) {
      this.configForm.y_axis = [targetMetric.label]; // 多选的情况下
    }
    this.initChart();

    setTimeout(() => {
      this.getDetailInfo();
    }, 0)

  },
  methods: {
    initChart() {
      this.myChart = echarts.init(document.getElementById('chartDomDialog'));
    },

    getDetailInfo(){
      const { trainInfo } = this.targetChart;
      const {y_axis} = this.configForm;
      this.$httpPost('getMetricsDetail', {'metric_names': y_axis}, {}, { id: `${trainInfo.id}/metrics`})
        .then((res) => {
          this.metricDetailInfo = res || {};
          this.myChart && this.myChart.clear(this.option);
          this.setChartOption();
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error"
          })
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    // 配置模型数据
    setChartOption() {
      const {x_axis, y_axis} = this.configForm;
      const xAxisList = this.getAllXAxis();
      const seriesList = [];
      for(let key in this.metricDetailInfo){
        const xAxisData = [];
        const metrixItem = this.metricDetailInfo[key];
        xAxisList.forEach( item => {
          let target = ''
          metrixItem.forEach((element) => {
            if(element[x_axis] === item){
              target = element.value;
            }
          })
          xAxisData.push(target);
        })
        seriesList.push({
          name: key,
          type: 'line',
          stack: 'Total',
          data: xAxisData
        })
      }
      this.option.legend.data = y_axis;
      if (x_axis === 'timestamp') {
        this.option.xAxis.data = xAxisList.map(el=>this.$commonUtils.parseTime(el));
      } else {
        this.option.xAxis.data = xAxisList;
      }
      this.option.series = seriesList;
      this.setTableData(seriesList);
      this.myChart && this.myChart.setOption(this.option);
    },

    getAllXAxis(){
      const xAxisList = new Set();
      const { x_axis } = this.configForm;
      for(let key in this.metricDetailInfo){
        const metrixItem = this.metricDetailInfo[key];
        metrixItem.forEach((element) => {
          xAxisList.add(element[x_axis]);
        })
      }
      const result = [...xAxisList].sort((a, b)=> a - b);
      return result;
    },

    setTableData(seriesList) {
      const tableList = [];
      seriesList.forEach((item)=>{
        const { name, data } = item;
        const notEmptyList = this.getLatestItem(data);
        const arrCopy = JSON.parse(JSON.stringify(notEmptyList));
        const minMax = this.getMinOrMax(arrCopy);
        tableList.push({
          metricName: name,
          latest: notEmptyList[notEmptyList.length - 1],
          min: minMax[0],
          max: minMax[1]
        })
      })
      this.tableData = tableList;
    },

    getLatestItem(arr) {
      const newArr = [];
      arr.forEach(el => {
        if(el) {
          newArr.push(el)
        }
      });
      return newArr;
    },

    getMinOrMax(notEmptyList){
      const result = notEmptyList.sort((a, b)=> a - b);
      const min = result[0];
      const max = result[result.length - 1];
      return [min, max]
    }
  },
};
</script>

<style lang="less" scoped>
.chart_module_dialog_wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  .config_wrapper {
    width: 400px;
    box-sizing: border-box;
    border-right: 1px solid var(--border-color);
    margin-right: 20px;
    padding-right: 20px;
    .form_item_wrapper {
      margin-bottom: 50px;
      .form_item_label {
        margin-bottom: 10px;
      }
      .form_item_content {
        width: 100%;
      }
    }
  }
  .content_wrapper {
    flex: 1;
    .chart_dom {
      width: 100%;
      min-height: 500px;
    }
    .table_dom {
      margin-top: 30px;
      border-top: 1px solid var(--border-color);
    }
  }
}

</style>