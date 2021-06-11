<template>
	<view>
		<!-- <dropdown-menu>
			<dropdown-item v-model="value" :list="list"></dropdown-item>
		</dropdown-menu>
		<view style="width: 100%; height: 300rpx;">123</view> -->
		<dropdown-menu>
			<dropdown-item v-model="value2" :list="list"></dropdown-item>
			<dropdown-item v-model="value3" :list="list"></dropdown-item>
			<dropdown-item v-model="value4" title="自定义下拉框内容" ref="dropdownItem">
				<view>=====此为测试内容=====</view>
				<view class="btn" @click="choose">选择‘item3’</view>
				<view class="btn" @click="close">关闭</view>
			</dropdown-item>
		</dropdown-menu>
		<view>输出：{{value2}}</view>
		<view>输出：{{value3}}</view>
		<view>输出：{{value4}}</view>
	</view>
</template>

<script>
	import DropdownMenu from '@/components/dropdown-select/dropdown-menu.vue'
	import DropdownItem from '@/components/dropdown-select/dropdown-item.vue'
	export default {
		components: {
			DropdownMenu,
			DropdownItem
		},
		props: {
		},
		data() {
			return {
				list: [
					{
						text: 'item1',
						value: 0
					},
					{
						text: 'item2',
						value: 1
					},
					{
						text: 'item3',
						value: 2
					}
				],
				value2: 0,
				value3: 1,
				value4: 0
			}
		},
		watch: {
		},
		mounted() {
		},
		methods: {
			choose() {
				this.$refs.dropdownItem.choose({value: 'item3'})
			},
			close() {
				this.$refs.dropdownItem.closePopup()
			}
		}
	}
</script>

<style lang="scss">
	.btn {
		background: $uni-color-primary;
		background: #007aff;
		color: #fff;
		padding: 20rpx;
		display: inline-block;
		border-radius: 10rpx;
	}
</style>
