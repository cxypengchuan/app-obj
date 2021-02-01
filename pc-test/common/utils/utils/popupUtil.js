import {listen} from "./listen";
import Org from '../components/uc/org'
import Area from "../components/area/area";
import SelectSampleRecord from '../views/admin/chm/popup/select-sample-record'
import SetSampleNOReportNo from '../views/admin/chm/set_sample_no_report_no'
import ShowSelectSampleTest from '@/components/chm/show-select-sample-test'
import {toast} from "@/utils/toastUtils";

/**
 * 选择区域
 * @param adCode 已选中区划编码
 * @param parentCode 父级区划编码
 * @author leisong
 * @date 2019/12/13 14:40
 **/
export const showSelectArea = (adCode, parentCode = '520300') =>
    new Promise((resolve, reject) => {
        listen.$dlg.modal(Area, {
            //id,唯一值，防止重复打开
            singletonKey: 'selectArea',
            title: getPopupTitle('选择区域'),
            width: 620,
            height: 600,
            //传递参数，组件内通过props获取
            params: {value: adCode, parentCode: parentCode, returnMethod: 'close'},
            //监听组件数据，组件内执行this.$emit('close',data);
            callback: data => {
                if (data) {
                    resolve(data);
                } else {
                    reject();
                }
            },
            cancelCallback: back => {
                reject();
            }
        });
    });

/**
 * 选择部门
 * @param orgIds 已选中的id列表
 * @param parentId 父级id
 * @param isOne 是否是单选
 * @author leisong
 * @date 2019/12/13 14:40
 **/
export const showSelectOrg = (orgIds = [], isOne = false, disNone = false, parentId = '0', title = '选择部门') =>
    new Promise((resolve, reject) => {
        listen.$dlg.modal(Org, {
            //id,唯一值，防止重复打开
            singletonKey: 'showSelectOrg',
            title: getPopupTitle(title),
            width: 620,
            height: 600,
            //传递参数，组件内通过props获取
            params: {values: orgIds, parentId: parentId, isOne: isOne, disNone: disNone},
            //监听组件数据，组件内执行this.$emit('close',data);
            callback: orgs => {
                if (orgs) {
                    resolve(orgs);
                } else {
                    reject();
                }
            },
            cancelCallback: back => {
                reject();
            }
        });
    });

/**
 * 选择样品记录-只能选择已签收的
 * @param qsStatusList  签收状态
 * @author leisong
 * @date 2019/12/13 14:40
 **/
export const showSelectSampleRecord = (qsStatusList = [2]) =>
    new Promise((resolve, reject) => {
        listen.$dlg.modal(SelectSampleRecord, {
            //id,唯一值，防止重复打开
            singletonKey: 'SelectSampleRecord',
            title: getPopupTitle('选择样品'),
            width: 1000,
            height: 700,
            //传递参数，组件内通过props获取
            params: {qsStatusList},
            //监听组件数据，组件内执行this.$emit('close',data);
            callback: data => {
                if (data) {
                    resolve(data);
                } else {
                    reject();
                }
            },
            cancelCallback: back => {
                reject();
            }
        });
    });

export const showSetSampleNoReportNo = (sampleId, type2) =>
    new Promise((resolve, reject) => {
        listen.$dlg.modal(SetSampleNOReportNo, {
            singletonKey: 'setSampleNoReportNo',
            title: getPopupTitle('设置编号'),
            width: 1000,
            height: 700,
            params: {sampleId: sampleId, type2: type2},
            callback: data => {
                if (data) {
                    resolve(data)
                } else {
                    reject()
                }
            },
            cancelCallback: back => {
                reject()
            }
        })
    })

export const showSelectSampleTest = (sampleRecordId = '') =>
    new Promise((resolve, reject) => {
        toast.showMiniModal('选择跳转的检测项目', ShowSelectSampleTest,
            {sampleRecordId: sampleRecordId},
            data => {
                if (data) {
                    resolve(data)
                } else {
                    reject()
                }
            },
            back => {
                reject()
            });
    })


//获取弹窗标题
export const getPopupTitle = (title = "") => {
    return `<div class="popup-title">
              <div class="left-line"></div>
             <h3 class="title-cont">${title}</h3>
            </div>
            `;
};


//获取表单弹窗标题
export const getFormTitle = (title, id) => (id && id.length ? '修改' : '添加') + title;
