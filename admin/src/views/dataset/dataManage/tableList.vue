// dataset 数据管理
<template>
  <div class="tableListWrapper">
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        tooltip-effect="dark"
        style="width: 100%"
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
          label="文件名称">
        </el-table-column>

        <el-table-column
          prop="uri"
          label="文件地址"
          show-overflow-tooltip>
        </el-table-column>

        <!-- <el-table-column
          prop="file_type"
          label="文件格式">
        </el-table-column>

        <el-table-column
          prop="compress_type"
          label="文件类型"
          show-overflow-tooltip>
        </el-table-column> -->

        <el-table-column
          prop="create_time"
          label="创建时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ new Date(scope.row.create_time).toLocaleString() }}
          </template>
        </el-table-column>

        <el-table-column
          label="数据状态"
        >
          <template slot-scope="scope">
            <span :style="{color: scope.row.in_use ? 'green' : 'red'}">{{ scope.row.in_use ? '使用中' : '空闲' }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="size"
          label="文件尺寸"
        >
          <template slot-scope="scope">
            {{ scope.row.size ? `${$commonUtils.formatFileSize(scope.row.size)}` : '--' }}
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClickDetail(scope.row)" type="text" size="small">查看详情</el-button> -->
            <el-button @click="handleClickDelete(scope.row)" type="text" size="small" :style="{color: scope.row.in_use ? '#666' : 'rgb(236, 57, 3)' }" :disabled="scope.row.in_use">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div v-if="listTotal > 1" class="pagelation-wrapper"> -->
    <div class="pagelation-wrapper">
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
  </div>
</template>
<script>
export default {
  name: 'dataManage',
  props: {
    dataType: {
      type: String,
      required: false
    },
  },
  data() {
    return {
      tableLoading: false,
      currentPage: 1,
      pageSize: 10,
      listTotal: 0,
      tableData: [
        // {
        //   "voe_type": "VERTEX",
        //   "file_type": "CSV",
        //   "compress_type": "GZIP",
        //   "namespace_id": 0,
        //   "name": "关系节点",
        //   "uri": "string",
        //   "id": 0,
        //   "create_time": "2023-10-26T07:04:48.317Z"
        // }
      ],
    };
  },
  created() {},
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取列表
    getDataList() {
      const params = {
        skip: (this.pageSize * (this.currentPage - 1)) || 0,
        limit: this.pageSize,
        voe_type: this.dataType
      }
      this.tableLoading = true;
      this.$httpGet("getDatasetList", params)
        .then((res) => {
          this.tableData = res.datasets;
          this.listTotal = res.num;
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
    // 点击查看详情
    handleClickDetail(row) {

    },

    // 点击删除
    handleClickDelete (row) {
      this.$confirm(`是否确定删除：${row.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDeleteDataset(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

    // 删除
    doDeleteDataset(id) {
      this.$httpDelete("deleteDataset", {}, {}, {id})
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除完成。'
          });
          this.currentPage = 1;
          this.getDataList();
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataList();
    },

  },
};
</script>

<style lang="less" scoped>
.tableListWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .table-wrapper {
    flex: 1;
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
}
</style>
