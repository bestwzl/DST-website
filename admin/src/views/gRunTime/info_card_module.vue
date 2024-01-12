// session list
<template>
  <div class="cardPageWrapper">
    <el-carousel
      type="card"
      height="220px"
      :autoplay="false"
      indicator-position="none"
      arrow="never"
      @change="handleChangeActiveItem"
    >
      <el-carousel-item v-for="item in sessionList" :key="item.id" :name="`item_${item.id}`" style="min-width: 750px;">
        <el-card style="height: 200px;" class="card_item_box">
          <div class="item_wrapper">
            <div class="item_left_wrapper">
              <span class="item_left_index">
                <el-dropdown size="mini" @command="(e) => {handleCommand(e, item)}">
                  <i class="el-icon-s-operation" style="font-size: 24px;"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="delete" style="color: red;">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
            <div class="item_content_wrapper">
              <div class="item_title_wrapper">
                <p class="item_name">{{ item.name }}</p>
                <ChartCpu :itemId="item.id" />
              </div>
              <div class="item_chart_wrapper">
                <ChartMemory :itemId="item.id" />
              </div>
            </div>
            <div class="item_info_wrapper">
              <div class="item_info">
                <p class="item_info_label">cpu_limit:</p>
                <p class="item_info_value">{{ item.total_cpu_limit }}</p>
              </div>
              <div class="item_info">
                <p class="item_info_label">cpu_request:</p>
                <p class="item_info_value">{{ item.total_cpu_request }}</p>
              </div>
              <div class="item_info">
                <p class="item_info_label">memory_limit:</p>
                <p class="item_info_value">{{ item.total_mem_limit }}</p>
              </div>
              <div class="item_info">
                <p class="item_info_label">memory_request:</p>
                <p class="item_info_value">{{ item.total_mem_request }}</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import ChartCpu from './chart_cpu.vue';
import ChartMemory from './chart_memory.vue';
export default {
  name: 'infoCardModule',
  components: {
    ChartCpu,
    ChartMemory
  },
  props: {
    sessionList: {
      type: Array,
      required: false,
    }
  },
  data() {
    return {
      activeItem: '',
    };
  },
  created() {},
  mounted() {

  },
  methods: {
    handleChangeActiveItem(nVal, oVal) {
      // console.log(oVal, nVal);
      this.$emit("handleChangeActive", nVal)
    },

    handleCommand(e, row){
      if (e === 'delete') {
        this.$confirm(`此操作将删除该Session: ${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSession(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },

    deleteSession(row) {
      const { id } = row;
      this.$httpDelete('deleteSession', {}, {}, {id})
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除完成。'
          });
          this.$emit('handleCloseAndReloadList');
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
.cardPageWrapper {
  width: 100%;

  .card_item_box {
    ::v-deep .el-card__body {
      height: 100%;
      padding: 0;
    }
    .item_wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      .item_left_wrapper {
        width: 100px;
        position: relative;
        flex-shrink: 0;
        .item_left_index {
          position: absolute;
          top: 0px;
          left: 12px;
          z-index: 3;
          font-size: 30px;
        }
        &::before {
          content: '';
          position: absolute;
          width: 100px;
          height: 150%;
          background-color: rgb(232, 241, 255);
          transform: rotateZ(40deg) translate(-100px, -60px);
        }
        &::after {
          content: '';
          position: absolute;
          width: 100px;
          height: 150%;
          background-color: #dbfffc;
          transform: rotateZ(-40deg) translate(-30px, -30px);
        }
      }
      .item_content_wrapper {
        padding: 20px;
        display: flex;
        flex-shrink: 0;
        .item_title_wrapper,
        .item_chart_wrapper {
          width: 50%;
          height: 100%;
        }
        .item_title_wrapper {
          .item_name {
            font-weight: 700;
            color: var(--font-color-active);
          }
        }
      }
      .item_info_wrapper {
        height: 100%;
        flex: 1;
        background-color: rgb(233, 253, 251);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
        padding: 0 20px;
        box-sizing: border-box;
        .item_info {
          width: 100%;
          height: 40px;
          line-height: 40px;
          display: flex;
          .item_info_label {
            text-align: right;
            width: 140px;
            font-weight: 600;
            padding-right: 5px;
          }
          .item_info_value {
            padding-left: 5px;
            flex: 1;
            font-size: 20px;
            font-weight: 600;
            color: chocolate;
            border-bottom: 1px dashed var(--border-color);
          }
        }
      }
    }
  }

}
</style>
