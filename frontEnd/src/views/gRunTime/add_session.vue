// 新增 Session
<template>
  <div class="add_session_wrapper">
    <div class="add_session_baseinfo">
      <div class="baseinfo_form">
        <el-form
          :model="creatSession"
          status-icon
          :rules="rules"
          ref="addSessionForm"
          label-width="120px"
          class="formBox"
        >
          <el-form-item label="名称：" prop="name" >
            <el-input
              placeholder="请输入名称"
              v-model="creatSession.name"
              autocomplete="on"
            ></el-input>
          </el-form-item>

          <el-form-item v-if="+targetUserInfo.userRole === 1" label="nameSpace：">
            <el-select
              v-model="creatSession.namespace_id"
              placeholder="请选择nameSpace"
              style="width: 100%;"
            >
              <el-option
                v-for="item in nameSpaceList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <!-- <el-input
              v-else
              placeholder="请输入名称"
              v-model="creatSession.namespace_id"
              autocomplete="on"
              disabled
            ></el-input> -->
          </el-form-item>
        </el-form>
      </div>

      <div class="maininfo_wrapper">
        <AddItem
          title="coordinator"
          :cpuRequest.sync="creatSession.coordinator_cpu_request"
          :cpuLimit.sync="creatSession.coordinator_cpu_limit"
          :memoryRequest.sync="creatSession.coordinator_mem_request"
          :memoryLimit.sync="creatSession.coordinator_mem_limit"
        />
        <AddItem
          title="gie_frontend"
          :cpuRequest.sync="creatSession.gie_frontend_cpu_request"
          :cpuLimit.sync="creatSession.gie_frontend_cpu_limit"
          :memoryRequest.sync="creatSession.gie_frontend_mem_request"
          :memoryLimit.sync="creatSession.gie_frontend_mem_limit"
        />
        <AddItem
          title="gc"
          :cpuRequest.sync="creatSession.gc_cpu_request"
          :cpuLimit.sync="creatSession.gc_cpu_limit"
          :memoryRequest.sync="creatSession.gc_mem_request"
          :memoryLimit.sync="creatSession.gc_mem_limit"
        />
      </div>
    </div>

    <div class="add_session_config_info">
      <div class="session_worker_wrapper">
        <span class="worker_label">worker:</span>
        <el-input-number v-model="creatSession.desired_worker_count" :min="0" :max="100" ></el-input-number>
      </div>
      <AddItem2
        title="vineyard"
        :cpuRequest.sync="creatSession.vineyard_cpu"
        :memoryRequest.sync="creatSession.vineyard_mem"
      />
      <AddItem
        title="gie"
        :cpuRequest.sync="creatSession.gie_executor_cpu_request"
        :cpuLimit.sync="creatSession.gie_executor_cpu_limit"
        :memoryRequest.sync="creatSession.gie_executor_mem_request"
        :memoryLimit.sync="creatSession.gie_executor_mem_limit"
      />
      <AddItem
        title="gae"
        :cpuRequest.sync="creatSession.gae_cpu_request"
        :cpuLimit.sync="creatSession.gae_cpu_limit"
        :memoryRequest.sync="creatSession.gae_mem_request"
        :memoryLimit.sync="creatSession.gae_mem_limit"
      />
      <AddItem
        title="gle"
        :cpuRequest.sync="creatSession.gle_cpu_request"
        :cpuLimit.sync="creatSession.gle_cpu_limit"
        :memoryRequest.sync="creatSession.gle_mem_request"
        :memoryLimit.sync="creatSession.gle_mem_limit"
      />
    </div>
  </div>
</template>
<script>
import AddItem from './add_item.vue';
import AddItem2 from './add_item_2.vue';
export default {
  name: 'infoConfigModule',
  components: {
    AddItem,
    AddItem2
  },
  data() {
    return {
      targetUserInfo: {},
      nameSpaceList: [],
      creatSession: {
        "name": "",
        "namespace_id": '',

        "coordinator_cpu_request": 0.2,
        "coordinator_mem_request": 0.2,
        "coordinator_cpu_limit": 2,
        "coordinator_mem_limit": 5,

        "gie_frontend_cpu_request": 0.2,
        "gie_frontend_mem_request": 0.2,
        "gie_frontend_cpu_limit": 5,
        "gie_frontend_mem_limit": 5,

        "gc_cpu_request": 0.2,
        "gc_mem_request": 0.2,
        "gc_cpu_limit": 5,
        "gc_mem_limit": 5,

        "desired_worker_count": 3,

        "vineyard_cpu": 2,
        "vineyard_mem": 5,

        "gae_cpu_request": 0.2,
        "gae_mem_request": 0.2,
        "gae_cpu_limit": 5,
        "gae_mem_limit": 20,

        "gie_executor_cpu_request": 0.2,
        "gie_executor_mem_request": 0.2,
        "gie_executor_cpu_limit": 5,
        "gie_executor_mem_limit": 5,

        "gle_cpu_request": 0.2,
        "gle_mem_request": 0.2,
        "gle_cpu_limit": 5,
        "gle_mem_limit": 5,
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
      },
    };
  },
  watch: {
      "creatSession": {
        handler(nVal){
          // console.log("表单数据：：", nVal)
        },
        deep: true,
        immediate: true,
      }
  },
  created() {},
  mounted() {
    const userInfoString = this.$commonUtils.getSessionItem("operatorInfo") || '{}';
    this.targetUserInfo = JSON.parse(userInfoString);
    const {userRole, userName} = this.targetUserInfo;
    if (+userRole !== 1) {
      this.creatSession.namespace_id = userName;
    } else {
      this.getNameSpaceList();
    }

    this.$bus.on("handleSaveSessionBtn", () => {
      this.submitForm('addSessionForm');
      // setTimeout(() => {
      //   this.$bus.emit("handleAddSessionModuleClose");
      // }, 1000)
    });
  },
  beforeDestroy() {
    this.$bus.off('handleSaveSessionBtn');
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const allParams = this.creatSession;
          this.$httpPost("creatSession", allParams)
            .then((res) => {
              this.$bus.emit("handleAddSessionModuleClose");
            })
            .catch((err) => {
              this.$message({
                message: err.message || "请求异常",
                type: "error",
              });
            });
        } else {
          console.log("校验错误!!");
          return false;
        }
      });
    },

    // 获取namespace下拉框数据
    getNameSpaceList() {
      const params = {
        skip: 0,
        limit: 9999
      }
      this.$httpGet("getServerList", params)
        .then((res) => {
            const nameList = res.namespaces;
            const nameSpaceOptions = [];
            nameList.forEach(ele => {
              nameSpaceOptions.push({
                label: ele.name,
                value: ele.id,
              })
            })
            this.nameSpaceList = nameSpaceOptions;
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },

  },
};
</script>

<style lang="less" scoped>
.add_session_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .add_session_baseinfo,
  .add_session_config_info {
    max-width: 1200px;
    height: 100%;
    flex:1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    .session_worker_wrapper {
      display: flex;
      margin-bottom: 30px;
      align-items: center;
      .worker_label {
        font-size: 30px;
        margin-right: 20px;
      }
    }
  }
  .add_session_baseinfo {
    border-right: 1px solid rgb(219, 236, 250);
    .baseinfo_form {
      width: 100%;
      margin-bottom: 30px;
    }
    .maininfo_wrapper {
      flex: 1;
      width: 100%;
    }

  }
}
</style>
