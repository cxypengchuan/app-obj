import store from '../store'
import {getPowers} from "./stora";
import {constants} from "./Constants";
import {md5} from "./crypto";

/**
 * 权限验证
 * @author leisong
 * @date 2019/3/6 16:04
 **/
export const power = {
    //显示更多操作
    hasMore(menuCode) {
        if (!menuCode) {
            return false;
        }
        let tempPower = store.state.tempPowers[menuCode];
        if (tempPower) {
            return tempPower == constants.bool.true;
        }
        let powers = store.state.powers;
        if (!powers) {
            powers = getPowers();
            store.commit('setPowers', powers);
        }
        if (!powers || powers.length <= 0) {
            store.commit('setTempPowers', {key: menuCode, value: constants.bool.false});
            return false;
        }
        let hasMore = powers.filter(a => a.startsWith(menuCode)).length > 3;
        store.commit('setTempPowers', {key: menuCode, value: hasMore ? constants.bool.true : constants.bool.false});
        return hasMore;
    },
    //自定义权限
    hasPower(menuCode, power) {
        if (!menuCode || !power) {
            return false;
        }
        let key = menuCode + ":" + power;
        let mkey = 'm' + md5(key);
        let tempPower = store.state.tempPowers[mkey];
        if (tempPower) {
            return tempPower == constants.bool.true;
        }
        let powers = store.state.powers;
        if (!powers) {
            powers = getPowers();
            store.commit('setPowers', powers);
        }
        if (!powers || powers.length <= 0) {
            return false;
        }
        let hasPower = powers.indexOf(key) > -1;
        store.commit('setTempPowers', {key: mkey, value: hasPower ? constants.bool.true : constants.bool.false});
        return hasPower;
    },
    //拥有添加权限
    add(menuCode) {
        return this.hasPower(menuCode, "add");
    },
    //拥有修改权限
    edit(menuCode) {
        return this.hasPower(menuCode, "edit");
    },
    //拥有删除权限
    delete(menuCode) {
        return this.hasPower(menuCode, "delete")
    },
    //拥有查看权限
    view(menuCode) {
        return this.hasPower(menuCode, "view")
    },
    //所有数据
    dataAll(){
        return store.state.userInfo.dataPower == constants.bool.true;
    }

};
