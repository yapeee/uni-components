<template>
	<view>
		<view class="btn" @click="openMap">打开第三方地图</view>
	</view>
</template>

<script>
	import Map from '@/utils/openMap.js'
	export default {
		data() {
			return {
				// wgs84
				latitude: 39.9078008469,
				longitude: 116.391290596,
			/* 	// bd09
				latitude: 39.915547,
				longitude: 116.403909, */
			/* 	// gcj02
				latitude: 39.9091591069,
				longitude: 116.397478316, */
				name: '天安门'
			}
		},
		methods: {
			openMap() {
				Map.openMap(this.latitude, this.longitude, this.name, 'wgs84')
			}
		}
	}
</script>

<style lang="scss">
	.btn {
		padding: 15px;
		margin: 10px;
		box-shadow: 0 1px 5px #ebedf0;
	}

</style>
