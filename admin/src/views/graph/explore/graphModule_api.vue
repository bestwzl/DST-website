// graph 展示
<template>
  <div id="mainGraphWrapper" class="graph_module_wrapper">
    <div id="mynetwork" :style="{width: '100%', height: `${canvasHeight}px`}"></div>
  </div>
</template>
<script>
import Vis from "vis-network/dist/vis-network.min.js";
export default {
  name: 'graphModuleApi',
  props: {
    queryResult: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      canvasHeight: 0,
      visOptions: {
        // physics:{
        //   enabled: false
        // }
      },
      visNetwork: null,
      visContainer: null,
    };
  },
  watch: {
      "queryResult": {
        handler(nVal){
          // console.log("原始的数据::::::", nVal)
          const { records } = nVal;
          records && records.length > 0 && this.formatData(nVal);
        },
        deep: true,
      }
  },
  created() {},
  mounted() {
    setTimeout(() => {
      const canvasDomInfo = document.getElementById("mainGraphWrapper");
      const {offsetHeight} = canvasDomInfo;
      this.canvasHeight = `${offsetHeight}` || 0;
      this.init();
    }, 0);
  },
  methods: {
    init() {
      this.visContainer = document.getElementById("mynetwork");
    },

    // 绘制vis图
    reViewVis(data){
      this.visNetwork = new Vis.Network(this.visContainer, data, this.visOptions);
    },

    formatData(allData){
      const {records, summary} = allData;
      const dataTypes = summary.types;

      const nodeIndex = dataTypes.indexOf('Node');
      const relationIndex = dataTypes.indexOf('Relationship');

      const rawNodes = new Set();
      const rawRels = new Set();

      const rawNodesObj = new Object(); // 所有的点数据
      const rawRelsObj = new Object(); // 所有的边数据
      const nodeLabelList = new Object(); // 所有点的label
      const relaLabelList = new Object(); // 所有边的label

      records.forEach(element => {
        if (nodeIndex >= 0) {
          const node = element[nodeIndex];
          rawNodesObj[node.id] = node;
          const key = node.labels && node.labels[0] ? node.labels[0] : 'other';
          nodeLabelList[key] = this.$commonUtils.getRandomColor();
        }
        if (relationIndex >= 0) {
          const rela = element[relationIndex];
          rawRelsObj[rela.id] = rela;
        }
      });

      const getLabels = (obj) => {
        return obj.labels && obj.labels[0] ? obj.labels[0] : 'other';
      }

      for(let k in rawRelsObj) {
        const {start_node , end_node, type } = rawRelsObj[k];
        rawNodesObj[start_node.id] = start_node;
        rawNodesObj[end_node.id] = end_node;

        const key1 = getLabels(start_node);
        nodeLabelList[key1] = this.$commonUtils.getRandomColor();
        const key2 = getLabels(end_node);
        nodeLabelList[key2] = this.$commonUtils.getRandomColor();

        const key = type || 'other';
        relaLabelList[key] = this.$commonUtils.getRandomColor();
      }

      for(let k in rawNodesObj) {
        const{ id, labels } = rawNodesObj[k];
        rawNodes.add({
          id: id,
          // label: labels[0] || '',
          label: id+'',
          color: {
            background: nodeLabelList[labels[0] || 'other']
          },
        })
      }

      for(let k in rawRelsObj) {
        const{ id, type, start_node, end_node } = rawRelsObj[k];
        rawRels.add({
          id: id,
          label: type,
          from: start_node.id,
          to: end_node.id,
          arrows: "to",
          color: {
            background: relaLabelList[type || 'other']
          },
        })
      }

      // console.log("点数据:::::", rawNodesObj)
      // console.log("边数据:::::", rawRelsObj)
      // console.log("点label:::::", nodeLabelList)
      // console.log("边label:::::", relaLabelList)

      const visData = {
        nodes: [...rawNodes],
        edges: [...rawRels],
      };

      // console.log("转换完成的数据::::", visData)

      this.reViewVis(visData);
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


