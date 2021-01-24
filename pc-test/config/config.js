//是否是开发环境
export const is_dev = true; //process.env.NODE_ENV == 'development';

//是否是测试环境
export const is_test = false; //process.env.NODE_ENV == 'test';

//是否是生产环境
export const is_product = false; //process.env.NODE_ENV == 'production';

//app版本信息
export const app_version = {
    //APP数字版本号-同manifest.json里的数字版本号
    //#ifdef APP-PLUS
    versionNo: plus.runtime.versionCode,
    //#endif
    //#ifndef APP-PLUS
    // versionNo: 0,
    //#endif
    //APP资源版本号命名规则为APP版本号追加3位数
    sourceNo(){
        return parseInt(this.versionNo + '100')
    }
};

//默认配置
const base = {

    //文件读取地址
    fileUrl: "http://58.42.239.108:5003/",
    //文件上传地址
    fileUpUrl: "http://58.42.239.108:8085/file/upload_file",
    aeskey: 'f390268d3dc304f5',
    aesIv: '2b894f52b46104ab',

    //系统类型
    systemType: 2,

    //sqlite数据库基础配置
    dbOpName: "lsswy",
    dbPath: "_doc/lsswy.db",
    //高德地图服务key
    aMapServerKey: '6517e128408ab0ea92b17fb4861c1066',

    //App端高德地图Key
    aMapAppKey: 'd79175a7297ea981b65a7bb9dae0fec2',
};

//生产环境配置
const product = {
    //请求地址
    baseUrl: 'http://58.42.239.108:8090/',
    //开启加密
    isAes: true,
    //开启开发者模式
    isDev: false,
    //html地址
    htmlUrl: 'http://58.42.239.108:8086/app/#',
    //河长云地址
    oldUrl:'http://58.42.239.108:8085/',
    //输出日志
    outLog: false,
    //环信appKey
    hxAppKey:'1104181212084025#iwa-app'
};

//测试环境配置
const test = {
    //请求地址
    baseUrl: 'http://139.9.157.148:8081/',
    //开启加密
    isAes: true,
    //开启开发者模式
    isDev: false,
    //html地址
    htmlUrl: 'http://139.9.157.148/app/#',
    //河长云地址
    oldUrl:'http://139.9.157.148:8083/',
    //输出日志
    outLog:false,
    //环信appKey
    hxAppKey:'1104181212084025#iwa-test'
};

//开发环境配置
const dev = {
    //请求地址
    baseUrl: 'http://192.168.1.104:8080/',
    //开启加密
    isAes: false,
    //开启开发者模式
    isDev: true,
    //html地址
    htmlUrl: 'http://192.168.1.104:8080/app/#',
    //河长云地址
    oldUrl:'http://192.168.1.104:8080/',
    //输出日志
    outLog: false,
    //环信appKey
    hxAppKey:'1111190307244861#lstest'
};

export const config = is_product ? {...base, ...product} : is_test ? {...base, ...test} : {...base, ...dev};
export default config;
//获取app系统类型
let platform = uni.getSystemInfoSync().platform;
//app平台类型
export const appPlatform = platform == 'android' ? 1 : platform == 'ios' ? 2 : 3;
