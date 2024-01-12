// graph 展示
<template>
  <div id="mainGraphWrapper" class="graph_module_wrapper">
    <div id="mynetwork" :style="{width: '100%', height: `${canvasHeight}px`}"></div>
  </div>
</template>
<script>
import { flatten, map, take } from 'lodash';
import Vis from "vis-network/dist/vis-network.min.js";
export default {
  name: 'graphModule',
  props: {
    queryResult: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      canvasHeight: 0,
      // 节点数据
      nodesArray: [
        {
          id: 0,
          label: "FE",
          color: { background: "#fd91b7" },
        },
        {
          id: 1,
          label: "HTML",
          color: { background: "#7ed6df" },
        }
      ],

      // 边数据
      edgesArray: [
        { id: "e1", from: 0, to: 1, arrows: "to", label: "结构容器" },
        { id: "e2", from: 1, to: 0, arrows: "to", label: "核心" },
      ],

      visOptions: {},
      visNetwork: null,
      visContainer: null,
    };
  },
  watch: {
      "queryResult": {
        handler(nVal){
          const { records } = nVal;
          // console.log("333333333::::::", records)
          records && records.length > 0 && this.extractRawNodesAndRelationShipsFromRecords(records);
        },
        deep: true,
        immediate: true,
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

    // 从记录中提取原始节点和关系
    extractRawNodesAndRelationShipsFromRecords(records, maxFieldItems = 500) {
      const items = new Set();
      const paths = new Set();
      const segments = new Set();
      const rawNodes = new Set();
      const rawRels = new Set();

      for (const record of records) {
        for (const key of record.keys) {
          items.add(record.get(key));
        };
      };

      const flatTruncatedItems = flatten(
        map([...items], item =>
          maxFieldItems && Array.isArray(item) ? take(item, maxFieldItems) : item
        )
      );
      const findAllEntities = (item) => {
        if (item.__isRelationship__) {
          rawRels.add(item);
          return;
        };
        if (item.__isNode__) {
          rawNodes.add(item);
          return;
        };
        if (item.__isPath__) {
          paths.add(item);
          return;
        };

        if (Array.isArray(item)) {
          for (const subItem of item) {
            findAllEntities(subItem);
          };
          return;
        };
        if (item && typeof item === 'object') {
          for (const subItem of Object.values(item)) {
            findAllEntities(subItem);
          };
          return;
        };
      };

      findAllEntities(flatTruncatedItems);

      for (const path of paths) {
        if (path.start) {
          rawNodes.add(path.start);
        };
        if (path.end) {
          rawNodes.add(path.end);
        };
        for (const segment of path.segments) {
          segments.add(segment);
        };
      };

      for (const segment of segments) {
        if (segment.start) {
          rawNodes.add(segment.start);
        };
        if (segment.end) {
          rawNodes.add(segment.end);
        };
        if (segment.relationship) {
          rawRels.add(segment.relationship);
        };
      };

      this.nodesArray = [...rawNodes];
      this.edgesArray = [...rawRels];

      const visData = {
        nodes: [...rawNodes],
        edges: [...rawRels],
      };

      // console.log("111111111111111::::", visData)

      this.reViewVis(visData);
    }

  },
};
</script>

<style lang="less" scoped>
.graph_module_wrapper {
  width: 100%;
  height: 100%;
}
</style>


