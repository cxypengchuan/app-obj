/**
 * 获取排序类型
 * @param sortType 排序类型 ascending,descending
 * @author leisong
 * @date 2018/11/12 10:32
 **/
export const getSortType = (sortType) => {

    if (!sortType || sortType === null || sortType.length <= 0) {
        return "desc";
    }
    if (sortType === "ascending") {
        return "asc";
    }
    return "desc";
};

export const setSortType = (query, sort) => {
    if (!query) {
        return;
    }
    if (sort.prop && sort.prop !== null && sort.prop.length > 0) {
        query.orderBy = sort.prop;
        query.orderType = getSortType(sort.order);
    } else {
        query.orderBy = "";
    }
};
