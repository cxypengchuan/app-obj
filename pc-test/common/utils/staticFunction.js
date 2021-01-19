
//是否为不为空
import {toast} from "./toast";

const selfIsNotEmpty = (val) => {
    if (!val) {
        return false;
    }
    if (val instanceof String || typeof val == 'string') {
        return val.length > 0;
    }
    if (val instanceof Number || typeof val == 'number') {
        return val !== 0;
    }
    if (val instanceof Date) {
        return val.getTime() > 0;
    }
    if (val instanceof Object) {
        return Object.keys(val).length > 0;
    } else {
        let s = JSON.stringify(val);
        return s && s.length > 0;
    }
};

//不为空-有空则空
export const isNotEmpty = (...vals) => {
    if (!vals || vals.length <= 0) {
        return false;
    }
    if (vals.length == 1) {
        return selfIsNotEmpty(vals[0]);
    }
    for (let i = 0; i < vals.length; i++) {
        if (!selfIsNotEmpty(vals[i])) {
            return false;
        }
    }
    return true;
};
//获取网络状态
export const getNetWorkType = () => {
    uni.getNetworkType({
        success(res) {
            let networkType = res.networkType || '';
            //断网提示
            if (networkType == 'none') {
                toast.error('网络异常，请检查网络状态');
            }
        }
    });
}
//为空，有空则空
export const isEmpty = (...vals) => !isNotEmpty(...vals);

//判断list不为空
export const listIsNotEmpty = (list) => list && list.length > 0;
//判断list为空
export const listIsEmpty = (list) => !listIsNotEmpty(list);


export const staticFunction = {

    isEmpty,
    isNotEmpty,

};
