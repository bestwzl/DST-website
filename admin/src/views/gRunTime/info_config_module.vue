// Session 配置展示
<template>
  <div class="configPageWrapper">
    <div class="base_info_wrapper">
      <div class="item_name_wrapper">{{ targetActiveItem.name }}</div>
      <div class="base_info_content">
        <InfoItem
          title="coordinator"
          :cpuRequest="targetActiveItem.coordinator_cpu_request"
          :cpuLimit="targetActiveItem.coordinator_cpu_limit"
          :memoryRequest="targetActiveItem.coordinator_mem_request"
          :memoryLimit="targetActiveItem.coordinator_mem_limit"
        />
        <InfoItem
          title="gie_frontend"
          :cpuRequest="targetActiveItem.gie_frontend_cpu_request"
          :cpuLimit="targetActiveItem.gie_frontend_cpu_limit"
          :memoryRequest="targetActiveItem.gie_frontend_mem_request"
          :memoryLimit="targetActiveItem.gie_frontend_mem_limit"
        />
        <InfoItem
          title="gc"
          :cpuRequest="targetActiveItem.gc_cpu_request"
          :cpuLimit="targetActiveItem.gc_cpu_limit"
          :memoryRequest="targetActiveItem.gc_mem_request"
          :memoryLimit="targetActiveItem.gc_mem_limit"
        />
      </div>
    </div>

    <div class="config_info_wrapper">
      <el-row :gutter="20">
        <el-col :span="12">
          <InfoItem2
            title="vineyard"
            :cpuRequest="targetActiveItem.vineyard_cpu"
            :memoryRequest="targetActiveItem.vineyard_mem"
          />
        </el-col>
        <el-col :span="12">

          <InfoItem
            title="gie_executor"
            :cpuRequest="targetActiveItem.gie_executor_cpu_request"
            :cpuLimit="targetActiveItem.gie_executor_cpu_limit"
            :memoryRequest="targetActiveItem.gie_executor_mem_request"
            :memoryLimit="targetActiveItem.gie_executor_mem_limit"
          />
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <InfoItem
            title="gae"
            :cpuRequest="targetActiveItem.gae_cpu_request"
            :cpuLimit="targetActiveItem.gae_cpu_limit"
            :memoryRequest="targetActiveItem.gae_mem_request"
            :memoryLimit="targetActiveItem.gae_mem_limit"
          />
        </el-col>
        <el-col :span="12">
          <InfoItem
            title="gle"
            :cpuRequest="targetActiveItem.gle_cpu_request"
            :cpuLimit="targetActiveItem.gle_cpu_limit"
            :memoryRequest="targetActiveItem.gle_mem_request"
            :memoryLimit="targetActiveItem.gle_mem_limit"
          />
        </el-col>
      </el-row>

    </div>
    <div class="endpoint_info_wrapper">
      <InfoItem
        title="TOTAL"
        :cpuRequest="targetActiveItem.total_cpu_request"
        :cpuLimit="targetActiveItem.total_cpu_limit"
        :memoryRequest="targetActiveItem.total_mem_request"
        :memoryLimit="targetActiveItem.total_mem_limit"
      />
      <div class="endpoint_item">
        <p class="endpoint_item_label">coor_endpoint:</p>
        <p class="endpoint_item_value">{{ targetActiveItem.coor_endpoint || '--' }}</p>
      </div>
      <div class="endpoint_item">
        <p class="endpoint_item_label">gremlin_endpoint:</p>
        <p class="endpoint_item_value">{{ targetActiveItem.gremlin_endpoint || '--' }}</p>
      </div>
      <div class="endpoint_item">
        <p class="endpoint_item_label">cypher_endpoint:</p>
        <p class="endpoint_item_value">{{ targetActiveItem.cypher_endpoint || '--' }}</p>
      </div>
      <div class="endpoint_item">
        <p class="endpoint_item_label">gcc_endpoint:</p>
        <p class="endpoint_item_value">{{ targetActiveItem.gcc_endpoint || '--' }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import InfoItem from './info_item.vue';
import InfoItem2 from './info_item_2.vue';
export default {
  name: 'infoConfigModule',
  components: {
    InfoItem,
    InfoItem2
  },
  props: {
    targetActiveItem: {
      type: Object,
      required: false,
    }
  },
  data() {
    return {
      defaultPassword: '',
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
.configPageWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .base_info_wrapper {
    flex: 2;
    border-right: 1px solid var(--border-color);
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    .item_name_wrapper {
      width: 100%;
      height: 56px;
      flex-shrink: 0;
      font-size: 30px;
      font-weight: 500;
      color: var(--font-color-active);
    }
    .base_info_content{
      flex: 1;
      overflow-y: auto;
    }
  }
  .config_info_wrapper {
    flex: 5;
    padding: 0 20px;
    box-sizing: border-box;
    border-right: 1px solid var(--border-color);
    overflow-y: auto;
  }
  .endpoint_info_wrapper {
    flex: 3;
    overflow-y: auto;
    .endpoint_item {
      padding: 10px;
      .endpoint_item_label {
        font-size: 18px;
        font-weight: 500;
      }
      .endpoint_item_value {
        font-size: 20px;
        color: #009fff;
      }
    }
  }

}
</style>
