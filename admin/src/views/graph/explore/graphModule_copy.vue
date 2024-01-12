// graph 展示
<template>
  <div id="mainGraphWrapper" class="graph_module_wrapper">
    <div id="mynetwork" :style="{width: '100%', height: `${canvasHeight}px`}"></div>
  </div>
</template>
<script>
import Vis from "vis-network/dist/vis-network.min.js";
export default {
  name: 'graphModule',
  data() {
    return {
      canvasHeight: 0,
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
        },
        {
          id: 2,
          label: "JavaScript",
          color: { background: "#d294e2" },
        },
        {
          id: 3,
          label: "CSS",
          color: { background: "#ffb300" },
        },

        {
          id: 4,
          label: "python",
          color: { background: "#ffb300" },
        },
        {
          id: 5,
          label: "sql",
          color: { background: "#ffb300" },
        },
        {
          id: 6,
          label: "django",
          color: { background: "#ffb300" },
        },
        {
          id: 7,
          label: "panda",
          color: { background: "#ffb300" },
        },
      ],
      //   关系线数组
      edgesArray: [
        { id: "e1", from: 0, to: 1, arrows: "to", label: "结构容器" },
        { id: "e2", from: 1, to: 0, arrows: "to", label: "核心" },
        { id: "e3", from: 0, to: 2, arrows: "to", label: "函数" },
        { id: "e4", from: 0, to: 3, arrows: "to", label: "样式表" },
        { id: "e5", from: 4, to: 5, arrows: "to", label: "数据库" },
        { id: "e6", from: 4, to: 6, arrows: "to", label: "框架" },
        { id: "e7", from: 4, to: 7, arrows: "to", label: "方法库" },
      ],

      options: {},
      network: null,


      testData: {
        "schema":
          {
              "edges":
              [
                  {
                      "label": "know",
                      "properties":
                      [
                          {
                              "comment": "",
                              "id": 0,
                              "is_primary_key": false,
                              "name": "eid",
                              "type": "LONG"
                          }
                      ],
                      "relations":
                      [
                          {
                              "dst_label": "person",
                              "src_label": "person"
                          }
                      ]
                  }
              ],
              "vertices":
              [
                  {
                      "label": "person",
                      "properties":
                      [
                          {
                              "comment": "",
                              "id": 0,
                              "is_primary_key": false,
                              "name": "name",
                              "type": "STRING"
                          },
                          {
                              "comment": "",
                              "id": 1,
                              "is_primary_key": false,
                              "name": "id",
                              "type": "LONG"
                          }
                      ]
                  }
              ]
          }
      },



    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      const canvasDomInfo = document.getElementById("mainGraphWrapper");
      const {offsetHeight} = canvasDomInfo;
      this.canvasHeight = `${offsetHeight}` || 0;
      this.init();
    }, 0)
  },
  methods: {
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


