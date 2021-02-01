import {numberToCn} from "./number";

Date.prototype.format = function (fmt = "yyyy-MM-dd hh:mm:ss") { //author: meizz
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

export const format = (date, pattern = "yyyy-MM-dd hh:mm:ss") => {
    if (!date) {
        return '';
    }
    let temp = parseDate(date);
    if (temp instanceof Date) {
        return temp.format(pattern);
    }
    return ''
};

//转换时间
export const parseDate = (date) => {
    if (!date) {
        return date;
    }
    if (date instanceof Date) {
        return date;
    } else if (date instanceof Number || typeof date === 'number') {
        return new Date(date);
    } else if (date instanceof String || typeof date === 'string') {
        return new Date(date.replace(/-/g, '/'));
    }
    return date;
};

/**
 * 得到相对现在多少月的时间
 * 如获取上一个月 getMonthDate(new Date(),-1);
 * 获取下两个月 getMonthDate(new Date,2);
 * @author leisong
 * @param date 时间
 * @param monthNum 月的数量
 * @date 2018/12/4 14:28
 **/
export const getMonthDate = (date = new Date(), monthNum = -1) => {
    if (monthNum === 0) {
        return date;
    }
    //月0-11
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();
    //总共12个月
    let mNum = 12;
    //月份差值
    let exp = month + monthNum;
    if (exp < 0) {
        year = year + Math.floor(exp / mNum);
        month = mNum + exp % mNum;
    } else if (exp > mNum) {
        year = year + Math.ceil(exp / mNum);
        month = exp % mNum;
    } else {
        month = month + monthNum;
    }
    //月有多少天，下一个月1号的前一天
    let nNum = new Date(year, month, 0).getDate();
    if (day > nNum) {
        day = nNum;
    }
    return new Date(year, month - 1, day, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};

//得到指定月的第一天
export const getFirstDayOfMonth = (date = new Date(), month = 0) => {
    return new Date(date.getFullYear(), date.getMonth() + month, 1, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};

//获取一周的第一天
export const getFirstDayOfWeek = (date = new Date(), firstDayOfWeek = 1) => {
    let day = date.getDay();
    if (day == 0) {
        day = 7;
    }
    let offset = firstDayOfWeek - day;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset);
}

//获取一周的最后一天
export const getLastDayOfWeek = (date = new Date(), firstDayOfWeek = 1) => {
    let firstDate = getFirstDayOfWeek(date, firstDayOfWeek);
    return new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 6);
}

//得到指定月的最后一天
export const getLastDayOfMonth = (date = new Date(), month = 0) => {
    return new Date(date.getFullYear(), date.getMonth() + month + 1, 0, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};


export const getYearList = (minYear = 2016) => {
    let year = new Date().getFullYear();

    let years = [];
    for (let i = year; i >= minYear; i--) {
        years.push({
            value: i,
            label: i + "年"
        })
    }
    return years;
};

export const getQuarterList = () => {
    let quarters = [];

    for (let i = 1; i <= 4; i++) {
        quarters.push({
            value: i,
            label: `第${numberToCn(i)}季度`
        })
    }
    return quarters;
};

export const getMonthList = () => {
    let months = [];
    for (let i = 1; i <= 12; i++) {
        months.push({
            value: i,
            label: i + "月"
        })
    }
    return months;
};

//获取每天对应的小节时间
export const dayBarTime = (num) => {
    switch (parseInt(num)) {
        case 1:
        case 2:
            return "08:10";
        case 3:
        case 4:
            return "10:20";
        case 5:
        case 6:
            return "13:00";
        case 7:
        case 8:
            return "15:10";
        case 9:
        case 10:
            return "17:30";
        default:
            return "";
    }
};
export const numberToWeek = (num) => {
    return numToWeek(num);
};

export const numToDayHour = (num) => {
    if (!num) {
        return '';
    }
    num = parseInt(num);
    switch (num) {
        case 1:
        case 2:
            return '1-2';
        case 3:
        case 4:
            return '3-4';
        case 5:
        case 6:
            return '5-6';
        case 7:
        case 8:
            return '7-8';
        case 9:
        case 10:
            return '9-10'
    }
    return ''
};
export const numToWeek = (week) => {
    week = parseInt(week);
    if (week < 1 || week > 7) {
        return "";
    }
    let weeks = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    return weeks[week - 1];
};

//js date.getDay()转换为中文星期
export const timeToWeek = (day) => {
    if (day == 0) {
        day = 7;
    }
    return numToWeek(day);
};

//转换时间为5天10小时5分，time单位秒
export const numTimeToCn = (time) => {
    time = parseInt(time);
    if (!time || time < 0) {
        return ''
    }
    let day = Math.floor(time / 24 / 60 / 60);
    let hour = Math.floor((time % (24 * 60 * 60)) / 60 / 60);
    let mini = Math.floor((time % (60 * 60)) / 60);
    if (day > 0) {
        if (hour > 0) {
            return day + '天' + hour + '时';
        }
        return day + '天';
    }
    if (hour > 0) {
        if (mini > 0) {
            return hour + '时' + mini + '分';
        }
        return mini + '分';
    }
    return '';
};

/**
 *  添加时间
 * @author leisong
 * @date 2019/3/23 18:06
 **/
export const addDate = (num = 0, date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + num, date.getHours(), date.getMinutes(), date.getSeconds());
};

/**
 *  添加时间
 * @author leisong
 * @date 2019/3/23 18:06
 **/
export const addMonth = (num = 0, date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth() + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
};

/**
 *  添加时间
 * @author leisong
 * @date 2019/3/23 18:06
 **/
export const addWeek = (num = 0, date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + num * 7, date.getHours(), date.getMinutes(), date.getSeconds());
};

/**
 *  添加时间
 * @author leisong
 * @date 2019/3/23 18:06
 **/
export const addYear = (num = 0, date = new Date()) => {
    return new Date(date.getFullYear() + num, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
};
//时间列表
export const dateList = {
    years: getYearList(),
    quarters: getQuarterList(),
    months: getMonthList()
};
