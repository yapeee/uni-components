<template>
	<view>
		<tabs :type="type" v-model="active"></tabs>
		<tabs :type="type2" v-model="active2" itemColor="#03A9F4" lineColor="#03A9F4"></tabs>
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
				active: 0,
				active2: 0
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
