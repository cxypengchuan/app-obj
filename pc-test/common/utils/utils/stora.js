import {aes, md5} from "@/utils/crypto";
import store from '../store'
import {initRouter} from "../router";

export const stora = window.localStorage;

export const put = (key, value) => {
    if (key) {
        key += process.env.VUE_APP_SYS_CODE;
    }
    key = md5(key);
    if (typeof value === 'object') {
        stora.setItem(key, aes.en(JSON.stringify(value)))
    } else (
        stora.setItem(key, aes.en(value))
    )
};

export const get = (key) => {
    if (key) {
        key += process.env.VUE_APP_SYS_CODE;
    }
    key = md5(key);
    return aes.de(stora.getItem(key) || "");
};

export const getJson = (key) => {
    let value = get(key);
    return value ? JSON.parse(value) : undefined;
};

export const setUserId = (userId) =>
    put('userId', userId || '');

export const getUserId = () =>
    get('userId') || '';

export const setUser = (value) => {
    put("user", value);
    setUserId(value ? value.id : '');
    store.commit('setUserInfo', value);
    if (value && value.token) {
        put('token', value.token);
    }
    if (value && value.etpUsers && value.etpUsers.length > 0) {
        setEtpUsers(value.etpUsers);
    }
    if (value && value.lastRoleId) {
        setCurRoleId(value.lastRoleId);
    }
    if (value && value.menus) {
        let menuList = toMenuList(value.menus);
        setMenuList(value.lastRoleId, menuList);
        initRouter(value.menus || [], true);
    }
    if (value.powers) {
        store.commit('setPowers', value.powers);
    }
};

export const getUser = () => {
    let userInfo = store.state.userInfo;
    if (userInfo && userInfo.id) {
        return userInfo;
    }
    let user = getJson("user") || {};

    store.commit('setUserInfo', user);
    return user;

};

export const getCurRoleId = () =>
    get("curRoleId");

export const setCurRoleId = (roleId) =>
    put('curRoleId', roleId);

export const setUserIds = (userIds) =>
    put("userIds", userIds);

export const getUserIds = () =>
    getJson("userIds");

export const getToken = () =>
    get('token');

export const getPowers = () => {
    let user = getUser();
    return user && user.powers ? user.powers : undefined;
};


export const getMenus = () => {
    let user = getUser();
    return user && user.menus ? user.menus : undefined;
};

export const setMenuList = (lastRoleId, menuList) => {
    put("menuList" + lastRoleId, menuList);
    store.commit('setAllMenus', menuList);
};

export const getMenuList = (lastRoleId) => {
    return getJson("menuList" + lastRoleId);
};

export const clear = () => {
    //清空localStorage
    stora.clear();
    //清空登录cookie
    delCookie("login");
    //清空vue
    store.commit('clear');
};

export const setSysInfo = (data) => {
    put("sysInfo", data);
};

export const getSysInfo = () => {
    return getJson("sysInfo");
};

export const setLogin = (data, rememberMe = false) => {
    //put("login", data);
    //记住我7天失效，否则关闭浏览器失效
    setCookie("login", data, rememberMe ? 7 * 24 * 60 : 0);
    put('rememberMe', {rememberMe: rememberMe});
    setOperTime();
};

export const rememberMe = () => {
    let data = getJson("rememberMe");
    return data ? data.rememberMe : false;
}

export const getLogin = () => {
    //return getJson("login");
    let login = getCookie("login");
    if (login) {
        let parse = JSON.parse(login);
        setLogin(parse,rememberMe())
        return parse;
    }
    return null;
};
//设置企业用户
export const setEtpUsers = (users) => {
    put("etpUsers", users);
    put("isEtpUser", {"isEtpUser": true});
};
//得到企业用户
export const getEtpUsers = () => {
    return getJson("etpUsers");
};
//判断是否是企业用户
export const isEtpUser = () => {
    let etpUser = getJson("isEtpUser");
    return etpUser && etpUser != null && etpUser.isEtpUser ? true : false;
};

//创建操作时间
export const setOperTime = () => {
    let operTime = new Date().getTime();
    put("operTime", operTime + "");
};
export const setTableheads = (heads) => {
    put("tableHeads", heads);
};

export const getTableHeads = () => {
    return getJson("tableHeads");
};

//得到成功操作时间
export const getOperTime = () => {
    let operTime = get("operTime");
    return operTime && operTime.length > 0 ? operTime : 0;
};

//判断是否操作超时
export const isTimeOut = () => {
    let oldTime = parseInt(getOperTime());
    let nowTime = new Date().getTime();
    return nowTime - oldTime > 30 * 60 * 1000;
};

/**
 *@param cname cookie名称
 * @param cvalue cookie值
 * @param exMi 超时时间-分钟
 * @author leisong
 **/
const setCookie = (cname, cvalue, exMi = 30) => {
    let d = new Date();
    cvalue = aes.en(JSON.stringify(cvalue));
    if (exMi <= 0) {
        document.cookie = cname + "=" + cvalue + "; ; path=/";
        return;
    }
    d.setTime(d.getTime() + (exMi * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
};

const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return aes.de(c.substring(name.length, c.length));
        }
    }
    return "";
};

/**
 * 删除cookie
 * @param name cookie的名称
 */
const delCookie = function (name) {
    setCookie(name, '', -1);
};


//得到菜单列表
const toMenuList = (menus) => {
    //轉化為json數據對象
    let tempMenus = JSON.parse(JSON.stringify(menus));
    if (tempMenus && tempMenus.length > 0) {
        let menuList = [];
        for (let menu of tempMenus) {
            if (menu.childrens && menu.childrens.length > 0) {
                menuList = menuList.concat(toMenuList(menu.childrens));
                menu.childrens = [];
                menuList.push(menu);
            } else {
                menuList.push(menu);
            }
        }
        return menuList;
    }
};


