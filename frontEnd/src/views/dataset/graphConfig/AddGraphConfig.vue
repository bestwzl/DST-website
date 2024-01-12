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
        <div class="box_left" :v-loading="tableLoading">
          <p style="margin-bottom: 20px;">节点数据：</p>
          <div class="data_list_wrapper">
            <div
              v-for="ele in tableData"
              :key="ele.id"
              :class=" ele.voe_type === 'VERTEX' && !ele.isChanged ? 'item_box' : 'item_hide' "
              @click="ele.isChanged = true"
            >
              <div class="item_type">
                <i :class=" ele.voe_type === 'EDGE' ? 'el-icon-top-right' : 'el-icon-share' "></i>
              </div>
              <div class="item_content">
                <div class="item_title_wrapper">
                  {{ ele.name }}
                </div>
                <div class="item_info_wrapper">
                  {{ ele.uri }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="box_center">
          <div class="center_form_wrapper">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="addForm"
              label-width="110px"
            >
              <el-form-item label="名称：" prop="name" >
                <el-input
                  placeholder="请输入图名称"
                  v-model="ruleForm.name"
                  autocomplete="on"
                ></el-input>
              </el-form-item>
              <el-form-item v-if="!(handleType === 'add' && +targetUserInfo.userRole !== 1)" label="NameSpace：" prop="namespace_id">
                <el-select
                  v-model="ruleForm.namespace_id"
                  placeholder="请选择NameSpace"
                  clearable
                  :disabled="handleType === 'edit'"
                  style="width: 100%"
                >
                  <el-option v-for="item in nameSpaceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Directed：" prop="directed">
                <el-radio-group v-model="ruleForm.directed">
                  <el-radio :label="true">有向</el-radio>
                  <el-radio :label="false">无向</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>

          <div class="target_graph_list_wrapper">
              <div
                v-for="ele in tableData"
                :key="ele.id"
                :class=" ele.isChanged ? 'item_box' : 'item_hide' "
                @click="ele.isChanged = false"
              >
                <div class="item_type">
                  <i :class=" ele.voe_type === 'EDGE' ? 'el-icon-top-right' : 'el-icon-share' "></i>
                </div>
                <div class="item_content">
                  <div class="item_title_wrapper">
                    {{ ele.name }}
                  </div>
                  <div class="item_info_wrapper">
                    {{ ele.uri }}
                  </div>
                </div>
              </div>
            </div>

          <div class="footer_btn_wrapper">
            <el-button
              type="primary"
              :loading="btnLoading"
              @click="submitForm('addForm')"
            >提交
            </el-button>
          </div>
        </div>

        <div class="box_right" :v-loading="tableLoading">
          <p style="margin-bottom: 20px;">边线数据：</p>
          <div class="data_list_wrapper">
            <div
              v-for="ele in tableData"
              :key="ele.id"
              :class=" ele.voe_type === 'EDGE' && !ele.isChanged ? 'item_box' : 'item_hide' "
              @click="ele.isChanged = true"
            >
              <div class="item_type">
                <i :class=" ele.voe_type === 'EDGE' ? 'el-icon-top-right' : 'el-icon-share' "></i>
              </div>
              <div class="item_content">
                <div class="item_title_wrapper">
                  {{ ele.name }}
                </div>
                <div class="item_info_wrapper">
                  {{ ele.uri }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        title="图配置说明"
        :visible.sync="tipDialogVisible"
        width="600px"
        append-to-body
      >
        <p style="padding: 5px 0;">1. 请先为这个graph取一个个性化名称。</p>
        <p style="padding: 5px 0;">2. 请为这个graph选择一个NameSpace</p>
        <p style="padding: 5px 0; line-height: 20px;">3. 左侧是所有可用的<b>节点数据</b>，右侧是所有可用的<b>边线数据</b>，你可以在左右两侧点击所需的数据条目添加到心graph的配置框中。数据不分顺序，您可以任意组合。</p>
        <p style="padding: 5px 0;">4. 点击中间配置框内的数据条目之后可以取消选中。</p>
        <p style="padding: 5px 0;">5. 点击‘提交’按钮即可创建您的Graph.</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="tipDialogVisible = false">我知道了</el-button>
        </span>
      </el-dialog>

    </div>
</template>
<script>
export default {
  name: "add",
  components: {},
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
      tableLoading: false,
      handleType: 'add',
      ruleForm: {
        name: '', // 登录账户
        namespace_id: '', // namespace
        directed: true
      },
      rules: {
        name: [{ required: true, message: '图名称不能为空', trigger: 'blur' }],
        namespace_id: [{ required: true, message: 'nameSpace不能为空', trigger: 'blur' }],
        directed: [{ required: true, message: '请选择是否具有指向性', trigger: 'blur' }],
      },
      tableData: [],
      targetChanged: [],
      targetUserInfo: {}
    };
  },

  mounted() {
    // console.log("当前graph信息：：：", this.defaultInfo)
    if (this.defaultInfo && this.defaultInfo.id) {
      this.handleType = 'edit';
      const {name, namespace_id, dataset_list} = this.defaultInfo;
      this.ruleForm.name = name;
      this.ruleForm.namespace_id = namespace_id;
      this.targetChanged = dataset_list;
    } else {
      this.handleType = 'add';
    }

    const userInfoString = this.$commonUtils.getSessionItem("operatorInfo") || '{}';
    this.targetUserInfo = JSON.parse(userInfoString);

    this.getDataList();
  },

  methods: {
    //点击新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const targetList = [];
          this.tableData.forEach(element => {
            if (element.isChanged) {
              targetList.push(element.id);
            }
          })
          if (targetList.length <= 0) {
            this.$message({
              message: `您尚未为${this.ruleForm.name}配置任何数据。`,
              type: 'warning'
            });
          } else {
            const params = {
              ...this.ruleForm,
              datasets: targetList
            }
            if (this.handleType === 'add') {
              this.addGraph(params);
            } else {
              this.editGraph(this.defaultInfo.id, params);
            }
          }

        } else {
          console.log("校验错误!!");
          return false;
        }
      });
    },

    // 新增 graph 配置
    addGraph(formParams) {
      this.btnLoading = true;
      this.$httpPost('addGraph', formParams)
        .then((res) => {
          this.resetField();
          this.$emit("closeAndReloadList");
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

    // 修改 graph 配置
    editGraph(id, formParams) {
      this.btnLoading = true;
      this.$httpPut('editGraph', formParams, {}, {id})
        .then((res) => {
          this.resetField();
          this.$emit("closeAndReloadList");
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

    // 获取列表
    getDataList() {
      const params = {
        skip: 0,
        limit: 9999
      }
      this.tableLoading = true;
      this.$httpGet("getDatasetList", params)
        .then((res) => {
          const allData = res.datasets;
          if (this.handleType === 'add') {
            allData.forEach(el => {
              el.isChanged= false;
            })
          } else {
            const idList = [];
            this.targetChanged.forEach(ele => {
              idList.push(ele.id);
            })
            allData.forEach(el => {
              el.isChanged= false;
              if (idList.includes(el.id)) {
                el.isChanged= true;
              } else {
                el.isChanged= false;
              }
            })
          }
          this.tableData = allData;
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

    resetField() {
      this.$refs.addForm.resetFields();
      this.tableData.forEach(el => {
        el.isChanged= false;
      });
    },

    handleCancel(formName) {
      this.$refs[formName].resetFields();
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
      .box_left,
      .box_right{
        width: 30%;
        min-width: 440px;
        flex-shrink: 0;
        height: 100%;
        padding: 20px 12px;
        box-sizing: border-box;
        background-color: var(--background-color);
        display: flex;
        flex-direction: column;
        .data_list_wrapper {
          flex: 1;
          padding: 5px;
          box-sizing: border-box;
          overflow-y: auto;
        }
      }
      .box_center {
        flex: 1;
        height: 100%;
        min-width: 480px;
        border-left: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background-color: var(--background-color);
        .center_form_wrapper {
          height: 180px;
          flex-shrink: 0;
        }
        .target_graph_list_wrapper {
          flex: 1;
          padding: 10px;
          border: 1px solid rgb(173, 227, 255);
          overflow-y: auto;
          border-radius: 4px;
        }
        .footer_btn_wrapper {
          height: 60px;
          padding-top: 20px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
      }

      .item_box {
        height: 60px;
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          transform: scale(1.03);
        }
        .item_type {
          height: 62px;
          width: 40px;
          font-size: 24px;
          flex-shrink: 0;
          background-color: rgb(214, 241, 254);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px 0 0 4px;
        }
        .item_content {
          flex: 1;
          width: calc(100% - 40px);
          height: 100%;
          border: 1px solid var(--border-color);
          border-left: none;
          border-radius: 0 4px 4px 0;
          box-sizing: border-box;
          .item_title_wrapper,
          .item_info_wrapper {
            width: 100%;
            height: 50%;
            display: flex;
            align-items: center;
            padding: 0 10px;
            box-sizing: border-box;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .item_title_wrapper {
            border-bottom: 1px dashed var(--border-color);
            font-weight: 600;
            color: var(--font-color-2);
          }
          .item_info_wrapper {
            font-size: 14px;
          }
        }
      }
      .item_hide {
        display: none;
        height: 0;
        overflow: hidden;
      }
    }

  }

</style>