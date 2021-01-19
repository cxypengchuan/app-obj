//常量配置
import {appPlatform} from "../../config/config";

export const constants = {
    //是否
    bool: {
        tr: 1,
        fa: 2
    },
    defaultpid: "0",
    userType: {
        teacher: 1,
        student: 2
    },
    operStatus: {
        success: 0,
        failed: 1,
        login: 2,
        timeout: 3,
        noPower: 4,
        noObj: 5,
        noBind: 10,
        noMsg: 11,
        pwdError:20
    },
    icodeType: {
        upPwd: 1,
        regUser: 2,
        regUserNotice: 3,
        upUser: 4,
        login: 5,
        bindPhone: 6
    },
    //阅读状态
    readStatus: {
        read: 1,
        noRead: 2
    },
    //查询类型
    queryType: {
        //发出的
        send: 1,
        //收到的
        receive: 2
    },
    //登录类型
    loginType: {
        //用户名
        userName: 1,
        //微信
        weixin: 2,
        //QQ
        qq: 3,
        //微博
        weibo: 4,
        //短信
        sms: 5,
        //苹果账号
        apple:6
    },

    //消息推送-会话类型
    sessionType: {
        //通知
        inform: 1,
        //功能
        function: 2,
        //报表
        report: 3,
        //报警
        warning: 4,
        //群聊
        chatGroup: 11,
        //私聊
        chatOne: 12,
        //强制退出
        logout: 21,
        //更新权限
        updatePower: 31,
        //更新监测站数据
        updateMonitorData: 41
    },

    //菜单
    menu: {
        //应用id
        gztid: "5c8ba5edb2434ead9c7beeba81609c59",
        //我的id
        minId: 'e28e8dacffee4eb793fbd2b65f70afe8'
    },
    //字典
    dict: {
        //反馈类型
        feedbackType: 'userFeedBackType',
        //最高学历
        highestEducation: 'education',
        //职称
        zhiCheng: 'zhiCheng',
        //实验室状态
        labStatus: 'chmLabStatus',
        //设备状态
        eqInfoStatus: 'eqInfoStatus',
        //资产类型
        assertType: 'assertType',
        //设备预约审核类型
        eqApplyAuditType: 'eqApplyAuditType',
        //申请类型
        eqApplyType: 'eqApplyType',
        //项目等级
        itemLevel: 'itemLevel',
        //课题状态
        openCourseStatus: 'openCourseStatus',
        //计划盘点状态
        materialCheckPlanStatus: 'checkStatus',
    },
    //题目类型
    topicType: {
        //单选
        one: 1,
        //多选
        more: 2,
        //判断题
        panduan: 3
    },
    //文章
    cms: {
        //展示类型
        modelType: {
            //文章
            title: 1,
            //单图
            oneImg: 2,
            //多图
            moreImg: 3,
            //图册
            album: 4
        },
        //栏目
        channel: {
            //水务云
            swy: 'swy',
            //水务资讯
            iwaCmsNews: 'iwa_cms_news'
        }
    },
    resInfo: {
        resType: {
            //试题
            shiti: 1,
            //文本
            text: 2,
            //文档
            doc: 3,
            //附件
            file: 4,
            //视频
            video: 5,
            //链接
            link: 6
        }
    },
    //业务编码
    bizCode: {
        //学习资源
        com_gx_safe_model_resinfo: "com_gx_safe_model_resinfo",
        //实验室
        com_gx_basic_model_lab: "com_gx_basic_model_lab",
        //公告
        com_gx_cms_model_cmsannounce: "com_gx_cms_model_cmsannounce",
        //实验室巡检-
        com_gx_basic_model_labinspectrecord: 'com_gx_chm_model_labinspectrecord',
        //实验室巡检-抄送人
        com_gx_basic_model_labinspectrecordcopyuser: 'com_gx_chm_model_labinspectrecordcopyuser',
        //实验过程
        com_gx_chm_model_chmitemcardtime:'com_gx_chm_model_chmitemcardtime',
        //群组选择人
        com_gx_chat_group:'com_gx_chat_group'
    },
    contentDataType: {
        text: 1,
        number: 2,
        int: 3,
        time: 4,
        date: 5,
        oneImg: 6,
        moreImg: 7,
        moreText: 8,
        dict: 10
    },
    ach: {
        status: {
            wait: 1,
            run: 2,
            finish: 3
        }
    },
    //用品类型
    materialType: {
        //设备
        shebei: 1,
        //玻璃仪器-低值耐用品
        dznyps: 2,
        //试剂或易耗品
        yhp: 3,
        //试剂或易耗品共用
        sjgy:4,
        //可以共用
        kygy: 5,
        // 非化生耗材
        fhshc:6
    },
    //用品类别
    materialCategory: {
        //易制毒
        yzd: 1,
        //危险品
        wxp: 2,
        //普通,
        pt: 3,
        //特殊
        ts: 4

    },
    //项目卡
    itemCard: {
        materialStatus:{
            //正常
            normal:1,
            //新增
            add:2,
            //多余
            del:3
        },
        materialAuditStatus:{
            //正常通过
            normal:1,
            //通过并修改标准库
            pass:2,
            //不通过
            noPass:3
        },
        auditStatus:{
            //待审核
            wait:1,
            //审核通过
            pass:2,
            //不通过
            noPass:3,
            //自动通过
            autoPass:4
        }
    },
    //项目卡过程管控
    cardTime:{
        //进度
        plan:{
            //项目准备卡
            xmzbk:1,
            //实验准备
            syzb:2,
            //课前交接
            kqjj:3,
            //上课中
            skz:4,
            //课后交接
            khjj:5,
            //用品登记
            ypdj:6,
            //运行记录
            yxjl:7
        },
        //状态
        status:{
            //成功
            success: 1,
            //失败
            error:2,
            //正常
            primary:3,
            //未到达
            no:4
        }
    },
    //交接类型
    cardJjType:{
        //课前
        kq:1,
        //课后
        kh:2
    },
    checkProblem:{
        planStatus:{
            finish:1,
            wait:2,
        },
        zgStatus:{
            wait:2,
            finish:1,
            noPass:3
        },
        fcStatus:{
            wait:1,
            finish:2,
            noPass:3
        }
    },
    // 开关状态
    kg:{
        on:1,
        off:2,
    }

};

//是否是android
export const isAndroid = () =>
    appPlatform === 1;

//是否是苹果
export const isIos = () =>
    appPlatform === 2;


//应用本地固有常量
