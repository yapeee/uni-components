## 简介

该方法支持跳转第三方地图并定位指定坐标。

APP端跳转至百度地图（第三方软件）；若无，则跳转至高德地图（第三方软件）；若均无，则打开腾讯地图（uni自带方法：uni.openLocation）
其它端打开腾讯地图（uni自带方法：uni.openLocation）

## demo
**源码：**[https://github.com/yapeee/uni-components](https://github.com/yapeee/uni-components)

**测试数据：**   
wgs84: 39.9078008469, 116.391290596  
bd09: 39.915547, 116.403909  
gcj02: 39.9091591069, 116.3974783161  

## 基础用法

```vue
import Map from '../ms-openMap.js'
Map.openMap(latitude, longitude, name, coord_type)
```

## 属性说明

| 参数       | 说明                                         | 类型   |
| ---------- | -------------------------------------------- | ------ |
| latitude   | 纬度（默认GCJ-02坐标系）                     | Float  |
| longitude  | 经度（默认GCJ-02坐标系）                     | Float  |
| name       | 地图标注名称                                 | String |
| coord_type | 坐标类型，可选参数。示例：gcj02、bd09、wgs84 | String |

## **实现方案**

首先判断程序的运行平台，不同的平台调用不同的打开地图的方法。android和ios平台下，判断并打开百度地图和高德地图。其他平台下，打开腾讯地图网页版（uni自带方法）。

#### 一、判断运行平台

通过`条件编译`及`uni.getSystemInfoSync().platform`来判断android、ios及其他平台。

```javascript
// #ifdef APP-PLUS
switch(uni.getSystemInfoSync().platform){
	case 'android':
		console.log('运行Android上')
		openMapByAndroid(latitude, longitude, name)
		break;
	case 'ios':
		console.log('运行iOS上')
		openMapByIos(latitude, longitude, name)
		break;
	default:
		openMapByDefault(latitude, longitude, name)
		console.log('运行在开发者工具上')	
		break;
}	
// #endif
// #ifndef APP-PLUS
openMapByDefault(latitude, longitude, name)
// #endif
```

tips：

平台判断有2种场景，一种是在编译期判断，一种是在运行期判断。

**编译期判断**：即条件编译，不同平台在编译出包后已经是不同的代码。

**运行期判断**：运行期判断是指代码已经打入包中，仍然需要在运行期判断平台，此时可使用 `uni.getSystemInfoSync().platform` 判断客户端环境是 Android、iOS 还是小程序开发工具（在百度小程序开发工具、微信小程序开发工具、支付宝小程序开发工具中使用 `uni.getSystemInfoSync().platform` 返回值均为 devtools）。

#### 二、APP打开第三方地图的方法

HTML5+是对接SDK与页面的中间件，用于页面通过js调用底层的SDK接口。

##### 2.1、 APP判断第三方应用是否存在

```javascript
/*
 * appInf: ( ApplicationInf ) 必选 要判断第三方程序的描述信息
 * Android平台需要通过设置appInf的pname属性（包名）进行查询。 
 * iOS平台需要通过设置appInf的action属性（Scheme）进行查询，在iOS9以后需要添加白名单才可查询，
 * 在manifest.json文件plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["weixin"]）.
 */
plus.runtime.isApplicationExist(appInf);
```

###### 2.1.1、判断百度地图应用是否存在

```javascript
plus.runtime.isApplicationExist({pname: 'com.baidu.BaiduMap', action: 'baidumap://'})
```

###### 2.1.2、判断高德地图应用是否存在

```javascript
plus.runtime.isApplicationExist({pname: 'com.autonavi.minimap'},action: 'iosamap://'})
```

##### 2.2、APP调用第三方程序打开指定的URL

```javascript
/*
 * 说明：调用第三方程序打开指定的URL
 * 参数：
 * url: ( String ) 必选 要打开的URL地址
 * errorCB: ( OpenErrorCallback ) 可选 打开URL地址失败的回调
 * identity: ( String ) 可选 指定打开URL地址的程序名称
 */
plus.runtime.openURL( url, errorCB, identity );
```
###### 2.2.1、打开第三方程序实际应用

```javascript
function openURL(url, identity ) {
	let newurl = encodeURI(url);
	plus.runtime.openURL( newurl, function(res){
		uni.showModal({
			content: res.message
		})
	}, identity);
}
```

###### 2.2.2、打开android百度地图

```javascript
url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`
identity = 'com.baidu.BaiduMap'
openURL(url, identity)
```

###### 2.2.3、打开android高德地图

```javascript
url = `androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
identity = 'com.autonavi.minimap'
openURL(url, identity)
```

###### 2.2.4、打开ios百度地图

```javascript
url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
openURL(url, identity)
```

###### 2.2.5、打开ios高德地图

```javascript
url = `iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
openURL(url, identity)
```

三、其他平台打开地图的方法

其他平台采用`uni.openLocation(OBJECT)`方法使用应用内置地图查看位置。

```javascript
uni.openLocation({
	latitude: latitude,
	longitude: longitude,
	name: name,
	fail: () => {
		uni.showModal({
			content: '打开地图失败,请重'
		})
	},
})
```

## 更新日志
**2020-01-02**
支持BD-09（百度坐标）、GCJ-02（高德、腾讯）、WGS-84（GPS坐标）坐标系。

**2019.12.10**

第一次发布，支持跳转第三方地图并定位指定坐标。

## 参考

[百度地图URI API](https://lbsyun.baidu.com/index.php?title=uri/api/android)  
[高德地图URI API](https://lbs.amap.com/api/amap-mobile/summary)  
[uni-app HTML5+ API](http://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.openURL)