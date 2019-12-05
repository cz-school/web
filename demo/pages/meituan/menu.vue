<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-shadeTop text-white" :url="'/pages/meituan/win?id='+win_id">
			<block slot="backText">返回</block>
			<block slot="content">{{list.menu_name}}</block>
		</cu-custom>
		<view class="menu">
			<!-- 对应菜品的图片 -->
			<view class="menu_img">
				<image :src="list.menu_img" mode="" style="width: 100%; height: 100%;"></image>
			</view>
			<!-- 对应菜品的详情 -->
			<view class="details">
				<view class="deta_title">
					<view class="menu_commend  bg-orange sm" v-if="list.recommend==1">推荐</view>
					<view class=" menu_name">
						{{list.menu_name}}
					</view>
				</view>
				<!-- 介绍 -->
				<view class="menu_describe">
					{{list.menu_describe}}
				</view>
				<!-- 价格模块 -->
				<view class="menu_price">
					<view class="price">
						${{list.menu_unit}}
					</view>
					<view class="care" @click="buycare">
						+ 立即购买
					</view>
				</view>
			</view>
		</view>
		<!-- 底部购物车栏目 -->
		<view class="cu-bar bg-white tabbar border shop shopcare">
			<view class="action" style="margin: 0 auto;" @click="clickcare">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">{{care_num}}</view>
				</view>
				购物车
			</view>

		</view>
	</view>

</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		components: {
			cuCustom
		},
		data() {
			return {
				host: "http://gs.itsse.cn:9999/api/v1",
				// host: "http://127.0.0.1:9999/api/v1",
				menu_id: 0,
				list: [],
				win_id: 0,
				user_id: 0,
				stusersid: 0,
				care_num: 0
			};
		},
		onLoad(option) {
			this.menu_id = option.id;
			let that = this;
			// 获取到用户id
			uni.getStorage({
				key: 'user_id',
				success: function(res) {
					that.user_id = res.data;
				}
			});

			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			// 获取的到菜品
			getmenu() {
				uni.request({
					url: `${this.host}/list_st/${this.menu_id}`,
					data: "",
					success: (data) => {
						this.list = data.data.data[0];
					}
				})
			},
			// 获取到商铺用户id
			getStusersId() {
				// 获取到窗口id
				let id = uni.getStorageSync('winid')
				this.win_id = id.win_id
				// console.log(this.win_id)
				uni.request({
					url: `${this.host}/stusers_id`,
					data: {
						win_id: this.win_id
					},
					success: (data) => {
						console.log(data.data)
						this.stusersid = data.data.data[0].stuser_id
					}
				})
			},
			// 点击购买添加到购物车
			buycare() {
				this.getStusersId()
				// console.log(this.stusersid);
				// console.log(this.menu_id);
				// console.log(this.user_id);
				uni.request({
					url: `${this.host}/add_care`,
					method: 'post',
					data: {
						user_id: this.user_id,
						menu_id: this.menu_id,
						stusersid: this.stusersid
					},
					success: () => {
						this.getcare();
					}
				})

			},
			// 获取到购物车中的数据数量
			getcare() {
				uni.request({
					url: `${this.host}/care_st`,
					data: {
						user_id: this.user_id
					},
					success: (res) => {
						this.care_num = res.data.data[0].care_num
					}
				})
			},
			// 点击购物车进行跳转
			clickcare() {
				let CurrentPages = getCurrentPages()
				// console.log(`${CurrentPages[0].route}`);
				uni.reLaunch({
					url: `/pages/meituan/myCart?win_id=${this.win_id}&path=${CurrentPages[0].route}`
				});
			}
		},
		onShow() {
			this.getmenu();
			this.getStusersId();
			this.getcare();
		}
	}
</script>

<style>
	.menu {
		width: 100%;
		height: 100%;
	}

	.menu_img {
		width: 100%;
		height: 400upx;
		background-color: red;
	}

	.details {
		width: 100%;
		height: 260upx;
		padding: 20upx;
		background-color: white;
	}

	.details>view {
		margin: 10upx 0upx;
	}

	.deta_title {
		overflow: hidden;
	}

	.deta_title>view {
		float: left;
		margin-right: 10upx;
		text-align: center;
	}

	.deta_title>.menu_commend {
		width: 70upx;
		height: 40upx;
		line-height: 40upx;
		margin: 10upx 0upx;
		margin-right: 30upx;
		box-sizing: border-box;
	}

	.deta_title>.menu_name {
		font-size: 36upx;
		font-weight: 900;
	}

	/* 菜品的介绍 */
	.menu_describe {
		font-size: 20upx;
		color: #9e9e9e;
		width: 100%;
		/* 超出一行文字自动隐藏 */
		overflow: hidden;
		/* 文字隐藏后添加省略号 */
		text-overflow: ellipsis;
		/* //强制不换行 */
		white-space: nowrap;
	}

	.menu_price {
		width: 100%;
		height: 70upx;
		font-size: 40upx;
		line-height: 70upx;
		overflow: hidden;
	}

	.menu_price>view {
		float: left;
		height: 100%;
		font-size: 40upx;
		line-height: 70upx;
	}

	.price {
		color: red;
	}

	.care {
		padding: 0upx 20upx;
		font-size: 30upx !important;
		float: right !important;
		border-radius: 30upx;
		background-color: orange;
	}

	.shopcare {
		margin-top: 540upx;
	}
</style>
