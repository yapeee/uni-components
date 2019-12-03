<template>
	<view class="tabBlock">
		<scroll-view scroll-x="true" :scroll-left="scrollLeft">
			<view :class="['tabs', {'tabs--scrollable': scrollable}]" id="tab_list">
				<view v-for="(item, index) in type"
					  :key="index"
					  :class="['tab__item', {'tab__item--active' : currentIndex === index}]"
					  :style="{color: (currentIndex === index ? `${itemColor}`: '')}"
					  :id="`tab_${index}`"
					  @click="select(item, index)"
				>{{item.title}}</view>
			</view>
			<view class="tab__line" 
				  :style="{background: lineColor, width: lineStyle.width, transform: lineStyle.transform,transitionDuration: lineStyle.transitionDuration}"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			value: [Number, String],
			type: { // 传值
				type: Array,
				default: ()=> {
					return []
				}
			},
			itemColor: { // 主色调
				type: String,
				default: '#01cfc5'
			},
			lineColor: { // 主色调
				type: String,
				default: '#01cfc5'
			},
			duration: {
				type: Number,
				default: 0.3
			},
		},
		data() {
			return {
				currentIndex: 0,
				lineStyle: {},
				scrollLeft: 0
			}
		},
		computed: {
			scrollable() {
				return (this.type && this.type.length > 4)
			}
		},
		watch: {
			value() {
				this.currentIndex = this.value
			}
		},
		mounted() {
			this.setLine()
			this.scrollIntoView()
		},
		methods: {
			select(item, index) {
				this.currentIndex = index
				this.setLine()
				this.scrollIntoView()
				this.$emit('input', this.currentIndex)
			},
			setLine() {
				let lineWidth = 0, lineLeft = 0
				this.getElementData(`#tab_${this.currentIndex}`, (data)=> {
					console.log(data);
					let el = data[0]
					lineWidth = el.width / 2
					lineLeft = el.width * (this.currentIndex + 0.5)
					this.lineStyle = {
						width: `${lineWidth * 2}rpx`, // 1px -> 2rpx
						transform: `translateX(${lineLeft * 2}rpx) translateX(-50%)`,
						transitionDuration: `${this.duration}s`
					};
				})
			},
			scrollIntoView() {  // item滚动
				let count = 0;
				let frames = 30;
				let lineLeft = 0;
				let self = this
				
				this.getElementData('#tab_list', (data)=> {
					let list = data[0]
					this.getElementData(`#tab_${this.currentIndex}`, (data)=> {
						let el = data[0]
						lineLeft = el.width * (this.currentIndex + 0.5) - list.width / 2 - this.scrollLeft
						animate();
					})
				})
				
				function animate() {
					self.scrollLeft += lineLeft / frames;
				    if (++count < frames) {
						setTimeout(animate, 10);
					}
				}
			},
			getElementData(el, callback){
				uni.createSelectorQuery().in(this).select(el).boundingClientRect().exec((data) => {
					callback(data);
				}); 
			}
		}
	}
</script>

<style lang="scss">
	.tabBlock {
		position: relative;
	}
	.tabs {
		position: relative;
		display: flex;
		font-size: 28rpx;
		background: #fff;
		color: #969799;
		padding-bottom: 15rpx;
		white-space: nowrap;
		.tab__item {
			flex: 1;
			width: 30%;
			text-align: center;
			line-height: 90rpx;
			&.tab__item--active {
				// color: #01cfc5;
			}
		}
		&--scrollable {
			.tab__item {
				flex: 0 0 22%;
			}
		}
	}
	.tab__line {
		display: block;
		height:6rpx;
		// background:#01cfc5;
		position: absolute;
		bottom: 15rpx;
		left: 0;
		z-index: 1;
		border-radius: 3rpx;
		position: relative;
	}
</style>
