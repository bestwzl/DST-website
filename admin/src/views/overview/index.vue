// 概览
<template>
  <div class="overview-wrapper">
    <el-card class="box-card-top">
      <div class="card-title-wrapper">
        <p class="card-title">开发流程</p>
        <el-button type="text" @click="topOpen = !topOpen">
          <span style="margin-right: 5px;">{{ topOpen ? '收起' : '展开' }}</span>
          <i :class="topOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </el-button>
      </div>
      <Process :topOpen="topOpen"/>
    </el-card>

    <el-card class="box-card-top">
      <div class="card-title-wrapper">
        <p class="card-title">我的空间</p>
        <p>
          <el-button v-if="namespaceInfo.name && +targetUserInfo.userRole === 1" type="text" @click="handleClickEdit">
            <i class="el-icon-setting"></i>
            <span style="margin-right: 5px;">编辑</span>
          </el-button>

          <el-button v-if="+targetUserInfo.userRole === 1" type="text" @click="getMore">
            <i class="el-icon-search"></i>
            <span style="margin-right: 5px;">查看更多</span>
          </el-button>

          <el-button type="text" @click="myServerOpen = !myServerOpen">
            <span style="margin-right: 5px;">{{ myServerOpen ? '收起' : '展开' }}</span>
            <i :class="myServerOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
          </el-button>
        </p>
      </div>

      <MyServers v-if="namespaceInfo.name" :topOpen="myServerOpen" :serverInfo="serverInfo" />

      <div v-else :topOpen="myServerOpen" :serverInfo="serverInfo">
        <span style="color: red; margin-right: 30px;">您尚未添加您的nameSpaces</span>
        <el-button v-if="+targetUserInfo.userRole === 1" type="text" @click="handleClickAdd">
          <i class="el-icon-circle-plus-outline"></i>
          <span style="margin-right: 5px;">立即添加</span>
        </el-button>
      </div>
    </el-card>

    <el-card class="box-card-content">
      <div class="card-title-wrapper" style="padding-bottom: 20px;">
        <p class="card-title">统计</p>
      </div>
      <Kanban />
    </el-card>

    <el-dialog
      :title="handleType === 'edit' ? '编辑服务信息' : '新增服务'"
      :visible.sync="dialogVisible"
      width="800px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <AddNameSpace
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        :namespaceInfo="namespaceInfo"
        :targetUserInfo="targetUserInfo"
        :handleType="handleType"
        @closeAndReloadList="handleCloseAndReloadList"
      />
    </el-dialog>
  </div>
</template>
<script>
import Process from './process.vue';
import MyServers from './myServers.vue';
import Kanban from './kanban/index.vue';
import AddNameSpace from './AddNameSpace.vue';
export default {
  name: "overView",
  components: {
    Process,
    MyServers,
    Kanban,
    AddNameSpace
  },
  data() {
    return {
      topOpen: true,
      myServerOpen: true,
      dialogVisible: false,
      handleType: 'add',
      namespaceInfo: {},
      targetUserInfo: {},
      serverInfo: [
        {title: 'name',value: ''},
        {title: 'pod_cpu_limit',value: 0},
        {title: 'cpu_limit',value: 0},
        {title: 'pod_memory_limit',value: 0},
        {title: 'memory_limit',value: 0},
      ]
    };
  },
  created() {},
  mounted() {
    const userInfoString = this.$commonUtils.getSessionItem("operatorInfo") || '{}';
    this.targetUserInfo = JSON.parse(userInfoString);
    this.getMyNameSpace();
  },
  methods: {
    getMyNameSpace() {
      this.$httpGet("getNameSpaceByUserId")
        .then((res) => {
            // console.log("namespace:::::", res);
            this.namespaceInfo = res;
            this.serverInfo.forEach(ele => {
              ele.value = res[ele.title] || '';
            })
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    // 添加服务
    handleClickAdd() {
      this.handleType = 'add';
      this.dialogVisible = true;
    },

    // 编辑nameSpaces
    handleClickEdit() {
      this.handleType = 'edit';
      this.dialogVisible = true;
    },

    // 查看更多
    getMore() {
      this.$router.push('/moreserver')
    },

    handleCloseAndReloadList() {
      this.dialogVisible = false;
      this.getMyNameSpace();
    },

  },
};
</script>

<style lang="less" scoped>
.overview-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .box-card-top{
    margin-bottom: 30px;
    flex-shrink: 0;
    background-color: var(--background-color);
    border-color: var(--border-color);
    ::v-deep .el-card__body {
      box-sizing: border-box;
      height: 100%;
    }
  }
  .box-card-content {
    flex: 1;
    overflow-y: auto;
    background-color: var(--background-color);
    border-color: var(--border-color);
    ::v-deep .el-card__body {
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }
  }

  .card-title-wrapper {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
    .card-title {
      height: 30px;
      font-size: 20px;
      font-weight: 600;
      color: var(--font-color-1);
    }
  }
}
</style>
