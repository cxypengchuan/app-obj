<template>
    <view class="content">
       <view class="goout" @click="goout">退出</view>
    </view>
</template>

<script>

    import {logout} from "../../common/api/login/login";
    import {toast} from "../../common/utils/toast";
    import {clear, getToken, getUser, remove} from "../../common/utils/stora";
    import {routerUtil} from "../../router/routerUtil";

    export default {
        components: {},
        data() {
            return {

            }
        },

        onLoad() {

        },
        mounted(){

        },
        methods: {
            goout(){
                logout().then(res=>{
                    let user = getUser()
                    clear()
                    toast.success("退出成功")
                    setTimeout(()=>{
                        routerUtil.reLaunch({
                            url:'/pages/index/index'
                        })
                    },1000)
                })
            }
        },


    }
</script>

<style lang="scss">
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
    }
    .goout{
        background-color: pink;
        font-size: 28rpx;
        width: 100%;
        height: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        position: fixed;
        bottom: 50rpx;
    }

</style>
