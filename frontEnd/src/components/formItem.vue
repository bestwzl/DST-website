// 动态表单
<template>
  <div class="formWrapper">
    <el-form v-if="showForm" :model="myForm" :rules="myRules" ref="myForm" label-width="180px">

      <el-form-item
        v-for="ele in formItemList"
        :key="ele.field"
        :label="ele.fieldLabel"
        :prop="ele.field"
        :rules="[{
          required: ele.formOption.required,
          message: ele.formOption.tipMsg || '不能为空',
          trigger: 'blur'
        }]"
      >

        <span slot="label">
          <span>{{ ele.fieldLabel }}</span>
          <el-tooltip v-if="ele.fieldTips" class="item" effect="dark" :content="ele.fieldTips" placement="top-start">
            <i class="el-icon-info" style="margin-left: 5px; color: rgb(252, 136, 28); cursor: help;"></i>
          </el-tooltip>
        </span>

        <!-- 文字输入框 -->
        <el-input
          v-if="ele.formOption.formItemType === 'input'"
          v-model="ele.fieldValue"
          :placeholder="ele.formOption.placeholder"
        ></el-input>

        <!-- 整数 -->
        <el-input-number
          v-if="ele.formOption.formItemType === 'integer'"
          v-model="ele.fieldValue"
          :step="ele.formOption.step || 1"
          :min="ele.formOption.min || undefined"
          :max="ele.formOption.max || undefined"
        ></el-input-number>

        <!-- 小数 -->
        <el-input-number
          v-if="ele.formOption.formItemType === 'number'"
          v-model="ele.fieldValue"
          :precision="ele.formOption.precision || 2"
          :step="ele.formOption.step || 0.1"
          :min="ele.formOption.min || undefined"
          :max="ele.formOption.max || undefined"
        ></el-input-number>

        <!-- 单选框组 -->
        <el-radio-group
          v-if="ele.formOption.formItemType === 'radio'"
          v-model="ele.fieldValue"
        >
          <el-radio
            v-for="item in ele.formOption.selectOption"
            :key="item.value"
            :label="item.value"
          >
            {{item.label}}
          </el-radio>
        </el-radio-group>

        <!-- 复选框组 -->
        <el-checkbox-group
          v-if="ele.formOption.formItemType === 'checkbox'"
          v-model="ele.fieldValue"
        >
          <el-checkbox
            v-for="item in ele.formOption.selectOption"
            :key="item.value"
            :label="item.value"
          >
           <span>{{item.label}}</span>
          </el-checkbox>
        </el-checkbox-group>

        <!-- 下拉单选 -->
        <el-select
          v-if="ele.formOption.formItemType === 'select'"
          v-model="ele.fieldValue"
          clearable
          :placeholder="ele.formOption.placeholder"
        >
          <el-option
            v-for="item in ele.formOption.selectOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <!-- 下拉多选 -->
        <el-select
          v-if="ele.formOption.formItemType === 'multipleSelect'"
          v-model="ele.fieldValue"
          multiple
          :placeholder="ele.formOption.placeholder"
        >
          <el-option
            v-for="item in ele.formOption.selectOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-switch
          v-if="ele.formOption.formItemType === 'switch'"
          v-model="ele.fieldValue"
          :inactive-text="ele?.formOption?.switchOption?.[0] || ''"
          :active-text="ele?.formOption?.switchOption?.[1] || ''"
        >
        </el-switch>


        <!-- 整数数组 数字框的形式 -->
        <!-- <numberList
          v-if="['integerList', 'numberList'].includes(ele.formOption.formItemType)"
          :formItemType="ele.formOption.formItemType"
          v-model="ele.fieldValue"
          :step="ele.formOption.step || 1"
          :min="ele.formOption.min || undefined"
          :max="ele.formOption.max || undefined"
        ></numberList> -->

        <!-- 整数数组 输入的形式 -->
        <input-list
          v-if="['integerList', 'numberList'].includes(ele.formOption.formItemType)"
          :itemInfo="ele"
          :value.sync="ele.fieldValue"
          :placeholder="ele.formOption.placeholder"
        ></input-list>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import inputList from './customNumberListInput.vue'
export default {
  name: 'formItem',
  components: {
    inputList
  },
  props: {
    btnLoading: {
      type: Boolean,
      required: false
    },
    formItemList: {
      type: Array,
      required: false
    },
  },
  data() {
    return {
      showForm: false,
      myForm: {},
      myRules: {},
    };
  },
  watch: {
      "formItemList": {
        handler(nVal){
          nVal.length > 0 && this.setFormData();
        },
        deep: true,
        immediate: true,
      },
  },
  created() {},
  mounted() {
    if (this.formItemList && this.formItemList.length > 0) {
      this.setFormData();
    }
  },
  methods: {
    // 被动触发校验
    formByDataSubmit(){
      this.submitForm('myForm');
    },

    // 主动校验
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("handleSubmit", this.myForm)
        } else {
          this.$emit("handleVerification", this.myForm)
          console.log("校验错误!!");
          return false;
        }
      });
    },

    setFormData() {
      this.showForm = false;
      const newVal = {};
      this.formItemList.forEach(item => {
        newVal[item.field] = item.fieldValue;
      })
      this.myForm = newVal;
      // console.log("当前表单数据：：", this.myForm)
      this.showForm = true;
    }
  },
};
</script>

<style lang="less" scoped>
.formWrapper {

}
</style>
