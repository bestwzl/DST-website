// 新增负责人
<template>
    <div class="add_wrapper">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="addForm"
        label-width="110px"
        class="formBox"
      >
        <el-form-item label="登录账号：" prop="account" >
          <el-input
            placeholder="请输入登录账号"
            v-model="ruleForm.account"
            autocomplete="on"
            :disabled="handleType === 'edit'"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户密码：" :prop="handleType === 'add' ? 'password' : ''">
          <el-input
            placeholder="请设置账户密码"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="账户角色：" prop="role">
              <el-radio-group v-model="ruleForm.role">
                <el-radio :label="1">超管</el-radio>
                <el-radio :label="2">用户</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户状态：" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="2">停用</el-radio>
              </el-radio-group>
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
  name: "addUser",
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: false
    },
    defaultInfo: {
      type: Object,
      required: false
    },
  },

  data() {
    return {
      btnLoading: false,
      handleType: 'add',
      ruleForm: {
        account: '', // 登录账户
        password: '', // 角色
        role: '', // 所属分组
        status: '' // 用户状态
      },
      rules: {
        account: [{ required: true, message: '登录账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }],
        role: [{ required: true, message: '请选择账户角色', trigger: 'blur' }],
        status: [{ required: true, message: '请选择账户状态', trigger: 'blur' }],
      },
    };
  },

  mounted() {
    // console.log("当前用户信息：：：", this.defaultInfo)
    if (this.defaultInfo && this.defaultInfo.id) {
      this.handleType = 'edit';
      const { is_active, is_superuser  } = this.defaultInfo;
      this.ruleForm = {
        account: this.defaultInfo.name,
        password: '',
        role: is_superuser ? 1 : 2,
        status: is_active ? 1 : 2,
      }
    } else {
      this.handleType = 'add';
    }
  },

  methods: {
    //点击新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { account, password, role, status } = this.ruleForm;
          const formParams = {
            password: password,
            is_superuser: +role === 1 ? true : false,
            is_active: +status === 1 ? true : false,
          };
          if (this.handleType === 'add') {
            formParams.name = account;
            this.addUser(formParams);
          } else {
            const targetID = this.defaultInfo.id;
            targetID && this.editUser(targetID, formParams);
          }
        } else {
          console.log("校验错误!!");
          return false;
        }
      });
    },

    addUser(formParams) {
      this.btnLoading = true;
      this.$httpPost('addUser', formParams)
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

    editUser(id, formParams) {
      this.btnLoading = true;
      this.$httpPut('editUser', formParams, {}, {id})
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