<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-flex uni-column">
				<view class="flex-item flex-item-V uni-bg-red">
					<h1 class="text-center text-yellow">小纸条匹配</h1>
					<span class="text-center">发现身边的有趣灵魂</span>
					<uni-button class="cu-btn round bg-yellow">开始匹配</uni-button>
				</view>
				<view class="flex-item flex-item-V uni-bg-green">
					<h1 class="text-center text-black">语音匹配</h1>
					<span class="text-center">语音聊天开启默契生活</span>
				</view>
				<view class="flex-item flex-item-V uni-bg-blue">
					<h1 class="text-center text-white">每日缘分</h1>
					<span class="text-center">选择和你有相同答案的Ta</span>
					<uni-button class="cu-btn round bg-black text-yellow">开始匹配</uni-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.flex-item {
		width: 80%;
		margin: auto;
		height: 300rpx;
		margin-top: 50rpx;
		border-radius: 10rpx;
		background-color: Green;
	}

	.text-center {
		display: block;
		padding-top: 20rpx;
		font-family: "Microsoft Yahei";
	}

	.cu-btn {
		transform: translate(105px, 15px);
	}
</style>
