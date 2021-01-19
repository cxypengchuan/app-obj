//plus确认框
export const plusConfirm = (content, buttons, buttonPosition = 'right', shadowColor = 'rgba(0,0,0,0.4)') => {
    return new Promise((resolve, reject) => {
        if (!content) {
            reject('内容不能为空');
            return;
        }
        if (!buttons || buttons.length <= 0) {
            buttons = [{
                text: '取消',
                style: {color: '#666666'}
            }, {
                text: '确定',
                style: {color: '#2FADFF'}
            }];
        }
        let {windowWidth, windowHeight, pixelRatio} = uni.getSystemInfoSync();
        let confirm = new plus.nativeObj.View('gx_confirm', {
            height: '100%',
            width: '100%',
            top: '0',
            left: '0',
            backgroundColor: shadowColor
        });
        let rectPosition = {
            width: windowWidth * 0.75,
            height: windowWidth * 0.3,
            top: windowHeight * 0.42,
            left: windowWidth * 0.25 * 0.5
        };
        confirm.drawRect({color: '#ffffff', radius: '2'}, rectPosition);
        /*if (title) {
            confirm.drawText(title, {width: '68%', top: '43%', left: '20%', height: '2%'}, {align: 'left', verticalAlign: 'middle', whiteSpace: 'normal'});
        }*/
        if (content) {
            confirm.drawText(content, {
                width: `${rectPosition.width - 40}`,
                top: `${rectPosition.top + rectPosition.height * 0.2}`,
                left: `${rectPosition.left + 20}`,
                height: 'wrap_content'
            }, {
                align: 'left',
                whiteSpace: 'normal'
            });
        }
        confirm.show();
        let views = [confirm];
        //自动计算按钮宽度的方式
        //let buttonWidth = rectPosition.width / buttons.length;
        //指定按钮宽度的方式
        let buttonWidth = rectPosition.width * 0.20;
        //清空view
        let clearView = () => {
            plus.key.removeEventListener('backbutton');
            views.forEach(item => {
                item.reset();
                item.hide();
            });
        };
        //绘制按钮
        let drawButtons = (startPosition) => {
            buttons.forEach((button, btnIndex) => {
                let buttonView = new plus.nativeObj.View(`button_${btnIndex}`, {
                    width: `${buttonWidth}`,
                    height: `${rectPosition.height * 0.4}`,
                    top: `${rectPosition.top + rectPosition.height * 0.6}`,
                    left: `${startPosition}`
                });
                let style = {};
                if (button.style) {
                    style = {...button.style};
                }
                style.align = 'center';
                buttonView.drawText(button.text, {width: `100%`, height: '100%', top: '0', left: `0`}, style);
                startPosition += buttonWidth;
                buttonView.show();
                views.push(buttonView);
                buttonView.addEventListener('click', e => {
                    clearView();
                    resolve(btnIndex, button);
                });
            });
        };
        //自动计算按钮宽度的方式
        // let startPosition = rectPosition.left;
        // drawButtons(startPosition);
        //指定按钮宽度的方式
        //绘制在右面
        if (buttonPosition == 'right') {
            //获取最左面一个按钮的位置
            let startPosition = rectPosition.width + rectPosition.left - buttons.length * buttonWidth - 20;
            drawButtons(startPosition);
        } else if (buttonPosition == 'center') {
            //获取最左面一个按钮的位置
            let startPosition = rectPosition.left + (rectPosition.width - buttons.length * buttonWidth) / 2;
            drawButtons(startPosition);
        } else if (buttonWidth == 'left') {
            //获取最左面一个按钮的位置
            let startPosition = rectPosition.left + 20;
            drawButtons(startPosition);
        }
        plus.key.addEventListener('backbutton', function () {
            clearView();
        });
    });
};
//提示
export const toast = {
    //统一提示方便全局修改
    msg(title, duration = 1500, mask = false, icon = 'none') {

        if (!Boolean(title)) {
            return;
        }
        uni.showToast({
            title,
            duration,
            mask,
            icon
        });

    },
    //成功
    success(title = "保存成功") {
        return this.msg(title, 1500, false, 'success');
    },
    //失败
    error(title) {
        return this.msg(title);
    },
    //加载中
    loading(title) {
        return this.msg(title, 1500, false, 'loading');
    },
    //提示
    confirm(content, title = null) {
        return new Promise((resolve, reject) => {
            //#ifdef APP-PLUS
            plusConfirm(content).then(index => {
                if (index == 1) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
            //#endif
            //#ifndef APP-PLUS
            uni.showModal({
                title: title || '',
                content: content,
                success(confirmRes) {
                    if (confirmRes.confirm) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                },
                fail(error) {
                    reject(error);
                }
            });
            //#endif
        });
    },
    //提示保存
    confirmSave(content = '您还未保存数据，确认退出吗？') {
        return this.confirm(content);
    },
    alert(content, btnText = "确定") {
        return new Promise((resolve, reject) => {
            //#ifdef APP-PLUS
            plusConfirm(content, [{
                text: btnText,
                style: {color: '#2FADFF'}
            }]).then(index => {
                resolve(index == 0);
            });
            //#endif
            //#ifndef APP-PLUS
            uni.showModal({
                content: content,
                showCancel: false,
                confirmText: btnText,
                success(confirmRes) {
                    if (confirmRes.confirm) {
                        resolve(true);
                        return;
                    }
                    resolve(false);
                },
                fail(error) {
                    reject(error);
                }
            });
            //#endif
        })
    },
};