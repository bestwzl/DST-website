// 基础布局
<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <el-form-item
        label="旧密码："
        prop="oldPass"
        :label-width="formLabelWidth"
      >
        <el-input
          type="password"
          v-model="ruleForm.oldPass"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item
        label="新密码："
        prop="newPass"
        :label-width="formLabelWidth"
      >
        <el-input
          type="password"
          v-model="ruleForm.newPass"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认新密码："
        prop="checkPass"
        :label-width="formLabelWidth"
      >
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item class="modal-footer-wrapper">
        <el-button @click="closeModal">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          :loading="submitLoading"
        >确认修改</el-button>
      </el-form-item>
    </el-form>
</template>
<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    let validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value === this.ruleForm.oldPass) {
        callback(new Error("新密码不可与旧密码相同!"));
      } else if (value === this.defaultPassword) {
        callback(new Error("不可使用默认密码！"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码以确认"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      defaultPassword: this.$constants.DEFAULTPASSWORD,
      ruleForm: {
        oldPass: "",
        newPass: "",
        checkPass: "",
      },
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        newPass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      formLabelWidth: "120px",
      submitLoading: false, // 修改密码的提交按钮
    };
  },

  mounted() {
  },

  methods: {

    closeModal(){
      this.$emit('update:dialogFormVisible', false);
    },

    // 修改密码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const {oldPass, newPass} = this.ruleForm
          let params = {
            old_password: oldPass, //旧密码
            new_password: newPass, //新密码
            // old_password: this.$encryptionByMD5(oldPass), //旧密码
            // new_password: this.$encryptionByMD5(newPass), //新密码
          };
          this.doSubmitForm(params);
        } else {
          console.log("表单校验错误!!");
          return false;
        }
      });
    },

    doSubmitForm(params) {
      this.submitLoading = true;
      this.$httpPost("changePassword", params)
        .then((res) => {
          this.$message({
            message: `密码修改成功，请使用新密码登录`,
            type: "success",
          });
          this.goToLoginPage();
          this.closeModal();
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        })
        .finally(() => {
          this.submitLoading = false;
        });
    },
    // 退出登录 并清除缓存
    goToLoginPage() {
      this.$router.push("/login");
      // this.$httpPost("userLogout", {}).then((res) => {})
      // .catch((err) => {
      //   this.$message({
      //     message: err.message || "请求异常",
      //     type: "error",
      //   });
      // })
      // .finally(() => {
      //   this.$router.push("/login");
      // });
    },
  },
};
</script>

<style scoped lang="less">
.modal-footer-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
