import {toast} from "./toastUtils";
import XLSX from 'xlsx';


export const readExcel = (file) => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
        let data = e.target.result;
        let wb = XLSX.read(data, {type: 'binary'});
        let json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        let title = '';
        let index = 0;
        let fields = [];
        if (!json || !json.length) {
            toast.error("错误的文件")
            reject();
            return;
        }
        let table = json[0];

        for (let j in table) {
            if (index === 0) {
                title = j;
            }
            fields.push(table[j])
            index++;
        }
        if (!fields || !fields.length) {
            toast.error("文件没有内容")
            reject();
            return;
        }
        resolve({title,   fields})
    };
})

