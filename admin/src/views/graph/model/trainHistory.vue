// 训练模型
<template>
    <el-card class="train_history_wrapper" :class="openCard ? 'wrapper_open' : 'wrapper_normal'">
      <div slot="header" class="card_header">
        <span>训练记录</span>
        <span class="card_header_tool">
          <el-button v-if="tableData.length > 0" type="primary" plain icon="el-icon-refresh" size="mini" @click="handleRefresh">刷新</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="openCard = !openCard">{{ openCard ? '回位' : '展开' }}</el-button>
        </span>
      </div>
      <div>
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <TrainDetainInfo :detailInfo="props.row" @handleCheckChart="handleCheckChart"/>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="状态"
            width="180"
          >
            <template slot-scope="props">
              <span v-if="props.row.status === 'RUNNING'" style="color: #009fff;">运行中</span>
              <span v-else-if="props.row.status === 'FINISHED'" style="color: rgb(61, 216, 4);">完成</span>
              <span v-else-if="props.row.status === 'FAILED'" style="color: #ff9500;">失败</span>
              <span v-else>{{ props.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="开始训练时间"
            prop="start_time">
          </el-table-column>
          <el-table-column
            label="训练完成时间"
            prop="end_time">
          </el-table-column>
        </el-table>
      </div>
      <div v-if="targetChart.targetMetric" class="chart_wrapper" :class="showChartModel ? 'chart_wrapper_show' : ''">
        <TrainDetainChart :targetChart.sync="targetChart" />
      </div>
    </el-card>
</template>
<script>
import TrainDetainInfo from './trainDetailInfo.vue';
import TrainDetainChart from './trainDetailChart.vue';
export default {
  name: "trainHistory",
  components: {
    TrainDetainInfo,
    TrainDetainChart
  },
  props: {
    targetModelDetail: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      openCard: false,
      tableLoading: false,
      tableData: [],
      targetChart: {},
      showChartModel: false,
    };
  },
  watch: {
    "targetModelDetail": {
      handler(nVal) {
        const {id} = nVal;
        if(id){
          // console.log("选择的模型：：", nVal);
          this.getHistoryList();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleRefresh(){
      this.getHistoryList();
    },

    getHistoryList() {
      this.showChartModel = false;
      this.targetChart = {};
      const { id } = this.targetModelDetail;
      this.tableLoading = true;
      this.tableData = [];
      this.$httpGet('getTrainHistory', {}, {}, { id: `${id}/experiment`})
        .then((res) => {
          const tableList = res.runs || []
          tableList.forEach(element => {
            const {metrics} = element;
            const metricsArr = [];
            for(let key in metrics){
              metricsArr.push({
                label: key,
                value: metrics[key]
              })
            }
            element.metricList = metricsArr
          });
          this.tableData = tableList;
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

    handleCheckChart(row) {
      this.targetChart = {};
      this.targetChart = row;
      setTimeout(()=>{
        this.showChartModel = true;
      }, 0)
    },
  },
};
</script>

<style lang="less" scoped>
.train_history_wrapper {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  .card_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card_header_tool {
      display: flex;
      align-items: center;
    }
  }
}
.wrapper_open {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.wrapper_normal {
  position: relative;
}

.chart_wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(255, 0, 0, 0.2);
  transform: rotateY(90deg);
  transition: 0.5s;
}

.chart_wrapper_show {
  transform: rotateY(0deg);
}

@keyframes rotateShow {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(90deg);
  }
}
</style>
