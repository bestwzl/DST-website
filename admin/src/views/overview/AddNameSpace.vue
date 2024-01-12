// 新增负责人
<template>
    <div class="add_wrapper">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="addForm"
        label-width="140px"
        class="formBox"
      >

        <el-form-item v-if="handleType === 'edit'" label="名称：" prop="username" >
          <el-input
            placeholder="请输入名称"
            v-model="ruleForm.username"
            autocomplete="on"
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item v-if="handleType === 'add'" label="名称：" prop="username" >
          <el-select
            v-if="+targetUserInfo.userRole === 1"
            v-model="ruleForm.username"
            placeholder="请选择账户"
            style="width: 100%;"
          >
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-input
            v-else
            placeholder="请输入名称"
            v-model="ruleForm.username"
            autocomplete="on"
          ></el-input>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="pod_cpu_limit:">
              <el-input-number v-model="ruleForm.pod_cpu_limit" :min="0" :max="999"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="cpu_limit:" >
              <el-input-number v-model="ruleForm.cpu_limit" :min="0" :max="999"></el-input-number>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="pod_memory_limit:">
              <el-input-number v-model="ruleForm.pod_memory_limit" :min="0" :max="999"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="memory_limit:">
              <el-input-number v-model="ruleForm.memory_limit" :min="0" :max="999"></el-input-number>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>

      <div class="footer_btn_wrapper">
        <el-button
          type="primary"
          :loading="btnLoading"
          @click="submitForm('addForm')"
        >
          提交
        </el-button>
        <el-button @click="handleCancel('addForm')">取消</el-button>
      </div>
    </div>
</template>
<script>
export default {
  name: "addNameSpace",
  components: {},
  props: {
    handleType: {
      type: String,
      required: false
    },
    visible: {
      type: Boolean,
      required: false
    },
    namespaceInfo: {
      type: Object,
      required: false
    },
    targetUserInfo: {
      type: Object,
      required: false
    },
  },

  data() {
    return {
      btnLoading: false,
      ruleForm: {
        username: '', // name
        pod_cpu_limit: '',
        cpu_limit: '',
        pod_memory_limit: '',
        memory_limit:''
      },
      rules: {
        username: [{ required: true, message: '登录账号不能为空', trigger: 'blur' }],
      },
      userOptions:[]
    };
  },

  mounted() {
    const { userName, userRole } = this.targetUserInfo;
    const { name, pod_cpu_limit, cpu_limit, pod_memory_limit, memory_limit } = this.namespaceInfo;
    if(this.handleType === 'add') {
      if (userName && +userRole !== 1) this.ruleForm.username = userName;
      if (+userRole === 1) this.getUserList();
    } else if(this.handleType === 'edit') {
      if(name) {
        this.ruleForm = {
          username: name, // name
          pod_cpu_limit,
          cpu_limit,
          pod_memory_limit,
          memory_limit
        };
      };
    };
  },

  methods: {
    //点击新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formParams = this.ruleForm;
          if (this.handleType === 'add') {
            this.addServer(formParams);
          } else {
            const targetID = this.namespaceInfo.id;
            targetID && this.editServer(targetID, formParams);
          }
        } else {
          console.log("校验错误!!");
          return false;
        };
      });
    },

    addServer(formParams) {
      this.btnLoading = true;
      this.$httpPost('addServer', formParams)
        .then((res) => {
          this.$emit("closeAndReloadList");
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },

    editServer(id, formParams) {
      this.btnLoading = true;
      this.$httpPut('editServer', formParams, {}, {id})
        .then((res) => {
          this.$emit("closeAndReloadList");
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },

    // 获取用户列表
    getUserList() {
      const params = {
        skip: 0,
        limit: 999,
        has_namespace: false
      }
      this.tableLoading = true;
      this.$httpGet("getUserList", params)
        .then((res) => {
            const allUser = res.users;
            const userList = []
            allUser.forEach(el => {
              userList.push({
                label: el.name,
                value: el.name,
                id: el.id
              })
            })
            this.userOptions = userList;
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

    handleCancel(formName) {
      this.$refs[formName].resetFields();
      this.$emit('update:visible', false);
    }

  },
};
</script>

<style scoped lang="less">
  .add_wrapper {
    width: 100%;
    min-height: 50px;
    box-sizing: border-box;
    margin-bottom: 20px;
    .footer_btn_wrapper {
      border-top: 1px dashed #ddd;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 30px;
    }
  }

</style>