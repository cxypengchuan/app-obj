import {htmlToImg, htmlToPdf} from "@/utils/pdfUtil";

//导出工具
export const exportUtil = {
    defaultOptions: {
        el: '',              //打印目标dom节点，eg: this.refs.view
        debug: false,        //打开调试模式，会显示iframe,
        importCss: true,     //引入head 中的link stylesheet
        importStyle: true,   //引入style标签中的样式
        loadCss: [],         //需要载入的第三方样式表
        title: '',          //打印标题
        delay: 300,         //延迟打印时间，确保iframe中的静态资源加载完成
        beforePrinfHandle: null,  //打开打印窗口前的钩子函数,可以针对打印文档进行自定义调整，接受一个document参数
        afterPrintHandle: null,   //打印完成的钩子函数,
        zoom: 1, //缩放,
        body: {}
    },
    iframe: null,
    dom: null,
    /**
     * 检查配置是否合法
     * @param {*} options
     */
    checkOptions(options = {}) {
        if (!options.el) {
            throw new Error('el must be a nodeType')
        }
        return {
            ...this.defaultOptions,
            ...options
        }

    },
    prinf(options) {
        const op = this.checkOptions(options)
        this.dom = op.el.cloneNode(true)
        const handle = this.createIframe(op)
        if (op.beforePrinfHandle) {
            op.beforePrinfHandle(handle.contentDocument);
        }
        if (op.afterPrintHandle) {
            op.afterPrintHandle();
        }
        setTimeout(() => {
            handle.print();
            if (op.debug === false) {
                this.removeIframe();
            }
        }, op.delay)
    },
    excel(options, fileName = "导出文件") {
        options.importCss = false;
        const op = this.checkOptions(options)
        this.dom = op.el.cloneNode(true)
        const handle = this.createIframe(op);
        let {body, head} = this.iframe.contentDocument;
        head.append()
        let ctx = {worksheet: 'Worksheet', table: options.fileName || '导出数据'};
        let format = function (s, c) {
            return s.replace(/{(\w+)}/g,
                function (m, p) {
                    console.log(p)
                    return c[p];
                });
        }

        let uri = 'data:application/vnd.ms-excel;base64,';
        let base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        };
        setTimeout(() => {
            let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
                'xmlns="http://www.w3.org/TR/REC-html40"> <head><style>table,tr,td{border: 1px solid black;}</style></head>' + body.outerHTML +
                '</html>';
            let blob = new Blob([template], {
                type: "application/vnd.ms-excel"
            });

            let a = document.createElement('a');
            a.target = "_blank";
            a.href = window.URL.createObjectURL(blob);
            a.download = fileName + '.xls'
            a.style.display = 'none'
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                if (op.debug === false) {
                    this.removeIframe();
                }
            }, op.delay)
        }, 500)

    },
    pdf(dom, fileName) {
        dom.style.width = '210mm'
        htmlToPdf(dom, fileName);
        dom.style.width = '100%'
    },
    img(dom, fileName) {
        htmlToImg(dom, fileName);
    },
    createIframe(op) {
        const {debug, importCss, importStyle, loadCss, title} = op
        this.removeIframe();
        this.iframe = document.createElement('iframe');
        if (debug === false) {
            this.iframe.style.display = 'none'
        }
        //插入需要打印的目标元素
        document.querySelector('body').appendChild(this.iframe)
        this.iframe.contentDocument.title = title;
        const {body, head} = this.iframe.contentDocument;
        const contentWindow = this.iframe.contentWindow;
        //插入head中的link stylesheet
        if (importCss) {
            const stylesheets = document.querySelectorAll("link[rel = 'stylesheet']")
            stylesheets.forEach(item => {
                head.appendChild(item.cloneNode(true))
            })
        }
        //插入style
        if (importStyle) {
            const stylesheets = document.querySelectorAll("style")
            stylesheets.forEach(item => {
                head.appendChild(item.cloneNode(true))
            })
        }
        //插入外部样式文件
        if (Array.isArray(loadCss) && loadCss.length > 0) {
            loadCss.forEach(item => {
                head.appendChild(item)
            })
        }
        //缩放zoom
        for (let key in op.body) {
            body.style[key] = op.body[key];
        }
        body.style.zoom = op.zoom;
        body.appendChild(this.dom)
        return contentWindow;
    },
    removeIframe() {
        if (this.iframe) {
            document.querySelector('body').removeChild(this.iframe)
            this.iframe = null
        }
    }
}


//导出到excel
export const toExcel = (type, fileName, dom) => {
    exportUtil.excel({el: dom}, fileName);
    /* if (!type) {
         type = "xlsx";
     }
     try {
         let wb = XLSX.utils.table_to_book(dom, {sheet: "Sheet1"});
         return XLSX.writeFile(wb, `${fileName}.${type}`);
     } catch (e) {
         let innerHtm = dom.innerHTML || dom.$el.innerHTML;
         let table = document.createElement('div');
         table.innerHTML = innerHtm;
         let wb = XLSX.utils.table_to_book(table, {sheet: "Sheet1"});
         return XLSX.writeFile(wb, `${this.fileName}.${type}`);
     }*/
}

//打印dom
export const print = (dom, heng) => {

    //所有打印适配A4尺寸
    let dt = dom.cloneNode(true);
    if (heng) {
        dt.style.width = "290mm"
    } else {
        dt.style.width = "210mm"
    }
    exportUtil.prinf({
        el: dom,   //打印目标dom节点，eg: this.refs.view
        debug: true,             //打开调试模式，会显示iframe,
        importCss: true,         //引入head 中的link stylesheet
        importStyle: true,       //引入style标签中的样式
        loadCss: [],             //需要载入的第三方样式表
        title: '',               //打印标题
        delay: 500,              //延迟打印时间，确保iframe中的静态资源加载完成
        beforePrinfHandle: null, //打开打印窗口前的钩子函数,可以针对打印文档进行自定义调整，接受一个document参数
        afterPrintHandle: null,  //打印完成的钩子函数,
        zoom: 1,//缩放，优先级高于body.zoom
        body: {width: 'auto', height: 'auto'} //body style
    });
}

//打印dom
export const printQrCode = (dom) => {
    let dt = dom.cloneNode(true);
    exportUtil.prinf({
        el: dom,   //打印目标dom节点，eg: this.refs.view
        debug: true,             //打开调试模式，会显示iframe,
        importCss: true,         //引入head 中的link stylesheet
        importStyle: true,       //引入style标签中的样式
        loadCss: [],             //需要载入的第三方样式表
        title: '',               //打印标题
        delay: 500,              //延迟打印时间，确保iframe中的静态资源加载完成
        beforePrinfHandle: null, //打开打印窗口前的钩子函数,可以针对打印文档进行自定义调整，接受一个document参数
        afterPrintHandle: null,  //打印完成的钩子函数,
    });
}
