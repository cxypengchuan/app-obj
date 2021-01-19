import Vue from 'vue'
import App from './App'
import store from './store'
import {config} from "./config/config";
import {toast} from "./common/utils/toast";
import {isEmpty, isNotEmpty, listIsEmpty, listIsNotEmpty} from "./common/utils/staticFunction";
import {routerUtil} from "./router/routerUtil";
Vue.config.productionTip = false
//是否开发模式
let isDev = config.isDev;
App.mpType = 'app'
//全局共享变量
Vue.prototype.$store = store;
Vue.prototype.toast = toast;
Vue.prototype.$isNotEmpty = isNotEmpty;
Vue.prototype.$isEmpty = isEmpty;
Vue.prototype.$listIsNotEmpty = listIsNotEmpty;
Vue.prototype.$listIsEmpty = listIsEmpty;

const app = new Vue({
    ...App
})

app.$mount();
