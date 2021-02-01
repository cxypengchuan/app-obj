/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import {aes} from '../utils/crypto'

import {getToken, setToken} from "../utils/stora";
import {appPlatform, config} from "../../config/config";

import {ApiError} from "./ApiError"

import Vue from 'vue'
import {getNetWorkType} from "../utils/staticFunction";
import {constants} from "../utils/constants";
import {routerUtil} from "../../router/routerUtil";
import {toast} from "../utils/toast";
import {refreshToken} from "../api/login/login";

export const http = {

    config: {
        baseUrl: config.baseUrl,
        header: {
            'Content-Type': 'application/json;charset=utf-8',
            //产品类型，贵阳实验云
            productType: 1,
            //系统类型app
            systemType: 2,
            //平台类型android-ios-h5-小程序
            appPlatform: appPlatform,
            // #ifdef APP-PLUS
            appVersion: plus.runtime.version,
            // #endif
        },
        data: {},
        method: "GET",
        dataType: "json",
        /* 如设为json，会对返回的数据做一次 JSON.parse */
        responseType: "text",
        success() {
        },
        fail() {
        },
        complete() {
        }
    },

    interceptor: {
        request: null,
        response: null,
    },
    request(options) {
        //获取网络状态
        getNetWorkType();
        if (!options) {
            options = {}
        }
        options.baseUrl = options.baseUrl || this.config.baseUrl
        options.dataType = options.dataType || this.config.dataType
        options.url = options.baseUrl + options.url
        options.data = options.data || {}
        options.method = options.method || this.config.method
        options.header = options.header || this.config.header;
        //固定请求头验证信息
        options.header.token = getToken();
        return new Promise((resolve, reject) => {
            let _config = null;
            let autoTip = options.autoTip;
            options.complete = (response) => {
                let statusCode = response.statusCode
                // console.log('登录状态',statusCode)
                response.config = _config
                if (this.interceptor.response) {
                    let newResponse = this.interceptor.response(response)
                    if (newResponse) {
                        response = newResponse
                    }
                }
                if (statusCode === 200) { //成功
                    response = response.data;
                    switch (response.result) {
                        //成功
                        case constants.operStatus.success:
                            if (response.data) {
                                if (response.data.toString() != '[object Object]') {
                                    //解密返回数据
                                    if (config.isAes) {
                                        response.data = aes.de(response.data);
                                    }
                                    response.data = JSON.parse(response.data);
                                }
                            }
                            //成功回调
                            resolve(response);
                            break;
                        //失败
                        case constants.operStatus.failed:
                            if (autoTip) {
                                reject(new ApiError(1, response.exp))
                            } else {
                                reject(response);
                            }
                            break;

                        //必须登录
                        case constants.operStatus.login:
                            //清除缓存用户数据
                            Vue.prototype.$store.commit('logout');
                            reject(response);
                            //重定向到登陆页面
                            routerUtil.reLaunch({
                                url: '/pages/index/index'
                            });
                            break;
                        //超时
                        case constants.operStatus.timeout:
                            // reject(new ApiError(3, response.exp))
                            toast.error("请求超时")
                            break;
                        //没有权限
                        case constants.operStatus.noPower:
                            // reject(new ApiError(4, response.exp))
                            toast.error("没有权限")
                            break;

                        //密码错误
                        case constants.operStatus.pwdError:
                            // new ApiError('', response.exp);
                            toast.error("密码错误")
                            reject(response);
                            break;
                        default:
                            resolve(response);
                            break;
                    }
                }
                //失败
                else {
                    switch (response.statusCode) {
                        //token过期，刷新token
                        case 203:
                            refreshToken().then(res=>{
                                setToken(res.data)
                                this.request(options).then(response=>{
                                    resolve(response)
                                }).catch(error=>{
                                    reject(error)
                                })
                            })
                            break;
                        //未授权
                        case 401:
                            // reject(new ApiError(response.statusCode, "未授权"))
                            toast.error(`${response.statusCode} + "未授权"`)
                            break;
                        //请求出错
                        case 400:
                            // reject(new ApiError(response.statusCode, "请求出错"));
                            toast.error(`${response.statusCode} + "请求出错了呀"`)
                            break;
                        //禁止
                        case 403:
                            // reject(new ApiError(response.statusCode, "禁止访问"));
                            toast.error(`${response.statusCode} + "禁止访问"`)
                            break;
                        //未找到
                        case 404:
                            // reject(new ApiError(response.statusCode, "请求地址错误"));
                            // toast.error(`${response.statusCode} + "请求地址错误"`)
                            break;
                        //方法未允许
                        case 405:
                            // reject(new ApiError(response.statusCode, "请求方法错误"));
                            toast.error(`${response.statusCode} + "请求方法错误"`)
                            break;
                        //请求超时
                        case 408:
                            // reject(new ApiError(response.statusCode, "请求超时"));
                            toast.error(`${response.statusCode} + "请求超时"`)
                            break;
                        //服务端响应出错
                        case 500:
                            // reject(new ApiError(response.statusCode, "服务端响应出错"));
                            toast.error(`${response.statusCode} + "服务端响应出错"`)
                            break;
                        case undefined:
                            /*uni.showModal({
                                title:'网络异常',
                                content:'请检查网络状态',
                                showCancel:false,
                                confirmText:'确定',
                                success(res) {
                                    if (res.confirm){
										// //#ifdef APP-PLUS
                                        // plus.runtime.restart();
										// //#endif
										// //#ifndef APP-PLUS
										// window.reload();
										// //#endif
                                    }
                                }
                            });*/
                            break;
                        default:
                            // reject(new ApiError(response.statusCode, "请求出错"))
                            toast.error(`${response.statusCode} + "请求出错"`)
                            break;
                    }
                    reject(response)
                }
            }
            options.fail = (error) =>{
                console.error(error);
                // reject(new ApiError('','网络请求失败'));
                toast.error("网络请求失败")
            };
            _config = Object.assign({}, this.config, options)
            _config.requestId = new Date().getTime()

            if (this.interceptor.request) {
                this.interceptor.request(_config)
            }

            //数据加密传输
            if (_config.data) {
                //uni不支持array 需要转换为String
                // #ifndef APP-PLUS
                if (_config.data instanceof Array) {
                    _config.data = JSON.stringify(_config.data);
                }
                // #endif
                if (config.isAes) {
                    _config.data = aes.en(JSON.stringify(_config.data));
                }
            }

            uni.request(_config);
        });
    },
    get(url, data, options) {
        if (!options) {
            options = {}
        }
        options.url = url
        options.data = data
        options.method = 'GET'
        return this.request(options)
    },
    post(url, data, autoTip = true) {
        let options = {};
        options.url = url;
        options.data = data || {};
        options.method = 'POST';
        options.autoTip = autoTip;
        return this.request(options);
    },
    put(url, data, options) {
        if (!options) {
            options = {}
        }
        options.url = url
        options.data = data
        options.method = 'PUT'
        return this.request(options)
    },
    delete(url, data, options) {
        if (!options) {
            options = {}
        }
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return this.request(options)
    }
};

