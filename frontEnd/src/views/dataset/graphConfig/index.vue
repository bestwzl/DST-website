// dataset 图配置
<template>
  <div class="main_tab_wrapper">
    <div class="tool_wrapper">
      <div>图列表</div>
      <!-- <el-button v-if="+userRole === 1" type="success" plain @click="handleClickAdd">新增Graph</el-button> -->
      <el-button type="success" plain @click="handleClickAdd">新增Graph</el-button>
    </div>
    <div class="table_wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="tableLoading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <SubTable :propsData = "props.row" />
          </template>
        </el-table-column>

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
          label="图名称">
        </el-table-column>

        <el-table-column
          prop="id"
          label="图id">
        </el-table-column>

        <el-table-column
          prop="id"
          label="是否具有指向性">
          <template slot-scope="scope">
            {{ scope.row.directed ? '有向' : '无向' }}
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClickSchema(scope.row)"
              type="text"
              size="small"
            >schema</el-button>
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


    <div class="sub_modale_wrapper" :class="dialogVisible ? 'sub_modale_show' : 'sub_modale_hide'">
      <AddGraphConfig
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        :defaultInfo="targetGraphInfo"
        :nameSpaceList="nameSpaceList"
        @closeAndReloadList="handleCloseAndReloadList"
      />
    </div>

    <el-dialog
      title="schame"
      :visible.sync="schameVisible"
      width="800px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <VisGraph v-if="targetGraphInfo.schema" :schema="targetGraphInfo.schema || testData" />
    </el-dialog>
  </div>
</template>
<script>
import AddGraphConfig from './AddGraphConfig.vue';
import VisGraph from '../../../components/VisGraph.vue';
import SubTable from "./subTable.vue";
export default {
  name: "graphConfig",
  components: {
    AddGraphConfig,
    VisGraph,
    SubTable
  },
  data() {
    return {
      tableLoading: false,
      dialogVisible: false,
      schameVisible: false,
      targetGraphInfo: {},
      userKeywords: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      listTotal: 0,
      userRole: 2,
      targetUserId: '',
      nameSpaceList: [], // 所有的nameSpace
      testData: {
        "edges":[
            {
                "label": "师徒",
                "properties":[
                    {
                        "comment": "",
                        "id": 0,
                        "is_primary_key": false,
                        "name": "eid",
                        "type": "LONG"
                    }
                ],
                "relations":[
                    {
                        "dst_label": "唐僧",
                        "src_label": "悟空"
                    }
                ]
            },
            {
                "label": "师兄弟",
                "properties":[
                    {
                        "comment": "",
                        "id": 0,
                        "is_primary_key": false,
                        "name": "eid",
                        "type": "LONG"
                    }
                ],
                "relations":[
                    {
                        "dst_label": "八戒",
                        "src_label": "沙僧"
                    }
                ]
            },
            {
                "label": "坐骑",
                "properties":[
                    {
                        "comment": "",
                        "id": 0,
                        "is_primary_key": false,
                        "name": "eid",
                        "type": "LONG"
                    }
                ],
                "relations":[
                    {
                        "dst_label": "唐僧",
                        "src_label": "白龙马"
                    }
                ]
            }
        ],
        "vertices":[
            {
                "label": "唐僧",
                "properties":
                [
                    {
                        "comment": "",
                        "id": 0,
                        "is_primary_key": false,
                        "name": "name",
                        "type": "STRING"
                    },
                ]
            },
            {
                "label": "悟空",
                "properties":
                [
                    {
                        "comment": "",
                        "id": 1,
                        "is_primary_key": false,
                        "name": "id",
                        "type": "LONG"
                    }
                ]
            },
            {
                "label": "沙僧",
                "properties":
                [
                    {
                        "comment": "",
                        "id": 1,
                        "is_primary_key": false,
                        "name": "id",
                        "type": "LONG"
                    }
                ]
            },
            {
                "label": "八戒",
                "properties":
                [
                    {
                        "comment": "",
                        "id": 1,
                        "is_primary_key": false,
                        "name": "id",
                        "type": "LONG"
                    }
                ]
            },
            {
                "label": "白龙马",
                "properties":
                [
                    {
                        "comment": "",
                        "id": 1,
                        "is_primary_key": false,
                        "name": "id",
                        "type": "LONG"
                    }
                ]
            }
        ]
      },
    };
  },
  created() {},
  mounted() {
    this.getGraphList();
    const userInfoString = this.$commonUtils.getSessionItem("operatorInfo") || '{}';
    const { userRole, userId } = JSON.parse(userInfoString);
    this.targetUserId = userId;
    this.userRole = userRole || 2;
    this.getNameSpaceList();
  },
  methods: {
    // 获取列表
    getGraphList() {
      const params = {
        skip: (this.pageSize * (this.currentPage - 1)) || 0,
        limit: this.pageSize
      }
      this.tableLoading = true;
      this.$httpGet("getGraphList", params)
        .then((res) => {
            // this.tableData = res.graphs;
            const newArr = res.graphs || [];
            const targetArr = [];
            newArr.forEach(el => {
              targetArr.push({
                ...el,
                schema: el.schema || this.testData
              })
            })
            this.tableData = targetArr;
            this.listTotal = res.num;

            // console.log("this.tableData", this.tableData);
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
      this.getGraphList();
      this.dialogVisible = false;
    },

    // 查看schema详情
    handleClickSchema(row) {
      // this.$message({
      //   type: 'info',
      //   message: '敬请期待'
      // });
      this.targetGraphInfo = row;
      // console.log("1313313131::::::", this.targetGraphInfo)
      this.schameVisible = true;
    },

    // 编辑负责人信息
    handleClickEdit(row) {
      this.targetGraphInfo = row;
      this.dialogVisible = true;
    },

    handleClickDelete (row) {
      this.$confirm(`是否确定删除图：${row.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDeleteGraph(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

    // 删除
    doDeleteGraph(id) {
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

