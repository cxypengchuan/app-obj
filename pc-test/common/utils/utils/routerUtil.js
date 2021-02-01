import router from '../router/index'
import {getMenuByPowerValue, getMenuByUrl} from "../api/admin/admin/menu";
import {toast} from "./toastUtils";
import {listen} from './listen'
import {md5} from "./crypto";
import {constants} from "./Constants";

let routers = [
    //应急任务
    {menuCode: "emergencyTask", url: ""},
    //停水通知
    {menuCode: "stopwater", url: ""},
    //告警信息
    {menuCode: "alarminfoapp", url: ""},
    //巡河报表
    {menuCode: "riverInspectReport", url: ""},
    //工作简报
    {menuCode: "daily_gzjbbao", url: ""},
    //巡河任务
    {menuCode: "worktable_xhwt", url: ""},
    //投诉任务
    {menuCode: "informTask", url: ""},
    //数据报表
    {menuCode: "datareport", url: ""},
    //巡河日志
    {menuCode: "worktable_xhrz", url: ""},
    //水资-三条红线考核-印证资料
    {menuCode: "sz3redlineverifymaterial", url: "/admin/iwa/dir_table_info"},
    //群众投诉
    {menuCode: "worktable_qzts", url: ""},
    //工作笔记
    {menuCode: "daily_gzbj", url: ""},
    //工作交办
    {menuCode: "daily_gzjb", url: ""},
    //两山水务云
    {menuCode: "system", url: ""},
    {menuCode: "sampletest", url: "/admin/chm/dir_sample_test"},
    //问题报送
    {menuCode: "assignproblem", url: ""},];

/**
 * 消息跳转详情
 * @param menuCode 菜单编码
 * @param objId 对象id
 * @param params 其它附带参数
 * @author leisong
 * @date 2019/3/13 19:06
 **/
export const goMesObjDetail = (menuCode, objId, params = {}) => {
    let url = "";
    routers.forEach(item => {
        if (item.menuCode === menuCode) {
            url = item.url;
        }
    });
    if (url && url.length > 0) {
        router.push({path: url, query: {id: objId}, params: params});
    }
};


//路由跳转
export const go = (menuCode, params) => {
    // console.log(menuCode,params)
    if (!menuCode) {
        return;
    }
    getMenuByPowerValue(menuCode).then(res => {
        //
        let menu = res.data;
        if (!menu) {
            toast.error("跳转失败，菜单不存在");
            return;
        }
        //调整流程图跳转对应功能所携带的参数
        if(menuCode=='addRecord1'|| menuCode=='addRecord2'|| menuCode=='qxgl') {
            menu.query = params;
        }
        // else {
        //     menu.params = params;
        // }

        listen.$emit('go', menu);
    }).catch(err => {
        toast.error("跳转失败，菜单不存在");
    });
};


//跳转公告详情
export const goAnnounce = (id, source) => {
    window.open('/#/open/cms/announce_detail?id=' + id + '&source=' + source);
};



export const getParamsUrl = (param) => {
    if (param && param.length > 0) {
         return constants.menuSplit + md5(param);
    }
    return '';
};
