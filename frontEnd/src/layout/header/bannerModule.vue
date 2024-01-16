<template>
    <div class="module_wrapper">
        <el-carousel trigger="click" :autoplay="false" height="450px" class="banner_wrapper">
            <el-carousel-item
                v-for="(item, index) in bannerList"
                :key="`${index}_${item.backGroundUrl}`"
                class="banner_item"
            >
                <div class="banner_box">
                    <div class="banner_bg_box">
                        <img :src="item.backGroundUrl" alt="">
                    </div>
                    <div class="banner_content_box">
                        <p class="banner_title">{{ item.title }}</p>
                        <p class="banner_subtitle">{{ item.subTitle }}</p>
                        <p class="banner_desc">{{ item.desc }}</p>
                    </div>
                </div>

            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
  components: {},
  props: {

  },

  props: {
    visible: {
      type: Boolean,
      required: false
    },
    bannerList: {
      type: Array,
      required: false,
    }
  },

  data() {
    return {
    };
  },

};
</script>

<style lang="less" scoped>
.module_wrapper {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    .banner_wrapper {
        width: 100%;
        height: 100%;
        .banner_item {
            width: 100%;
            height: 100%;
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
                    margin: 10px 0 40px;
                    padding-left: 40px;
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