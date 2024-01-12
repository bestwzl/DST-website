// graph 展示
<template>
  <div id="mainGraphWrapper" class="graph_module_wrapper">
    <div id="mynetwork" :style="{width: '100%', height: '800px'}"></div>
  </div>
</template>
<script>
import Vis from "vis-network/dist/vis-network.min.js";
export default {
  name: 'visGraph',
  props: {
    schema: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      canvasHeight: 0,
      nodesArray: [],//   节点数据
      edgesArray: [],//   边数据
      network: null,
    };
  },

  watch: {
      "schema": {
        handler(nVal){
          this.formatGraphData();
        },
        deep: true,
        // immediate: true,
      }
  },

  created() {},
  mounted() {
    this.formatGraphData();
  },
  methods: {
    // 格式化graph数据
    formatGraphData(){
      this.nodesArray = [];
      this.edgesArray = [];
      const { edges, vertices } = this.schema;
      edges && edges.forEach((el) => {
        this.edgesArray.push({
          id: el.label,
          label: el.label,
          from: el.relations[0]?.src_label,
          to: el.relations[0]?.dst_label,
          arrows: "to",
          properties: el.properties || []
        })
      });
      vertices && vertices.forEach((el) => {
        this.nodesArray.push({
          id: el.label,
          label: el.label,
          properties: el.properties || []
        })
      });
      this.init();
    },

    init() {
      const container = document.getElementById("mynetwork");
      const data = {
        nodes: this.nodesArray,
        edges: this.edgesArray,
      };
      const options = {};
      this.network = new Vis.Network(container, data, options);
    },

  },
};
</script>

<style lang="less" scoped>
.graph_module_wrapper {
  width: 100%;
  height: 100%;
}
</style>


