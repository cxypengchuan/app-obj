import {aes} from "./crypto";
import {toast} from "@/utils/toastUtils";
import {constants} from "@/utils/Constants";
import {showSelectSampleTest} from "@/utils/popupUtil";


export const getResultFromCode = (data) => {
    if (data && data.startsWith("http")) {
        let split = data.split('?')
        if (split instanceof Array) {
            let result = JSON.parse(aes.de(split[1]))
            if (Object.keys(result).findIndex(a => a == "bizCode") > -1) {
                if (result.bizCode == constants.bizCode.sampleRecord) {
                    showSelectSampleTest(result.id).then(res => {

                    }).catch(error => {

                    })
                }
            }
        } else {
            toast.error("二维码错误")
        }
    } else {
        toast.error("暂不支持的二维码")
    }
}