export default http;
//同步请求
export const httpSync = {
    defaultConfig: {
        baseUrl: config.baseUrl,
        dataType: 'json',
        method: "GET",
        //是否加密
        isAes: config.isAes,
        header: {
            'Content-Type': 'application/json',
            //产品类型，水务云
            productType: 3,
            //系统类型app
            systemType: 2,
            //平台类型android-ios-h5-小程序
            appPlatform: appPlatform,

            //app版本
            // #ifdef APP-PLUS
            appVersion: plus.runtime.version
            // #endif
        },
    },
    //发起请求
    async request(url, data, config) {
        getNetWorkType();
        config = config ? {
            ...this.defaultConfig,
            ...config
        } : this.defaultConfig;
        if (config.header) {
            config.header.token = getToken();
        }
        let param = data;
        if (config.isAes && data) {
            if (config.method === 'POST') {
                param = aes.en(data);
            } else if (config.method === 'GET') {
                param = {
                    params: aes.en(data)
                };
            }
        }
        let [error, res] = await uni.request({
            url: config.baseUrl + url,
            method: config.method,
            header: config.header || {},
            data: param,
            dataType: config.dataType
        });

        if (!res) {
            return [res, error];
        }
        let result = res.data;
        switch (res.statusCode) {
            case 200:
                switch (result.result) {
                    //成功
                    case 0:
                        if (config.isAes && result.data) {
                            result.data = JSON.parse(aes.de(result.data));
                        }
                        break;
                    //失败
                    case 1:
                        error = result.exp;
                        result = null;
                        break;
                    //必须登录
                    case 2:
                        //清除缓存用户数据
                        Vue.prototype.$store.commit('logout');
                        //重定向到登陆页面
                        routerUtil.reLaunch({
                            url: '/pages/index/index'
                        });
                        error = result.exp;
                        result = null;
                        break;
                    //超时
                    case 3:
                        error = result.exp;
                        result = null;
                        break;
                    //没有权限
                    case 4:
                        error = result.exp;
                        result = null;
                        break;
                    default:
                        break;
                }
                break;
            case 404:
                result = null;
                error = '404';
                break;
            case 408:
                result = null;
                error = "网络请求超时";
                break;
            case undefined:
                /*  uni.showModal({
                      title:'网络异常',
                      content:'请检查网络状态',
                      showCancel:false,
                      confirmText:'确定',
                      success(res) {
                          if (res.confirm){
                              // //#ifdef APP-PLUS
                              // plus.runtime.restart();
                              // //#endif
                              // //#ifndef APP-PLUS
                              // window.reload();
                              // //#endif
                          }
                      }
                  });*/
                break;
            default:
                break;
        }
        return [result, error];
    },
    //post
    async post(url, data) {
        return await this.request(url, data, {
            method: 'POST'
        })
    },
    //get
    async get(url, data) {
        return await this.request(url, data, {
            method: 'GET'
        })
    }
};
