export const constants = {
    valid_status: {
        //审核通过
        valid_flag_pass: 1,
        //尚未审核
        valid_flag_yet: 2,
        //审核不通过
        valid_flag_nopass: 4
    },
    menuSplit: "_n_",
    defaultpid: "0",
    schoolId: '6a0290be09554a40aaa4c64911e05aa6',
    systemType: {
        web: 1,
        app: 2
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
    sysroles: {
        role: {
            //仓库管理员
            storehousemanger: "b0e0bc7fd9e3fe8b6fcb199904226e8b",
            //设备管理员
            eqAdmin: '7c109d8492ce9919af7f83f9f7bb65e1'
        }
    },
    //实验所属系统
    labSys: {
        chm: 2,
        eq: 3
    },
    bool: {
        true: 1,
        false: 2
    },
    userType: {
        teacher: 1,
        student: 2
    },
    //字典
    dict: {},
    cms: {
        modelType: {
            //文章
            title: 1,
            //单图
            oneImg: 2,
            //多图
            moreImg: 3,
            //图册
            album: 4
        }
    },
    //监测站
    itemCard: {
        materialStatus: {
            //正常
            normal: 1,
            //新增
            add: 2,
            //多余
            del: 3
        },
        materialAuditStatus: {
            //正常通过
            normal: 1,
            //通过并修改标准库
            pass: 2,
            //不通过
            noPass: 3
        },
        auditStatus: {
            //待审核
            wait: 1,
            //审核通过
            pass: 2,
            //不通过
            noPass: 3,
            //自动通过
            autoPass: 4
        }
    },
    //用品
    material: {
        //类型
        type: {
            //设备
            shebei: 1,
            //低值耐用品
            dznyp: 2,
            //易耗品
            yhp: 3,
            weihuaping: 4,
            //可以共用
            kygy: 5,
            biaoliao: 6
        }
    },
    //主题
    subject: {
        objType: {
            //水务云
            swy: 1,
            //普渡河
            pdh: 2
        }
    },
    //产品类型
    productType: {
        //水务云
        swy: 3,
        //两山乌当
        lsgz: 4,
        //普渡河
        pdh: 10,
    },
    reachesType: {
        //上游
        up: 1,
        //中游
        cu: 2,
        //下游
        down: 3,

    },
    //交办方式
    model: {
        //类型
        type: {
            //交办
            assign: 2,
            //调度
            dd: 1
        },
        //子类型
        itemType: {
            //普通调度
            general: 1,
            //生态调度
            ew: 2
        }
    },
    //告警
    alarm: {
        //类别
        category: {
            //报警
            alarm: 1,
            //预警
            forecast: 2
        }
    },
    //报表
    report: {
        //类型
        type: {
            //时报：
            hour: 10,
            //日报
            day: 1,
            //周报
            week: 2,
            //月报
            month: 3,
            //季报
            quarter: 4,
            //年报
            year: 5
        },
        //得到报表类型名称
        getTypeName: (type) => {
            if (type >= constants.report.type.day && type <= constants.report.type.year) {
                let datas = ["日", "周", "月", "季", "年"];
                return datas[type - 1];
            }
            return type;
        }
    },
    sampleTest: {
        //代签收
        PLAN_WAIT_QS: 1,
        //拒收
        PLAN_NOT_QS: 2,
        //为开始
        PLAN_WAIT_START: 3,
        //进行中
        PLAN_RUN: 4,
        //已完成
        PLAN_FINISH: 5,
        //已提交
        PLAN_SUBMIT: 6
    },
    sampleRecord: {
        //待签收
        QS_STATUS_WAIT: 1,
        //已签收
        QS_STATUS_PASS: 2,
        //拒收
        QS_STATUS_NO_PASS: 3,
        //已分包
        QS_STATUS_FB: 4
    },
    no: {
        SAMPLE_NO: '6452513cbf9a6af40ddd69c1ab043674',
        SAMPLE_TABLE_NO: 'd66feeee261aebd213ab14bf06ea8119',
        SAVE_STANDARD_NO: '342398c73c60969b8bf00280f8b42b05',
        RES_TYPE_NO: '833f25ad1d65e9776da278bb47ac0c5c',
        REPORT_TYPE_NO: 'fc2b9a98a5bc9290a3e1e3687665c5a2',
        STUDY_RESOURCE_TYPE_NO: "0cc42ae51aa1f6e40c7461f325fbf5c7",
        SAMPLE_RECORD_NO: 2,
        SAMPLE_TEST_NO: 3
    },
    inspectionType: {
        LAB: "1",
        EqInfo: "2"
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
    eqApply: {
        auditStatus: {
            run: 1,
            pass: 2,
            noPass: 3,
            back: 4
        }
    },
    testQuestionsType: {
        DAN_XUAN: 1,
        DUO_XUAN: 2,
        TIAN_KONG: 3,
        JI_SUAN: 4,
        //开放
        KAI_FANG: 5
    },
    officeTypes: ['doc', 'docx', 'xlsx', 'xls', 'ppt', 'pptx', 'pdf'],
    eqInfoStatus: {
        online: 1,
        offline: 2,
        check: 3,
        test: 4,
        repair: 5,
        maintain: 6
    },
    bizCode: {
        sampleRecord: 'sampleRecord',
        sampleTable: '',
        thirdPartyRecord: ''
    },
    menuCode: {
        sampleqs: 'sampleqs',
        samplesqrecord: 'samplesqrecord',
        sampletest: 'sampleall'
    }
};