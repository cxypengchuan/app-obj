//是否为不为空
const selfIsNotEmpty = (val) => {
    if (!val) {
        return false;
    }
    if (val instanceof Array) {
        return val.length > 0;
    } else if (val instanceof Number || typeof val === 'number') {
        return val !== 0;
    } else if (val instanceof String || typeof val === 'string') {
        return val.length > 0;
    } else if (val instanceof Date) {
        return val && val.getTime() > 0;
    } else if (val instanceof Object) {
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
    if (vals.length === 1) {
        return selfIsNotEmpty(vals[0]);
    }
    for (let i = 0; i < vals.length; i++) {
        if (!selfIsNotEmpty(vals[i])) {
            return false;
        }
    }
    return true;
};

//为空，有空则空
export const isEmpty = (...vals) => !isNotEmpty(...vals);


//获取河流水质等级
export const getRiverGradeName = (grade) => {
    if (!grade || grade <= 0) {
        return '——';
    }
    if (grade > 6) {
        return grade;
    }

    let grades = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "劣Ⅴ"];
    return grades[grade - 1]
};

/**
 * 获取河流等级名称
 * @param level
 * @returns {string|*}
 */
export const getRiverLevelName = (level) => {
    if (!level || level <= 0) {
        return '';
    }
    if (level > 5) {
        return level;
    }

    let levelNames = ["省级", "市级", "区县级", "乡镇级", "村级"];
    return levelNames[level - 1]
};


export const isTrue = (val) => {
    if (typeof val == 'boolean') {
        return val;
    } else if (typeof val == 'number') {
        return val === 1;
    } else if (typeof val == 'string') {
        if (parseInt(val)) {
            return parseInt(val) === 1;
        }
        return 'true'.toLowerCase() === val.toLowerCase();
    }
};

export const isFalse = (val) =>
    !isTrue(val);


//统计单词字数
export const getStrWordNum = (content) => {
    if (!content) {
        return 0;
    }
    content = new String(content);
    content = content.replace(/<\/?.+?>/g, "");
    content = content.replace(/ /g, "");
    content = content.trim();
    return content.length;
};

//合并对象
export const assign = (target, ...varArgs) => {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    if (!varArgs || varArgs.length <= 0) {
        return target;
    }

    // 深度合并对象
    function deepAssign(obj1, obj2) {
        for (let key in obj2) {
            obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ?
                deepAssign(obj1[key], obj2[key]) : obj1[key] = obj2[key];
        }
        return obj1;
    }

    varArgs.forEach(val => {
        target = deepAssign(target, val);
    });
    return target;
};

export const hideNumber = (str, frontLen, endLen) => {
    if (!str) {
        return "";
    }
    let len = str.length - frontLen - endLen;
    let xing = '';
    for (let i = 0; i < len; i++) {
        xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
};


/**
 * 是否是教职工
 * @param userType
 * @returns {boolean}
 */
export const isTeacher = (userType) => {
    return userType && userType === 1;

};



export function uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] ;

    let uuid = s.join("");
    return uuid;
}

