<template>
	<view>
		<dropdown-select v-model="value" :list="list"></dropdown-select>
	</view>
</template>

<script>
	import DropdownSelect from '@/components/dropdown-select/dropdown-select.vue'
	export default {
		components: {
			DropdownSelect
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
				value: 0
			}
		},
		watch: {
		},
		mounted() {
		},
		methods: {
		}
	}
</script>

<style lang="scss">
</style>
