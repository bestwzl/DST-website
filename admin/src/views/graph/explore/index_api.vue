// graph explore 后端接口请求
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
        <i v-show="!queryBtnLoading" class="el-icon-s-promotion"></i>
        <span v-show="!queryBtnLoading">send</span>
        <div v-if="queryBtnLoading" class="send_btn_mark">
          <i class="el-icon-loading"></i>
        </div>
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
            <GraphModule :queryResult="queryResultList" />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <p slot="label" class="tab_item">
            <i class="el-icon-c-scale-to-original" style="font-size: 30px; padding-top: 10px;"></i>
            <span style="padding-bottom: 10px;">Table</span>
          </p>
          <div class="tab_content">
            <TableModule :queryResult="queryResultList" />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <p slot="label" class="tab_item">
            <i class="el-icon-tickets" style="font-size: 30px; padding-top: 10px;"></i>
            <span style="padding-bottom: 10px;">Text</span>
          </p>
          <div class="tab_content">
            <TextModule :queryResult="queryResultList" />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <p slot="label" class="tab_item">
            <i class="el-icon-data-line" style="font-size: 30px; padding-top: 10px;"></i>
            <span style="padding-bottom: 10px;">Code</span>
          </p>
          <div class="tab_content">
            <CodeModule :queryResult="queryResultList" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import { queryResult3 } from './test3'
import GraphModule from './graphModule_api.vue'
import TableModule from './tableModule.vue';
import TextModule from './textModule.vue';
import CodeModule from './codeModule.vue';
export default {
  name: 'graphExploreApi',
  components: {
    GraphModule,
    TableModule,
    TextModule,
    CodeModule
  },
  data() {
    return {
      queryBtnLoading: false,
      targetSession: '',
      queryString: 'MATCH (n) RETURN n LIMIT 15',

      queryResultList: {}, // 查询结果
      sessionList: [],
    };
  },
  created() {},
  mounted() {
    this.getSessionList();
  },
  methods: {
    handleChangeSession(val) {
      //   this.queryResultList = queryResult3;
    },

    // 获取session列表
    getSessionList() {
      const params = {
        skip: 0,
        limit: 999
      }
      this.$httpGet("getSessionList", params)
        .then((res) => {
            const list = res.sessions;
            const targetList = [];
            list.forEach(ele => {
              const {name, id} = ele;
              name && id && targetList.push({
                label: name || '',
                value: id || '',
              })
            })
            this.sessionList = targetList;
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },


    handleClickQuery() {
      // queryInteractive
      const session = this.targetSession;
      const queryString = this.queryString;
      if (!session) {
        this.$message({
          message: '请选择Session',
          type: 'warning'
        });
        return;
      }
      if(!queryString) {
        this.$message({
          message: '请输入查询语句。',
          type: 'warning'
        });
        return;
      }
      this.doQuery(session, queryString)
    },

    doQuery(session, queryString){
      this.queryBtnLoading = true;
      const allParams = {
        query: queryString
      }
      this.$httpPost("queryInteractive", allParams, {}, {id:`${session}/query`})
        .then((res) => {
          const resultData = res || {};
          this.queryResultList = resultData;
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        })
        .finally(() => {
          this.queryBtnLoading = false;
        });
    },

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
    max-height: 480px;
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
      position: relative;
      .send_btn_mark {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
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
          transform: scale(1.2);
        }
        span {
          opacity: 1;
        }
      }
    }
  }
  .page_content {
    flex: 1;
    overflow: hidden;
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
