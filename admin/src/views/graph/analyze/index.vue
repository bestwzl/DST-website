// analyze
<template>
  <div class="analyzePageWrapper">
    <div class="title_wrapper">
      session & graph
    </div>

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
                <el-form-item label="Session" prop="session">
                  <el-select v-model="ruleForm.session" placeholder="请选择session" style="width: 100%;">
                    <el-option v-for="ele in sessionList" :key="ele.value" :label="ele.label" :value="ele.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class="analyze_list_wrapper">
              <div
                v-for="el in analyzeList"
                :key="el.id"
                @click="handleChangeAnalyze(el)"
                class="analyze_item_wrapper"
                :class="el.id === targetAnalyzeDetail.id ? 'item_avtive' : (isTheItemDisabled || el.disabled) ? 'item_disabled' : 'item_normal'"
              >
                {{ el.label }}
                <div v-if="isTheItemDisabled && el.taskStatus === 'running'" class="analyze_item_mask">
                  <span>算法执行中，请稍候。。。</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template slot="paneR">
          <!-- <FormByData
            v-if="formItemList && formItemList.length > 0"
            :formItemList="formItemList"
            :btnLoading.sync="btnLoading"
            @handleVerification="handleVerification"
            @handleSubmit="handleSubmit"
          /> -->

          <div class="form_content_box">
            <div class="top_form_wrapper">
              <FormByData
                v-if="formItemList && formItemList.length > 0"
                ref="customFrom"
                :formItemList="formItemList"
                :btnLoading.sync="btnLoading"
                @handleVerification="handleVerification"
                @handleSubmit="handleSubmit"
              />
            </div>
           <div class="tool_wrapper">
            <el-button
              type="primary"
              :loading="btnLoading"
              @click="submitCustomForm('customFrom')"
            >
              执 行
            </el-button>
           </div>
          </div>

        </template>
      </split-pane>
    </div>
    <div v-if="taskStackList.length > 0" class="task-stack_btn" @click="isTaskStackVisible = true">
      <span style="font-size: 24px;"><i class="el-icon-loading"></i></span>
      <span style="font-size: 12px;">任务栈</span>
    </div>

    <el-drawer
      title="执行中的任务"
      :visible.sync="isTaskStackVisible"
      direction="rtl"
    >
      <div class="task-stack_list_wrapper">
        <TaskItem
          v-for="el in taskStackList"
          :key="el.temporaryId"
          :taskInfo="el"
          :sessionList="sessionList"
        />

        <!-- <TaskItem v-for="el in 30" :key="el" :sessionList="sessionList" :taskInfo="{ session: el}" /> -->
      </div>
    </el-drawer>
  </div>
