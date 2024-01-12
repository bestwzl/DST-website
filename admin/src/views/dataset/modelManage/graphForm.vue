// graph表单
<template>
  <div class="graph_form_wrapper">
    <div class="graph_form_herder">
      <el-form :model="defaultForm" :rules="rules" ref="defaultForm" label-width="100px">
        <el-form-item label="Graph" prop="graph_id">
          <el-select v-model="defaultForm.graph_id" placeholder="请选择graph" style="width: 100%;" @change="handleChangeGraph">
            <el-option
              v-for="ele in graphList"
              :key="ele.id"
              :label="ele.name"
              :value="ele.id"
              :disabled="!ele.schema"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div class="graph_form_body">
      <NodeFormItem v-for="el in nodeList" :key="el.id" :node-info="el" @doSubmit="doSubmit"/>
    </div>
  </div>

</template>
<script>
import NodeFormItem from './nodeFormItem.vue';
// import { allAnalyzeList } from './testData'
export default {
  name: 'analyzeManage_defaultForm',
  components: {
    NodeFormItem
  },
  data() {
    return {
      defaultForm: {
        graph_id: '',
      },
      rules: {
        graph_id: [{ required: true, message: '请选择graph', trigger: 'change' },],
      },
      formItemList: [], // 表单选项
      graphList: [], // graph列表
      nodeList: [],
      lineList: [],
      targetGrap: {},
      targetNodeParams: {}
    };
  },

  created() {},
  mounted() {
    this.getGraphList();
  },
  methods: {

    handleChangeGraph(val) {
      const targetGraph = this.graphList.find(ele => ele.id === val);
      this.targetGraph = targetGraph;
      const { edges, vertices } = targetGraph.schema;
      this.nodeList = vertices || []; // 节点数据
      this.lineList = edges || []; // 边数据
    },

    // 获取session列表
    getGraphList() {
      const params = {
        skip: 0,
        limit: 999
      }
      this.$httpGet("getGraphList", params)
        .then((res) => {
          this.graphList = res.graphs;
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },


    // 被动校验
    handleSaveBtn(){
      this.$refs.defaultForm.validate((valid) => {
        if (valid) {
          this.$bus.emit("nodeFormValidate");
        } else {
          console.log("校验错误!!");
          return false;
        }
      });
    },

    // 提交并校验
    doSubmit(params){
      const newObj = {
        ...this.targetNodeParams,
        ...params,
      }
      this.targetNodeParams = newObj;
      let objLength = Object.keys(this.targetNodeParams).length;
      if (objLength === this.nodeList.length) {
        this.submitForm('defaultForm', params);
      }
    },

    //点击提交之后校验
    submitForm(formName, params) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const graphParam = {
            dataList: params,
            targetGraph: this.targetGraph,
            ...this.defaultForm
          }
          this.$emit("handleSubmitGraph", graphParam)
        } else {
          this.$emit("handleVerification", graphParam)
          console.log("校验错误!!");
          return false;
        }
      });
    },

  },
};
</script>

<style lang="less" scoped>
.graph_form_wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  .graph_form_herder {
    height: 60px;
    width: 100%;
    flex-shrink: 0;
  }
  .graph_form_body {
    flex: 1;
    padding-left: 20px;
    overflow-y: auto;
    ::v-deep .el-form-item__label {
      padding: 0;
    }
  }

}


</style>
