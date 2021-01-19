//判断字符是否
export const strIsEmpty = (str) => {

    if (typeof str == "undefined" || str == null || str == "") {
        return true;
    }
    return false;
};

//验证手机号码
export const isPhone = (phone) =>
    /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone);



