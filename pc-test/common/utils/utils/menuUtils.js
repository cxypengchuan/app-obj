import {getCurRoleId, getMenuList} from "./stora";
import store from '../store';
import {localRouters} from "@/router";
import {getParamsUrl} from "./routerUtil";

//获取菜单名称
const menuNames = (id) => {
    let menuList = getMenuList(getCurRoleId());
    let menus = [];
    if (menuList && menuList.length > 0 && id) {
        for (let i = 0; i < menuList.length; i++) {
            let menu = menuList[i];
            if (menu.id === id) {
                menus.push(menu);
                if (menu.parentId !== "0") {
                    menus = menus.concat(menuNames(menu.parentId))
                }
            }
        }
        return menus;
    }
};

//获取菜单名称
export const getMenuNames = (id) => {
    let menus = menuNames(id);
    let tempMenus = [];
    if (menus && menus.length > 0) {
        for (let i = menus.length - 1; i >= 0; i--) {
            tempMenus.push(menus[i]);
        }
    }
    return tempMenus;
};

//判断菜单是否存在
export const hasMenu = (url) => {
    if (!url) {
        return false;
    }
    let allMenus = store.allMenus || getMenuList(getCurRoleId()) || [];
    if (!allMenus || allMenus.length <= 0) {
        return false;
    }
    for (let menu of allMenus) {
        let params = '';
        if (menu.params) {
            params = getParamsUrl(menu.params);
        }
        if (menu.url + params == url) {
            return true;
        }
    }
    return hasLocalRoute(url);
};

export const hasLocalRoute = (url) => {
    let filter = localRouters.filter(a => a.path == url);
    return filter && filter.length > 0;
};
