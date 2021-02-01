import axios from 'axios'
import {aes} from "@/utils/crypto";
import {clear} from "@/utils/stora";
import {jwtToken} from "./jwtUtils";
import {getToken, setOperTime} from "./stora";
import {isTrue} from "./verfiyUtil";
import {toast} from "./toastUtils";
import qs from 'qs';
import {listen} from "./listen";


//获取请求地址
export const getBaseUrl = () => {
    let baseUrl = process.env.VUE_APP_BASE_URL;
    let port = process.env.VUE_APP_BASE_PORT;
    if (!baseUrl || !baseUrl.length) {
        baseUrl = window.location.protocol + '//' + window.location.hostname;
    }
    if (port) {
        return baseUrl + ":" + port + "/"
    }
    return baseUrl + "/";
}
// 创建axios实例
const service = axios.create({
    // api的base_url  //请求页面数据地址
    baseURL: getBaseUrl(),
    // 请求超时时间
    timeout: 30000
});
let tempFile = undefined;
// request拦截器  请求拦截
service.interceptors.request.use(config => {
    // Do something before request is sent
    let token = getToken();
    if (token) {
        // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        if (isTrue(process.env.VUE_APP_IS_AES)) {
            config.headers['token'] = jwtToken();
        } else {
            config.headers['token'] = token;
        }
    }
    if (config.method === 'post') {
        /*   let userId = getUserId();
           let cUserId = store.state.userInfo ? store.state.userInfo.id : '';
           if (userId && userId.length && userId != cUserId) {
               window.location.href = "/";
           }*/
        if (config.data) {
            if (isTrue(process.env.VUE_APP_IS_AES)) {
                config.data = aes.en(JSON.stringify(config.data));
            } else {
                config.data = JSON.stringify(config.data);
            }
            if (tempFile) {
                let form = new FormData();
                form.append("params", config.data);
                form.append("file", tempFile, tempFile.name);
                config.data = form;
            } else {
                config.data = {"params": config.data};
                config.data = qs.stringify(config.data);
            }
        } else if (tempFile) {
            let form = new FormData();
            form.append("file", tempFile, tempFile.name);
            config.data = form;
        }

    }
    if (config.method === 'get') {
        if (config.params) {
            if (isTrue(process.env.VUE_APP_IS_AES)) {
                config.params = {"params": aes.en(JSON.stringify(config.params))}
            } else {
                config.params = {"params": JSON.stringify(config.params)}
            }
        }
    }
    return config
}, error => {
    toast.error("连接超时");
});

// respone拦截器  响应拦截
service.interceptors.response.use(
    response => {
        if (response.data instanceof Blob) {
            return response;
        }
        response = response.data;
        if (!response) {
            Promise.reject();
        }
        if (response.result == 0) {
            setOperTime();
            if (!response.data) {
                return response;
            }
            if (isTrue(process.env.VUE_APP_IS_AES)) {
                response.data = JSON.parse(aes.de(response.data));
            } else {
                response.data = JSON.parse(response.data);
            }

        } else {
            if (response.result === 2) {
                listen.$dlg.closeAll();
                toast.alertError('会话超时，请重新登录').then(ok => {
                    clear();
                    window.location.href = '/';
                }).catch(error => {
                    clear();
                    window.location.href = '/';
                })
                return Promise.reject();
            } else {
                service.autoTip && toast.error(response.exp);
                return Promise.reject();
            }
        }
        return response;
    },
    error => {
        if (!error || !error.response) {
            toast.error("请求超时");
            return Promise.reject(error);
        }
        switch (error.response.status) {
            case 404:
                break;
            case 500:
                toast.error("服务器异常");
                break;
            default:
                toast.error("请求超时")
        }
        return Promise.reject(error)
    });

//post请求
export const post = (url, data, file, responseType = null, autoTip = true) => {
    tempFile = file;
    service.autoTip = autoTip;
    return service({method: "post", data: data || {}, url: url, responseType});
};

//从服务器获取导出的文件
export const exportFile = (url, data) => {
    return new Promise((resolve, reject) => {
        service({method: "post", responseType: 'blob', data: data || {}, url: url}).then(res => {
            let blob = new Blob(
                [res.data],
                {
                    type: res.headers['content-type'] || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
                });
            let contentDisposition = res.headers['content-disposition'];
            let fileName = '未命名';
            if (contentDisposition) {
                fileName = window.decodeURI(res.headers['content-disposition'].split('=')[1]);
            }
            // 非IE下载
            if ('download' in document.createElement('a')) {
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob); // 创建下载的链接
                link.download = fileName; // 下载后文件名
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click(); // 点击下载
                window.URL.revokeObjectURL(link.href); // 释放掉blob对象
                document.body.removeChild(link); // 下载完成移除元素
            } else {
                // IE10+下载
                window.navigator.msSaveBlob(blob, fileName);
            }
            resolve(res.data);
        }).catch(error => {
            reject(error);
        });
    })

}
//get请求
export const get = (url, data, autoTip = true) => {
    service.autoTip = autoTip;
    return service({method: 'get', data: data || {}, url: url});
}

export default service

/**
 * 下载文件
 * @param url 文件地址
 * @param fileName 文件名字
 * */
export const downloadFile = (url, fileName) => {
    if (!url || !url.length) {
        toast.error('文件不存在');
    }
    fileName += url.substring(url.lastIndexOf('.'))
    if (!url.startsWith('http')) {
        url = process.env.VUE_APP_FILE_URL + url + "?imgOp=1";
    }
    let x = new XMLHttpRequest();
    x.open("GET", url, true);
    x.responseType = 'blob';
    x.onload = function (e) {
        //会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
        let url = window.URL.createObjectURL(x.response)
        let a = document.createElement('a');
        a.href = url
        a.download = fileName;
        a.click();
        document.removeChild(a);
    }
    x.send();
}
