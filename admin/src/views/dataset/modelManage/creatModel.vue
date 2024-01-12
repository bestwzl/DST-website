// model_type
<template>
  <div class="analyzePageWrapper">
    <div class="content-wrapper" id="sessionContentWrapper">
      <split-pane
        split="vertical"
        :min-percent="minPercent"
        :default-percent="minPercent"
      >
        <template slot="paneL">
          <div class="session_list_wrapper">
            <div class="analyze_form_wrapper">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="模型名称：" prop="model_name">
                  <el-input v-model="ruleForm.model_name" placeholder="请输入模型名称" clearable style="width: 100%"></el-input>
                </el-form-item>

                <el-form-item label="模型描述：" prop="model_desc">
                  <el-input
                    type="textarea"
                    :rows="2"
                    v-model="ruleForm.model_desc"
                    placeholder="请输入模型的描述信息"
                    clearable
                    style="width: 100%"
                  ></el-input>
                </el-form-item>

                <el-form-item label="nameSpace：" prop="namespace_id">
                  <el-select v-model="ruleForm.namespace_id" placeholder="请选择NameSpace" clearable style="width: 100%">
                    <el-option v-for="item in nameSpaceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="算法" prop="model_type">
                  <el-select v-model="ruleForm.model_type" placeholder="请选择算法" style="width: 100%;" @change="handleChangeAnalyze">
                    <el-option
                      v-for="ele in analyzeList"
                      :key="ele.id"
                      :label="ele.label"
                      :value="ele.id"
                      :disabled="ele.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class="analyze_list_wrapper">
              <FormByData
                v-if="formItemList && formItemList.length > 0"
                ref="formDomByData"
                :formItemList="formItemList"
                :btnLoading.sync="btnLoading"
                @handleVerification="handleVerification"
                @handleSubmit="handleSubmitFormItem"
              />
            </div>
          </div>
        </template>

        <template slot="paneR">
          <GraphForm ref="graphFromDom" @handleSubmitGraph="handleSubmitGraph" />
        </template>
      </split-pane>
    </div>

  </div>
