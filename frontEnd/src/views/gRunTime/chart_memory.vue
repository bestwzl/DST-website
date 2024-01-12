// memory 的饼图
<template>
  <div :id="`chartMemoryWrapper_${itemId}`" style="width: 180px; height: 180px;"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  name: 'chartModule',
  props: {
    itemId: {
      type: Number,
      required: false,
    }
  },

  // watch: {
  //     "tableData": {
  //       handler(nVal){
  //         this.$emit("update:fieldList", nVal);
  //       },
  //       deep: true,
  //       immediate: true,
  //     }
  // },
  data() {
    return {
      sessionList: '',
    };
  },
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    setTimeout(() => {
      this.initChart();
    }, 0)
  },
  methods: {
    initChart() {
      const myChart = echarts.init(document.getElementById(`chartMemoryWrapper_${this.itemId}`));
      const option = {
        color: ['#98db7c', '#fe6566'],
        title: {
          text: '内存使用情况',
          left: 'center',
          top: 'bottom',
          textStyle: {
            fontSize: 12,
            fontWeight: 400
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'center'
        },
        series: [
          {
            name: '内存',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '已使用' },
              { value: 300, name: '剩余' }
            ]
          }
        ]
      };
      myChart.setOption(option);
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
        width: 190px;
        position: relative;
        border-right: 1px dashed var(--border-color);
        .item_left_index {
          position: absolute;
          top: 20px;
          left: 80px;
          z-index: 3;
          font-size: 30px;
        }
        &::before {
          content: '';
          position: absolute;
          width: 150px;
          height: 150%;
          background-color: rgb(232, 241, 255);
          transform: rotateZ(45deg) translate(-100px, -60px);
        }
        &::after {
          content: '';
          position: absolute;
          width: 150px;
          height: 150%;
          background-color: #dbfffc;
          transform: rotateZ(-45deg) translate(-30px, -30px);
        }
      }
      .item_content_wrapper {
        padding: 20px;
      }
    }
  }

}
</style>
