<template>
	<view class="dropdown-item">
		<!-- selected -->
		<view class="selected" 
			  @click="changePopup">
			<view class="selected__name">{{selectItem.text}}</view>
			<view class="selected__icon"
				  :class="showClass === 'show'? 'up' : 'down'"
			>
				<text class="ms-iconfont">&#xe851;</text>
			</view>
		</view>
		<view class="list-block">
			<!-- dropdown -->
			<view :class="['list', showClass]"
				  v-if="showList"
			>
				<view class="list__item"
					  v-for="(item, index) in list"
					  :key="index"
					   @click="choose(item)">
					<view>{{item.text}}</view>
					<icon v-if="item.value === value" type="success_no_circle" size="26"/>	
				</view>
			</view>	
			<!-- dropdown-mask -->
			<view :class="['dropdown-mask', showClass]" v-if="showList" @click="closePopup"></view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: {
			value: {
				type: Number
			},
			list: {
				type: Array
			}
		},
		data() {
			return {
				showList: "",
				showClass: '',
				selectItem: {}
			}
		},
		watch: {
		},
		mounted() {
			this.showList = this.active;
			this.selectItem = this.list[this.value]
		},
		methods: {
			choose(item) {
				this.selectItem = item
				this.$emit('input', item.value)
				this.closePopup()
			},
			changePopup() {
				if(this.showList) {
					this.closePopup()
				} else {
					this.openPopup()
				}
			},
			openPopup() {
				// this.$parent  -> dropdown-menu
				this.$parent.$emit('close')
				this.showList = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.showClass = 'show'
					}, 30)
				})
			},
			closePopup() {
				this.showClass = ''
				this.$nextTick(() => {
					setTimeout(() => {
						this.showList = false
					}, 300)
				})
			},
			close() {
				this.showClass = ''
				this.showList = false
			}
		}
	}
</script>

<style lang="scss">
	.dropdown-item {
		// flex:1
	}
	.selected {
		position: relative;
		z-index: 9;
		display: flex;
		align-items: center;
		background: #fff;
		padding: 34rpx 30rpx;
		box-sizing: border-box;
		justify-content: center;
		.selected__name {
			font-size: 32rpx;
		}
		.selected__icon {
			margin-left: 20rpx;
			&.down {
				transition: transform .3s;
				transform: rotateZ(0);
			}
			&.up {
				transition: transform .3s;
				transform: rotateZ(-180deg);
			}
		}
	}
	.dropdown {
		height: calc(100% - 70rpx);
	}
	.list-block {
		position: fixed;
		left: 0;
		right: 0;
		overflow: hidden;
		top: 530rpx;
		bottom: 0;
	}
	.list {
		max-height: 400px;
		// overflow: scroll;
		overflow-y: auto;
		position: absolute;
		left: 0;
		right: 0;
		z-index: 3;
		background: #fff;
		transform: translateY(-100%);
		transition: all .3s;
		&.show {
			transform: translateY(0);
		}
		.list__item {
			font-size:32rpx;
			padding: 26rpx 28rpx;
			display: flex;
			justify-content: space-between;
			.list__item-name {
			}
			.list__item-no {
				color: #666666;
				margin-left: 30rpx;
			}
			&:not(:last-child) {
				border-bottom: 1rpx solid #DDDDDD;
			}
			.list__item-icon {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	.dropdown-mask {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		transition: all .3s;
		z-index: 2;
		&.show {
			background:rgba(0,0,0,0.5);
		}
	}
</style>
