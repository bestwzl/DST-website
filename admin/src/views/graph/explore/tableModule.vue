// table 展示
<template>
  <div class="table_module_wrapper">
    <el-table
      v-if="allTypes && allTypes.length > 0"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        v-for="el in allTypes"
        :key="el"
        :prop="el"
        :label="el">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'tableModule',
  props: {
    queryResult: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      allTypes: [],
      tableData: []
    };
  },
  watch: {
      "queryResult": {
        handler(nVal) {
          const { records } = nVal;
          records && records.length > 0 && this.formatData(nVal);
        },
        deep: true,
      }
  },
  created() {},
  mounted() {
  },
  methods: {
    formatData(allData) {
      const {records, summary} = allData;
      const dataTypes = summary.fields;
      this.allTypes = dataTypes;
      const targetTableList = [];
      records.forEach(element => {
        const itemInfo = {};
        dataTypes.forEach((el, index) => {
          itemInfo[el] = JSON.stringify(element[index])
        })
        targetTableList.push(itemInfo);
      });
      this.tableData = targetTableList;
    },
  },
};
</script>

<style lang="less" scoped>
.table_module_wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>


