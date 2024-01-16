<!-- 关于我们 -->
<template>
    <div class="home_page_wrapper">
        这里是主体
    </div>
</template>

<script>
export default {
  components: {
  },

  data() {
    return {
      aboutList: [
        {title: '团队介绍'}, // 团队工作，团队成员介绍
        {title: '知识产权'}, // 专利，软著，论文 等
        {title: '荣誉墙'}, // 获得的奖励
      ],
    };
  },

};
</script>

<style lang="less" scoped>
    .home_page_wrapper {
        width: 1400px;
        min-height: 1500px;
        height: 100%;
        margin: 0 auto;
        padding: 0;
        background-color: antiquewhite;

        .banner_wrapper {
            width: 100%;
            .banner_item {
                width: 100%;
                height: 300px;
                .banner_box {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    position: relative;
                }
                .banner_bg_box{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .banner_content_box {
                    width: 1400px;
                    border: 2px solid aqua;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    // justify-content: space-evenly;
                    justify-content: center;
                    .banner_title {
                        font-size: 36px;
                        font-weight: 900;
                        color: #fff;
                    }
                    .banner_subtitle {
                        font-size: 24px;
                        font-weight: 700;
                        color: rgba(255, 255, 255, 0.8);
                        margin: 10px 0 30px;
                        padding-left: 30px;
                    }
                    .banner_desc {
                        font-size: 16px;
                        color: #fff;
                    }
                }
            }
        }
    }

</style>