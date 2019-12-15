<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@font-face {
	  font-family: 'ms-iconfont';  /* project id 1564327 */
	  src: url('//at.alicdn.com/t/font_1564327_fcszez4n5i.eot');
	  src: url('//at.alicdn.com/t/font_1564327_fcszez4n5i.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1564327_fcszez4n5i.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1564327_fcszez4n5i.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1564327_fcszez4n5i.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1564327_fcszez4n5i.svg#iconfont') format('svg');
	}
	.ms-iconfont {
	  font-family:"ms-iconfont" !important;
	  font-size: 28rpx;
	  font-style:normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	page {
		background: #f8f8f8;
	}
	view {
		font-size: 32rpx;
	}
</style>
