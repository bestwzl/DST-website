// dataset 数据管理
<template>
  <div class="dataManageWrapper">
    <el-card class="box-card">
      <div slot="header" class="card_header_wrapper">
        <span style="font-size: 24px; font-weight: 600;">节点数据</span>
        <el-button type="text" @click="handleAddConfig('VERTEX')">新增节点数据</el-button>
      </div>
      <TableList ref="card_VERTEX" dataType='VERTEX' />
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="card_header_wrapper">
        <span style="font-size: 24px; font-weight: 600;">边数据</span>
        <el-button type="text" @click="handleAddConfig('EDGE')">新增边数据</el-button>
      </div>
      <TableList ref="card_EDGE" dataType='EDGE' />
    </el-card>

    <el-dialog
      :title="handleType === 'edit' ? '编辑图配置' : `新增图配置-${dataType}`"
      :visible.sync="dialogVisible"
      width="800px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <AddGraphConfig
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        :handleType="handleType"
        :dataType="dataType"
        :nameSpaceList="nameSpaceList"
        @closeAndReloadList="handleCloseAndReloadList"
      />
    </el-dialog>
  </div>
</template>
<script>
import TableList from './tableList.vue'
import AddGraphConfig from './addData.vue';
export default {
  name: 'dataManage',
  components: {
    TableList,
    AddGraphConfig
  },
  data() {
    return {
      handleType: 'add',
      dataType: '',
      dialogVisible: false,
      nameSpaceList: []
    };
  },
  created() {},
  mounted() {
    this.getNameSpaceList();
  },
  methods: {
    handleAddConfig(dataType) {
      this.handleType= 'add';
      this.dataType= dataType;
      this.dialogVisible= true;
    },

    handleCloseAndReloadList() {
      this.dialogVisible= false;
      this.$refs.card_VERTEX.getDataList();
      this.$refs.card_EDGE.getDataList();
    },

    getNameSpaceList() {
      const params = {
        skip: 0,
        limit: 9999
      }
      this.$httpGet("getServerList", params)
        .then((res) => {
            const nameList = res.namespaces;

            const nameSpaceOptions = [];

            nameList.forEach(ele => {
              nameSpaceOptions.push({
                label: ele.name,
                value: ele.id,
              })
            })

            this.nameSpaceList = nameSpaceOptions;
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

  },
};
</script>

<style lang="less" scoped>
.dataManageWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .box-card {
    width: 49%;
    display: flex;
    flex-direction: column;
    .card_header_wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    ::v-deep .el-card__body{
      height: 100%;
    }
  }
}
</style>
