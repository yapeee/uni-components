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
				latitude: 30.244300,
				longitude: 120.215240,
				name: '杭州大剧院'
			}
		},
		methods: {
			openMap() {
				Map.openMap(this.latitude, this.longitude, this.name)
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
