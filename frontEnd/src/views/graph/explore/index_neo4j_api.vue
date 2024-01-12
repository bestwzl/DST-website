// graph explore 自定义连接neo4j服务
<template>
  <div class="graph_explore_page_wrapper">
    <div class="page_top">
      <div class="page_top_session">
        <p class="page_top_session_label">Session:</p>
        <el-select v-model="targetSession" placeholder="请选择session" @change="handleChangeSession">
          <el-option
            v-for="el in sessionList"
            :key="el.value"
            :label="el.label"
            :value="el.value">
          </el-option>
        </el-select>
      </div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 5}"
        placeholder="请输入内容"
        v-model="queryString">
      </el-input>
      <div class="send_btn_wrapper" @click="handleClickQuery">
        <i class="el-icon-s-promotion"></i>
        <span>send</span>
      </div>
    </div>
    <div class="page_content">
      <el-tabs tab-position="left" style="height: 100%;">
        <el-tab-pane>
          <p slot="label" class="tab_item">
            <i class="el-icon-share" style="font-size: 30px; padding-top: 10px;"></i>
            <span style="padding-bottom: 10px;">graph</span>
          </p>
          <div class="tab_content">
            <GraphModule :queryResult="queryResult"/>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <p slot="label" class="tab_item">
            <i class="el-icon-c-scale-to-original" style="font-size: 30px; padding-top: 10px;"></i>
            <span style="padding-bottom: 10px;">Table</span>
          </p>
          <div class="tab_content">
            <TableModule />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <p slot="label" class="tab_item">
            <i class="el-icon-tickets" style="font-size: 30px; padding-top: 10px;"></i>
            <span style="padding-bottom: 10px;">Text</span>
          </p>
          <div class="tab_content">
            <TextModule />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <p slot="label" class="tab_item">
            <i class="el-icon-data-line" style="font-size: 30px; padding-top: 10px;"></i>
            <span style="padding-bottom: 10px;">Code</span>
          </p>
          <div class="tab_content">
            <CodeModule />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import { flatten } from 'lodash';
