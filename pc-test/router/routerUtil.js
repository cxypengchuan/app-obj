import {isEmpty, isNotEmpty} from "../common/utils/staticFunction";

//路由跳转工具，所有路由跳转都需要使用这个工具
export const routerUtil = {
    timeout: 500,
    //是否可以跳转
    flag: true,
    hide() {
        this.flag = false;
    },
    show() {
        this.flag = true;
    },
    //防止双击效果
    verify() {
        if (!this.flag) {
            return false;
        }
        this.hide();
        setTimeout(() => {
            this.show();
        }, this.timeout);
        return true;
    },
    //对象跳转
    navigateTo(obj = {}) {
        this.verify() && uni.navigateTo(obj);
    },
    //URL跳转
    navigateToUrl(url = '') {
        this.navigateTo({url});
    },
    //对象跳转
    redirectTo(obj = {}) {
        this.verify() && uni.redirectTo(obj);
    },
    redirectToUrl( url) {
        this.verify() && uni.redirectTo({url});
    },
    //对象跳转
    reLaunch(obj = {}) {
        this.verify() && uni.reLaunch(obj);
    },
    //对象跳转
    switchTab(obj = {}) {
        this.verify() && uni.switchTab(obj);
    },
}

/**
 * 统一跳转处理
 * @param menuCode 菜单编码
 * @param objId 跳转对象Id
 * @author leisong
 * @date 2019/7/24 09:25
 **/
// export const goObjDetail = (menuCode, objId) => {
//     if (isEmpty(menuCode, objId)) {
//         return;
//     }
//     let url = undefined;
//     switch (menuCode) {
//         //笔记
//         case 'daily_gzbj':
//             url = `/pages/workbench/notes/received-notedetail?id=${objId}`;
//             break;
//         //工作简报
//         case 'daily_gzjbbao':
//             url = `/pages/workbench/briefing/briefing-details?id=${objId}`;
//             break;
//         //任务
//         case 'worktable_xhwt':
//         case 'daily_gzjb':
//         case 'emergencyTask':
//         case 'informTask':
//         case 'com_gx_hz_model_iwatask':
//             url = `/pages/home/task/task-detail?id=${objId}`;
//             break;
//         //巡河日志
//         case 'com_gx_hz_model_riverinspectrecord':
//         case 'worktable_xhrz':
//             url = `/pages/mine/river-patrol-log/view-river-log-detail?recordId=${objId}`;
//             break;
//         //人员
//         case 'com_gx_uc_model_ucuser':
//             goChatOne(objId);
//             break;
//         //文章
//         case 'com_gx_cms_model_cmscontent':
//             url = `/pages/home/news/news-detail/news-detail?id=${objId}`;
//             break;
//         //问题
//         case 'iwaProblem':
//             url = `/pages/home/problem/problem-detail?id=${objId}`;
//             break;
//         //报表
//         case 'iwa_report':
//             url = `/pages/datacenter/report-forms-detail?id=${objId}`;
//             break;
//         //投诉
//         case 'inform_info':
//         case 'worktable_qzts':
//             url = `/pages/mine/complaint/complaint-detail?id=${objId}`;
//             break;
//         //民间巡河
//         case 'river_open_record':
//             url = `/pages/workbench/folk-patrol/folk-patrol-detail?id=${objId}`;
//             break;
//         default:
//             break;
//     }
//     if (isNotEmpty(url)) {
//         routerUtil.navigateTo({url: url});
//     }
// };
//
//
// //跳转到聊天界面
// export const goChatOne = (userId) => {
//     return;
//     //routerUtil.navigateTo({url: '/pages/message/chat/chat?toId=' + userId});
// }
//
// //跳转到聊天界面
// export const goChatGroup = (groupId) =>
//     routerUtil.navigateTo({url: '/pages/message/chat/group-chat?toId=' + groupId});
//
// //跳转到用户注册协议
// export const goRegAgreementWeb = () => {
//     routerUtil.navigateTo({
//         url: '/pages/common/user-agreement'
//     })
// };


