<template>
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
</template>

<style lang="less" scoped>

        .sk_logo_box {
            width: 150px;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: relative;
            .logo_center {
                width: 150px;
                height: 50px;
                position: absolute;
                top: 25px;
                .logo_item_long_1,
                .logo_item_long_2{
                    left: 20px;
                    width: 110px;
                }
                .logo_item_link_1,
                .logo_item_link_2 {
                    left: 20px;
                    width: 75px;
                    transform-origin: 5px center;
                }
                .logo_item_long_1{
                    top: 0;
                }
                .logo_item_long_2{
                    bottom: 0;
                }
                .logo_item_link_1 {
                    top: 0;
                    transform: rotate(18deg);
                }
                .logo_item_link_2{
                    bottom: 0;
                    transform: rotate(-18deg);
                }
            }
            .logo_item {
              position: absolute;
                height: 10px;
                border-radius: 5px;
                background-image: linear-gradient(to right, #0070ff, #00dfff);
            }

            .logo_item_link_1,
            .logo_item_long_2{
                background-image: linear-gradient(to right, #00dfff, #0070ff);
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