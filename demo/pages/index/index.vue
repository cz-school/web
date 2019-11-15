<template>
	<view class="index">
		<cu-custom bgColor="bg-gradual-white" :isBold="isBold" :isBack="false">
			<block slot="content">传智校园</block>
		</cu-custom>
		<!-- 轮播图 -->
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
		<!-- 九宫格 -->
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				// 轮播图
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}],
				// 加载点样式切换
				dotStyle: true,
				// 图片样式索引
				cardCur: 0,
				// 控制自定义导航栏是否字体加粗
				isBold: true,
			}
		},
		onLoad() {

		},
		components: {
			cuCustom
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			}
		}
	}
</script>

<style>

</style>
