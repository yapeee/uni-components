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
		methods: {
			closeDropdown() {
				// console.log(this.$children)
				this.childrenRef.forEach(item => {
					// console.log(this.$refs[item])
					this.$refs[item].close();
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
