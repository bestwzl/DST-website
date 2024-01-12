// code 展示
<template>
  <div class="code_module_wrapper">
    <split-pane
      split="vertical"
      :min-percent="30"
      :default-percent="40"
      style="width: 100%;"
    >
      <template slot="paneL">
        <div class="code_request_wrapper">
          <div class="box_header_wrapper">
            请求数据
          </div>
          <div class="box_body_wrapper">
            <div v-html="queryResult.summary"></div>
          </div>
        </div>
      </template>
      <template slot="paneR">
        <div class="code_response_wrapper">
          <div class="box_header_wrapper">
            响应数据
          </div>
          <div class="box_body_wrapper">
            <div v-html="queryResult.records"></div>
          </div>
        </div>
      </template>
    </split-pane>

  </div>
</template>
<script>
import splitPane from 'vue-splitpane';
export default {
  name: 'codeModule',
  components: {
    splitPane,
  },
  props: {
    queryResult: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      name: '',
    };
  },
  created() {},
  mounted() {

  },
  methods: {
    func() {

    },

  },
};
</script>

<style lang="less" scoped>
.code_module_wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .code_request_wrapper,
  .code_response_wrapper {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .box_header_wrapper {
      width: 100%;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-color);
      flex-shrink: 0;
    }
    .box_body_wrapper {
      flex: 1;
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
}
</style>


