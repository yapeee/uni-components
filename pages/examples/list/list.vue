<template>
	<view class="doc-list-page">
		<!-- search -->
		<view class="search">
			<view class="search-block">
				<image class="search-icon" src="/static/reg/search.svg" />
				<input class="search-input" placeholder="搜索医生" @input="searchInput" />
			</view>
		</view>
		<view class="content">
			<scroll-view class="scroll-view" scroll-y="true" :scroll-into-view="toView">
				<!-- doc-list -->
				<view class="doc-block" v-if="docList.length">
					<view class="doc-block-title">全部专家</view>
					<view class="doc-list">
						<view v-for="(itemlist, key) in docList" :key="key" :id="'letter-' + itemlist.key">
							<view class="doc-list-key">{{ itemlist.key }}</view>
							<view class="doc-item" v-for="(item, doctID) in itemlist.list" @click="showDetail(item)">
								{{ item.name }}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- A-Z字母索引 -->
			<view class="letter-list" id="letter-list" data-id="selector" @touchstart="handlerAlphaTap" @touchmove="handlerMove" @touchend="endMove">
				<view class="letter-item" 
					:class="[{ active: alpha === item }, { active2: showBubble }, 'letter-item-' + item]" 
					v-for="item in letterList" 
					:key="item" 
					@click="chooseIndex(item)"
					:data-key="item"
					:data-ap="item"
					>
					{{ item }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var timeout;
export default {
	components: {
	},
	data() {
		return {
			docList: [],
			dataList: [],
			letterList: [], // 字母索引数组
			toView: 'letter-Find',
			alpha: '', // 字母导航条
			showBubble: false,
			apHeight: '',
			offsetTop: ''
		};
	},
	onLoad: function(options) {
		// 获取专家排班
		this.getDocData();
	},
	methods: {
		/**
		 * 获取医生列表
		 */
		getDocData() {
			let data = [
				{
					name: '张三',
					pingyinFirstChar: 'Z'
				},
				{
					name: '李四',
					pingyinFirstChar: 'L'
				},
				{
					name: '李四',
					pingyinFirstChar: 'L'
				},
				{
					name: '李四',
					pingyinFirstChar: 'L'
				},
				{
					name: '李四',
					pingyinFirstChar: 'L'
				},
				{
					name: '李四',
					pingyinFirstChar: 'L'
				},
				{
					name: '王五',
					pingyinFirstChar: 'W'
				},
				{
					name: '王五',
					pingyinFirstChar: 'W'
				},
				{
					name: '王五',
					pingyinFirstChar: 'W'
				},
				{
					name: '王五',
					pingyinFirstChar: 'W'
				},
				{
					name: '王五',
					pingyinFirstChar: 'W'
				},
				{
					name: '一二三',
					pingyinFirstChar: 'Y'
				}
			]
			// 按字母排序
			this.dataList = data;
			this.docList = this.sortList(data);
		},
		/**
		 * 搜索医生
		 */
		searchInput(e) {
			let value = e.detail.value;
			this.debounce(() => {
				let list = this.filterData(this.dataList, value);
				this.docList = this.sortList(list);
			}, 1000);
		},
		/**
		 * 筛选数据
		 */
		filterData(list, keys) {
			let sels = [];
			if (keys === '') {
				return list;
			}
			keys = keys.toUpperCase();
			list.forEach(item => {
				if (item.doctName.indexOf(keys) > -1) {
					sels.push(item);
				}
			});
			return sels;
		},
		// 防抖
		debounce(fn, wait) {
			return (function() {
				if (timeout !== null) clearTimeout(timeout);
				timeout = setTimeout(fn, wait);
			})();
		},
		/**
		 * 选择字母索引
		 */
		chooseIndex(key) {
			this.toView = 'letter-' + key;
		},
		/**
		 * 列表按字母排序
		 */
		sortList(list) {
			// 科室排序
			let map = {};
			let array = [],
				letterList = [],
				keyArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
			list.forEach(item => {
				let key = item.pingyinFirstChar;
				if (keyArray.indexOf(key) === -1) {
					//其他符号
					key = '#';
				}
				if (!map[key]) {
					map[key] = [];
				}
				map[key].push(item);
			});
			for (let i = 0; i < keyArray.length; i++) {
				if (map[keyArray[i]]) {
					array.push({
						key: keyArray[i],
						list: map[keyArray[i]]
					});
					letterList.push(keyArray[i]);
				}
			}
			this.letterList = letterList;
			// 获取导航条位置
			setTimeout(()=>{
				this.getPosition();
			}, 100)
			return array;
		},
		/**
		 * 导航条
		 */
		getPosition() {
			// 获取字母导航条位置
			uni.createSelectorQuery()
				.select('#letter-list')
				.boundingClientRect()
				.exec(res => {
					let el = res[0];
					this.apHeight = el.height / this.letterList.length;
					this.offsetTop = el.top;
					// arrTouchBarPosition = res[0];  // 需要预先定义arrTouchBarPosition
				});

			this.timestamp = new Date().getTime();
		},
		handlerAlphaTap(e) {
			this.alpha = e.target.targetDataset.ap;
			this.toView = 'letter-' + this.alpha;
		},
		handlerMove(e) {
			// 节流，需要预先定义timestamp
			let now = new Date().getTime();
			if (now - this.timestamp < 50) {
				return;
			}

			this.timestamp = now;

			// 无意触发
			if (e.touches.length > 1) {
				return;
			}
			let list = this.letterList;
			let moveY = e.touches[0].clientY;
			let rY = moveY - this.offsetTop;
			if (rY >= 0) {
				let index = Math.ceil((rY - this.apHeight) / this.apHeight);
				if (0 <= index < list.length) {
					let nonwAp = list[index];
					nonwAp && (this.alpha = nonwAp);
					// 页面滚动
					this.toView = 'letter-' + nonwAp;
					this.showBubble = true;
				}
			}
		},
		endMove() {
			this.alpha = '';
			this.showBubble = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.doc-list-page {
	// height: 100%;
	height: 100vh;
}
.doc-list-page .content {
	height: calc(100% - 196rpx);
	position: relative;
}
.doc-list-page .content .scroll-view {
	height: 100%;
}
/* .doc-list-page .doc-block {
  height: calc(100% - 190rpx);
  position: relative;
}
.doc-list-page .doc-block .doc-list {
  height: calc(100% - 110rpx);
} */
.search {
	padding: 20rpx 30rpx;
	background: #fff;
	border-bottom: 1px solid #eeeeee;
}
.search .search-block {
	background: #f5f5f5;
	border-radius: 8rpx;
	padding: 12rpx 20rpx;
	display: flex;
	align-items: center;
}
.search .search-icon {
	width: 36rpx;
	height: 32rpx;
	margin-right: 20rpx;
}
.search .search-input {
	flex: 1;
}
.hist-block .l-flex {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx 0 30rpx;
}
.hist-block .hist-title {
	color: #666666;
	/* padding: 20rpx 0 0 30rpx; */
}
.hist-block .hist-delete {
	width: 30rpx;
	height: 30rpx;
}
.hist-block .hist-list {
	padding: 20rpx 0 0 20rpx;
	overflow: scroll;
	white-space: nowrap;
}
.hist-block .hist-list .hist-item {
	margin-right: 20rpx;
	background: #ffffff;
	border-radius: 8rpx;
	padding: 18rpx 28rpx;
	display: inline-block;
}

.doc-block .doc-block-title {
	padding: 30rpx;
	color: #111111;
	font-size: 32rpx;
	font-weight: 600;
}
.doc-list .doc-item {
	margin: 0 30rpx 20rpx 30rpx;
	padding: 30rpx 24rpx;
	background: #fff;
	border-radius: 16rpx;
	box-shadow: 0px 4rpx 24rpx 0px rgba(136, 136, 136, 0.14);
	position: relative;
}
.doc-list .doc-item .l-flex {
	display: flex;
	align-items: center;
}
.doc-list .doc-img-block {
	position: relative;
	width: 100rpx;
	min-width: 100rpx;
	height: 100rpx;
	margin-right: 20rpx;
}
.doc-list .doc-img-block .doc-img-tips {
	position: absolute;
	left: 0;
	right: 0;
	/* bottom: 0; */
	bottom: -12rpx;
	height: 28rpx;
	line-height: 28rpx;
	background: linear-gradient(45deg, #f7624f, #ff9d32);
	border-radius: 6rpx;
	color: #ffffff;
	font-size: 20rpx;
	text-align: center;
}
.doc-list .doc-item .item-image {
	width: 100rpx;
	min-width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	/* margin-right: 20rpx; */
}
.doc-list .doc-item .item-name {
	color: #333333;
	font-size: 32rpx;
	font-weight: 600;
	padding-right: 16rpx;
}
.doc-list .doc-item .item-dept {
	padding-top: 8rpx;
}
.doc-list .doc-item .item-more {
	color: #666666;
	margin-top: 24rpx;

	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-all;
	-webkit-line-clamp: 2;
	display: -webkit-box;
	-webkit-box-orient: vertical;
}
.doc-list .doc-item .item-tips {
	font-size: 24rpx;
	color: #fff;
	background: #0081d5;
	border-radius: 0px 16rpx 0px 16rpx;
	width: 104rpx;
	height: 38rpx;
	line-height: 38rpx;
	text-align: center;
	position: absolute;
	right: 0;
	top: 0;
}
.doc-list .doc-item .item-tips.item-tips--full {
	background: #dddddd;
	color: #888888;
}
.doc-block .doc-list .doc-list-key {
	padding: 0 30rpx;
	/* color: #888888; */
	font-weight: 600;
	margin-top: -20rpx;
}
/* 字母索引 */
.content .letter-list {
	position: absolute;
	top: 50%;
	/* right: 2rpx; */
	right: 0;
	padding: 0 8rpx 0 16rpx;
	transform: translateY(-50%);
	text-align: center;
	color: #0081d5;
	font-size: 24rpx;
	font-weight: 600;
}

.letter-list .letter-item {
	position: relative;
	width: 36rpx;
	height: 36rpx;
	line-height: 36rpx;
}
/*选中样式*/
.letter-list .letter-item.active {
	background: #0081d5;
	color: #fff;
	border-radius: 50%;
}
$letterList: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X ,Y, Z;
@each $name in $letterList {
	.letter-item-#{$name}.active.active2::before {
		content: "" + $name;
		position: absolute;
		top: -10rpx;
		right: 60rpx;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background: #dddddd;
		
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 60rpx;
		text-align: center;
	}
}
.letter-list .letter-item.active.active2::before {
	// content: attr(data-key);
	// position: absolute;
	// top: -10rpx;
	/* transform: translateY(-50%); */
	// right: 60rpx;
	// width: 60rpx;
	// height: 60rpx;
	// border-radius: 50%;
	// background: #dddddd;

	// color: #fff;
	// font-size: 36rpx;
	// font-weight: bold;
	// line-height: 60rpx;
	// text-align: center;
}
.letter-list .letter-item.active.active2::after {
	content: '';
	width: 0;
	height: 0;
	border-top: 30rpx solid transparent;
	border-bottom: 30rpx solid transparent;
	border-left: 30rpx solid #dddddd;
	position: absolute;
	top: -10rpx;
	right: 50rpx;
}
/* 自定义筛选框  */
.dropdown-block {
}
.dropdown-block .block {
	border-bottom: 1px solid #eeeeee;
	padding: 20rpx 30rpx 0 30rpx;
}
.dropdown-block .dropdown-list {
	display: flex;
	align-items: center;
	/* justify-content: space-between; */
	padding: 30rpx 0;
}
.dropdown-block .dropdown-list .dropdown-item {
	// width: 164rpx;
	min-width: 164rpx;
	padding: 0 10rpx;
	display: inline-block;
	height: 68rpx;
	line-height: 68rpx;
	background: #f5f5f5;
	border: 1px solid #f5f5f5;
	border-radius: 8rpx;
	text-align: center;
}
.dropdown-block .dropdown-list .dropdown-item.dropdown-item--active {
	border: 1px solid #0081d5;
	background: #e5f2fa;
	color: #0081d5;
}
.dropdown-block .dropdown-list .dropdown-item:not(:last-child) {
	margin-right: 12rpx;
}
.dropdown-block .dropdown-btn {
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	color: #fff;
	text-align: center;
	background: #0081d5;
}
</style>