</template>
<script>
import splitPane from 'vue-splitpane';
// import FormByData from './formItem.vue';
import FormByData from '../../../components/formItem.vue';
import TaskItem from './taskItem.vue';
import AnalyzeItem from './analyzeItem.vue';
// import { allAnalyzeList } from './testData'
export default {
  name: 'analyzeManage',
  components: {
    splitPane,
    FormByData,
    TaskItem,
    AnalyzeItem
  },
  data() {
    return {
      ruleForm: {
        session: '',
        analyze: '',
      },
      rules: {
        session: [
          { required: true, message: '请选择session', trigger: 'change' },
        ],
      },
      isTaskStackVisible: false,
      btnLoading: false,
      formItemList: [], // 表单选项
      analyzeList: [],
      minLeftWidth: 400, // 左侧最小宽度
      minPercent: 30,
      sessionList: [], // session列表
      targetAnalyzeDetail: {}, // 选中要展示详情的
      taskStackList: [],
    };
  },
  watch: {
      "ruleForm.analyze": {
        handler(nVal){
          nVal && nVal.length > 0 && this.handleChangeAnalze(nVal);
          this.isItemDisabled();
        },
        deep: true,
        immediate: true,
      },
      "ruleForm.session": {
        handler(nVal){
          this.isItemDisabled();
        },
        deep: true,
        immediate: true,
      },
      "taskStackList": {
        handler(nVal){
          nVal && nVal.length > 0 && this.handleChangeTask(nVal);
          this.isItemDisabled();
        },
        deep: true,
        immediate: true,
      },
  },
  created() {},
  mounted() {
    this.setDefaultPercent();
    this.getSessionList();
    this.getAnalyzeList();
  },
  methods: {
    setDefaultPercent() {
      const domWrapper = document.getElementById('sessionContentWrapper');
      const defaultPercent = (this.minLeftWidth / domWrapper.offsetWidth).toFixed(2) * 100;
      this.minPercent = defaultPercent || 30;
    },

    submitCustomForm(formName){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { analyze } = this.ruleForm;
          if(analyze){
            if(this.formItemList && this.formItemList.length > 0){
              this.$refs[formName].formByDataSubmit();
            } else {
              this.submitForm('ruleForm', {});
            }
          } else {
            this.$message({
              message: "您尚未选择算法",
              type: "error",
            });
          }
        } else {
          console.log("校验错误!!");
          return false;
        }
      });
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

    // 选中某个 Analyze
    handleChangeAnalyze(row) {
      if(row.disabled || this.isTheItemDisabled) return;
      this.ruleForm.analyze = row.id;
      this.targetAnalyzeDetail = row;
      // console.log("选中的Analyze::",row);
    },

    // 只对外层form进行校验
    handleVerification(){
      this.$refs.ruleForm.validate();
    },

    // 提交并校验
    handleSubmit(params){
      this.submitForm('ruleForm', params);
    },

    // 获取 算法列表
    getAnalyzeList() {
      this.$httpGet('getAnalyzeList', {}, {}, {})
        .then((res) => {
          const analyzeLists = res || [];
          const newList = [];
          analyzeLists.forEach(ele => {
            newList.push({
              ... ele,
              taskStatus: "pending"
            })
          });
          this.analyzeList = newList;
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

    //点击提交之后校验
    submitForm(formName, params) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { session, analyze } = this.ruleForm;
          const allParams = {
            type: analyze,
            params: {
              ...params
            }
          };

          // console.log("全部参数：：：", allParams);

          this.btnLoading = true;
          this.$httpPost("runAnalyze", allParams, {}, {id:`${session}`})
            .then((res) => {
              this.isTaskStackVisible = true;
              const timer = setTimeout(() => {
                this.taskStackList.push({
                  session,
                  analyze,
                  taskId: `${session}/${analyze}/status`,
                  temporaryId: this.$commonUtils.getRandomKey(),
                  taskStatus: 'running'
                })
                clearTimeout(timer);
              }, 500)
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
        } else {
          console.log("校验错误!!");
          return false;
        }
      });
    },

    // 选择不同的算法使用对应的表单
    handleChangeAnalze(val) {
      this.formItemList = [];
      const targetForm = this.analyzeList.find(el => el.id === val);
      if (targetForm && targetForm.formParams && targetForm.formParams.length > 0 ) {
        this.formItemList = targetForm.formParams
      }
    },

    handleChangeTask(val) {
      // console.log("任务栈变化：", val)
      this.analyzeList.forEach((item) => {
        val.forEach((el) => {
          if(item.id === el.analyze) {
            item.taskStatus = el.taskStatus;
          }
        })
      })
    },


    // 算法是否使用中
    isItemDisabled() {
      let flag = false;
      this.taskStackList.forEach(el => {
        if(el.session === this.ruleForm.session && ['running', 'waiting'].includes(el.taskStatus)) flag = true;
      })
      this.isTheItemDisabled = flag;
    }

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
        height: 60px;
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
            transform: translateX(15px);
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
          transform: translateX(15px);
        }
      }
    }
    .form_content_box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .top_form_wrapper {
        flex: 1;
        overflow-y: auto;
      }
      .tool_wrapper {
        width: 100%;
        height: 80px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid var(--border-color);
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
