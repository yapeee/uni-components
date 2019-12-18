<template>
	<view>
		<dropdown-item v-model="value" :list="list"></dropdown-item>
		<dropdown-menu>
			<dropdown-item v-model="value2" :list="list"  @close="closeDropdown"></dropdown-item>
			<dropdown-item v-model="value3" :list="list"  @close="closeDropdown"></dropdown-item>
		</dropdown-menu>
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
				value: 0,
				value2: 0,
				value3: 0
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
