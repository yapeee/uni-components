<template>
	<view style="height: 667px;">
		<!-- <iframe :src="url" frameborder="0" style="width: 100%;height: 100%;" v-if="url"></iframe> -->
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '展示PDF',
				url: ''
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.name
			})
			this.getUrl()
		},
		methods: {
			getUrl() {
				let url = 'https://mplustest.zhicall.cn/mobilePlus/patientRecord.physical.report.pdf.hsr?recordNo=19111200111&hospitalId=10354'
				// this.url = 'http://172.16.50.41:8085/PDF.js/web/viewer.html?file=' +encodeURIComponent(url + '&.pdf')
				this.url = 'http://mobile.zhicall.cn/PDF/web/viewer.html?file=' +encodeURIComponent(url) + '&.pdf'
				console.log(this.url);
			}
		}
	}
</script>

<style>

</style>