</template>
<script>
import splitPane from 'vue-splitpane';
import FormByData from '../../../components/formItem.vue';
import TaskItem from './taskItem.vue';
import AnalyzeItem from './analyzeItem.vue';
import GraphForm from './graphForm.vue';
// import { allAnalyzeList } from './testData'
export default {
  name: 'creatModel',
  components: {
    splitPane,
    FormByData,
    TaskItem,
    AnalyzeItem,
    GraphForm
  },
  props: {
    nameSpaceList: {
      type: Array,
      required: false,
      default: []
    },
  },
  data() {
    return {
      ruleForm: {
        model_name: '', // 模型名称
        model_desc: '', // 模型描述
        model_type: '', // 选择算法
        namespace_id: '', // nameSpace
      },
      rules: {
        model_name: [{ required: true, message: '请为该模型取一个名称', trigger: 'change' },],
        model_desc: [{ required: true, message: '请补充模型描述', trigger: 'change' },],
        model_type: [{ required: true, message: '请选择算法', trigger: 'change' },],
        namespace_id: [{ required: true, message: '请选择namespace', trigger: 'change' },],
      },
      isTaskStackVisible: false,
      btnLoading: false,
      formItemList: [], // 表单选项
      analyzeList: [],
      minLeftWidth: 500, // 左侧最小宽度
      minPercent: 30,
      leftParams: {}, // 左侧表单的数据
    };
  },
  watch: {
      "ruleForm.model_type": {
        handler(nVal){
          nVal && nVal.length > 0 && this.handleChangeAnalze(nVal);
        },
        deep: true,
        immediate: true,
      },
  },
  created() {},
  mounted() {
    this.setDefaultPercent();
    this.getModelList();
  },
  methods: {
    setDefaultPercent() {
      const domWrapper = document.getElementById('sessionContentWrapper');
      const defaultPercent = (this.minLeftWidth / domWrapper.offsetWidth).toFixed(2) * 100;
      this.minPercent = defaultPercent || 30;
    },


    // 选中某个 Analyze
    handleChangeAnalyze(row) {
      this.ruleForm.model_type = row;
      // console.log("选中的Analyze::",row);
    },

    // 只对外层form进行校验
    handleVerification(){
      this.$refs.ruleForm.validate();
    },

    // 点击保存按钮
    handleSaveBtn(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$refs.formDomByData.formByDataSubmit();
        } else {
          console.log("校验错误!!");
          return false;
        }
      });
    },

    // 左侧校验通过之后 触发右侧的校验
    handleSubmitFormItem(params) {
      const leftDatas = {
        hyper_params: {...params},
        ...this.ruleForm
      }
      this.leftParams = leftDatas
      this.$refs.graphFromDom.handleSaveBtn();
    },

    // 获取 算法列表
    getModelList() {
      this.$httpGet('getModelConfig', {}, {}, {})
        .then((res) => {
          this.analyzeList = res || [];
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

    // 右侧校验完成
    handleSubmitGraph(graphParams) {
      const { hyper_params, model_name, model_desc, model_type, namespace_id } = this.leftParams;
      const { graph_id, dataList, targetGraph } = graphParams;
      const allParams = {
        name: model_name,
        description: model_desc,
        model_type,
        namespace_id,
        hyper_params,
        graph_id,
        data_description: this.formatData(targetGraph, dataList),
      }
      // console.log("提交的数据::::::：：：：：：：：", allParams);
      this.submitCreatModel(allParams);
    },

    formatData(targetGraph, dataList) {
      const { schema } = targetGraph
      const edgesList = schema?.edges || [];
      const nodes = [];
      const data_split = [];
      const edges = [];

      for(let key in dataList) {
        const { train, val, test, all, checkedProperties } = dataList[key];
        nodes.push({
          label: key,
          features: [...checkedProperties]
        })
        data_split.push({
          label: key,
          group: {
            train,
            val,
            test,
            all
          }
        })
      }

      edgesList.forEach(element => {
        const {label, relations} = element;
        relations && relations.forEach(el => {
          const {dst_label, src_label} = el;
          edges.push({
            label,
            source: src_label,
            target: dst_label
          })
        })
      })

      const result = {
        nodes,
        data_split,
        edges
      };

      return result;
    },

    featureNumChanged(total) {
      const target = this.formItemList.find(el=>el.field === 'features_num');
      if(target) {
        target.fieldValue = total;
      };
    },



    //点击提交之后校验
    submitCreatModel(allParams) {
      this.btnLoading = true;
      this.$httpPost("creatModel", allParams, {}, {})
        .then((res) => {
          this.$emit("closeAndRefreshList");
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },

    // 选择不同的算法使用对应的表单
    handleChangeAnalze(val) {
      this.formItemList = [];
      const targetForm = this.analyzeList.find(el => el.id === val);
      if (targetForm && targetForm.formParams && targetForm.formParams.length > 0 ) {
        this.formItemList = targetForm.formParams
      }

      // console.log("自定义表单：：：：：：：：：：：", this.formItemList)
    },

  },
};
</script>

<style lang="less" scoped>
.analyzePageWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .task-stack_btn {
    position: absolute;
    top: 20px;
    right: -21px;
    padding: 5px 20px;
    border-radius: 10px 0px 0px 10px;
    background-color: rgba(250, 250, 250, 0.958);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--border-color);
    cursor: pointer;
  }
  .title_wrapper {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
  }
  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .session_list_wrapper {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .analyze_form_wrapper {
        min-height: 60px;
        padding-top: 20px;
        padding-right: 20px;
      }
      .analyze_list_wrapper {
        width: 100%;
        box-sizing: border-box;
        flex: 1;
        overflow-y: auto;
        align-items: center;
        justify-content: center;
        padding: 20px 20px 20px 0px;

        .analyze_item_wrapper {
          width: 100%;
          box-sizing: border-box;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          transition: 0.5s;
          position: relative;
          .analyze_item_mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #fff;
          }
        }
        .item_normal {
          border: 1px solid var(--border-color);
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          cursor: pointer;
          &:hover{
            // transform: scale(1.03);
            width: calc(100% + 15px);
          }
        }
        .item_disabled {
          background-color: rgb(238, 238, 238);
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          opacity: 0.8;
          user-select: none;
          cursor: not-allowed;
        }

        .item_avtive {
          border: 1px solid #009fff;
          box-shadow: 0 2px 12px 0 #008ee05e;
          // transform: scale(1.03);
          width: calc(100% + 15px);
        }
      }
    }
  }
}
</style>

<style>
.task-stack_list_wrapper {
  background-color: rgb(255, 255, 255);
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
}
</style>
