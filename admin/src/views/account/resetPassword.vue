// 修改密码
<template>
  <div class="resetPageWrapper">
    <div class="resetPageContent">
      <p style="color: aquamarine">
        检测到您使用的是默认密码，为了您的账户安全，请修改密码。
      </p>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item
          label="旧密码："
          prop="oldPass"
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
        >
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            :loading="submitLoading"
          >确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
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
      submitLoading: false,
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
    };
  },
  created() {
    const operatorInfo = this.$commonUtils.getSessionItem("operatorInfo");
    if(!operatorInfo){
      this.$router.push("/login");
    }
  },
  mounted() {},
  methods: {
    // 修改密码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const {oldPass, newPass} = this.ruleForm
          let params = {
            old_password: this.$encryptionByMD5(oldPass), //旧密码
            new_password: this.$encryptionByMD5(newPass), //新密码
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
          if (res.code == 200) {
            this.$message({
              message: `密码修改成功，请使用新密码登录`,
              type: "success",
            });
            this.goToLoginPage();
          } else {
            this.$message({
              message: res.message,
              type: "error",
            });
          }
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
      this.$httpPost("userLogout", {}).then((res) => {
        if (res.code == 200) {
          this.$router.push("/login");
        } else {
          this.$message({
            message: res.message,
            type: "error",
          });
        }
      })
      .catch((err) => {
        this.$message({
          message: err.message || "请求异常",
          type: "error",
        });
      })
      .finally(() => {
        this.$router.push("/login");
      });
    },

  },
};
</script>

<style>
.resetPageWrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;
  background: url("../../assets/img/loginBgImg.jpeg") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
}
.resetPageContent {
  width: 520px;
  height: 400px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 15px;
}
.formBox {
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.resetPageContent .el-form-item__label {
  color: #fff;
}
.resetPageContent .el-input__inner {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  border: 1px solid #aaa;
  border-width: 1px;
}
.resetPageContent .el-select {
  width: 100%;
}
</style>
