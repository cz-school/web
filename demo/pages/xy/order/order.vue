<template>
	<view class="order">
		<cu-custom bgColor="bg-gradual-white" :isBold="isBold" :isBack="true"><block slot="content">我买到的</block></cu-custom>
	  <view class="order-box">
	  	<view class="order-particulars">
	  		<view class="order-particulars-img"></view>
	  	</view>
	  </view>
	</view>
</template>

<script>
// 导航栏组件
import cuCustom from '@/colorui/components/cu-custom.vue';
export default {
	components: {
		cuCustom
	},
	data() {
		return {
			key: value
		};
	},
	methods: {
		name() {}
	}
};
</script>

<style>
	.order-box{
		position: relative;
	}
	.order-particulars{
		width: 100%;
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
	}
	.order-particulars-img{
		width: 250upx;
		height:250upx ;
		border: 1px solid red;
	}
</style>
