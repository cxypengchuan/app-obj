<script>

    import {getToken, getUser, setUser} from "./common/utils/stora";
    import {routerUtil} from "./router/routerUtil";
	export default {
	    onLoad() {

        },
        watch:{

        },
        methods: {

        },
        computed: {

        },
		onLaunch: function() {
			console.log('App Launch')
            let user = getUser()
            let token = getToken()
            if (user && token){
                routerUtil.reLaunch({
                    url: '/pages/home/index'
            })
            }else{
                routerUtil.reLaunch({
                    url: '/pages/index/index'
                })
            }
		},
		onShow: function() {
			console.log('App Show')

		},
		onHide: function() {
			console.log('App Hide')

        },




	}
</script>
<style lang="scss">
    /*#ifndef APP-PLUS-NVUE */
    @import "./common/iconfont.css";
    @import "./common/common.scss";
    /*#endif*/
    //通用背景
</style>
