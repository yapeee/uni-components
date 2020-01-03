<template>
	<view>
		<!-- <tabs :type="type" v-model="active"></tabs> -->
		<!-- <view class="content">{{active}}</view> -->
		<tabs :type="type2" v-model="active2" itemColor="#03A9F4" lineColor="#03A9F4"></tabs>
		<view class="content">{{active2}}</view>
		<!-- <tabs :type="type3" v-model="active3" itemColor="#03648f" lineColor="#03648f"></tabs>
		<view class="content">{{active3}}</view>
		<tabs :type="type4" v-model="active4" itemColor="#03648f" lineColor="#03648f"></tabs>
		<view class="content">{{active4}}</view> -->
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
				active: 0,
				active2: 0,
				active3: 4,
				active4: 0
			}
		},
		onShow() {
			setTimeout(()=> {
				this.active3 = 5;
			}, 3000)
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.content {
		background: #fff;
		margin-bottom: 20rpx;
	}

</style>
