<template>
	<view class="stystem">
		<cu-custom :url="url" bgColor="bg-white" :isBold="false" :isBack="true">
			<block slot="content">系统消息</block>
		</cu-custom>
		<image class="none" src="../../static/info/none.jpg" mode=""></image>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				url: '/pages/info/info',
			}
		},
		components: {
			cuCustom
		},
		methods: {}
	}
</script>

<style>
	uni-page-body, uni-page-refresh{
		height: 100%;
		background: #F6F6F6;
	}
	
	.header {
		text-align: center;
		font-size: 30rpx;
		border-bottom: 1rpx solid rgba(156, 147, 147, 0.45);
	}

	.none {
		width: 100%;
	}
</style>
