// analyze
<template>
  <div class="taskItemWrapper">
    <div class="task-item_loading_wrapper">
      <el-tooltip
        v-if="targetTaskInfo.taskStatus === 'waiting'"
        class="item"
        effect="dark"
        content="点击可再次查询状态"
        placement="left"
      >
        <i
          class="el-icon-coffee-cup"
          @click="handleRestart"
          style="cursor: pointer;"
        ></i>
      </el-tooltip>

      <i v-else-if="targetTaskInfo.taskStatus === 'running'" class="el-icon-loading"></i>

      <i v-else-if="targetTaskInfo.taskStatus === 'error'" style="color: rgb(199, 59, 3);" class="el-icon-warning-outline"></i>

      <!-- <i v-else class="el-icon-success" style="color: green; cursor: pointer;" @click="innerDrawerVisible=true"></i> -->
      <i v-else class="el-icon-success" style="color: green; cursor: pointer;" @click="handleClickCheckResult"></i>
    </div>
    <div class="task-item_info_wrapper">
      <p class="item_info_box">
        <span class="item_info_label">session: </span>
        <span class="item_info_value">{{ getLabelByValue( sessionList, targetTaskInfo.session)  }}</span>
      </p>
      <p class="item_info_box">
        <span class="item_info_label">analyze: </span>
        <span class="item_info_value">{{ targetTaskInfo.analyze }}</span>
      </p>

      <div v-if="targetTaskInfo.taskStatus === 'waiting'" class="wait_mask_wrapper">
        <p>任务执行时间过长，请稍后刷新查看。</p>
        <p>喝杯咖啡，休息一下...</p>
      </div>
      <div class="request_num_wrapper">
        <el-tooltip
          class="item"
          effect="dark"
          content="查询次数"
          placement="top"
        >
          <span>{{ requestNum }}</span>
        </el-tooltip>
      </div>
    </div>
    <el-drawer
      :title="`${getLabelByValue( sessionList, targetTaskInfo.session)}-${targetTaskInfo.analyze}`"
      :append-to-body="true"
      :visible.sync="innerDrawerVisible"
    >
      <div v-if="innerTableData.length>0" style="padding: 0 20px 0;">
        <el-table
          :data="innerTableData"
          style="width: 100%"
        >
          <!-- <el-table-column
            prop="id"
            label="id">
            <template slot="header">
              <span style="font-weight: 700; font-size: 18px; color: var(--font-color-1);">ids</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="rank"
            label="pagerank">
            <template slot="header">
              <span style="font-weight: 700; font-size: 18px; color: var(--font-color-1);">pagerank</span>
            </template>
          </el-table-column> -->

          <el-table-column
            v-for="it in tableOptionList"
            :key="it.label"
            :prop="it.prop">
            <template slot="header">
              <span style="font-weight: 700; font-size: 18px; color: var(--font-color-1);">{{ it.label }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
   </el-drawer>
  </div>
</template>
<script>

export default {
  name: 'taskItem',
  props: {
    btnLoading: {
      type: Boolean,
      required: false
    },
    sessionList: {
      type: Array,
      required: false
    },
    taskInfo: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      requestNum: 1,
      targetTaskInfo: this.taskInfo,
      innerDrawerVisible: false,
      innerTableData: [],
      tableOptionList: []
    };
  },

  created() {},
  mounted() {
    const {session, analyze} = this.targetTaskInfo;
    session && analyze && this.getAnalyzeStatus(session, analyze);
  },
  methods: {
    handleRestart(){
      this.requestNum = 0;
      const {session, analyze} = this.targetTaskInfo;
      session && analyze && this.getAnalyzeStatus(session, analyze);
    },
    getAnalyzeStatus(session, analyze) {
      const timer = setInterval(() => {
        if (this.requestNum < 100) {
          this.$httpGet('runAnalyze', {'analyze_type': analyze}, {}, { id: `${session}/status`})
            .then((res) => {
              if (res.status !== 'running') {
                if (res.status === 'error') {
                  this.targetTaskInfo.taskStatus = 'error';
                } else{
                  this.targetTaskInfo.taskStatus = 'pending';
                }
                clearInterval(timer);
                this.innerTableData = JSON.parse(res.value || '[]') || [];
              } else {
                this.requestNum ++;
              }
            })
            .catch((err) => {
              this.requestNum ++;
              this.$message({
                message: err.message || "请求异常",
                type: "error",
              });
            });
        } else {
          this.targetTaskInfo.taskStatus = 'waiting';
          clearInterval(timer);
        }
      }, 1000)
    },

    handleClickCheckResult() {
      console.log("详细信息：", this.innerTableData)
      const targetObj = this.innerTableData[0] || {};
      const tableOption = [];
      for (let key in targetObj) {
        tableOption.push({
          prop: key,
          label:  key,
        })
      }
      this.tableOptionList = tableOption;
      this.innerDrawerVisible = true;


    },

    getLabelByValue(arr, value) {
      const target = arr.find(el => el.value === value);
      return target ? target.label : '';
    },
  },
};
</script>

<style lang="less" scoped>
.taskItemWrapper {
  height: 80px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  display: flex;
  transition: 0.5s;
  .task-item_loading_wrapper {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    background-color: var(--background-hover-color);
    opacity: 0.8;
  }
  .task-item_info_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    justify-content: space-evenly;
    padding-left: 12px;
    position: relative;
    .item_info_box {
      .item_info_label {
        font-weight: 500;
      }
      .item_info_value {
        font-size: 20px;
        color: #009fff;
      }
    }
    .wait_mask_wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ff8c00;
    }
    .request_num_wrapper {
      position: absolute;
      top: -10px;
      right: -10px;
      height: 18px;
      min-width: 16px;
      box-sizing: border-box;
      background-color: red;
      padding: 2px 5px;
      border-radius: 10px;
      font-size: 12px;
    }
  }

}
</style>
