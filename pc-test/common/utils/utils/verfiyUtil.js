import {constants} from "./Constants";
import {toast} from "./toastUtils";
//是否为true
export const isTrue = a => a == true || a == constants.bool.true || (a + '').toLowerCase() == 'true';

//是否是错误的页数
export const isErrorPageNum = (page, dataSize, pageSize) => {
    if (page != 1 && (!page || page <= 0 || page > Math.ceil(dataSize / pageSize))) {
        toast.error('页码超出范围');
        return true;
    }
    return false;
};

const numberReg =/^(\-|\+)?\d+(\.\d+)?$/
const intReg = /^-?\d+$/
const phoneReg = /^1[0-9]{10,10}$/
const emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const pwdReg = /^.{6,16}$/
const inviteCodeReg = /^[a-zA-Z0-9]{6,16}$/
const notCn = /^[^\u4e00-\u9fa5]+$/;
const idCardReg = /( ^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
export const validate = {
    idCard: function (val) {
        return idCardReg.test(val)
    },
    isNumber: function (val) {
        if (val == null || val.toString().trim() == ''){
            return false;
        }
        return  numberReg.test(val) || val == 0;
    },
    isInt: function (val) {
        return intReg.test(val) || val == 0;
    },
    isPhone: function (val) {
        return phoneReg.test(val)
    },
    isEmail: function (val) {
        return emailReg.test(val)
    },
    isPwd: function (val) {
        return pwdReg.test(val) && notCn.test(val);
    },
    isInviteCode: function (val) {
        return inviteCodeReg.test(val)
    },
    validate: function (data, rules) {
        let res = {isOk: true, errmsg: ''}
        if (!rules || !rules.length) {
            return res
        }
        for (let rule of rules) {
            // rule: {name:'', type:'', errmsg:'', min:1, max:2, eq:'', required:Boolean, regex:''}
            if (!rule || !rule.name) {
                continue
            }
            // 如果值不存在
            if (!data[rule.name]) {
                // 如果是必填项就返回错误提示，required可以作为type是为了不同的type能给用户不同的提示
                if (rule.type === 'required' || rule.required) {
                    res = {isOk: false, errmsg: rule.errmsg}
                    if (!res.errmsg) {
                        res.errmsg = '请正确输入所有数据' //默认提示
                    }
                    return res
                }
            }
            switch (rule.type) {
                // required 上面已经判断过了
                case 'equals':
                case 'eq':
                    if (data[rule.name] !== data[rule.eqName]) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    }
                    break
                case 'number':
                    if (!numberReg.test(data[rule.name])) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    }
                    break
                case 'int':
                    if (!intReg.test(data[rule.name])) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    }
                    break
                case 'phone':
                    if (!phoneReg.test(data[rule.name])) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    }
                    break
                case 'email':
                    if (!emailReg.test(data[rule.name])) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    }
                    break
                case 'pwd':
                    if (!pwdReg.test(data[rule.name])) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    }
                    break
                case 'inviteCode':
                    if (!inviteCodeReg.test(data[rule.name])) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    }
                    break
                case 'range': // 数字类型的值取值范围
                    // {name: 'xxx', type: 'range', min: 6, max: 6, required: true, errmsg: 'xxx'}
                    let val = data[rule.name]
                    if (val) {
                        if (numberReg.test(val)) {
                            if (rule.min && val < rule.min) {
                                res = {isOk: false, errmsg: rule.errmsg}
                            } else if (rule.max && val > rule.max) {
                                res = {isOk: false, errmsg: rule.errmsg}
                            }
                        } else {
                            res = {isOk: false, errmsg: rule.errmsg}
                        }
                    }
                    break
                case 'lengthRange': // 字符串长度取值范围
                    // {name: 'xxx', type: 'lengthRange', min: 6, max: 6, errmsg: 'xxx'}
                    let le = data[rule.name] ? data[rule.name].length : 0
                    if (rule.min && le < rule.min) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    } else if (rule.max && le > rule.max) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    }
                    break
                case 'regex': // 自定义正则表达式
                    // {name: 'xxx', type: 'regex', regex: /^1[0-9]{10,10}$/, errmsg: 'xxx'}
                    if (rule.regex && !rule.regex.test(data[rule.name])) {
                        res = {isOk: false, errmsg: rule.errmsg}
                    }
                    break
            }
            // 发现任何一个错误就立即返回，后面的不再判断
            if (!res.isOk) {
                if (!res.errmsg) {
                    res.errmsg = '请正确输入所有数据' //默认提示
                }
                return res
            }
        }
        return res
    },
    //替换中文
    replaceCn(data) {
        if (!data) {
            return '';
        }
        return data, toString().replace(/[^\w_]/g, '');
    }
};


//elementUI自定义验证规则
export const elementValidate = {
    isPhone(rule, value, callback) {
        if (!value || !value.length || !validate.isPhone(value)) {
            callback(new Error('请输入正确的手机号码'));
        } else {
            callback();
        }
    },
    idCard(rule, value, callback) {
        if (!value || !value.length || !validate.idCard(value)) {
            callback(new Error('请输入正确的身份证号码'));
        } else {
            callback();
        }
    },
    //判斷有效的密碼封裝函數
    isPwd(rule, value, callback) {
        if (!value || !value.length) {
            callback(new Error('请输入有效的密码,'));
        } else if (!pwdReg.test(value)) {
            callback(new Error('长度为6至16'));
        } else if (!notCn.test(value)) {
            callback(new Error('不能包含中文字符'));
        } else {
            callback();
        }
    },
    isInteger(rule, value, callback) {
        let name = rule.name || '';
        if (!validate.isInt(value)) {
            callback(new Error(name + "只能输入整数"));
        } else if (validate.isInt(rule.min) && validate.isInt(rule.max)) {
            if (rule.min > parseInt(value) || rule.max < parseInt(value)) {
                callback(new Error(`${name}只能在${rule.min}至${rule.max}之间`))
            } else {
                callback();
            }
        } else if (validate.isInt(rule.min) && rule.min > parseInt(value)) {
            callback(new Error(name + '不能小于' + rule.min));
        } else if (validate.isInt(rule.max) && rule.max < parseInt(value)) {
            callback(new Error(name + '不能大于' + rule.max));
        } else {
            callback();
        }
    },
    isNumber(rule, value, callback) {
        let name = rule.name || '';
        if (!rule.required && !String(value).length){
            callback();
            return
        }
        if (!validate.isNumber(value)) {
            callback(new Error(name + "只能输入数字"));
        } else if (validate.isNumber(rule.min) && validate.isNumber(rule.max)) {
            if (rule.min > parseFloat(value) || rule.max < parseFloat(value)) {
                callback(new Error(`${name}只能在${rule.min}至${rule.max}之间`))
            } else {
                callback();
            }
        } else if (validate.isNumber(rule.min) && rule.min > parseFloat(value)) {
            callback(new Error(name + '不能小于' + rule.min));
        } else if (validate.isNumber(rule.max) && rule.max < parseFloat(value)) {
            callback(new Error(name + '不能大于' + rule.max));
        } else {
            callback();
        }
    }
};
