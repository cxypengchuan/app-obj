<template>
    <view class="content">
       我是工作台页面
    </view>
</template>

<script>

    import CommonHeader from "../../components/common-header";
    export default {
        components: {CommonHeader},
        data() {
            return {
            }
        },

        onLoad() {

        },
        mounted(){

        },
        methods: {

        },

    }
</script>

<style lang="scss" scoped>


    button {
        width: 50%;
        margin: 20rpx auto;
        z-index: 1;
        color: white;
        background: #40a9ff;
        outline: none;
        border: none;
        padding: 0.5em 1em;
    }

    button:active  {
        cursor: pointer;
        animation: jelly 0.5s;
    }
    @keyframes jelly {
        0%,
        100% {
            transform: scale(1, 1);
        }

        25%,
        75% {
            transform: scale(0.9, 1.1);
        }

        50% {
            transform: scale(1.1, 0.9);
        }
    }


</style>
