// session管理
<template>
  <div class="main_tab_wrapper">
    <div class="tool_wrapper">
      <div>session & graph</div>
    </div>

    <div class="content-wrapper" id="sessionContentWrapper">
      <split-pane
        split="vertical"
        :min-percent="minPercent"
        :default-percent="minPercent"
      >
        <template slot="paneL">
          <div class="session_list_wrapper">
            <SessionItem
              v-for="ele in sessionList"
              :key="ele.session"
              :itemInfo="ele"
              :allGraphList="allGraphList"
              :isAvtive="targetSessionDetail.session === ele.session"
              @handleChange="handleChangeSession"/>
          </div>
        </template>

        <template slot="paneR">
          <SessionDetail :allGraphList="allGraphList" :targetSessionDetail="targetSessionDetail"/>
        </template>
      </split-pane>
    </div>

  </div>
</template>
<script>
import splitPane from 'vue-splitpane';
import SessionItem from './sessionItem.vue';
import SessionDetail from './sessionDetail.vue';
export default {
  name: "graphConfig",
  components: {
    splitPane,
    SessionItem,
    SessionDetail
  },
  data() {
    return {
      tableLoading: false,
      saveBtnLoading: false,
      tableData: [
        {
          session: 'session_1',
          graph: 6,
          status: 'normal'
        },
        {
          session: 'session_2',
          graph: 7,
          status: 'normal'
        },
        {
          session: 'session_3',
          graph: '',
          status: 'normal'
        },
        {
          session: 'session_4',
          graph: '',
          status: 'normal'
        },
        {
          session: 'session_5',
          graph: '',
          status: 'normal'
        }
      ],
      sessionList: '',
      listTotal: 0,
      allGraphList: [],
      minLeftWidth: 400, // 左侧最小宽度
      minPercent: 30,
      targetSessionDetail: {}, // 选中要展示详情的
    };
  },
  created() {},
  mounted() {
    this.setDefaultPercent();
    this.getSessionList();
    this.getGraphList();
  },
  methods: {

    setDefaultPercent() {
      const domWrapper = document.getElementById('sessionContentWrapper');
      const defaultPercent = (this.minLeftWidth / domWrapper.offsetWidth).toFixed(2) * 100;
      this.minPercent = defaultPercent || 30;
    },

    // 获取session列表
    getSessionList(){
      const params = {
        skip: 0,
        limit: 999
      }
      this.$httpGet("getSessionList", params)
        .then((res) => {
            // console.log('请求结果：：：：：', res);
            const list = res.sessions;
            const targetList = [];
            list.forEach(ele => {
              const {name, gid} = ele;
              targetList.push({
                ...ele,
                session: name || '',
                graph: gid || '',
                status: 'normal'
              })
            })
            this.sessionList = targetList;
            this.targetSessionDetail = this.sessionList[0] || {}
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

    // 获取图列表
    getGraphList() {
      const params = {
        skip: 0,
        limit: 9999
      }
      this.tableLoading = true;
      this.$httpGet("getGraphList", params)
        .then((res) => {
            const newArr = res.graphs || [];
            const graphList = []
            newArr.forEach((el, index) => {
              graphList.push({
                label: el.name,
                value: el.id
              })
            })
            this.allGraphList = graphList;

        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    // 选中
    handleChangeSession(row) {
      this.targetSessionDetail = row;
    },

  },
};
</script>

<style lang="less" scoped>
.main_tab_wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .tool_wrapper {
    flex-direction: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed #ddd;
    padding-bottom: 12px;
    .tool_input_wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }

  .content-wrapper {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }

  .session_list_wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    overflow-y: auto;
  }
  .detail_info_wrapper {
    flex: 1;
    height: 100%;
    background-color: antiquewhite;
  }
}


</style>


