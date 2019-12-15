## 简介

该方法支持跳转第三方地图并定位指定坐标。

APP端跳转至百度地图（第三方软件）；若无，则跳转至高德地图（第三方软件）；若均无，则打开腾讯地图（uni自带方法：uni.openLocation）
其它端打开腾讯地图（uni自带方法：uni.openLocation）

## 基础用法

```vue
import Map from '../ms-openMap.js'
Map.openMap(latitude, longitude, name)
```

## 属性说明

| 参数      | 说明             | 类型   |
| --------- | ---------------- | ------ |
| latitude  | GCJ-02坐标系纬度 | Float  |
| longitude | GCJ-02坐标系经度 | Float  |
| name      | 地图标注名称     | String |


## 参考
[百度地图URI API](https://lbsyun.baidu.com/index.php?title=uri/api/android)
[高德地图URI API](https://lbs.amap.com/api/amap-mobile/summary)
[uni-app HTML5+ API](http://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.openURL)