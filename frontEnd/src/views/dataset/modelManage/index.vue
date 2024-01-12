// dataset 图配置
<template>
  <div class="main_tab_wrapper">
    <div class="tool_wrapper">
      <div>模型列表</div>
      <el-button type="success" plain @click="handleClickAdd">新增模型</el-button>
    </div>
    <div class="table_wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="tableLoading"
      >

        <el-table-column
          type="index"
          label="序号"
          width="50"
        >
          <template slot-scope="scope">
            {{ (scope.$index + 1) + (pageSize * (currentPage - 1))}}
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="模型名称">
        </el-table-column>

        <el-table-column
          prop="description"
          label="模型简介"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="model_type"
          label="modelType">
        </el-table-column>

        <el-table-column
          label="nameSpace"
        >
          <template slot-scope="scope">
            <span>{{ getLabelByValue(nameSpaceList, scope.row.namespace_id) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="Graph"
        >
          <template slot-scope="scope">
            <span>{{ getLabelByValue(graphList, scope.row.graph_id) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="hyper_params"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ JSON.stringify(scope.row.hyper_params) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="数据描述"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ JSON.stringify(scope.row.data_description) }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          fixed="right"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClickEdit(scope.row)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click="handleClickDelete(scope.row)"
              type="text"
              size="small"
              style="color:red"
            >删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>

    <div v-if="listTotal > 1" class="pagelation-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal">
      </el-pagination>
    </div>


    <div class="sub_modale_wrapper" :class="dialogVisible ? 'sub_modale_show' : 'sub_modale_hide'">
      <AddModule
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        :defaultInfo="targetGraphInfo"
        :nameSpaceList="nameSpaceList"
        @closeAndReloadList="handleCloseAndReloadList"
      />
    </div>

  </div>
</template>
<script>
import AddModule from './addModule.vue'
export default {
  name: "modelManage",
  components: {
    AddModule
  },
  data() {
    return {
      tableLoading: false,
      dialogVisible: false,
      targetGraphInfo: {},
      userKeywords: '',
      tableData: [{name:'某个算法', id: '123'}],
      currentPage: 1,
      pageSize: 10,
      listTotal: 0,
      userRole: 2,
      targetUserId: '',
      nameSpaceList: [], // 所有的nameSpace
      graphList: []
    };
  },
  created() {},
  mounted() {
    this.getGraphList();
    this.getModelList();
    // const userInfoString = this.$commonUtils.getSessionItem("operatorInfo") || '{}';
    // const { userRole, userId } = JSON.parse(userInfoString);
    // this.targetUserId = userId;
    // this.userRole = userRole || 2;
    this.getNameSpaceList();
  },
  methods: {
    // 获取列表
    getModelList() {
      const params = {
        skip: (this.pageSize * (this.currentPage - 1)) || 0,
        limit: this.pageSize
      }
      this.tableLoading = true;
      this.$httpGet("getModelList", params)
        .then((res) => {
            this.tableData = res.models;
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

    // 获取列表
    getGraphList() {
      const params = {
        skip: 0,
        limit: 9999
      }
      this.tableLoading = true;
      this.$httpGet("getGraphList", params)
        .then((res) => {
            const newArr = res.graphs || [];
            const targetArr = [];
            newArr.forEach(el => {
              targetArr.push({
                label: el.name,
                value: el.id
              })
            })
            this.graphList = targetArr;
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

    // 新增用户
    handleClickAdd() {
      this.targetGraphInfo = {};
      this.dialogVisible = true;
    },

    handleCloseAndReloadList() {
      this.currentPage = 1;
      this.getModelList();
      this.dialogVisible = false;
    },


    // 编辑信息
    handleClickEdit(row) {
      this.targetGraphInfo = row;
      this.dialogVisible = true;
    },

    // 点击删除模型
    handleClickDelete (row) {
      this.$confirm(`是否确定删除模型：${row.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDModelGraph(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

    // 删除
    doDeleteModel(id) {
      this.$httpDelete("deleteGraph", {}, {}, {id})
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除完成。'
          });
          this.currentPage = 1;
          this.getGraphList();
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

    // 获取namespace下拉框数据
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

    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getRouterParams();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRouterParams();
    },

    getLabelByValue(arr, value) {
      const resultItem = arr.find(el => el.value === value);
      return resultItem?.label || '';
    }
  },
};
</script>

<style lang="less" scoped>
.main_tab_wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .tool_wrapper {
    flex-direction: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed #ddd;
    padding-bottom: 12px;
    .tool_input_wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }

  .table_wrapper {
    flex: 1;
    width: 100%;
    padding-top: 20px;
    overflow-y: auto;
  }
  .pagelation-wrapper {
    flex-shrink: 0;
    width: 100%;
    height: 56px;
    background-color: rgb(250, 250, 250);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sub_modale_wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background-color);
    z-index: 10;
    transition: 0.3s;
  }
  .sub_modale_show {
    top: 0;
  }
  .sub_modale_hide {
    top: 100%;
  }
}


</style>

