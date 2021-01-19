<template>
    <view class="header-wraper" :style="searWrapperSty" :class="{'header-fixed':fixed,'header-tran':tran}">
<!--        <gx-status-bar/>-->
        <view style="position: relative;">
            <!-- 标题栏-->
            <view class="header-content" :class="{'searchShow':scrollOut,'searchHide':scrollIn}">
                <view style="width: 100rpx;">
                    <block v-if="showLeftBack">
                        <!--返回文字和返回图标-->
                        <view class="left-section padd-setting-l" @click="naviBack()">
                            <text v-if="showBackBtn" class="iconfont">&#xe687;</text>
                            <text v-if="showBackTxt" style="white-space: nowrap">{{leftTxt}}</text>
                        </view>
                    </block>
                </view>
                <!--搜索框或者标题-->
                <view class="middle-section text-ellipsis" :style="midStyle">
                    <text v-if="!showSearch" class="middle-title">{{title}}</text>
                    <view v-else class="middle-section_input" :style="seachWrapSty">
                        <text class="iconfont">&#xe649;</text>
                        <block v-if="useValue">
                            <input
                                    :class="searchClass"
                                    class="text-m text-dark"
                                    style="line-height: normal;display: block;vertical-align:middle;color:black;"
                                    :style="searchStyle"
                                    v-model="keyword"
                                    :placeholder="searchPlaceholder"
                                    placeholder-class="text-m text-gray"
                                    confirm-type="search"
                                    @confirm="$emit('search')"
                                    @input="inputHandle"
                                    @focus="$emit('focus')"
                                    :focus="isFocus"
                            />
                        </block>
                        <block v-else>
                            <input
                                    :class="searchClass"
                                    class="text-m text-dark"
                                    style="line-height: normal;display: block;vertical-align:middle;color:black;"
                                    :style="searchStyle"
                                    :placeholder="searchPlaceholder"
                                    placeholder-class="text-m text-gray"
                                    confirm-type="search"
                                    @confirm="$emit('search')"
                                    @input="inputHandle"
                                    @focus="$emit('focus')"
                                    :focus="isFocus"
                                    :value="initValue"
                            />
                        </block>
                    </view>
                </view>
                <!--标题栏右侧的图标：更多，取消，搜索-->
                <view class="right-section" @tap="rightOp($event)">
                    <text class="txt-right flex-sk text-l" style="padding-right: 33rpx;white-space: nowrap;font-size:17px;" v-if="showRightTxt">{{rightTxt}}</text>
                    <text class="iconfont" v-if="searchIcon" @tap="searchHandle">&#xe649;</text>
                    <text class="iconfont" v-if="searchIconC" @tap="searchHandleC" :style="serIconStyleC">&#xe649;</text>
                    <text class="iconfont" v-if="showShare" style="white-space: pre;">&#xe607;<template v-if="showShareTxt"><text style="margin-left: 10rpx;padding-right: 66rpx">分享</text></template></text>
                    <text class="iconfont" v-if="showMenu" style="font-size: 38rpx">&#xe609;</text>
                    <text class="iconfont" v-if="showAdd" style="font-size: 48rpx;padding-left: 0;padding-right: 33rpx;" @click="$emit('addHandle')">&#xeaf3;</text>
                    <text class="iconfont" v-if="isCloseIcon" style="font-size:52rpx;" @click="closeHandle">&#xe73e;</text>
                    <text class="iconfont text-xl" v-if="isRefreshIcon" @click="$emit('clickRefresh')">&#xe62b;</text>
                    <text class="text-l" v-if="addText" style="padding-right: 33rpx;white-space: nowrap" @click="$emit('addTxtHandle')">添加</text>
                    <text class="iconfont" v-if="propsIcon" style="font-size:43.47rpx;" @click="$emit('propsHandle')">&#xe637;</text>
                    <text class="t-32 c-white" style="padding: 0 30rpx;white-space: nowrap;" v-if="showEditTxt" @click="$emit('editEvent')">编辑</text>
                    <view class="fl fl-a" v-if="isSchedule">
                        <text class="iconfont iconshaixuan1" :style="schFilCor" style="font-size: 40rpx;margin-right: 20rpx;" @click="$emit('filter')"></text>
                        <text class="iconfont iconbangzhu"  style="font-size: 40rpx;margin-right: 30rpx" @click="$emit('help')"></text>
                    </view>
                    <text class="iconfont iconbangzhu" v-if="isHelpIcon" style="width: auto;font-size: 40rpx;margin-right: 30rpx" @click="$emit('helpIcon')"></text>
                    <text class="iconfont iconshezhi-" v-if="isSettingIcon" style="margin-left: 24rpx;margin-right: 30rpx" @click="$emit('settingIcon')"></text>
                </view>

            </view>
            <!--搜索栏(配合标题栏的searchIconC图标来显示)-->
            <template v-if="searchIconC">
                <view class="header-content-c" :class="{'scrollIn':scrollIn,'scrollOut':scrollOut}">
                    <!--左侧-->
                    <view class="left-section padd-setting-l" @click="naviBack">
                        <text v-if="showBackBtn" class="iconfont">&#xe687;</text>
                    </view>
                    <!--中部-->
                    <view class="middle-section text-ellipsis" :style="midStyle">
                        <view class="middle-section_input">
                            <text class="iconfont">&#xe649;</text>
                            <input
                                    :class="searchClass"
                                    style="line-height: normal;display: block;vertical-align:middle;"
                                    :style="searchStyle"
                                    v-model="keyword"
                                    type="text"
                                    :placeholder="searchPlaceholder"
                                    confirm-type="search"
                                    @focus="$emit('focus')"
                                    @confirm="$emit('search')"
                                    @input="inputHandle"
                            />
                        </view>
                    </view>
                    <!--右侧-->
                    <view class="right-section" @click="reset">
                        <text style="padding-right: 33rpx;font-size: 32rpx;white-space: nowrap" >{{resetText}}</text>
                    </view>
                </view>
            </template>
        </view>
        <slot></slot>
    </view>
