import {toast} from "../utils/toast";
//http 请求异常错误统一返回
export const ApiError = function (code, msg) {
    this.code = code;
    this.msg = msg;
    toast.error(msg);
};
