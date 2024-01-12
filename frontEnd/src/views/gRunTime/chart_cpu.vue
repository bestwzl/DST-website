// cpu的仪表图
<template>
  <div :id="`chartCPUWrapper_${itemId}`" style="width: 200px; height: 180px;"></div>
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
      const myChart = echarts.init(document.getElementById(`chartCPUWrapper_${this.itemId}`));
      const option = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '70%'],
            radius: '100%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, '#7CFFB2'],
                  [0.5, '#58D9F9'],
                  [0.75, '#FDDD60'],
                  [1, '#FF6E76']
                ]
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-70%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            axisLabel: {
              color: '#464646',
              fontSize: 10,
              distance: -40,
              rotate: 'tangential',
              formatter: function (value) {
                if (value === 0.125) {
                  return '轻松';
                } else if (value === 0.375) {
                  return '正常';
                } else if (value === 0.625) {
                  return '预警';
                } else if (value === 0.875) {
                  return '紧急';
                }
                return '';
              }
            },
            title: {
              left: 'center',
              textStyle: {
                fontSize: 12,
                fontWeight: 400
              }
            },
            detail: {
              fontSize: 30,
              offsetCenter: [0, '-10%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value * 100) + '';
              },
              color: 'inherit'
            },
            data: [
              {
                value: 0.7,
                name: 'cpu使用率'
              }
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
