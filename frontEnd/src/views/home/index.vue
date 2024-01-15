<template>
    <div class="home_page_wrapper">
        <!-- <BannerModule :bannerList="bannerList" /> -->
        这里是主体
    </div>
</template>

<script>
import BannerModule from './bannerModule.vue';
export default {
  components: {
    BannerModule
  },

  data() {
    return {
      bannerList: [
        {
            backGroundType: 'img', // img, color, video
            backGroundUrl: 'https://img0.baidu.com/it/u=3995006546,2760268670&fm=253&fmt=auto&app=138&f=JPEG?w=1563&h=500', // 背景图片/视屏地址 ｜ 纯色的颜色
            title: '这是一级标题', // 标题
            subTitle: '这里是二级标题，文字多一些', // 二级标题
            desc: '这里是简单的描述文案，文字会更多一些，更多一些，更多一些', // 描述文案
            link: 'https://www.baidu.com' // 跳转链接
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img1.pconline.com.cn/piclib/200901/03/batch/1/20508/1230998863053xr0fs0rlo1.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img0.baidu.com/it/u=3018234987,951664061&fm=253&fmt=auto&app=138&f=JPEG?w=1563&h=500',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://b.zol-img.com.cn/soft/6/616/ceHlJ6dRjw6H.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://www.sketchupbar.com/data/attachment/forum/201104/05/214753o73biezon08fj3bu.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img0.baidu.com/it/u=1960276615,4184663836&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img1.baidu.com/it/u=1025798450,2201938949&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=209',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
        {
            backGroundType: 'img',
            backGroundUrl: 'https://img1.pconline.com.cn/piclib/200901/03/batch/1/20508/12309988630535b9l0wqvao.jpg',
            title: '',
            subTitle: '',
            desc: '',
            link: ''
        },
      ],
    };
  },

};
</script>

<style lang="less" scoped>
    .home_page_wrapper {
        width: 100%;
        min-height: 1500px;
        height: 100%;
        margin: 0;
        padding: 0;

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