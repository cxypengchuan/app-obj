import Vue from 'vue'
import Vuex from 'vuex'
import {clear, getUser, setUser} from "../common/utils/stora";
import {logout} from "../common/api/login/login";
// import {closePush, createNotification, openPush} from '../common/utils/pushUtil';
// import {hxApi} from "../common/huanxin/WebIM";
// import {insertMsg, isGroup} from "../common/db/moudules/msg";
// import {constants} from "../common/utils/constants";
// import {setTabBarNoReadMesNum} from "../common/api/admin/admin/mes";
// import {getGroupInfoCache} from "../common/api/admin/admin/userGroup";
// import {getMesUserInfo} from "../common/api/admin/admin/user";
// import {clearUserPowers, insertPowerList} from "../common/db/moudules/power";
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        //临时数据
        tempData: {},
        hasLogin: false,
        userInfo: {},
        powerList: [],
        isShowPicker: false,
        newMsg: {},
        sendMsg: {},
        sessionLive: false,
        showStatus: true,
        curMenu:{},
        token:null
    },

    mutations: {
        //设置token
        setToken(state,data){
            state.token = data;
        },
        //登录缓存用户信息
        login(state, provider) {
            state.hasLogin = true;
            state.userInfo = provider.userInfo;
            state.powerList = provider.powerList;
            setUser(provider.userInfo);

        },
        //退出登录，清除用户信息
        logout(state) {
            const user = getUser();
            // logout();
            // closePush();
            state.hasLogin = false;
            state.userInfo = {};
            state.powerList = [];
            clear();

        },
        //更新权限列表
        updatePowerList(state, powerList) {
            // insertPowerList(state.userInfo.id, powerList);
            state.powerList = powerList;
        },
        //更新用户信息
        updateUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            console.log('更新的用户信息',state.userInfo)
        },
        //更新登录状态
        updateLoginStatu(state, statu) {
            state.hasLogin = statu;
        },
        setShowStatus(state, status = true) {
            state.showStatus = status;
        },
        //更新会话在线状态
        setSessionLive(state, live = false) {
            state.sessionLive = live
        },

        sendMsg(state, msg) {
            state.sendMsg = msg;
            //#ifdef APP-PLUS
            // insertMsg(msg);
            //#endif
        },
        setTempData(state, data) {
            state.tempData = data;
        },
        setCurMenu(state, data) {
            state.curMenu = data;
        }
    },
    actions: {},
    getters: {
        getPowerList: state => {
            return state.powerList;
        }
    }
});

export default store
