/**
 * 重新加载图片
 * 在{@link ../main.js }中导入即可全局使用
 * @author leisong
 * @date 2019/1/14 09:54
 * @param imgObj img对象
 * @param imgSrc 图片地址
 * @param reloadNum 重试次数
 **/
const reloadImg = (imgObj, imgSrc, reloadNum = 3) => {
  if (reloadNum > 0) {
    imgObj.onerror = function () {
      reloadImg(imgObj, imgSrc, reloadNum - 1);
    };
    //防抖節流的功能
    setTimeout(function () {
      imgObj.src = imgSrc;
    }, 500);
  } else {
    imgObj.onerror = null;
    //默认头像地址
    imgObj.src = require('@/assets/img/userLogo.jpg')
  }
};
