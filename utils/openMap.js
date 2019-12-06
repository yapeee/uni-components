
function openMapByDefault(latitude, longitude, name) {
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
}
function openMapByAndroid(latitude, longitude, name) {
	let url = ''; // 回调地址
	let identity = ''; // 程序名称
	if(plus.runtime.isApplicationExist({pname: 'com.baidu.BaiduMap'})) { // baidumap
		url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`
		identity = 'com.baidu.BaiduMap'
		openURL(url, identity)
	}
	else if(plus.runtime.isApplicationExist({pname: 'com.autonavi.minimap'})) { // 高德
		url = `androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
		identity = 'com.autonavi.minimap'
		openURL(url, identity)
	}
	else {
		openMapByDefault(latitude, longitude, name)
	}
}
function openMapByIos(latitude, longitude, name) {
	let url = ''; // 回调地址
	let errorCB = ''; // url失败的回调地址
	let identity = ''; // 程序名称

	if(plus.runtime.isApplicationExist({action: 'baidumap://'})) { // baidumap
		url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
		openURL(url, identity)
	}
	else if(plus.runtime.isApplicationExist({action: 'iosamap://'})) { // 高德
		url = `iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
		openURL(url, identity)
	} 
	else {
		openMapByDefault(latitude, longitude, name)
	/* 	// 安装百度地图
		f = iosAppstore;
		id = "itunes.apple.com/cn/app/bai-du-de-tu-yu-yin-dao-hang/id452186370?mt=8";
		plus.nativeUI.confirm( "检查到您未安装百度地图，是否到商城搜索下载？", function(i){
			if ( i.index == 0 ) {
				f(id);
			}
		}) */
	}
}
function openURL(url, identity ) {
	let newurl = encodeURI(url);
	plus.runtime.openURL( newurl, function(res){
		uni.showModal({
			content: res.message
		})
	}, identity);
}
export default {
	/* 打开地图 */
	openMap(latitude, longitude, name) {
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
	}
}