// 新增 Session
<template>
  <div class="add_item_wrapper">
    <div class="item_title">{{ title }}</div>
    <div class="item_config">
      <div class="item_cpu">
        <div class="item_name">
          <span>CPU</span>
        </div>
        <div class="item_info">
          <div class="item_request">
            <p class="item_label">request</p>
            <p class="item_value">
              <el-input-number v-model="cpuRequest2" :min="0" :max="100" :precision="1" style="width: 100%;" @change="handleChangeValCpuRequest"></el-input-number>
            </p>
          </div>
          <div class="item_limit">
            <p class="item_label">limit</p>
            <p class="item_value">
              <el-input-number v-model="cpuLimit2" :min="0" :max="100" :precision="1" style="width: 100%;" @change="handleChangeValCpuLimit"></el-input-number>
            </p>
          </div>
        </div>
      </div>
      <div class="item_memory">
        <div class="item_name">
          <span>Memory</span>
        </div>
        <div class="item_info">
          <div class="item_request">
            <p class="item_label">request</p>
            <p class="item_value">
              <el-input-number v-model="memoryRequest2" :min="0" :max="100" :precision="1" style="width: 100%;" @change="handleChangeValMemoryRequest"></el-input-number>
            </p>
          </div>
          <div class="item_limit">
            <p class="item_label">limit</p>
            <p class="item_value">
              <el-input-number v-model="memoryLimit2" :min="0" :max="100" :precision="1" style="width: 100%;" @change="handleChangeValMemoryLimit"></el-input-number>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addItem',
  props: {
    title: {
      type: String,
      required: false,
    },
    cpuRequest: {
      type: Number,
      required: false,
    },
    cpuLimit: {
      type: Number,
      required: false,
    },
    memoryRequest: {
      type: Number,
      required: false,
    },
    memoryLimit: {
      type: Number,
      required: false,
    }
  },
  data() {
    return {
      cpuRequest2: this.cpuRequest,
      cpuLimit2: this.cpuLimit,
      memoryRequest2: this.memoryRequest,
      memoryLimit2: this.memoryLimit,
    };
  },
  created() {},
  mounted() {

  },
  methods: {
    handleChangeValCpuRequest() {
      this.$emit("update:cpuRequest", this.cpuRequest2);
    },
    handleChangeValCpuLimit() {
      this.$emit("update:cpuLimit", this.cpuLimit2);
    },
    handleChangeValMemoryRequest() {
      this.$emit("update:memoryRequest", this.memoryRequest2);
    },
    handleChangeValMemoryLimit() {
      this.$emit("update:memoryLimit", this.memoryLimit2);
    }
  },
};
</script>

<style lang="less" scoped>
.add_item_wrapper {
  width: 100%;
  height: 206px;
  border: 1px solid var(--border-color);
  margin-bottom: 30px;
  border-radius: 4px;
  box-sizing: border-box;
  .item_title {
    height: 41px;
    line-height: 40px;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    background-color: var(--theme-color-1);
    border-bottom: 1px solid var(--border-color);
  }
  .item_config {
    height: 164px;
    .item_cpu,
    .item_memory {
      height: 50%;
      width: 100%;
      display: flex;
      align-items: center;
      .item_name {
        height: 80px;
        width: 100px;
        border-right: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .item_info {
        height: 100%;
        flex: 1;
        .item_request,
        .item_limit {
          width: 100%;
          height: 50%;
          display: flex;
          align-items: center;
          .item_label {
            height: 100%;
            width: 40%;
            text-align: center;
            line-height: 40px;
            border-right: 1px solid var(--border-color);
          }
          .item_value {
            height: 100%;
            width: 60%;
          }
        }
        .item_request {
          border-bottom: 1px solid var(--border-color);
        }
      }
    }
    .item_cpu {
      border-bottom: 1px solid var(--border-color);
      .item_name {
        background-color: rgb(230, 253, 253);
      }
    }
    .item_memory {
      border-bottom: 1px solid var(--border-color);
      .item_name {
        background-color: rgb(244, 235, 252);
      }
    }
  }

}
</style>
