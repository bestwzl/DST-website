// graph explore 使用iframe 嵌套 neo4J 服务
<template>
  <div class="graph_explore_page_wrapper">
    <div class="page_top">
      <p>Session: </p>
      <el-select v-model="targetSession" placeholder="请选择session" @change="handleChangeSession">
        <el-option
          v-for="el in sessionList"
          :key="el.value"
          :label="el.label"
          :value="el.value">
        </el-option>
      </el-select>
    </div>
    <iframe v-if="iframeSrc" id="neo4jIframe" :src="iframeSrc" style="width: 100%; height: 100%; border: 0px; margin:0; "></iframe>
  </div>
</template>
<script>
export default {
  name: 'neo4jFrame',
  components: {
  },
  data() {
    return {
      baseUrl: 'http://localhost:8080/',
      sessionList: [
        // {
        //   label: 's_test',
        //   value: 'test.cypher.gcp.unicom.cn:30884'
        // },
        // {
        //   label: 's_test2',
        //   value: 'test2.cypher.gcp.unicom.cn:30884'
        // },
        // {
        //   label: 's_neo4j',
        //   value: 'neo4j://neo4j.cost.ubd.cn:30884'
        // },
        // {
        //   label: 's_neo4j_11',
        //   value: 'neo4j11://neo4j.cost.ubd.cn:30884/neo4j'
        // },
        {
          label: 'yangp55',
          value: 'test.cypher.yangp55.unicom.cn:30884'
        },
      ],
      targetSession: '',
      iframeSrc: "",
    };
  },
  created() {},
  mounted() {
    const defaultUrl = this.sessionList[0].value;
    if(defaultUrl) {
      this.targetSession = defaultUrl;
      this.iframeSrc = this.setTargetUrl(defaultUrl);
    }
  },
  methods: {
    handleChangeSession(val) {
      this.iframeSrc = null;
      this.iframeSrc = this.setTargetUrl(val);
    },

    setTargetUrl(host){
      const encodeUrl = encodeURIComponent(host);
      return `${this.baseUrl}?connectURL=bolt://${host}&preselectAuthMethod=NO_AUTH`;
    }
  },
};
</script>

<style lang="less" scoped>
.graph_explore_page_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .page_top {
    width: 100%;
    height: 60px;
    background-color: rgb(246, 246, 246);
    display: flex;
    align-items: center;
    border-radius: 10px 10px 0 0;
    padding: 0 12px;
    box-sizing: border-box;
  }
}


</style>
