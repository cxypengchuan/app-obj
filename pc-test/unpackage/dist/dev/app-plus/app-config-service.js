
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/home/index","pages/work/work","pages/message/message","pages/datacenter/zhsw-datacenter","pages/mine/mine"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#999999","selectedColor":"#2fadff","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/index","iconPath":"static/img/tab-home-normal.png","selectedIconPath":"static/img/tab-home-current.png","text":"首页"},{"pagePath":"pages/work/work","iconPath":"static/img/tab-workbench-normal.png","selectedIconPath":"static/img/tab-workbench-current.png","text":"工作台"},{"pagePath":"pages/datacenter/zhsw-datacenter","iconPath":"static/img/tab-datacenter-normal.png","selectedIconPath":"static/img/tab-datacenter-current.png","text":"数据中心"},{"pagePath":"pages/message/message","iconPath":"static/img/tab-message-normal.png","selectedIconPath":"static/img/tab-message-current.png","text":"消息"},{"pagePath":"pages/mine/mine","iconPath":"static/img/tab-mine-normal.png","selectedIconPath":"static/img/tab-mine-current.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"pc-test","compilerVersion":"3.0.5","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarBackgroundColor":"#cccccc","navigationBarTitleText":"登录"}},{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#cccccc","navigationBarTitleText":"首页"}},{"path":"/pages/work/work","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"工作台","bounce":"none","titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/message/message","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息列表","titleNView":false,"bounce":"none","scrollIndicator":"none"}},{"path":"/pages/datacenter/zhsw-datacenter","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"智慧水务数据中心","titleNView":false,"bounce":"none","scrollIndicator":"none"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","titleNView":false,"bounce":"none","scrollIndicator":"none"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});