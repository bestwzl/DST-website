// graph model
<template>
  <div class="analyzePageWrapper">
    <div class="title_wrapper">
      模型训练
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
                  <el-select
                    v-model="ruleForm.session"
                    placeholder="请选择session"
                    style="width: 100%;"
                    @change="getModelList"
                  >
                    <el-option
                      v-for="ele in sessionList"
                      :key="ele.value"
                      :label="ele.label"
                      :value="ele.value"
                      :disabled="!ele.gid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class="analyze_list_wrapper">
              <div
                v-for="el in modelList"
                :key="el.id"
                @click="handleChangeModel(el)"
                class="model_item_wrapper"
                :class="el.id === targetModelDetail.id ? 'item_avtive' : (isTheItemDisabled || el.disabled) ? 'item_disabled' : 'item_normal'"
              >
                <div class="model_item_name">{{ el.name }}</div>
                <div class="model_item_desc">{{ el.description }}</div>
                <div v-if="isTheItemDisabled && el.train_status === 'running'" class="analyze_item_mask">
                  <span>模型训练中，请稍候。。。</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template slot="paneR">
          <div class="content_right_wrapper">
            <TrainDetail
              :sessionInfo="{
                'name': getLabelByValue(sessionList, ruleForm.session),
                'id': ruleForm.session
              }"
              :targetModelDetail="targetModelDetail"
            />

            <TrainHistory :targetModelDetail="targetModelDetail"/>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>
<script>
import splitPane from 'vue-splitpane';
import TrainDetail from './trainDetail.vue';
import TrainHistory from './trainHistory.vue';
export default {
  name: 'analyzeManage',
  components: {
    splitPane,
    TrainDetail,
    TrainHistory
  },
  data() {
    return {
      ruleForm: {
        session: '',
        model: '',
      },
      rules: {
        session: [
          { required: true, message: '请选择session', trigger: 'change' },
        ],
      },
      isTheItemDisabled: false,
      isTaskStackVisible: false,
      btnLoading: false,
      formItemList: [], // 表单选项
      analyzeList: [],
      modelList: [], // 可用的模型列表
      minLeftWidth: 350, // 左侧最小宽度
      minPercent: 30,
      sessionList: [], // session列表
      targetModelDetail: {}, // 选中要展示详情的
    };
  },
  watch: {
      "ruleForm.session": {
        handler(nVal){
          this.isItemDisabled();
        },
        deep: true,
      },
      "ruleForm.model": {
        handler(nVal){
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
    // this.getModelList();
  },
  methods: {
    setDefaultPercent() {
      const domWrapper = document.getElementById('sessionContentWrapper');
      const defaultPercent = (this.minLeftWidth / domWrapper.offsetWidth).toFixed(2) * 100;
      this.minPercent = defaultPercent || 30;
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
              const {name, id, gid} = ele;
              name && id && targetList.push({
                label: name || '',
                value: id || '',
                gid,
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

    // 选中某个 模型
    handleChangeModel(row) {
      if( this.isTheItemDisabled ) return;
      this.targetModelDetail = row;
      this.ruleForm.model = row.id
    },


    // 获取列表
    getModelList(sid) {
      const targetSession = this.sessionList.find(ele=>ele.value === sid);
      const params = {
        gid:targetSession?.gid || '',
        skip: 0,
        limit: 9999
      }
      this.tableLoading = true;
      this.$httpGet("getModelList", params)
        .then((res) => {

          const modelLists = res.models || [];
          const newList = [];
          modelLists.forEach(ele => {
            newList.push({
              ... ele,
              train_status: '', // 训练状态
            })
          });

          this.modelList = newList;
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


    // 选择不同的算法使用对应的表单
    // handleChangeModel(val) {
    //   this.formItemList = [];
    //   const targetForm = this.analyzeList.find(el => el.id === val);
    //   if (targetForm && targetForm.formParams && targetForm.formParams.length > 0 ) {
    //     this.formItemList = targetForm.formParams
    //   }
    // },


    // 算法是否使用中
    isItemDisabled() {
      let flag = false;
      // this.taskStackList.forEach(el => {
      //   if(el.session === this.ruleForm.session && ['running', 'waiting'].includes(el.taskStatus)) flag = true;
      // })
      this.isTheItemDisabled = flag;
    },

    getLabelByValue(arr, value) {
      const resultItem = arr.find(el => el.value === value);
      return resultItem?.label || '';
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
        .model_item_wrapper {
          width: 100%;
          box-sizing: border-box;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          transition: 0.5s;
          position: relative;
          .model_item_name {
            font-weight: 500;
            padding-bottom: 5px;
            border-bottom: 1px dashed var(--border-color);
          }
          .model_item_desc {
            font-size: 14px;
            padding-top: 5px;
          }
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
    .content_right_wrapper {
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 0 20px;
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