import neo4j from 'neo4j-driver';
import GraphModule from './graphModule.vue';
import TableModule from './tableModule.vue';
import TextModule from './textModule.vue';
import CodeModule from './codeModule.vue';
export default {
  name: 'graphExplore',
  components: {
    GraphModule,
    TableModule,
    TextModule,
    CodeModule
  },
  data() {
    return {
      queryString: 'MATCH (n) RETURN n LIMIT 15',
      category: [],
      dirver: null,
      queryResult: {
        records: []
      }, // 查询结果
      sessionList: [
        {
          label: 's_test',
          value: 'test.cypher.gcp.unicom.cn:30884'
        },
        {
          label: 's_test2',
          value: 'test2.cypher.gcp.unicom.cn:30884'
        },
        {
          label: 's_neo4j',
          value: 'neo4j://neo4j.cost.ubd.cn:30884'
        },
        {
          label: 's_neo4j_11',
          value: 'neo4j11://neo4j.cost.ubd.cn:30884/neo4j'
        },
        {
          label: 'yangp55',
          value: 'test.cypher.yangp55.unicom.cn:30884'
        },
      ],
      targetSession: ''
    };
  },
  created() {},
  mounted() {
    // const neo4jUrl = 'neo4j://neo4j11.cost.ubd.cn:30884';
    const neo4jUrl = 'neo4j://neo4j.cost.ubd.cn:30884';
    const accountInfo = {
      account: 'neo4j',
      password: 'Unicom@2022'
    }
    this.executeCypher(neo4jUrl, accountInfo);
  },
  methods: {
    handleChangeSession(val) {
      
    },
    executeCypher(neo4jUrl, accountInfo) {
      const {account, password} = accountInfo
      this.dirver = neo4j.driver(neo4jUrl, neo4j.auth.basic(account, password));
      // console.log("连接状态：", this.dirver);
    },

    handleClickQuery(){
      const queryString = this.queryString;
      if (queryString) {
        this.nodesArray = []; // 节点数据
        this.edgesArray = []; // 边数据
        this.category = [];   // 类型
        const session = this.dirver.session();
        session.run(queryString, {}).then((result) => {
          this.queryResult = result;
        }).catch((err) => {
          this.$message({
            message: "cypher执行失败",
            type: "error",
          });
          // console.log("cypher执行失败：", err);
          // this.driver.close();
        }).finally(() => {
          session.close();
          this.closeLoading(false);
        });
      } else {
        this.$message({
          message: "请先输入查询语句",
          type: "error",
        });
      }
    },

    // 判断是否有可展示的vis类型数据
    resultHasNodes (request) {
      if (!request) return false;
      const { result = {} } = request;
      if (!result || !result.records) return false;
      const { records = undefined } = result;
      if (!records || !records.length) return false;
      const keys = records[0].keys;
      for (let i = 0; i < records.length; i++) {
        const graphItems = keys.map((key) => records[i].get(key));
        const items = this.recursivelyExtractGraphItems(graphItems);
        const flat= this.flattenArrayDeep(items);
        const nodes = flat.filter(
          item => item.__isNode__ || item.__isPath__
        )
        if (nodes.length) return true;
      }
      return false;
    },

    flattenArrayDeep () {
      let toFlatten = arr;
      let result = [];
      while (toFlatten.length > 0) {
        result = [...result, ...filter(toFlatten, item => !Array.isArray(item))];
        toFlatten = flatten(filter(toFlatten, Array.isArray));
      }
      return result;
    },

    recursivelyExtractGraphItems(item) {
      if (item.__isNode__) return item;
      if (item.__isRelationship__) return item;
      if (item.__isPath__) return item;
      if (Array.isArray(item)) {
        return item.map(i => this.recursivelyExtractGraphItems(i));
      }
      if (['number', 'string', 'boolean'].indexOf(typeof item) !== -1) return false;
      if (item === null) return false;
      if (typeof item === 'object') {
        return Object.keys(item).map(key =>
          this.recursivelyExtractGraphItems(item[key])
        )
      }
      return item;
    },

    closeLoading(status) {
      // console.log('closeLoading:', status)
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
    min-height: 80px;
    max-height: 4800px;
    padding-bottom: 20px;
    flex-shrink: 0;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    .page_top_session {
      margin-right: 10px;
      .page_top_session_label {
        font-size: 20px;
        font-weight: 500;
      }
    }
    .el-textarea {
      ::v-deep .el-textarea__inner {
        min-height: 80px!important;
        max-height: 450px!important;
        font-size: 20px;
      }
    }
    .send_btn_wrapper {
      width: 60px;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      i {
        font-size: 30px;
        color: #009fff;
        transition: 0.3s;
      }
      span {
        color: #009fff;
        font-size: 12px;
        opacity: 0;
        transition: 0.5s;
      }
      &:hover {
        i {
          transform: scale(1.1);
        }
        span {
          opacity: 1;
        }
      }
    }
  }
  .page_content {
    flex: 1;
    .tab_item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .tab_content {
      width: 100%;
      height: 100%;
    }
  }
}


</style>

<style lang="less">
    .page_content {
      flex: 1;
      .el-tabs--left {
        .el-tabs__header.is-left {
          margin-right: 5px;
          .el-tabs__nav-wrap.is-left{
            .el-tabs__nav-scroll {
              .el-tabs__nav.is-left {
                .el-tabs__active-bar {
                  height: 80px!important;
                }
                .el-tabs__item {
                  padding: 0 10px;
                  height: 100%;
                  font-size: 12px;
                  color: var(--font-color-3);
                }
                .is-active {
                  color: #409EFF;
                }
              }
            }
          }
        }
        .el-tabs__content {
          height: 100%;
          .el-tab-pane {
            height: 100%;
            overflow: auto;
          }
        }
      }
    }
</style>
