// 单个节点配置
<template>
  <div class="node_item_page_wrapper">
    <div class="node_item_header">
      {{nodeInfo.label}}
    </div>

    <el-form :model="formData" :rules="rules" :ref="`nodeFormItem_${nodeInfo.label}`" label-position="top">

      <div class="node_item_body">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Train" prop="train">
              <el-input-number v-model="formData.train" :step="1" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Val" prop="val">
              <el-input-number v-model="formData.val" :step="1" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Test" prop="test">
              <el-input-number v-model="formData.test" :step="1" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="All">
              <el-input :value="totalNum" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div class="node_item_footer">
        <el-form-item prop="checkedProperties">
          <span slot="label" style="margin-bottom: 12px; width: 300px;">
            <span>属性：</span>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          </span>
          <el-checkbox-group v-model="formData.checkedProperties" @change="handleCheckedItemChange">
            <el-checkbox v-for="el in propertieList" :label="el" :key="el">{{el}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>
<script>
export default {
  name: 'nodeFormItem',
  props: {
    nodeInfo: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      btnLoading: false,
      formData: {
        train: 1,
        val: 1,
        test: 1,
        all: 3,
        checkedProperties: []
      },
      rules: {
        train: [{ required: true, message: '请输入分配给train的数量', trigger: 'change' }],
        val: [{ required: true, message: '请输入分配给val的数量', trigger: 'change' }],
        test: [{ required: true, message: '请输入分配给test的数量', trigger: 'change' }],
        checkedProperties: [{ required: true, message: '请选择参数', trigger: 'change' }],
      },
      checkAll: false,
      propertieList: [],
      isIndeterminate: true
    };
  },
  watch: {
      "nodeInfo": {
        handler(nVal) {
          const {properties} = nVal;
          if (properties && properties.length > 0) {
            const targetList = []
            properties.forEach(ele => {
              targetList.push(ele.name);
            })
            this.propertieList = targetList;
          }
        },
        deep: true,
        immediate: true,
      }
  },
  computed: {
    totalNum() {
      const {train, val, test} = this.formData;
      return +train + val + test;
    },
  },
  created() {},
  mounted() {
    // console.log("nodeInfo:::::::::", this.nodeInfo)
    this.$bus.on("nodeFormValidate", () => {
      this.graphFormSubmit();
    });
  },

  // 页面销毁前销毁监听
  beforeDestroy() {
    this.$bus.off("nodeFormValidate");
  },

  methods: {
    graphFormSubmit(){
      this.$refs[`nodeFormItem_${this.nodeInfo.label}`].validate((valid) => {
        if (valid) {
          const {train, val, test} = this.formData;
          this.formData.all = +train + val + test;
          const targetParam = {};
          targetParam[this.nodeInfo.label] = this.formData;
          this.$emit("doSubmit", targetParam);
        } else {
          console.log("校验错误!!");
          return false;
        }
      })
    },
    handleCheckAllChange(val) {
      this.formData.checkedProperties = val ? this.propertieList : [];
      this.isIndeterminate = false;
    },
    handleCheckedItemChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.propertieList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.propertieList.length;
    }
  },
};
</script>

<style lang="less" scoped>
  .node_item_page_wrapper {
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid var(--border-color);
    .node_item_header {
      width: 100%;
      box-sizing: border-box;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: 600;
      background-color: var(--theme-color-1);
      padding: 0 20px;
    }
    .node_item_body {
      padding: 10px 20px;
    }
    .node_item_footer {
      border-top: 1px dashed var(--border-color);
      padding: 20px;
    }
  }

</style>

