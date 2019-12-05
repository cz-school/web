<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white" :url="'/pages/meituan/index'">
				<block slot="backText">返回</block>
				<block slot="content">{{win_name}}</block>
			</cu-custom>
		</view>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in 4" :key="index">
				<image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="VerticalBox">
			<!-- 左边对应的导航栏 -->
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in classify" :key="index" @tap="TabSelect"
				 :data-id="index">
					Tab-{{item}}
				</view>
			</scroll-view>
			<!-- 右遍的具体栏目 -->
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<!-- 遍历循环的数据 -->
				<view class="padding-top padding-lr" v-for="(item,index) in menu[tabCur]" :key="index" :id="'main-'+index">
					<!-- 对应的标题 -->
					<view class="cu-bar solid-bottom bg-white" v-if="index == 0">
						<view class="action">
							<text class="cuIcon-title text-green"></text> Tab-{{item.classify_name}}</view>
					</view>
					<view class="cu-list menu-avatar">
						<!-- 对应的推选模块 -->
						<view class="cu-item" @click="lookmenu(item.menu_id)">
							<view class="cu-avatar round lg" :style="'background-image:url('+item.menu_img+');'">
								<view class="cu-tag badge" v-if="item.menu_recommend == '1'">推荐</view>
							</view>
							<view class="content">
								<view class="text-grey">
									<text class="text-cut">{{item.menu_name}}</text>
									<view class="cu-tag round bg-orange sm">{{item.menu_unit}}</view>
									<view class="cu-tag round bg-orange sm" style="margin: 0px 0px 0px auto;" @tap.stop="addcare" v-bind:id="item.menu_id">+
									</view>
								</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										{{item.menu_describe}}
									</text>
								</view>
							</view>
						</view>

					</view>
				</view>
			</scroll-view>
			<!-- 右遍栏目结束 -->
		</view>
		<!-- 底部购物车栏目 -->
		<view class="cu-bar bg-white tabbar border shop">
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
				win_id: 0,
				list: [],
				classify: [],
				menu: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				user_id: 0,
				stusersid: 0,
				// 购物车中的数量
				care_num: 0,
				// 窗口名称
				win_name: ""
			};
		},
		onLoad(option) {
			this.win_id = option.id;
			console.log(this.win_id);
			// 获取到用户id
			let id = uni.getStorageSync('user_id')
			this.user_id = id

		},
		onReady() {
			uni.hideLoading()
		},

		methods: {
			// 获取到商铺用户id
			getStusersId() {
				// 获取到窗口id
				// let id = uni.getStorageSync('winid')
				// this.win_id = id.win_id
				uni.request({
					url: `${this.host}/stusers_id`,
					data: {
						win_id: this.win_id
					},
					success: (data) => {
						this.stusersid = data.data.data[0].stuser_id
					}
				})
			},
			// 添加到购物车
			addcare(e) {
				// console.log(this.user_id)
				// console.log(this.stusersid);
				// console.log(e.target.id);
				uni.request({
					url: `${this.host}/add_care`,
					method: 'post',
					data: {
						user_id: this.user_id,
						menu_id: e.target.id,
						stusersid: this.stusersid
					},
					success: () => {
						this.getcare();
					}
				})
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},

			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			},
			// 获取到分类
			getClassify() {
				uni.request({
					url: `${this.host}/classify_list_st/${this.win_id}`,
					success: (data) => {
						this.menu = data.data.data.menu;
						this.classify = data.data.data.classify;
					}
				})
			},
			// 点击产看菜品
			lookmenu(id) {
				uni.setStorage({
					key: 'winid',
					data: {
						win_id: this.win_id
					},
				});
				uni.reLaunch({
					url: `/pages/meituan/menu?id=${id}`
				});
			},
			// 获取到购物车中的数据数量
			getcare() {
				console.log(this.user_id);
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
				uni.reLaunch({
					url: `/pages/meituan/myCart?win_id=${this.win_id}&path=${CurrentPages[0].route}`
				});
			},
			// 获取到对应的标题
			getwin() {
				console.log(this.win_id);
				uni.request({
					url: `${this.host}/stusers_id`,
					data: {
						win_id: this.win_id
					},
					success: (res) => {
						console.log(res);
						this.win_name = res.data.data[0].win_name
					}
				})
			}
		},
		onShow() {
			this.getStusersId();
			this.getClassify();
			this.getcare();
			// this.getwin();
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}

	.content {
		width: 330upx !important;
	}
</style>
