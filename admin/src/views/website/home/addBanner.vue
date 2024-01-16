// 首页配置
<template>
  <div class="banner_conf_wrapper">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="轮播类型：" prop="backGroundType">
        <el-radio-group v-model="ruleForm.backGroundType">
          <el-radio label="img">图片背景</el-radio>
          <el-radio label="video">视频背景</el-radio>
          <el-radio label="color">纯色背景</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="背景地址：" prop="backGroundUrl">
        <el-input v-model="ruleForm.backGroundUrl" placeholder="请补充背景地址"></el-input>
      </el-form-item>

      <el-form-item label="一级标题：">
        <el-input v-model="ruleForm.title" placeholder="添加标题"></el-input>
      </el-form-item>

      <el-form-item label="二级标题：">
        <el-input v-model="ruleForm.subTitle" placeholder="添加副标题"></el-input>
      </el-form-item>



      <el-form-item label="描述：">
        <el-input type="textarea" v-model="ruleForm.desc" placeholder="添加描述文案"></el-input>
      </el-form-item>

      <el-form-item label="链接地址：">
        <el-input v-model="ruleForm.link" placeholder="添加链接地址"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    handleType: {
      type: String,
      required: false
    },
    targetBanner: {
      type: Object,
      required: false
    },
  },

  data() {
    return {
        btnLoading: false,
        ruleForm: {
            backGroundType: 'img', // img, color, video
            backGroundUrl: '', // 背景图片/视屏地址 ｜ 纯色的颜色
            title: '', // 标题
            subTitle: '', // 二级标题
            desc: '', // 描述文案
            link: '', // 跳转链接
        },
        rules: {
            backGroundType: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
            backGroundUrl: [{ required: true, message: '请补充背景地址', trigger: 'blur' }],
        }
    };
  },

  mounted() {
    if ( this.targetBanner && this.targetBanner.id ) {
      const {backGroundType, backGroundUrl, title, subTitle, desc, link} = this.targetBanner;
      this.ruleForm = {
        backGroundType: backGroundType || 'img',
        backGroundUrl: backGroundUrl,
        title: title,
        subTitle: subTitle,
        desc: desc,
        link: link
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    createBanner(params) {
      this.btnLoading = true;
      this.$httpPost("addBanner", params)
        .then((res) => {
          this.$emit("closeAndRefreshList");
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

  },
};
</script>

<style scoped lang="less">
.banner_conf_wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>

