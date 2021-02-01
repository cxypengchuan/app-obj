

//得到经纬度
export const getLonLat = (dataStr) => {
  if (!dataStr) {
    return [];
  }
  let datas = JSON.parse(dataStr);
  let results = [];
  for (let i = 0; i < datas.length; i++) {
    let map = datas[i];
    results.push([map.longitude, map.latitude]);
  }
  return results;
};



export const getParentCode = (adCode) => {
  let tempCode = adCode + "";
  return tempCode.substring(0, 4) + "00";
};

//创建区划
export const createArea = (map, adcode=520112) => {
  adcode = parseInt(adcode);
  map.clearMap();
  let colors = ["#1565cc", "#5574a6", "#3b3eac"];
  AMapUI.loadUI(['geo/DistrictExplorer'], function (DistrictExplorer) {
    //创建一个实例
    let districtExplorer = new DistrictExplorer({
      eventSupport: true,
      map: map
    });
    let isDis = false;
    let paretCode = getParentCode(adcode);
    let selfCode = "" + adcode;
    selfCode = selfCode.substring(0, 6);
    if (parseInt(paretCode) !== adcode) {
      adcode = paretCode;
      isDis = true;
    }
    districtExplorer.loadAreaNode(adcode, function (error, areaNode) {

      //更新地图视野
      map.setBounds(areaNode.getBounds(), null, null, true);

      //清除已有的绘制内容
      districtExplorer.clearFeaturePolygons();

      //绘制子区域
      if (isDis) {
        districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
          if (feature.properties.adcode === parseInt(selfCode)) {
            let fillColor = colors[i % colors.length];
            let strokeColor = colors[colors.length - 1 - i % colors.length];
            let text = new AMap.Text({
              text: feature.properties.name,
              textAlign: 'center', // 'left' 'right', 'center',
              verticalAlign: 'middle', //middle 、bottom
              //draggable:true,
              map: map,
              cursor: 'pointer',
              //angle:10,
              style: {
                'background-color': 'white',
                //'color':'white'
                'opacity': 0.6
                //'border':'solid 1px #0088ff'
                //'padding':'10px 20px'
              },
              position: feature.properties.centroid
            });
            map.setZoom(11);
            map.setCenter(feature.properties.centroid);
            return {
              cursor: 'default',
              bubble: true,
              strokeColor: "#89f4ff", //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              fillColor: fillColor, //填充色
              fillOpacity: 0.2, //填充透明度
              extData: {"fillColor": fillColor}

            };
          }
        });

        //绘制父区域
        districtExplorer.renderParentFeature(areaNode, {
          cursor: 'default',
          bubble: true,
          strokeColor: null, //线颜色
          strokeOpacity: 0, //线透明度
          strokeWeight: 0, //线宽
          fillColor: null, //填充色
          fillOpacity: 0//填充透明度
        });
      } else {
        districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
          let fillColor = colors[i % colors.length];
          let strokeColor = colors[colors.length - 1 - i % colors.length];
          let text = new AMap.Text({
            text: feature.properties.name,
            textAlign: 'center', // 'left' 'right', 'center',
            verticalAlign: 'middle', //middle 、bottom
            //draggable:true,
            map: map,
            cursor: 'pointer',
            //angle:10,
            style: {
              'background-color': 'white',
              //'color':'white'
              'opacity': 0.6
              //'border':'solid 1px #0088ff'
              //'padding':'10px 20px'
            },
            position: feature.properties.centroid
          });
          return {
            cursor: 'default',
            bubble: true,
            strokeColor: "#89f4ff", //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: fillColor, //填充色
            fillOpacity: 0.2, //填充透明度
            extData: {"fillColor": fillColor}

          };

        });

        //绘制父区域
        districtExplorer.renderParentFeature(areaNode, {
          cursor: 'default',
          bubble: true,
          strokeColor: "#89f4ff", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线宽
          fillColor: null, //填充色
          fillOpacity: 0.1//填充透明度
        });
      }
    });
    //监听feature的hover事件
    districtExplorer.on('featureMouseout featureMouseover', function (e, feature) {
      let polygons = districtExplorer.findFeaturePolygonsByAdcode(feature.properties.adcode);
      for (let i = 0; i < polygons.length; i++) {
        let optionTemp = polygons[i].getOptions();
        let isHover = e.type === 'featureMouseover';
        if (isHover) {
          optionTemp.fillColor = "#0011f9";
        } else {
          optionTemp.fillColor = polygons[i].getExtData().fillColor;
        }
        polygons[i].setOptions(optionTemp);
      }

    });

    //监听鼠标在feature上滑动
    districtExplorer.on('featureMousemove', function (e, feature) {
      //更新提示位置

    });

    //feature被点击
    districtExplorer.on('featureClick', function (e, feature) {
      createArea(feature.properties.adcode);
      createInspectNumPoint(feature.properties.adcode);
    });

    //外部区域被点击
    districtExplorer.on('outsideClick', function (e) {
    });
  });
};
