<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage(url)" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :class="(isBold === true) ? 'bold' : ''" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			isBold: {
				type: Boolean,
				default: true
			},
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			url: {
				type: String,
				default: ''
			}
		},
		methods: {
			BackPage(url) {	
				uni.reLaunch({
					url: url
				})
			}
		}
	}
</script>

<style>
	.bold {
		/*  #ifdef  APP-PLUS || MP-WEIXIN  */
		font-size: 46rpx !important;
		/* #endif */
		/* #ifdef H5 */
		font-size: 40rpx;
		/* #endif */
		font-weight: bold;
	}
</style>
