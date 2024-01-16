// 基础布局-底部
<template>
  <div class="layout_footer_wrapper">
    <div class="footer_content_wrapper">
      <div class="footer_top">
        <p>联通数字科技有限公司-数据智能事业部-数据科学团队</p>
      </div>
      <div class="footer_main">
        <div class="footer_group_wrapper" v-for="item in linkList" :key="item.title">
          <p class="group_title">{{ item.title }}</p>
          <div class="group_body">
            <p class="group_item" v-for="it in item.list" :key="it.label">{{ it.label }}</p>
          </div>
        </div>
      </div>
      <div class="footer_bottom">
        <span>Copyright © 2024 Unicom Digital Tech. 保留所有权利。</span>
        <span>公网安备：202433579854</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      linkList: [
        {
          title:'研究布局',
          list:[
            { label: '智能', link: ''},
            { label: '计算', link: ''},
            { label: '大模型', link: ''},
          ]
        },
        {
          title:'合作生态',
          list:[
            { label: '文旅', link: ''},
            { label: '政务', link: ''},
            { label: '通信', link: ''},
            { label: '教育', link: ''},
            { label: '金融', link: ''},
            { label: '智慧城市', link: ''},
          ]
        },
        {
          title:'关于我们',
          list:[
            { label: '团队介绍', link: ''},
            { label: '项目介绍', link: ''},
            { label: '合作', link: ''},
          ]
        },
        {
          title:'招贤纳士',
          list:[
            { label: '简历投递', link: ''},
          ]
        },
      ],
    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style scoped lang="less">
.layout_footer_wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: var(--background-color-2);
  .footer_content_wrapper {
    width: 1400px;
    min-height: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .footer_top {
      width: 100%;
      height: 60px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }

    .footer_main {
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: space-evenly;
      padding: 30px;
      .footer_group_wrapper {
        margin-right: 50px;
        .group_title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .group_body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex-wrap: wrap;
          max-height: 200px;
          .group_item {
            font-size: 12px;
            opacity: 0.8;
            cursor: pointer;
            padding: 2px 40px 2px 0;
            &:hover {
              color: var(--font-color-active);
            }
          }
        }
      }
    }

    .footer_bottom {
      font-size: 14px;
      width: 100%;
      height: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>

