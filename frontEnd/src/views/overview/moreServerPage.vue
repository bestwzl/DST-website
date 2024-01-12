// 新增负责人
<template>
    <div class="more_server_wrapper">
      <div class="more_server_tool_wrapper">
        <div class="back_btn_wrapper" @click="handleClickBack">
          <span><i class="el-icon-back" style="font-size: 24px;"></i></span>
          <span style="font-size: 20px; line-height: 24px;">返回</span>
        </div>
        <el-button v-if="+userRole === 1" type="success" plain icon="el-icon-circle-plus" @click="handleClickAdd">
          新增namaSpace
        </el-button>
      </div>
      <div class="more_server_list">
        <el-card v-for="ele in tableData" :key="ele.id" class="box-card">
          <div slot="header" class="card_herder_wrapper">
            <span style="font-size: 24px; color: rgb(4, 163, 216); margin-left: 5px;">{{ ele.name }}</span>
            <el-dropdown @command="e => { handleCommand(e, ele) }">
              <span style="cursor: pointer;">
                <i class="el-icon-more" style="font-size: 24px;"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit"><i class="el-icon-edit"></i> 编辑</el-dropdown-item>
                <el-dropdown-item command="delete"><i class="el-icon-delete"></i> 删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="server_info_wrapper">
            <div class="server_item_wrapper">
              <p class="server_item_label">pod_cpu_limit</p>
              <p class="server_item_value">{{ ele.pod_cpu_limit }}</p>
            </div>
            <div class="server_item_wrapper">
              <p class="server_item_label">cpu_limit</p>
              <p class="server_item_value">{{ ele.cpu_limit }}</p>
            </div>
            <div class="server_item_wrapper">
              <p class="server_item_label">pod_memory_limit</p>
              <p class="server_item_value">{{ ele.pod_memory_limit }}</p>
            </div>
            <div class="server_item_wrapper server_item_last">
              <p class="server_item_label">memory_limit</p>
              <p class="server_item_value">{{ ele.memory_limit }}</p>
            </div>
          </div>

          <div class="card_footer_wrapper">
            <p>
              <span>创建人：</span>
              <span style="color: rgb(4, 163, 216);">{{ allUserList[ele.creator_id] }}</span>
            </p>
            <p>
              <span>所属人：</span>
              <span style="color: rgb(4, 163, 216);">{{ allUserList[ele.owner_id] }}</span>
            </p>
          </div>
        </el-card>
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

      <el-dialog
        :title="handleType === 'edit' ? '编辑-NameSpace' : '新增-NameSpace'"
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
import AddNameSpace from './AddNameSpace.vue';
export default {
  name: "moreServer",
  components: {
    AddNameSpace
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      listTotal: 0,
      userRole: 2,
      dialogVisible: false,
      namespaceInfo: {},
      targetUserInfo: {},
      handleType: 'add',
      tableData: [],
      allUserList: {}
    };
  },

  mounted() {
    const userInfoString = this.$commonUtils.getSessionItem("operatorInfo") || '{}';
    this.targetUserInfo = JSON.parse(userInfoString);
    this.userRole = this.targetUserInfo.userRole || 2;

    this.getUserList();
  },

  methods: {
    // 获取用户列表 用户展示卡片中的创建人和所属人的名字
    getUserList() {
      const params = {
        skip: 0,
        limit: 9999
      }
      this.$httpGet("getUserList", params)
        .then((res) => {
            const userList = res.users;
            const userObj = {};
            userList.forEach(element => {
              userObj[element.id] = element.name
            });
            this.allUserList = userObj;
            this.getNameSpaceList();
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

    // 获取nameSpace列表
    getNameSpaceList() {
      const params = {
        skip: (this.pageSize * (this.currentPage - 1)) || 0,
        limit: this.pageSize
      }
      this.tableLoading = true;
      this.$httpGet("getServerList", params)
        .then((res) => {
            this.tableData = res.namespaces;
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

    handleClickAdd(){
      this.handleType = 'add';
      this.dialogVisible = true;
    },

    handleCommand(e, row){
      // console.log(e);
      // console.log(row);

      if (e === 'edit') {
        this.namespaceInfo = row;
        this.handleType = 'edit';
        this.dialogVisible = true;
      } else if( e === 'delete' ) {
        this.$confirm(`此操作将真正删除该NameSpace: ${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNamespace(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },

    deleteNamespace(row) {
      const { id } = row;
      this.$httpDelete('editServer', {}, {}, {id})
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除完成。'
          });
          this.handleCloseAndReloadList();
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

    handleCloseAndReloadList () {
      // this.currentPage = 1;
      this.namespaceInfo = {};
      this.dialogVisible = false;
      this.getNameSpaceList();
    },

    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getNameSpaceList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getNameSpaceList();
    },

    handleClickBack(){
      this.$router.go(-1);
    }

  },
};
</script>

<style scoped lang="less">
  .more_server_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .more_server_tool_wrapper {
      width: 100%;
      height: 56px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .back_btn_wrapper {
        padding: 0 12px;
        height: 100%;
        border-right: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover{
          color: var(--font-color-active);
        }
      }
    }
    .more_server_list {
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      flex-wrap: wrap;
      overflow-y: auto;
      padding: 20px 0;
      .box-card {
        flex-shrink: 0;
        width: 500px;
        margin-bottom: 24px;
        &:hover {
          transform: scale(1.03);
        }

        .card_herder_wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .server_info_wrapper {
          display: flex;
          align-items: center;
          justify-content: space-around;
          .server_item_wrapper {
            width: 25%;
            border-right: 1px solid var(--border-color);
            padding: 0 12px;
            .server_item_label {
              text-align: center;
              font-size: 14px;
              font-weight: 700;
            }
            .server_item_value {
              text-align: center;
              font-size: 30px;
              color: coral;
            }
          }
          .server_item_last {
            border: none;
          }

        }
        .card_footer_wrapper {
          border-top: 1px dashed var(--border-color);
          margin-top: 12px;
          padding-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
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