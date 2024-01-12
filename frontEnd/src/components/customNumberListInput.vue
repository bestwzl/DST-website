// 自定义组件-numList
<template>
    <el-input
      v-model="fieldValue"
      @change="handleCustomInput"
      :placeholder="itemInfo.formOption.placeholder"
    ></el-input>
</template>
<script>
export default {
  name: 'customFormItem',
  props: {
    itemInfo: {
      type: Object,
      required: false
    },
    value: {
      type: Array,
      required: false
    },
  },
  data() {
    return {
      fieldValue: '',
    };
  },
  watch: {
      "value": {
        handler(nVal){
          this.fieldValue = nVal.join(",");
        },
        deep: true,
        immediate: true,
      },
  },
  created() {},
  mounted() {},
  methods: {
    // 被动触发校验
    handleCustomInput(){
      this.$emit('update:value', this.fieldValue.split(',').map(el => +el));
    }
  },
};
</script>

<style lang="less" scoped>
.formWrapper {

}
</style>
