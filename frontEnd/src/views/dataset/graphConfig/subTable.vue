// 稽核管理 - 告警实例 - 二级详情
<template>
  <div class="main-wrapper">
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        stripe
        size="mini"
        max-height="400"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="名字"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="voe_type"
          label="voe_type"
          show-overflow-tooltip>
          <template slot-scope="props">
            <span >{{ props.row.voe_type === 'VERTEX' ? '点' : '边' }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="delimiter"
          label="分隔符"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="label"
          label="Label"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="入点"
          show-overflow-tooltip>
          <template slot-scope="props">
            <span >{{ props.row.source || '--' }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="出点"
          show-overflow-tooltip>
          <template slot-scope="props">
            <span >{{ props.row.target || '--' }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="uri"
          label="资源地址"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="create_time"
          label="创建时间"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="size"
          label="大小"
          show-overflow-tooltip>
          <template slot-scope="props">
            <span >{{ props.row.size ? $commonUtils.formatFileSize(props.row.size) : '--' }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "subTable",
  components: {},
  props: {
    propsData: {
      type: Object,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      tableData: this.propsData.dataset_list || [],
      // 是否告警
      isAlarmList: {
        "1":'是',
        "2":'否'
      }
    };
  },
  created() {},
  mounted() {
    this.getTableData();
  },
  methods: {
    // 获取稽核详情数据
    getTableData(){

    },
  },
};
</script>

<style lang="less" scoped>
.main-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border: 1px solid #009fff;
  .table-wrapper {
    flex: 1;
    overflow-y: auto;
  }
  .pagelation-wrapper {
    flex-shrink: 0;
    width: 100%;
    height: 56px;
    background-color: #eefaff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
