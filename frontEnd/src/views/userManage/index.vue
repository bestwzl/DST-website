// 用户管理
<template>
<div class="main_tab_wrapper">
    <div class="tool_wrapper">
      <!-- <div class="tool_input_wrapper">
        <el-input
          v-model="userKeywords"
          placeholder="请输入账号"
          style="width: 500px"
          @keyup.enter.native="getUserList"
        ></el-input>
        <el-button type="primary" @click="getUserList" style="margin-left: 12px;">查询</el-button>
      </div> -->
      <div></div>
      <div>
        <el-button v-if="+userRole === 1" type="success" plain @click="handleClickAdd">新增用户</el-button>
      </div>
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
          prop="name"
          label="账号">
        </el-table-column>

        <el-table-column
          prop="id"
          label="账号id">
        </el-table-column>

        <el-table-column
          label="账户类型"
        >
          <template slot-scope="props">
            <p v-if="+props.row.is_superuser" style="color:rgb(209, 74, 2)">管理员</p>
            <p v-else style="color:rgb(3, 106, 210)">普通用户</p>
          </template>
        </el-table-column>

        <el-table-column
          label="账号状态"
        >
          <template slot-scope="props">
            <p :style="{color: props.row.is_active ? 'green' : 'rgb(195, 2, 188)'}">{{ props.row.is_active ? '正常' : '停用' }}</p>
          </template>
        </el-table-column>

        <el-table-column
          v-if="+userRole === 1"
          fixed="right"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <!-- <el-button
              :disabled="targetUserId === scope.row.user_name"
              @click="handleClickReset(scope.row)"
              type="text"
              size="small"
              :class="targetUserId === scope.row.user_name ? 'target-disabled' : 'reset-btn'"
            >重置密码</el-button> -->
            <el-button
              @click="handleClickEdit(scope.row)"
              type="text"
              size="small"
            >编辑</el-button>
            <!-- <el-button
              @click="handleClickDelete(scope.row)"
              type="text"
              size="small"
              style="color:red"
            >删除</el-button> -->
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

    <el-dialog
      :title="`${targetUserInfo.id ? '编辑用户信息' : '新增用户'}`"
      :visible.sync="dialogVisible"
      width="700px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <AddUser v-if="dialogVisible" :visible.sync="dialogVisible" :defaultInfo="targetUserInfo" @closeAndReloadList="handleCloseAndReloadList" />
    </el-dialog>
  </div>
</template>
<script>
import AddUser from './AddUser.vue';
export default {
  name: "userManage",
  components: {
    AddUser
  },
  data() {
    return {
      tableLoading: false,
      dialogVisible: false,
      targetUserInfo: {},
      userKeywords: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      listTotal: 0,
      userRole: 2,
      targetUserId: '',
    };
  },
  created() {},
  mounted() {
    this.getUserList();
    const userInfoString = this.$commonUtils.getSessionItem("operatorInfo") || '{}';
    const { userRole, userId } = JSON.parse(userInfoString);
    this.targetUserId = userId;
    this.userRole = userRole || 2;
  },
  methods: {
    // 获取用户列表
    getUserList() {
      const params = {
        skip: (this.pageSize * (this.currentPage - 1)) || 0,
        limit: this.pageSize
      }
      this.tableLoading = true;
      this.$httpGet("getUserList", params)
        .then((res) => {
            this.tableData = res.users;
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

    // 新增用户
    handleClickAdd() {
      this.targetUserInfo = {};
      this.dialogVisible = true;
    },

    handleCloseAndReloadList() {
      this.currentPage = 1;
      this.getUserList();
      this.dialogVisible = false;
    },

    // 编辑负责人信息
    handleClickEdit(row) {
      this.targetUserInfo = row;
      this.dialogVisible = true;
    },

    handleClickDelete (row) {
      this.$confirm(`是否确定删除负责人：${row.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDeleteUser(row.user_name)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

    // 删除
    // doDeleteUser(id) {
    //   const params = {
    //     delete_account: id
    //   }
    //   this.$httpPost("deleteUser", params)
    //     .then((res) => {
    //       if (res.code == 200) {
    //         this.currentPage = 1;
    //         this.getUserList();
    //       } else {
    //         this.$message({
    //           message: res.msg,
    //           type: "error",
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       this.$message({
    //         message: err.message || "请求异常",
    //         type: "error",
    //       });
    //     })
    //     .finally(() => {
    //       this.btnLoading = false;
    //     });
    // },

    // 重置密码
    handleClickReset(row) {
      this.$confirm(`是否确定重置用户：‘${row.name}’ 的登录密码？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doResetPassword(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

    // 重置密码
    doResetPassword(row) {
      this.$httpPost("resetPassword", {reset_account: row.user_name})
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "密码已经重置为默认密码：“12345678”，请通知该用户重新登录。",
              type: "success",
            });
            this.getUserList();
          } else {
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
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
}

.target-disabled {
  color: #999;
}

.reset-btn {
  color: rgb(219, 126, 5);
}


</style>
