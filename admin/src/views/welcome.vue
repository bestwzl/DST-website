<template>
    <div class="page404_wrapper">
        <SKLogo />
        <div class="page404_content">
            <p class="page404_title">GCP</p>
            <p class="page404_desc">欢迎使用图计算平台</p>
        </div>
    </div>
</template>

<script>
import SKLogo from '../components/SKLogo_75.vue'
export default {
  components: {
    SKLogo
  },

};
</script>

<style lang="less" scoped>
    .page404_wrapper {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .page404_content {
            .page404_title {
                font-size: 60px;
                text-align: center;
            }
            .page404_desc {
                margin-top: 50px;
                font-size: 20px;
            }
        }
    }

</style>