</template>

<script>
    // import GxStatusBar from "./common/gx_status_bar";

    export default {
        name: 'common-header',
        components: {},
        props: {
            searWrapperSty:{
                type:String,
                default(){
                    return ''
                }
            },
            //是否固定
            fixed:{
                type:Boolean,
                default(){
                    return false;
                }
            },
            //是否透明
            tran:{
                type:Boolean,
                default(){
                    return false;
                }
            },
            //使用双向绑定的输入框
            useModel: {
                type: [String,Boolean],
                default(){
                    return false;
                }
            },
            //初始化输入框的值
            initValue: {
                type: String
            },
            title: {
                type: String
            },
            //左侧文字
            leftTxt: {
                type: String,
                default: '返回'
            },
            //是否展示返回文本和箭头
            showLeftBack: {
                type: Boolean,
                default() {
                    return true
                }
            },
            //展示返回文本
            showBackTxt: {
                type: Boolean,
                default() {
                    return false
                }
            },
            //展示返回箭头
            showBackBtn: {
                type: Boolean,
                default() {
                    return true
                }
            },
            //右侧文字内容
            rightTxt: {
                type: String,
            },
            //是否展示右侧文字内容
            showRightTxt: {
                type: Boolean,
                default() {
                    return false
                }
            },
            //展示搜索图标
            searchIcon: {
                type: Boolean,
                default() {
                    return false
                }
            },
            //展示无跳转功能的搜索图标
            searchIconC: {
                type: Boolean,
                default(){
                    return false;
                }

            },
            //是否展示课程表相关的图标
            isSchedule:{
                type: Boolean,
                default(){
                    return false;
                }
            },
            schFilCor:{
                type: [String,Boolean],
                default(){
                    return '';
                }
            },
            serIconStyleC:{
                type:String,
                default(){
                    return ''
                }
            },
            //展示搜索框
            showSearch: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            //展示帮助图标
            isHelpIcon:{
                type: Boolean,
                default() {
                    return false;
                }
            },
            //展示设置图标
            isSettingIcon:{
                type: Boolean,
                default() {
                    return false;
                }
            },
            //搜索绑定值
            searchValue: {
                type: [String, Number],
                default() {
                    return "";
                }
            },
            //搜索提示语
            searchPlaceholder: {
                type: String,
                default() {
                    return "请输入搜索关键词";
                }
            },
            //搜索类名
            searchClass: {
                type: String,
                default() {
                    return "header-search";
                }
            },
            //搜索样式
            searchStyle: {
                type: String,
                default() {
                    return ''
                }
            },
            //搜索外框样式
            seachWrapSty: {
                type: String,
                default() {
                    return ''
                }
            },
            //是否显示关闭按钮
            isCloseIcon: {
                type: Boolean,
                default() {
                    return false
                }
            },
            //显示刷新按钮
            isRefreshIcon: {
                type: Boolean,
                default() {
                    return false
                }
            },
            //开启返回？
            enableBack: {
                type: [Boolean, String],
                default() {
                    return true
                },
            },
            isFocus: {
                type: Boolean,
                default(){
                    return false;
                },
            },
            showShare:{
                type:Boolean,
                default(){
                    return false;
                }
            },
            showShareTxt:{
                type:Boolean,
                default(){
                    return false
                }
            },
            showMenu:{
                type:Boolean,
                default() {
                    return false;
                }
            },
            showAdd:{
                type:Boolean,
                default() {
                    return false;
                }
            },
            useValue: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            addText:{
                type:Boolean,
                default: false
            },
            //中部样式
            midStyle: {
                type: String,
                default(){
                    return ''
                }
            },
            //三个点的按钮
            propsIcon:{
                type:Boolean,
                default(){
                    return false
                }
            },
            //展示编辑文本
            showEditTxt:{
                type:Boolean,
                default(){
                    return false
                }
            },
            resetText:{
                type:String,
                default(){
                    return '重置'
                }
            },
            autoCloseSearch: {
                type:Boolean,
                default(){
                    return false;
                }
            }
        },
        watch: {
            keyword: function (val) {
                this.$emit('update:searchValue', val);
            },
            isFocus: function (val) {
                //console.log(this.isFocus, '头部的值的变化')

            }
        },
        data() {
            return {
                keyword: this.searchValue,
                scrollIn:false,
                scrollOut:false,
                timer:{
                    input:0,
                }
            }
        },
        methods: {
            naviBack() {

                this.$emit('back');

                //默认返回上一级
                if (this.isTrue(this.enableBack)) {
                    uni.navigateBack();
                }
            },

            rightOp(e) {
                this.$emit('rightOp',e);
                this.$emit('search');
            },
            closeHandle(){
                this.$emit('closeHandle')
            },
            inputHandle(e) {
                const value = e.detail.value;
                this.$emit('input', value);
                clearTimeout(this.timer.time);
                this.timer.input = setTimeout(()=>{
                    this.$emit('search');
                },this.autoSearchTime);
            },
            searchHandle() {
                this.$emit('clickSeachIcon');
                this.$navigateTo({url:'/pages/home/search'});
            },
            searchHandleC(){
                this.$emit('clickSeachIcon');
                this.scrollIn = true;
                this.scrollOut = false;
            },
            serCloseHandle() {
                this.keyword='';
                this.scrollIn = false;
                this.scrollOut = true;
                setTimeout(()=>{
                    this.$emit('search');
                },100);
            },
            reset(){
                this.keyword = '';
                setTimeout(()=>{
                    this.$emit('search');
                    this.$emit('reset');
                    if (this.autoCloseSearch){
                        this.serCloseHandle();
                    }
                },100);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .header-wraper {
        width: 100vw;
        overflow: hidden;
        height: auto;
        position: relative;
        background: $lsswy-theme-main-color;
        .header-content {
            width: 100%;
            height:$header-height;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all .5s;
            overflow: hidden;
        }
        .header-search{
            background-color: white;
            border-radius:5px;
            width: 100%;
            padding-right: 20rpx;
        }
        .left-section {
            width: 100rpx;
            height:$header-height;
            padding: 23rpx 0 18rpx $lsswy-box-padding;

            image {
                width: 13.88rpx;
                height: 25.69rpx;
            }

            text {
                font-size: $lsswy-font-size-article-title;
                color: #fff;
            }

            .iconfont {
                font-size: 40rpx;
            }
        }

        .middle-section {
            color: white;


            .middle-title {
                font-size: $lsswy-font-size-page-title;
            }

            &_input {
                width: 520rpx;
                /*
                                padding: 10rpx $gx-box-padding 0;
                */
                padding: 0 $lsswy-box-padding 0;
                color: $lsswy-font-color-base;
                display: flex;
                align-items: center;
                background-color: white;
                border-radius: 6rpx;
                font-size:$lsswy-font-size-descri-content-small;
                height: 64rpx;
                .iconfont {
                    font-size: $lsswy-font-size-moudle-title;
                    margin-bottom: 4rpx;
                }

                input {
                    margin-left: $lsswy-box-padding;
                }

            }
        }

        .right-section {
            min-width: 100rpx;
            height:$header-height;
            display: flex;
            justify-content: flex-end;
            flex-wrap: nowrap;
            align-items: center;


            text {
                color: #fff;
            }

            .iconfont{
                //font-size: $gx-font-size--title;
                //font-size: $gx-font-size--title-assist;
                font-size: 40rpx;
                height:100%;
                margin-right:20rpx;
                //padding: 18rpx $gx-box-padding;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                //padding-right: 33rpx;
                width: 100%;
                justify-content: center;
            }
        }
    }
    //透明背景
    .header-tran{
        background: transparent;
    }
    //固定
    .header-fixed{
        position:fixed;top:0;z-index:99;
    }
    .padd-setting-l {
        padding-right: 33.33rpx;
        display: flex;
        align-items: center;
    }

    .padd-setting-r {
        padding-left: 33.33rpx;
        display: flex;
        align-items: center;
    }

    /*增加搜索框以及特效*/
    .header-content-c{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height:$header-height;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transform: translate3d(100%,0,0);

        input {
            width: 100px;
        }
    }
    @keyframes scrollLeft {
        from {
            transform: translate3d(100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes scrollRight {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(100%, 0, 0);
        }
    }

    .searchHide {
        opacity: 0;
    }

    .searchShow {
        opacity: 1;
    }

    .scrollIn {
        animation: scrollLeft .5s;
        transform: translate3d(0,0,0);
    }

    .scrollOut {
        animation: scrollRight .5s;
        transform: translate3d(100%,0,0);
    }
</style>
