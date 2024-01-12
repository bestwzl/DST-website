// 登陆页面
<template>
  <div class="loginPageWrapper">
    <div class="loginPageContent">
      <div class="logoBox">
        <div class="logoImg"><img src="@/assets/img/gcp_logo.png" alt=""></div>
        <!-- <i class="el-icon-menu" style="font-size: 180px; transform: rotate(45deg);"></i> -->
        <div class="logoText">
          <span>图计算平台</span>
        </div>
      </div>
      <div class="formContainer">
        <el-form
          label-position="top"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="formBox"
        >
          <el-form-item label="用户名" prop="account">
            <el-input
              placeholder="请输入用户名"
              v-model="ruleForm.account"
              autocomplete="on"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item style="margin-top: 15px">
            <el-col>
              <el-button
                type="primary"
                :loading="loginLoading"
                @click="submitForm('ruleForm')"
              >
                登 录
              </el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div class="other_btns">
              <el-button type="text" @click="resetForm('ruleForm')">重置信息</el-button>
              <el-button type="text" @click="open">没有账号？</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>


  </div>
</template>
<script>
import { commonUtils } from "../../common/util";
export default {
  name: "login",
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (String(value).length < 6) {
        callback(new Error("密码长度不小于6位！"));
      } else {
        callback();
      }
    };
    return {
      defaultPassword: this.$constants.DEFAULTPASSWORD,
      isDevMenu: true, // 是否使用本地菜单
      loginLoading: false,
      ruleForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, validator: checkName, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ]
      },
    };
  },
  created() {},
  mounted() {
    this.removeSessionInfo(); // 清除缓存数据
  },
  methods: {

    //点击登录之后校验
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { account, password } = this.ruleForm;
          const loginParams = {
            username: account, //用户名
            // password: this.$encryptionByMD5(password),
            password: password,
          };

          this.loginLoading = true;
          this.$httpPost("userLogin", loginParams, {'Content-Type': 'application/x-www-form-urlencoded'})
            .then((res) => {
              this.setUserInfo(res);
              this.getUserMe({account, ...res});
            })
            .catch((err) => {
              this.$message({
                message: err.message || "请求异常",
                type: "error",
              });
            })
            .finally(() => {
              this.loginLoading = false;
            });
        } else {
          console.log("校验错误!!");
          return false;
        }
      });
    },

    // getUserMe

    //点击登录之后校验
    getUserMe(tokenInfo) {
      this.$httpGet("getUserMe")
        .then((res) => {
          const {id, is_active, is_superuser} = res;
          this.setUserInfo({
            ...tokenInfo,
            userId: id,
            userRole: is_superuser ? 1 : 2,
            is_active
          });
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });

    },

    // 缓存用户信息以及做对应跳转
    setUserInfo(res) {
      const { account, access_token, token_type, userId, userRole, is_active } = res;
      const userInfo = {
        userName: account,
        token: access_token,
        token_type,
        userId,
        userRole,
        is_active
      };
      this.cacheUserInfo(userInfo);
      this.$router.push("/overview");
    },

    //缓存用户的基本信息
    cacheUserInfo(userInfo) {
      commonUtils.setSessionItem("operatorName", userInfo.userName);
      commonUtils.setSessionItem("operatorInfo", JSON.stringify(userInfo));
    },

    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    open() {
      this.$alert('哈哈，我也没有。(^_^)a', '没有账号怎么办？', {
        confirmButtonText: '确定',
      });
    },

    // 清除缓存数据
    removeSessionInfo() {
      this.$commonUtils.removeSessionItem("operatorTime"); // 清除时间
      this.$commonUtils.removeSessionItem("operatorName"); // 清除用户code
      this.$commonUtils.removeSessionItem("operatorInfo"); // 清除用户信息
    },
  },
};
</script>

<style lang="less" scoped>
.loginPageWrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;
  // background: url(../../assets/img/loginBgImg.jpeg) no-repeat center center;
  background: url(../../assets/img/black_bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .canvas-wrapper {
    width: 100%;
    height: 100%;
  }
}
.loginPageContent {
  display: flex;
  width: 800px;
  height: 500px;
  margin: 0 auto;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* padding: 20px; */
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 1);
}

.logoBox {
  width: 50%;
  height: 100%;
  // background: url(../../assets/img/loginLeft.png) no-repeat center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px dashed #ccc;
  // opacity: 0.9;
  .logoIcon {
    font-size: 140px;
    color: #fff;
    height: 140px;
    text-shadow: 3px 3px 10px #fff;
    transform: rotateZ(45deg);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logoImg {
    height: 120px;
    margin-bottom: 50px;
    img {
      height: 100%;
      width: auto;
    }
  }

  // .logoText {
  //   margin-top: 20px;
  //   // color: #2b78f5;
  //   font-size: 40px;
  //   font-weight: 600;
  //   background-image:-webkit-linear-gradient(bottom,#04ddaa, #0082ff, #ff60f8); 
  //   -webkit-background-clip: text;
  //   -webkit-text-fill-color: transparent;
  //   font-family : monospace;
  // }

}
.formContainer {
  position: relative;
  height: 100%;
  width: 50%;
  .other_btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.formBox {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
  .el-button--mini,
  .el-button--mini.is-round {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    float: none;
    display: inline-block;
    text-align: left;
    padding: 0px !important;
  }
  .reset {
    font-size: 14px;
    color: #606266;
    cursor: pointer;
  }
  .el-button {
    width: 100%;
  }
}



.loginPageContent .el-form-item__label {
  color: #fff;
}
.loginPageContent{
  ::v-deep .el-input__inner {
    background-color: #fff!important;
    color: #333!important;
    border: 1px solid #ccc!important;
    border-width: 1px;
  }
  ::v-deep .el-input-group__append {
    padding: 0 5px;
    border: none;
    background: rgba(0, 0, 0, 0);
    img {
      height: 40px;
      width: auto;
      margin: 0;
      padding: 0;
      font-size: 0;
      cursor: pointer;
    }
  }
}



.logoText {
    height: 80px;
    width: 200px;
    position: relative;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(45deg, gold, deeppink);
    animation: hue 3s infinite linear;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: -15px;
      bottom: -15px;
      left: -15px;
      right: -15px;
      border: 3px solid #24acf2;
      border-image: linear-gradient(45deg, gold, deeppink) 1;
      clip-path: inset(0px round 10px);
      animation: clippath 3s infinite linear;
    }
    &::after {
      animation: clippath 3s infinite -1.5s linear;
    }
    span {
      color: white;
      font-size: 30px;
      font-weight: 600;
    }
  }
  @keyframes hue {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }

  @keyframes clippath {
    0% {
      clip-path: inset(0 0 95% 0);
      filter: hue-rotate(0deg);
    }
    25% {
      clip-path: inset(0 95% 0 0);
    }
    50% {
      clip-path: inset(95% 0 0 0);
    }
    75% {
      clip-path: inset(0 0 0 95%);
    }
    100% {
      clip-path: inset(0 0 95% 0);
      filter: hue-rotate(360deg);
    }
  }



</style>
