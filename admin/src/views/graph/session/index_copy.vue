// session管理
<template>
  <div class="main_tab_wrapper">
    <div class="tool_wrapper">
      <div>session & graph</div>
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
          prop="session"
          label="Session">
        </el-table-column>

        <el-table-column
          prop="graph"
          label="Graph"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status==='normal'">{{ getLabelByValue(allGraphList, scope.row.graph) || scope.row.graph  }}</span>

            <el-select v-if="scope.row.status==='edit'" v-model="scope.row.graph" placeholder="请选择图">
              <el-option
                v-for="item in allGraphList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="status"
          label="status">
        </el-table-column> -->

        <el-table-column
          fixed="right"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClickLoad(scope.row)"
            >载入</el-button>
            <el-button
              v-if="scope.row.status==='normal'"
              type="text"
              size="small"
              style="color:rgb(251, 128, 13)"
              @click="scope.row.status='edit'"
            >编辑</el-button>
            <el-button
              v-if="scope.row.status==='edit'"
              :loading="saveBtnLoading"
              type="text"
              size="small"
              style="color: rgb(5, 238, 36);"
              @click="handleClickSave(scope.row)"
            >保存</el-button>
          </template>
        </el-table-column>
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

  </div>
</template>
<script>
export default {
  name: "graphConfig",
  components: {
  },
  data() {
    return {
      tableLoading: false,
      saveBtnLoading: false,
      tableData: [
        {
          session: 'session_1',
          graph: 6,
          status: 'normal'
        },
        {
          session: 'session_2',
          graph: 7,
          status: 'normal'
        },
        {
          session: 'session_3',
          graph: '',
          status: 'normal'
        }
      ],
      currentPage: 1,
      pageSize: 10,
      listTotal: 0,
      allGraphList: [],
    };
  },
  created() {},
  mounted() {
    this.getGraphList();
  },
  methods: {

    handleClickSave(row){
      this.saveBtnLoading = true;
      setTimeout(() => {
        row.status='normal';
        this.saveBtnLoading = false;
      }, 1000)
    },

    // 获取图列表
    getGraphList() {
      const params = {
        skip: (this.pageSize * (this.currentPage - 1)) || 0,
        limit: this.pageSize
      }
      this.tableLoading = true;
      this.$httpGet("getGraphList", params)
        .then((res) => {
            const newArr = res.graphs || [];
            const graphList = []
            newArr.forEach((el, index) => {
              graphList.push({
                label: el.name,
                value: el.id
              })
            })
            this.allGraphList = graphList;

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

    // 点击载入
    handleClickLoad(row) {
      if(row.graph){
        this.$message({
          type: 'info',
          message: '敬请期待'
        });
      } else {
        this.$message({
          type: 'warning',
          message: '请选择图'
        });
      }
    },

    getLabelByValue(arr, value) {
      const target = arr.find(el => el.value === value);
      return target ? target.label : '';
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


