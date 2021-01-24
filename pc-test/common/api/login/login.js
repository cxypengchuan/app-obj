import http from '../../vmeitime-http/interface'
import request from "../../request";
/*******登录权限相关接口*******/
import {md5} from '../../utils/crypto'
import {config} from "../../../config/config";
import {constants} from "../../utils/constants";

//用户登录-pc
export const logins = (userName, password) => {
    let data = {
        "loginType": 1,
        "systemType": config.systemType,
        "userName": userName,
        // #ifdef APP-PLUS
        "clientId": plus.device.uuid || '',
        // #endif
        "password": md5(password)
    };
    return request.post("login_app", data);
};

//用户登录
export const login = (userName, password) => {
    let data = {
        "loginType": 1,
        "systemType": config.systemType,
        "userName": userName,
        // #ifdef APP-PLUS
        "clientId": plus.device.uuid || '',
        // #endif
        "password": md5(password)
    };
    return http.post("login_app", data);
};

//用户登录
export const loginOther = (otherAccountId, loginType = constants.loginType.weixin) => {
    let data = {
        "loginType": loginType,
        "systemType": config.systemType,
        "otherAccountId": otherAccountId,
        // #ifdef APP-PLUS
        "clientId": plus.device.uuid || ''
        // #endif
    };
    return http.post("login_app", data);
};

//刷新token
export const refreshToken = ()=>
    http.post('refresh_token');
//注销登录
export const logout = () =>
    http.post('logout');
//判断用户是否登录
export const isLogin = () =>
    http.post('islogin');
//更新用户权限
export const updateUserPower = () =>
    http.post("update_app_user_powers");
//得到字典列表
export const getDictListCode = (code) =>
    http.post("admin/global/get_dict_list_by_code",{"code":code});
