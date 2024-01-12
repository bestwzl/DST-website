// 新增 Session
<template>
  <div class="add_item_wrapper">
    <div class="item_title">{{ title }}</div>
    <div class="item_config">
      <div class="item_cpu">
        <div class="item_name">
          <span>CPU_request</span>
        </div>
        <div class="item_info">
          <el-input-number v-model="cpuRequest2" :min="0" :max="100" :precision="1" style="width: 100%;" @change="handleChangeValCpuRequest"></el-input-number>
        </div>
      </div>
      <div class="item_memory">
        <div class="item_name">
          <span>Memory_request</span>
        </div>
        <div class="item_info">
          <el-input-number v-model="memoryRequest2" :min="0" :max="100" :precision="1" style="width: 100%;" @change="handleChangeValMemoryRequest"></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addItem2',
  props: {
    title: {
      type: String,
      required: false,
    },
    cpuRequest: {
      type: Number,
      required: false,
    },
    memoryRequest: {
      type: Number,
      required: false,
    }
  },
  data() {
    return {
      cpuRequest2: this.cpuRequest,
      memoryRequest2: this.memoryRequest,
    };
  },
  created() {},
  mounted() {

  },
  methods: {
    handleChangeValCpuRequest() {
      this.$emit("update:cpuRequest", this.cpuRequest2);
    },
    handleChangeValMemoryRequest() {
      this.$emit("update:memoryRequest", this.memoryRequest2);
    }

  },
};
</script>

<style lang="less" scoped>
.add_item_wrapper {
  width: 100%;
  height: 124px;
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
    height: 81px;
    .item_cpu,
    .item_memory {
      height: 50%;
      width: 100%;
      display: flex;
      align-items: center;
      .item_name {
        height: 40px;
        width: 200px;
        border-right: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .item_info {
        height: 100%;
        flex: 1;
        width: 100%;
      }
    }
    .item_cpu {
      border-bottom: 1px solid var(--border-color);
      .item_name {
        background-color: rgb(230, 253, 253);
      }
    }
    .item_memory {
      .item_name {
        background-color: rgb(244, 235, 252);
      }
    }
  }

}
</style>
