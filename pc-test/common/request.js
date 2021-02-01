import {getToken, setToken} from "./utils/stora";
import {routerUtil} from "../router/routerUtil";
import {toast} from "./utils/toast";
import Vue from 'vue'
import config from "../config/config";
import {refreshToken} from "./api/login/login";
export const request = {
    config:{
        baseUrl:config.baseUrl,
        header:{
            'Content-Type':'application/json;charset=UTF-8',
        },
        data:{},
        method:"GET",
        dataType:'text',//如果设为json,则需要对返回数据做一次JSON.parse
        success(){},
        fail(){},
        complete(){}
    },
    interceptor:{
        request:null,
        response:null
    },
    request(options){
        if(!options){
            options = {}
        }
        options.baseUrl = options.baseUrl || this.config.baseUrl
        options.dataType = options.dataType || this.config.dataType
        options.url = options.baseUrl + options.url
        options.data = options.data || {}
        options.method = options.method ||this.config.method
        options.header = options.header || this.config.header;
        options.header.token = getToken();//请求头注入token,每一次请求都携带token
        // 使用Promise方法,方便调用获取返回的参数;并做统一的处理以及日志记录
        return new Promise((resolve, reject) => {
            let _config = null
            options.complete = (response)=>{
                let statusCode  = response.statusCode
                response.config = _config
                //?
                if(this.interceptor.response){
                    let newResponse = this.interceptor.response(response)
                    if(newResponse){
                        response = newResponse
                    }
                }
                if(statusCode === 200){
                    console.log("请求成功")
                    response = response.data
                  switch(response.result){
                      case 0:
                          if(response.data){
                              response.data = JSON.parse(response.data)
                          }
                          resolve(response)
                          break;
                      case 1:
                          console.log(response.exp,'失败')
                          reject(response);
                          break;
                      case 2:
                          console.log(response.exp,'必须登录')
                          //清除缓存用户数据
                          Vue.prototype.$store.commit('logout');
                          reject(response);
                          //重定向到登陆页面
                          routerUtil.reLaunch({
                              url: '/pages/index/index'
                          });
                          break;
                      default:
                          console.log('请求出错')
                          break;
                  }

                }else{
                   switch(response.statusCode){
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
                       case 401:
                           console.log(response.statusCode,'未授权')
                           break;

                       case 400:
                           console.log(response.statusCode,'请求出错2')
                           break;

                       case 403:
                           console.log(response.statusCode,'禁止访问')
                           break;
                       case 404:
                           console.log(response.statusCode,'请求地址错误')
                           break;
                       case 405:
                           console.log(response.statusCode,'请求方法错误')
                           break;
                       case 408:
                           console.log(response.statusCode,'请求超时')
                           break;
                       case 500:
                           console.log(response.statusCode,'服务器错误')
                           break;
                       case undefined:
                           console.log(response.statusCode,'请求失败')
                           break;
                       default:
                           console.log(response.statusCode,'请求出错')
                           break;
                   }
                   reject(response)
                }
            }
            //合并对象
            _config = Object.assign({},this.config,options)
            // 记录请求时间点
            _config.requestId = new Date().getTime()
            //请求
            if(this.interceptor.request){
                this.interceptor.request(_config)
            }
            uni.request(_config)
        })
    },
    get(url,data,options){
        if(!options){
            options={}
        }
        options.url = url
        options.data = data
        this.method = 'GET'
        return this.request(options)
    },
    post(url,data,options){
        if(!options){
            options={}
        }
        options.url = url
        options.data = data
        this.method = 'POST'
        return this.request(options)
    },
    put(url,data,options){
        if(!options){
            options={}
        }
        options.url = url
        options.data = data
        this.method = 'PUT'
        return this.request(options)
    },
    delete(url,data,options){
        if(!options){
            options={}
        }
        options.url = url
        options.data = data
        this.method = 'DELETE'
        return this.request(options)
    }

}
export default request;
