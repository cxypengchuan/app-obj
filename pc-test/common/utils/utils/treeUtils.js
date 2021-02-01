/**
 * 得到树的叶子节点数量
 * @param datas 需要计算的树
 * @param key 子节点的key
 * @author leisong
 * @date 2019/3/2 18:53
 **/
export const getTreeEndNodeNum = (datas, key = "childrens") => {
    if (!datas || datas.length <= 0) {
        return 0;
    }
    let num = 0;
    for (let data of datas) {
        if (data[key] && data[key].length > 0) {
            num += getTreeEndNodeNum(data[key],key);
        } else {
            num++;
        }
    }
    return num;
};

/**
 * 得到树的层级数量
 * @param datas 需要计算的树
 * @param key 子节点的key
 * @author leisong
 * @date 2019/3/2 18:53
 **/
export const getTreeLayNum = (datas, key = "childrens") => {
    if (!datas || datas.length <= 0) {
        return 0;
    }
    let max = 0;
    let each = (data, floor) => {
        for (let e of data) {
            if (floor > max) {
                max = floor;
            }
            if (e[key] && e[key].length > 0) {
                each(e[key], floor + 1);
            }
        }
    };
    each(datas, 1);
    return max;
};


/**
 * 过滤树
 * @author leisong
 * @date 2019/12/12 13:30
 * @param keyword 关键词
 * @param key 过滤的字段
 * @param childrenKey 子节点字段
 **/
export const filterTree = (datas, keyword = '', key = 'name', childrenKey = 'childrens') => {
    if (!datas || !key || !childrenKey || !keyword) {
        return datas;
    }
    let filterDatas = JSON.parse(JSON.stringify(datas));
    let filter = (tempDatas) => {
        for (let i = tempDatas.length - 1; i >= 0; i--) {
            let data = tempDatas[i];
            if (data[childrenKey] && data[childrenKey].length > 0) {
                filter(data[childrenKey]);
                if (!data[childrenKey] || data[childrenKey].length <= 0) {
                    tempDatas.splice(i, 1);
                }
            } else if (!data[key] || data[key].indexOf(keyword) == -1) {
                tempDatas.splice(i, 1);
            }
        }
    };
    filter(filterDatas);
    return filterDatas;
};


/**
 * 得到树的所有叶子节点
 * @param datas 需要计算的树
 * @param key 子节点的key
 * @author leisong
 * @date 2019/3/2 18:53
 **/
export const getTreeAllEndNode = (datas, key = "childrens") => {
    if (!datas || datas.length <= 0) {
        return [];
    }
    let results = [];
    for (let data of datas) {
        //存在子级
        if (data[key] && data[key].length > 0) {
             let children =  getTreeAllEndNode(data[key],key);
             if (children && children.length){
                 results = results.concat(children);
             }
        } else {
           results.push(data);
        }
    }
    return results;
};
