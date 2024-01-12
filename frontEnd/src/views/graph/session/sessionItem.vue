// session管理
<template>
  <div class="session_item_wrapper" :class="isAvtive ? 'item_avtive' : 'item_normal'">
    <div class="session_info_item" @click="handleChangeSession">
      <p class="session_info_label">session：</p>
      <p class="session_info_value">{{ targetSession.session }}</p>
    </div>
    <div class="session_info_item" @click="handleChangeSession">
      <p class="session_info_label"> graph：</p>
      <p class="session_info_value">
        <span v-if="targetSession.status==='normal'">{{ getLabelByValue(allGraphList, targetSession.graph) || targetSession.graph  }}</span>
        <el-select v-if="targetSession.status==='edit'" v-model="targetSession.graph" placeholder="请选择图">
          <el-option
            v-for="item in allGraphList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </p>
    </div>

    <div class="tool_btn_wrapper ">
      <el-button
        v-if="targetSession.status==='normal' && targetSession.graph"
        type="text"
        size="small"
        @click="handleClickLoad(targetSession)"
      >载入</el-button>

      <el-button
        v-if="targetSession.status==='normal' && targetSession.graph"
        type="text"
        size="small"
        style="color:rgb(251, 128, 13)"
        :loading="configureBtnLoading"
        @click="targetSession.status='edit'"
      >编辑</el-button>

      <el-button
        v-if="targetSession.status==='edit'"
        :loading="saveBtnLoading"
        type="text"
        size="small"
        style="color: rgb(5, 238, 36);"
        @click="handleClickSave(targetSession)"
      >保存</el-button>

      <el-button
        v-if="targetSession.status==='edit'"
        :loading="saveBtnLoading"
        type="text"
        size="small"
        style="color: rgb(238, 153, 5);"
        @click="targetSession.status='normal'"
      >取消</el-button>

      <el-button
        v-if="targetSession.status==='normal' && !targetSession.graph"
        type="text"
        size="small"
        style="color:rgb(251, 128, 13)"
        :loading="configureBtnLoading"
        @click="targetSession.status='edit'"
      >配置图</el-button>
    </div>

    <div v-if="itemInfo.load_status === 'RUNNING'" class="loading_wrapper">
    <!-- <div v-if="itemInfo.load_status === 'PENDING'" class="loading_wrapper"> -->
      <p><i class="el-icon-loading"></i></p>
      <p>模型正在载入中</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "sessionItem",
  components: {},
  props: {
    itemInfo: {
      type: Object,
      required: false
    },
    allGraphList: {
      type: Array,
      required: false
    },
    isAvtive: {
      type: Boolean,
      required: false
    },
  },
  data() {
    return {
      loadLing: false, // 加载图loading
      saveBtnLoading: false,
      configureBtnLoading: false, // 配置图｜编辑图 的loading
      targetSession: this.itemInfo
    };
  },
  created() {},
  mounted() {
    const { load_status } = this.itemInfo;
    if (load_status === 'RUNNING') {
      this.getSessionStatus(this.itemInfo)
    }
  },
  methods: {

    // 点击载入
    handleClickLoad(row) {
      const {id} = row;
      this.$httpGet('putSessionGraph', {}, {}, { id: `${id}/load`})
        .then((res) => {
          row.load_status = 'RUNNING';
          this.getSessionStatus(row);
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

    // // 配置图或者编辑图
    handleClickSave(row) {
      const {id, graph} = row;
      this.saveBtnLoading = true;
      this.$httpPut('putSessionGraph', { gid: graph }, {}, { id })
        .then((res) => {
          // console.log("编辑后的结果：：：", res)
          this.$emit("handleChange", res);
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        })
        .finally(() => {
          row.status = 'normal';
          this.saveBtnLoading = false;
        });
    },

    getSessionStatus(row) {
      const {id} = row;
      const timer = setInterval(() => {
        this.$httpGet('putSessionGraph', {}, {}, { id: `${id}/load/status`})
        .then((res) => {
          if (res.status !== 'running') {
            row.load_status = 'PENDING';
            clearInterval(timer);
          }
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
      }, 1000)
    },

    getLabelByValue(arr, value) {
      const target = arr.find(el => el.value === value);
      return target ? target.label : '';
    },

    handleChangeSession(){
      this.$emit("handleChange", this.targetSession);
    }

  },
};
</script>

<style lang="less" scoped>

  .item_normal {
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    &:hover{
      transform: scale(1.03);
    }
  }
  .item_avtive {
    border: 1px solid #009fff;
    box-shadow: 0 2px 12px 0 #008ee05e;
    transform: scale(1.03);
  }
  .session_item_wrapper {
    position: relative;
    width: 100%;
    min-width: 280px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-radius: 8px;
    transition: 0.5s;
    .session_info_item {
      display: flex;
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px dashed var(--border-color);
      padding: 0 12px;
      cursor: pointer;
    }
    .tool_btn_wrapper {
      display: flex;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border-bottom: 1px dashed var(--border-color);
      padding: 0 12px;
    }

    .loading_wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      font-size: 18px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-color: rgba(0, 0, 0, .3);
      cursor: not-allowed;
    }
  }


</style>
