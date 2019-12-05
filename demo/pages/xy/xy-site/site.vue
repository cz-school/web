<template>
	<view class="site">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" :url="previousPage.path?'/'+previousPage.path+'?id='+previousPage.win_id:'/pages/self/self'">
			<block slot="backText">返回</block>
			<block slot="content">收货地址</block>
		</cu-custom>
		<view class="box">
			<view class="site-shopSite" v-for="(item,index) in siteAll" :key='index'>
				<view class="site-shopSite-top"  @tap="change" :data-id='item.id'>
					<span class="site-name">{{item.users_name}}</span>
					<span class="site-phone">{{item.users_mobile}}</span>
					<span class="site-default" v-if="item.sdefault == 1">默认</span>
				</view>
				<view class="site-shopSite-bottom">
					<span>{{item.dormitory}}{{item.dormitory_no}}</span>
					<view class="site-alertImage"  @click="alterSite(item.id)">
						<image src="../../../static/xy-site/chuangzuo.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	
		<view class="site-bootom">
			<view class="site-box">
				<view class="site-addSite" @click="addSite">
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
				siteAll: []
			}
		},
		methods: {
			siteAllShow() {
				// const that = this
				let id = uni.getStorageSync('user_id')
				// console.log(id)
				// 获取数据
				// console.log(1)
				uni.request({
					// 接口
					url: 'http://gs.itsse.cn:9999/api/v1/siteAll',
					// 请求方式
					method: 'GET',
					// 携带的数据
					data: {id:id},
					// 请求成功
					success: res => {
						// console.log(res)
						this.siteAll = res.data.data
						console.log(this.siteAll)
						for(var i = 0;i<this.siteAll.length;i++) {
							if(this.siteAll[i].sdefault == 1) {
								let aa = this.siteAll[i]
								this.siteAll.splice(i,1);
								this.siteAll.unshift(aa)
							}
						}
						// console.log(this.siteAll)
						
					},
					// 请求失败
					fail: () => {},
					complete: () => {}
				})
				console.log(this.siteAll)
			},
			alterSite(id) {
				console.log(1)
				console.log(id)
				uni.navigateTo({
					url:'../xy-alertSite/xy-alertSite/xy-alertSite',
					success:res =>{},
					fail:()=>{},
					complete:()=>{}
				})
				uni.setStorage({
				    key: 'id',
				    data: id,
				    success: function () {
				        // console.log('success');
				    }
				});
			},
			addSite() {
				uni.navigateTo({
					url:'../xy-addSite/addSite/addSite',
					success:res =>{},
					fail:()=>{},
					complete:()=>{}
				})
			},
		    // 更换地址
			change(e){
		    	// 点击地址的id
		    	let id = e.currentTarget.dataset.id
		    	uni.navigateTo({
		    		url:`../xy-alertSite/xy-alertSite/xy-alertSite?id=${id}&path=${this.previousPage.path}`,
		    		success:res =>{},
		    		fail:()=>{},
		    		complete:()=>{}
		    	})
		    }
		},
		components: {
			cuCustom
		},
		created() {
			this.siteAllShow()
		},
		onLoad(e) {
			this.siteAllShow()
			this.previousPage = e
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
		/* height: 90upx; */
		margin-top: 20upx;
		background-color: white;
		padding: 10upx;
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
