<template>
	<view class="site">
		<cu-custom class="site-nav" bgColor="bg-gradual-black" :isBold="isBold" :isBack="true" >
			<block slot="content">收货地址</block>
		</cu-custom>
		<view class="site-shopSite" v-for="(item,index) in site" :key='index' @tap="change" :data-id='item.id'>
			<view class="site-shopSite-top">
				<span class="site-name">{{item.users_name}}</span>
				<span class="site-phone">{{item.users_mobile}}</span>
				<span class="site-default" v-if='item.sdefault == 1'>默认</span>
			</view>
			<view class="site-shopSite-bottom">
				<span>{{item.dormitory}}{{item.dormitory_no}}</span>
				<view class="site-alertImage">
					<image src="../../../static/xy-site/siteAlter.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="site-bootom">
			<view class="site-box">
				<view class="site-addSite">
					+新建收货地址
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				// 控制自定义导航栏是否字体加粗
				isBold: true,
				// 地址
				site:[]
			}
		},
		methods: {
			showsite(){
				// 用户id
				let id = 1;
				uni.request({
					url:'http://gs.itsse.cn:9999/api/v1/changesite/'+id,
					method:'POST',
					success:res =>{
						this.site = res.data.data
					},
					fail:()=>{},
					complete:()=>{}
				})
			},
			// 更换地址
			change(e){
				// 点击地址的id
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url:'../purchase/purchase?id='+id,
					success:res =>{},
					fail:()=>{},
					complete:()=>{}
				})
			}
		},
		
		onLoad() {
			this.showsite()
		},
		components: {
			cuCustom
		}
	}
</script>

<style>
	
.site {
	/* background-color: white; */
	overflow: hidden;
	position: relative;
}
.site-nav {
	background-color: #f8e622;
}
.site-shopSite {
	width: 740ups;
	height: 90upx;
	margin-top: 20upx;
	background-color: white;
	/* border: 1rpx solid #2C405A; */
}
.site-shopSite-top {
	font-weight: 700;
	margin-bottom: 10upx;
}
.site-shopSite-top .site-name {
	font-size: 14px;
	margin-right: 100upx;
}
.site-phone {
	margin-right: 30upx;
}
.site-default {
	font-size: 12px;
	font-weight: 400;
	color: white;
	background-color: red;
}
.site-alertImage {
	
	width: 20px;
	height: 20px;
}
.site-alertImage image {
	width: 100%;
	height: 100%;
}
.site-shopSite-bottom {
	position: relative;
}
.site-shopSite-bottom span{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal ！important;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* 显示1行，为auto时不隐藏 */
	-webkit-box-orient: vertical;
}
.site-shopSite-bottom view {
	position: absolute;
	bottom: 0px;
	right: 0px;
}
.site-bootom {
	height: 100upx;
	width: 100%;
}
.site-box {
	width: 100%;
	height: 100upx;
	background-color: white;
	position: fixed;
	bottom: 0upx;
	/* left: 100upx; */
}
.site-addSite {
	position: absolute;
	left: 100upx;
	top: 20upx;
	width: 550upx;
	height: 60upx;
	background-color: #f01809;
	color: white;
	text-align: center;
	line-height: 60upx;
	border-radius: 30upx;
}
</style>