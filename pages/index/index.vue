<template>
	<view class="content">
		<view v-for="(item, index) in list" 
			  :key="index"
			  class="cell-item"
			  @click="showDetail(item)"
		>{{item.name}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: 'Tabs标签页',
						value: 'tabs'
					},
					{
						name: '第三方导航',
						value: 'guide'
					},
					{
						name: '下拉选择框',
						value: 'dropdown-select'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			showDetail(item) {
				uni.navigateTo({
					url: `/pages/examples/${item.value}/${item.value}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		.cell-item {
			padding: 30rpx;
			margin: 20rpx;
			box-shadow: 0 1px 5px #ebedf0;
			background: #fff;
		}
	}
</style>
