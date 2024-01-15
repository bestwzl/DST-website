<template>
    <div class="page404_wrapper">
        <div class="page404_content">
            <p class="page404_title">DST</p>
            <p class="page404_desc">首页</p>
        </div>
    </div>
</template>

<script>
export default {
  components: {},

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