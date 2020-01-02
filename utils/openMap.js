import TransformCoordinate from './transformCoordinate.js'
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
function getCoordByType(longitude, latitude, coord_type) {
	switch (coord_type){
		case 'gcj02':
			return [longitude, latitude]
			break;
		case 'bd09':
			return TransformCoordinate.bd09togcj02(longitude, latitude)
			break;
		case 'wgs84':
			return TransformCoordinate.wgs84togcj02(longitude, latitude)
			break;
		default:
			return [longitude, latitude]
			break;
	}
}
export default {
	/* 打开地图 */
	openMap(latitude, longitude, name, coord_type='gcj02') {
		let arr = getCoordByType(longitude, latitude, coord_type)
		// #ifdef APP-PLUS
		switch(uni.getSystemInfoSync().platform){
			case 'android':
				console.log('运行Android上')
				openMapByAndroid(arr[1], arr[0], name)
				break;
			case 'ios':
				console.log('运行iOS上')
				openMapByIos(arr[1], arr[0], name)
				break;
			default:
				openMapByDefault(arr[1], arr[0], name)
				console.log('运行在开发者工具上')	
				break;
		}	
		// #endif
		// #ifndef APP-PLUS
		openMapByDefault(arr[1], arr[0], name)
		// #endif
	}
}