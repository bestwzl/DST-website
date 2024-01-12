// 训练模型
<template>
  <div class="train_detail_wrapper">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="train_info_item">
            <span class="train_info_label">Session：</span>
            <span class="train_info_value">{{ sessionInfo.name }}</span>
            <span v-if="sessionInfo.id" class="train_info_value_id">(id：{{ sessionInfo.id }})</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p class="train_info_item">
            <span class="train_info_label">模型名称：</span>
            <span class="train_info_value">{{ targetModelDetail.name }}</span>
          </p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <p class="train_info_item">
            <span class="train_info_label">模型描述：</span>
            <span class="train_info_value">{{
              targetModelDetail.description
            }}</span>
          </p></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="train_info_item">
            <span class="train_info_label">Graph：</span>
            <span class="train_info_value">{{
              targetModelDetail.graph_id
            }}</span>
            <span  v-if="targetModelDetail.graph_id" class="train_info_value_id"
              >(id：{{ targetModelDetail.graph_id }})</span
            >
          </p>
        </el-col>
        <el-col :span="12">
          <p class="train_info_item">
            <span class="train_info_label">NameSpace：</span>
            <span class="train_info_value">{{
              targetModelDetail.namespace_id
            }}</span>
            <span v-if="targetModelDetail.namespace_id" class="train_info_value_id"
              >(id：{{ targetModelDetail.namespace_id }})</span
            >
          </p>
        </el-col>
      </el-row>

      <div class="train_start_btn_wrapper">
        <el-button
          type="primary"
          style="width: 100%"
          :disabled="!sessionInfo.id || !targetModelDetail.id"
          :loading="startModelBtnLoading"
          @click="handleStartTrainModel"
          >开始训练</el-button
        >
      </div>
    </el-card>

    <el-card v-if="stepVisiable" class="box-card">
      <el-steps :active="stepActive">
        <el-step
          title="准备"
          description="配置图和模型"
          :icon="stepActive === 0 && startModelBtnLoading ? 'el-icon-loading' : 'el-icon-connection'"
        ></el-step>
        <el-step
          title="启动"
          description="启动训练任务"
          :icon="stepActive === 1 && startModelBtnLoading ? 'el-icon-loading' : 'el-icon-switch-button'"
        ></el-step>
        <el-step
          title="初始化"
          description="任务初始化"
          :icon="stepActive === 2 && startModelBtnLoading ? 'el-icon-loading' : 'el-icon-data-analysis'"
        ></el-step>
        <el-step
          title="实例化"
          description="实例化模型"
          :icon="stepActive === 3 && startModelBtnLoading ? 'el-icon-loading' : 'el-icon-document-copy'"
        ></el-step>
        <el-step
          title="训练"
          description="模型训练中"
          :icon="stepActive === 4 && startModelBtnLoading ? 'el-icon-loading' : 'el-icon-cpu'"
        ></el-step>
      </el-steps>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "formItem",
  props: {
    sessionInfo: {
      type: Object,
      required: false,
    },
    targetModelDetail: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      stepActive: 5,
      stepVisiable: false,
      startModelBtnLoading: false,
      trainName: '',
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 点击开始训练按钮
    handleStartTrainModel() {
      this.$prompt('请为本次训练起一个伟大的名字。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.trainName = value;
        this.configureSessionWithMid(this.targetModelDetail.id, this.sessionInfo.id);
        this.stepVisiable = true;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消训练'
        });
      });
    },

    // 步骤1，给session配置model
    configureSessionWithMid(mid, sessionId) {
      this.startModelBtnLoading = true;
      this.$httpPut("putSessionGraph", { mid }, {}, { 'id': sessionId})
        .then((res) => {
          this.stepActive = 1;
          this.modelStart(sessionId);
        })
        .catch((err) => {
          this.startModelBtnLoading = false;
          this.$message({
            message: err.message || "请求异常",
            type: "error"
          })
        });
    },

    // 步骤2，start
    modelStart(id) {
      this.$httpGet('runModel', {}, {}, { id: `${id}/start`})
        .then((res) => {
          this.stepActive = 2;
          this.modelInit(id);
        })
        .catch((err) => {
          this.startModelBtnLoading = false;
          this.$message({
            message: err.message || "请求异常",
            type: "error"
          })
        });
    },

    // 步骤3，init
    modelInit(id) {
      this.$httpGet('runModel', {}, {}, { id: `${id}/init`})
        .then((res) => {
          this.stepActive = 3;
          this.modelInstance(id);
        })
        .catch((err) => {
          this.startModelBtnLoading = false;
          this.$message({
            message: err.message || "请求异常",
            type: "error"
          })
        });
    },

    // 步骤4，instance
    modelInstance(id) {
      this.$httpGet('runModel', {}, {}, { id: `${id}/instance`})
        .then((res) => {
          this.stepActive = 4;
          this.modelTrain(id);
        })
        .catch((err) => {
          this.startModelBtnLoading = false;
          this.$message({
            message: err.message || "请求异常",
            type: "error"
          })
        });
    },

    // 步骤5，train
    modelTrain(id) {
      this.$httpPost('runModel', {run_name: this.trainName}, {}, { id: `${id}/train`})
        .then((res) => {
          this.modelTrainStatus(id);
        })
        .catch((err) => {
          this.startModelBtnLoading = false;
          this.$message({
            message: err.message || "请求异常",
            type: "error"
          })
        });
    },

    // 轮询状态
    modelTrainStatus(id) {
      const timer = setInterval(() => {
        this.$httpGet('runModel', {}, {}, { id: `${id}/train/status`})
          .then((res) => {
            if (res.status !== 'running') {
              this.stepActive = 5;
              this.startModelBtnLoading = false;
              clearInterval(timer);
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
      }, 2000)
    },
  },
};
</script>

<style lang="less" scoped>
.train_detail_wrapper {
  .box-card {
    margin-bottom: 20px;
  }
  .train_start_btn_wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .train_info_item {
    margin: 5px 0;
    .train_info_label {
      font-weight: 16px;
      color: var(--font-color-2);
    }
    .train_info_value {
      color: var(--font-color-1);
    }
    .train_info_value_id {
      color: #009fff;
      margin-left: 10px;
      font-weight: 600;
      font-size: 14px;
    }
  }
}
</style>
