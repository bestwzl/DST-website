<template>
    <div class="sk_loading_wrapper">
        <div class="sk_logo_box">
            <div class="logo_item logo_top"></div>
            <div class="logo_item logo_left"></div>

            <div class="logo_center">
                <div class="logo_item logo_item_link_1"></div>
                <div class="logo_item logo_item_long_1"></div>
                <div class="logo_item logo_item_long_2"></div>
                <div class="logo_item logo_item_link_2"></div>
            </div>

            <div class="logo_item logo_right"></div>
            <div class="logo_item logo_bottom"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .sk_loading_wrapper {
        // width: 750px;
        // height: 500px;
        width: 100%;
        height: 100%;
        .sk_logo_box {
            width: 100%;
            height: 100%;
            max-width: 750px;
            max-height: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: relative;
            .logo_center {
                width: 100%;
                height: 50%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                .logo_item {
                    height: 20%;
                    position: absolute;
                }

                .logo_item_long_1,
                .logo_item_long_2{
                    width: 75%;
                }
                .logo_item_link_1,
                .logo_item_link_2 {
                    width: 47.5%;
                    transform-origin: 9% center;
                }
                .logo_item_long_1{
                    left: 50%;
                    transform: translateX(-50%);
                    top: 0;
                }
                .logo_item_link_1 {
                    left: 12.5%;
                    top: 0;
                    transform: rotate(24deg);
                }
                .logo_item_link_2{
                    left: 12.5%;
                    bottom: 0;
                    transform: rotate(-24deg);
                }
                .logo_item_long_2{
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 0;
                }
            }
            .logo_item {
                border-radius: 25px;
                background-image: linear-gradient(to right, #0070ff, #00dfff);
            }

            .logo_item_link_1,
            .logo_item_long_2{
                background-image: linear-gradient(to right, #00dfff, #0070ff);
            }

            .logo_top,
            .logo_bottom,
            .logo_left,
            .logo_right {
                position: absolute;
                height: 10%;
            }

            .logo_top {
                left: 50%;
                width: 50%;
                top: 0;
                transform: translate(-50%, 0);
                animation: anima_top 6s linear infinite;
            }
            .logo_right {
                left: 100%;
                width: 32%;
                top: 50%;
                transform: translate(-100%, -50%);
                animation: anima_right 6s linear infinite;
            }
            .logo_bottom {
                left: 50%;
                width: 50%;
                top: 100%;
                transform: translate(-50%, -100%);
                animation: anima_bottom 6s linear infinite;
            }

            .logo_left{
                left: 0;
                width: 32%;
                top: 50%;
                transform: translate(0, -50%);
                animation: anima_left 6s linear infinite;
            }

        }
    }

        /* 上 */
        @keyframes anima_top {
            0%{
                left: 50%;
                width: 50%;
                top: 0;
                transform: translate(-50%, 0);
            }
            25%{
                left: 100%;
                width: 32%;
                top: 50%;
                transform: translate(-100%, -50%);
            }
            50%{
                left: 50%;
                width: 50%;
                top: 100%;
                transform: translate(-50%, -100%);
            }
            75%{
                left: 0;
                width: 32%;
                top: 50%;
                transform: translate(0, -50%);
            }
            100%{
                left: 50%;
                width: 50%;
                top: 0;
                transform: translate(-50%, 0);
            }
        }
        /* 右 */
        @keyframes anima_right {
            0%{
                left: 100%;
                width: 32%;
                top: 50%;
                transform: translate(-100%, -50%);
            }
            25%{
                left: 50%;
                width: 50%;
                top: 100%;
                transform: translate(-50%, -100%);
            }
            50%{
                left: 0;
                width: 32%;
                top: 50%;
                transform: translate(0, -50%);
            }
            75%{
                left: 50%;
                width: 50%;
                top: 0;
                transform: translate(-50%, 0);
            }
            100%{
                left: 100%;
                width: 32%;
                top: 50%;
                transform: translate(-100%, -50%);
            }
        }
        /* 下 */
        @keyframes anima_bottom {
            0%{
                left: 50%;
                width: 50%;
                top: 100%;
                transform: translate(-50%, -100%);
            }
            25%{
                left: 0;
                width: 32%;
                top: 50%;
                transform: translate(0, -50%);
            }
            50%{
                left: 50%;
                width: 50%;
                top: 0;
                transform: translate(-50%, 0);
            }
            75%{
                left: 100%;
                width: 32%;
                top: 50%;
                transform: translate(-100%, -50%);
            }
            100%{
                left: 50%;
                width: 50%;
                top: 100%;
                transform: translate(-50%, -100%);
            }
        }
        /* 左 */
        @keyframes anima_left {
            0%{
                left: 0;
                width: 32%;
                top: 50%;
                transform: translate(0, -50%);
            }
            25%{
                left: 50%;
                width: 50%;
                top: 0;
                transform: translate(-50%, 0);
            }
            50%{
                left: 100%;
                width: 32%;
                top: 50%;
                transform: translate(-100%, -50%);
            }
            75%{
                left: 50%;
                width: 50%;
                top: 100%;
                transform: translate(-50%, -100%);
            }
            100%{
                left: 0;
                width: 32%;
                top: 50%;
                transform: translate(0, -50%);
            }
        }

</style>