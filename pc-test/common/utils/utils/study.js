import {assign} from "./staticFunction";

function study(){
    let rows = [];
    for (let i = 1; i <= 10; i++) {
        let cols = [];
        for (let j = 0; j < 5; j++) {
            cols.push(this.getCol())
        }
        rows.push({cols});
    }

    rows.unshift({cols: [this.getCol()]});
    rows.slice();
    rows.splice();
    rows.sort((a, b) => {
        let offset = a.colNum - b.colNum;
        if (offset != 0) {
            return offset;
        }
        return a.rowNum - b.rowNum;
    })
    let index = rows.findIndex(a => a == 1);
    let maps = rows.map(a => {
        return {id: a.id}
    })
    rows.filter(a => {
        return a.id == 1;
    })
    let a = {id: 1, obj: {b: 1}}, b = {id: 2, name: 2, obj: {a: {}}};
    a = {...a, ...b};
    a = Object.assign(a, b);
    assign(a, b);

    let ggf = (ids) => {
        if (!ids || !ids.length) {
            return;
        }
        ids[0]
    }
    ggf();
    ggf([1])
    ggf([1, 2, 5, 7]);

    let date = new Date();
    let format = date.format("yyyy/M/d,HH:mm:ss");
    let next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    let ff = () => new Promise(((resolve, reject) => {
        //一大堆代码
        if (true){
            resolve({a:1});
            return;
        }else{
            reject(new Error(''));
            return
        }
    }));
    ff().then(ok=>{
        a =2;
    }).catch(error=>{
    })
}
