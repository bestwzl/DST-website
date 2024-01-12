// G-runtime
<template>
  <div class="runTimePageWrapper">
    <el-card style="margin-bottom: 20px;">
      <div slot="header" class="clearfix">
        <span style="font-size: 24px;">{{ moduleType === 'add' ? '新增 Session' : 'My Sessions' }}</span>
        <el-button v-if="moduleType === 'show'" type="text" @click="moduleType = 'add'" style="color: rgb(4, 216, 11);">新增</el-button>
        <span v-if="moduleType === 'add'">
          <el-button type="text" @click="handleClickCancel" style="color: rgb(227, 138, 4);" :loading="btnLoading">取消</el-button>
          <el-button type="text" @click="handleClickSave" :loading="btnLoading">保存</el-button>
        </span>
      </div>
      <CardModule
        v-if="moduleType === 'show'"
        :sessionList="sessionList"
        @handleChangeActive="handleChangeActiveItem"
        @handleCloseAndReloadList="getSessionList"
      />
    </el-card>

    <el-card class="session_content_wrapper" v-loading="btnLoading">
      <ConfigModule v-if="moduleType === 'show'" :targetActiveItem="activeItem" />
      <AddSession v-if="moduleType === 'add'" />
    </el-card>

  </div>
</template>
<script>
import CardModule from './info_card_module.vue';
import ConfigModule from './info_config_module.vue';
import AddSession from './add_session.vue';
export default {
  name: 'gRunTime',
  components: {
    CardModule,
    ConfigModule,
    AddSession
  },
  data() {
    return {
      btnLoading: false,
      moduleType: 'show',
      activeItem: {}, // 当前活跃的展示项
      sessionList: [],
    };
  },
  created() {},
  mounted() {
    this.getSessionList();
    this.$bus.on("handleAddSessionModuleClose", () => {
      this.btnLoading = false;
      this.moduleType ='show';
      this.getSessionList();
    });
  },
  beforeDestroy() {
    this.$bus.off('handleAddSessionModuleClose');
  },
  methods: {
    handleClickCancel(){
      this.moduleType = 'show';
      this.handleChangeActiveItem(0);
    },
    handleClickSave() {
      this.btnLoading = true;
      this.$bus.emit("handleSaveSessionBtn");
    },

    // 获取session列表
    getSessionList(){
      const params = {
        skip: 0,
        limit: 999
      }
      this.$httpGet("getSessionList", params)
        .then((res) => {
            // console.log('请求结果：：：：：', res);
            this.sessionList = res.sessions;
            this.handleChangeActiveItem(0);
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

    handleChangeActiveItem(index) {
      this.activeItem = this.sessionList[index];
    },

  },
};
</script>

<style lang="less" scoped>
.runTimePageWrapper {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .clearfix {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cardWrapperShow {
    height: auto;
  }
  .cardWrapperHide {
    overflow: hidden;
    height: 0;
  }
  .session_content_wrapper {
    flex: 1;
    width: 100%;
    ::v-deep .el-card__body {
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
