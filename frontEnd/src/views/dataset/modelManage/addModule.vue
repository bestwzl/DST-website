// 新增负责人
<template>
    <div class="add_graph_config_wrapper">
      <div class="model_header_wrapper">
        <p class="back_btn" @click="handleCancel('addForm')">取消{{ handleType === 'add' ? '新增' : '编辑'}}</p>
        <p class="detail_btn" @click="tipDialogVisible = true">
          <i class="el-icon-info"></i>
          <el-button type="text">配置方法</el-button>
        </p>
      </div>

      <div class="add_graph_config_content_wrapper">
        <CreatModule :nameSpaceList="nameSpaceList" ref="creatModule" @closeAndRefreshList="closeAndRefreshList"/>
      </div>

      <div class="model_footer_wrapper">
        <el-button @click="handleCancel('addForm')" style="margin-right: 50px;">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="handleSave">保存</el-button>
      </div>

      <el-dialog
        title="模型配置说明"
        :visible.sync="tipDialogVisible"
        width="600px"
        append-to-body
      >
        <p style="padding: 5px 0;">1. 请先为这个模型取一个个性化名称，并添加相关描述。</p>
        <p style="padding: 5px 0;">2. 请为这个模型选择一个NameSpace。</p>
        <p style="padding: 5px 0;">4. 选择你需要的算法，并配置适合的参数。</p>
        <p style="padding: 5px 0;">5. 选择一个graph，并配置适合的参数。</p>
        <p style="padding: 5px 0;">6. 核对无误后，点击保存。</p>
        <p style="padding: 5px 0; color: red;">注意： 左侧选择的算法中的 features_num 的值要和右侧graph选择的属性的总数量相等。</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="tipDialogVisible = false">我知道了</el-button>
        </span>
      </el-dialog>

    </div>
</template>
<script>
import CreatModule from './creatModel.vue'
export default {
  name: "addModule",
  components: {
    CreatModule
  },
  props: {
    visible: {
      type: Boolean,
      required: false
    },
    defaultInfo: {
      type: Object,
      required: false
    },
    nameSpaceList: {
      type: Array,
      required: false,
      default: []
    },
  },

  data() {
    return {
      tipDialogVisible: false,
      btnLoading: false,
      handleType: 'add',
    };
  },

  mounted() {
    if (this.defaultInfo && this.defaultInfo.id) {
      this.handleType = 'edit';
    } else {
      this.handleType = 'add';
    }
  },

  methods: {
    //点击保存
    handleSave() {
      this.$refs.creatModule.handleSaveBtn();
    },

    closeAndRefreshList(){
      this.$emit("closeAndReloadList" )
    },

    handleCancel(formName) {
      // this.$refs[formName].resetFields();
      this.$emit('update:visible', false);
    }

  },
};
</script>

<style scoped lang="less">
  .add_graph_config_wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .model_header_wrapper {
      width: 100%;
      height: 44px;
      flex-shrink: 0;
      background-color: rgb(251, 251, 251);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .back_btn {
        height: 100%;
        padding: 0 20px;
        line-height: 44px;
        border-right: 1px solid var(--border-color);
        cursor: pointer;
        color: chocolate;
      }
      .detail_btn {
        color: #009fff;
      }
    }
    .add_graph_config_content_wrapper {
      flex: 1;
      display: flex;
      height: calc(100% - 45px);
    }

    .model_footer_wrapper {
      width: 100%;
      height: 60px;
      flex-shrink: 0;
      border-top: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(251, 251, 251);
    }

  }

</style>