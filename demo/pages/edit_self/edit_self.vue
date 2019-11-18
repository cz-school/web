<template>
	<view class="edit_self">
		<view class="cu-bar bg-white fixed">
			<cu-custom bgColor="bg-gradual-white " :url="'/pages/self/self'" :isBack="true" :isBold="true">
				<block slot="content">编辑个人信息</block>
			</cu-custom>
			<text class="save_info">保存</text>
		</view>
		<view class="photo">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {

		}
	}
</script>


<style>
	.edit_self .save_info {
		color: red;
		font-size: 30rpx;
		margin-right: 20rpx;
	}
</style>
