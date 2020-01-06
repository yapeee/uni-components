<template>
	<view>
		<!-- <tabs :type="type" v-model="active"></tabs> -->
		<!-- <view class="content">{{active}}</view> -->
		
		<view class="content">
			<view class="title">不定宽item</view>
			<tabs :type="type3" v-model="active3" itemColor="#03648f" lineColor="#03648f"></tabs>
			<view>{{active3}}</view>
			<!-- <tabs :type="type4" v-model="active4" itemColor="#03648f" lineColor="#03648f"></tabs>
			<view>{{active4}}</view> -->
		</view>
		<view class="content">
			<view class="title">下划线非滑动切换</view>
			<tabs :type="type2" v-model="active2" itemColor="#03A9F4" lineColor="#03A9F4" :lineAnimated="false"></tabs>
			<view>{{active2}}</view>
		</view>
		
		<view class="content">
			<view class="title">动态渲染数据</view>
			<tabs :type="type5" v-model="active5" ></tabs>
			<view class="btn" @click="setTabsValue">获取数据</view>
		</view>
	</view>
</template>

<script>
	import Tabs from '@/components/tabs/tabs.vue'
	export default {
		components: {
			Tabs
		},
		data() {
			return {
				type: [{
					title: 'test1'
				}, {
					title: 'test2'
				}],
				type2: [{
						title: 'test1'
					}, {
						title: 'test2'
					},{
						title: 'test3'
					}, {
						title: 'test4'
					},{
						title: 'test5'
					}, {
						title: 'test6'
					},{
						title: 'test7'
					}, {
						title: 'test8'
					}
				],
				type3: [{
						title: '壹'
					}, {
						title: '贰贰'
					},{
						title: '叁叁叁'
					}, {
						title: '肆肆肆肆'
					},{
						title: '伍伍伍伍伍'
					}, {
						title: '陆陆陆陆陆陆'
					}, {
						title: '柒柒柒柒柒柒柒'
					}
				],
				type4: [{
						title: '壹'
					}, {
						title: '拾拾拾拾拾拾拾拾拾拾拾'
					}
				],
				type5: [],
				active: 0,
				active2: 0,
				active3: 4,
				active4: 0,
				active5: 0,
			}
		},
		onShow() {
		},
		methods: {
			setTabsValue() {
				this.type5 = this.type2
				this.active5 = 4
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background: #fff;
		margin-bottom: 20rpx;
		.title {
			margin-left: 20rpx;
			padding: 20rpx 0;
			color: #818586;
			border-bottom: 1px solid #f6f6f6;
		}
		.btn {
			background: $uni-color-primary;
			background: #007aff;
			color: #fff;
			padding: 20rpx;
			display: inline-block;
			border-radius: 10rpx;
		}
	}

</style>
