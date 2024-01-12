// session管理
<template>
  <div class="session_detail_wrapper">
      <el-card style="margin-bottom: 24px;">
        <div slot="header" style="font-size: 20px; font-weight: 600;">
          <span>session: {{ targetSessionDetail.name }}</span>
        </div>
        <div class="session_info_wrapper">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info_item_box">
                <span class="info_item_label">total_cpu_limit:</span>
                <span class="info_item_value">{{ targetSessionDetail.total_cpu_limit }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info_item_box">
                <span class="info_item_label">total_cpu_request:</span>
                <span class="info_item_value">{{ targetSessionDetail.total_cpu_request }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info_item_box">
                <span class="info_item_label">total_mem_limit:</span>
                <span class="info_item_value">{{ targetSessionDetail.total_mem_limit }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info_item_box">
                <span class="info_item_label">total_mem_request:</span>
                <span class="info_item_value">{{ targetSessionDetail.total_mem_request }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" style="font-size: 20px; font-weight: 600;">
          <span>graph: {{ getLabelByValue(allGraphList, targetSessionDetail.gid) || targetSessionDetail.gid }}</span>
        </div>
        <div>
          <VisGraph :schema="targetGraphInfo"/>
        </div>
      </el-card>

  </div>
</template>
<script>
import VisGraph from '../../../components/VisGraph.vue';
export default {
  name: "sessionItem",
  components: {
    VisGraph
  },
  props: {
    allGraphList: {
      type: Array,
      required: false
    },
    targetSessionDetail: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      configureBtnLoading: false,
      saveBtnLoading: false,
      targetGraphInfo: {}
    };
  },
  watch: {
      "targetSessionDetail": {
        handler(nVal){
          nVal.id && this.getGraphInfo();
        },
        deep: true,
        immediate: true,
      },
  },
  created() {},
  mounted() {},
  methods: {
    // 获取图详情
    getGraphInfo() {
      const { id } = this.targetSessionDetail;
      this.$httpGet('putSessionGraph', {}, {}, { id: `${id}/schema`})
        .then((res) => {
          this.targetGraphInfo = res || {};
        })
        .catch((err) => {
          this.$message({
            message: err.message || "请求异常",
            type: "error",
          });
        });
    },
    getLabelByValue(arr, value) {
      const target = arr.find(el => el.value === value);
      return target ? target.label : '';
    },

  },
};
</script>

<style lang="less" scoped>

.session_detail_wrapper {
  padding: 20px;
  .session_info_wrapper {
    .info_item_box {
      padding: 12px;
      .info_item_label {
        font-weight: 500;
      }
      .info_item_value {
        font-size: 18px;
        color: #009fff;
        padding-left: 12px;
      }
    }
  }
}



</style>
