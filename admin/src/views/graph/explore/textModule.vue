// text 展示
<template>
  <div class="text_module_wrapper">
    <div v-for="(item, index) in allRecords" :key="`{text_${index}}`" class="text_wrapper">
      <div v-html="item"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'textModule',
  props: {
    queryResult: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      allRecords: [],
    };
  },
  watch: {
      "queryResult": {
        handler(nVal) {
          const { records } = nVal;
          records && records.length > 0 && this.formatData(nVal);
        },
        deep: true,
        immediate: true,
      }
  },
  created() {},
  mounted() {

  },
  methods: {
    formatData(allData) {
      const { records } = allData;
      this.allRecords = records;
    },

  },
};
</script>

<style lang="less" scoped>
.text_module_wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  .text_wrapper {
    margin-bottom: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
  }
}
</style>


