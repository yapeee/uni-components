<template>
	<view class="dropdown-menu">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		mounted() {
			this.$on('close', this.closeDropdown)
		},
		methods: {
			closeDropdown() {
				this.$slots.default.forEach(item => {
					// item为Vnode， componentInstance为 /*当前节点对应的组件的实例*/
					item.componentInstance.close();
				})
			}
		}
	}
</script>

<style lang="scss">
	.dropdown-menu {
		display: flex;
	}
</style>
