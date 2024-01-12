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

        <el-form-item label="名称：" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="数据类型：" prop="voe_type">
              <!-- <el-input v-model="ruleForm.voe_type" disabled></el-input> -->
              <el-select v-model="ruleForm.voe_type" placeholder="请选择数据类型" style="width: 100%">
                <el-option label="EDGE" value="EDGE"></el-option>
                <el-option label="VERTEX" value="VERTEX"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="nameSpace：">
              <el-select v-model="ruleForm.namespace_id" placeholder="请选择NameSpace" clearable style="width: 100%">
                <el-option v-for="item in nameSpaceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文件类型：">
              <el-select v-model="ruleForm.file_type" placeholder="请选择文件类型" clearable style="width: 100%">
                <el-option label="CSV" value="CSV"></el-option>
                <el-option label="TXT" value="TXT"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="包压缩类型：">
              <el-select v-model="ruleForm.compress_type" placeholder="请选择包类型" clearable style="width: 100%">
                <el-option label="ZIP" value="ZIP"></el-option>
                <el-option label="GZIP" value="GZIP"></el-option>
                <el-option label="SNAPPY" value="SNAPPY"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Label：" prop="label">
              <el-input v-model="ruleForm.label"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="delimiter：" prop="delimiter">
              <el-input v-model="ruleForm.delimiter"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="ruleForm.voe_type === 'EDGE'">
          <el-col :span="12">
            <el-form-item label="Source：" prop="source">
              <el-input v-model="ruleForm.source"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Target：" prop="target">
              <el-input v-model="ruleForm.target"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <span slot="label">
            uri：
            <el-popover
              placement="top-start"
              title="字段说明："
              width="400"
              trigger="hover"
            >
              <div>
                <p class="desc-item">可以指定文件的存储路径</p>
              </div>
              <i
                slot="reference"
                class="el-icon-info"
                style="color: coral; cursor: pointer"
              ></i>
            </el-popover>
          </span>
          <el-input v-model="ruleForm.uri" clearable></el-input>
        </el-form-item>

        <el-form-item label="文件：">
          <el-upload
            ref="upload"
            action="#"
            :on-remove="handleRemove"
            :on-change="changeFile"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary" :disabled="fileDataList.length >= 1">选取文件</el-button>
          </el-upload>
        </el-form-item>

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
  name: "addGraphConfig",
  components: {},
  props: {
    handleType: {
      type: String,
      required: false
    },
    dataType: {
      type: String,
      required: false
    },
    visible: {
      type: Boolean,
      required: false
    },
    nameSpaceList: {
      type: Array,
      required: false
    },
  },

  data() {
    return {
      btnLoading: false,
      ruleForm: {
        name: '',
        namespace_id: '',
        voe_type: '', // 数据类型 节点数据/ 边数据
        uri: '', // 指定的资源地址
        file_type: '', // 文件类型，文件后缀
        compress_type: '', // 包压缩类型
        label: '', // label
        delimiter: ',', // 分隔符
        source: '', // 来源 边独有
        target: '', // 目标 边独有
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        voe_type: [{ required: true, message: '请指定数据的分类', trigger: 'blur' }],
        label: [{ required: true, message: 'Label不能为空', trigger: 'blur' }],
        delimiter: [{ required: true, message: '分隔符不能为空', trigger: 'blur' }],
        source: [{ required: true, message: 'source不能为空', trigger: 'blur' }],
        target: [{ required: true, message: 'target不能为空', trigger: 'blur' }],
      },
      fileDataList: []
    };
  },

  mounted() {
    this.ruleForm.voe_type = this.dataType;
  },

  methods: {

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.fileDataList.length <= 0) {
            this.$message({
              message: '请先添加文件',
              type: "error",
            });
          } else {
            const {
              name,
              namespace_id,
              voe_type,
              uri,
              file_type,
              compress_type,
              label,
              delimiter,
              source,
              target,
            } = this.ruleForm;
            const formData = new FormData();
            formData.append("name", name);
            formData.append("namespace_id", namespace_id);
            formData.append("voe_type", voe_type);
            formData.append("uri", uri);
            formData.append("file_type", file_type);
            formData.append("label", label);
            formData.append("delimiter", delimiter);
            formData.append("source", voe_type === 'EDGE' ? source : '');
            formData.append("target", voe_type === 'EDGE' ? target : '');
            formData.append("compress_type", voe_type === 'VERTEX' ? compress_type : '');

            formData.append("file", this.fileDataList[0]);
            this.doSubmitForm(formData);
          }
        } else {
          console.log("校验错误!!");
          return false;
        }
      });
    },

      // 获取账户
      doSubmitForm(params) {
      // params.forEach((key, val) => {
      //   // console.log(`${val}:`, params.get(val))
      //   console.log(`${val}:`, params.getAll(val))
      // })
      this.btnLoading = true;
      this.$formData("addDataset", params).then((res) => {
          this.$message({
            message: '文件添加成功',
            type: "success",
          });
          this.$emit('closeAndReloadList');
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
    },

    // 删除选中的附件
    handleRemove(file, fileList) {
      this.fileDataList = [];
      fileList.map( item => {
        this.fileDataList.push(item.raw);
      });
    },

    // 选择了附件
    changeFile(file, fileList) {
      this.fileDataList = [];
      fileList.map( item => {
        this.fileDataList.push(item.raw);
      });
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