//判断字符是否为数字
export const isNumber = (val) => {
  let regPos = /^\d+(\.\d+)?$/; //非负浮点数
  let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  return regPos.test(val) || regNeg.test(val);
};

//输出文字
export const boolToStr = (num = 2) => {
  return num === 1 ? "是" : "否";
};

export const numberToCn = (num) => {
  let str = num + "";
  if (str.indexOf(".") > -1) {
    return str;
  }
  let cns = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  if (num >= 0 && num <= 10) {
    return cns[num];
  }
  return str;
};

//数字转英文字母
export const toABC = (number) => {
  if (!number) {
    return;
  }
  number = parseInt(number);
  if (number < 1 || number > 26) {
    return;
  }
  let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  return abc[number - 1];
};
/**
 * 自动补0
 *
 * @param maxLength 超过多少位就不补0
 * */
export const startPutZero = (number,  maxLength = 5) => {
  if (typeof number != 'number') {
    return;
  }
  let str = '' + number;
  for (let i = 0; i < maxLength - str.length; i++) {
    number = '0' + number;
  }
  return number;

};



//浮点数计算工具
export const numberOper = {
  // 加法 a+b
  add(a, b) {
    let r1, r2, m
    try { r1 = a.toString().split('.')[1].length } catch (e) { r1 = 0 }
    try { r2 = b.toString().split('.')[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (a * m + b * m) / m
  },
  //减法 a-b
  subtract(a, b) {
    let r1, r2, m, n
    try { r1 = a.toString().split('.')[1].length } catch (e) { r1 = 0 }
    try { r2 = b.toString().split('.')[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    n = (r1 >= r2) ? r1 : r2
    return ((a * m - b * m) / m).toFixed(n)
  },
  //乘法 a*b
  multiply(a, b) {
    let m = 0
    const s1 = a.toString()
    const s2 = b.toString()
    try { m += s1.split('.')[1].length } catch (e) { }
    try { m += s2.split('.')[1].length } catch (e) { }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },
  //除法 a/b
  divide(a, b) {

    let t1 = 0
    let t2 = 0
    let r1, r2
    try { t1 = a.toString().split('.')[1].length } catch (e) { }
    try { t2 = b.toString().split('.')[1].length } catch (e) { }
    r1 = Number(a.toString().replace('.', ''))
    r2 = Number(b.toString().replace('.', ''))
    let intDiv = r1 / r2
    let pow = Math.pow(10, t2 - t1)
    return this.multiply(intDiv, pow) // 这里用上面定义好的乘法运算
  }


}
