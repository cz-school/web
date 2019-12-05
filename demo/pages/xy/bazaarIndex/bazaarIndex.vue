<template>
	<view class="bazaarIndex">
		<!-- 头部start -->
		<view class="bazaarIndex-header">
			<!-- 导航栏 -->
			<cu-custom bgColor="bg-gradual-white" :isBold="isBold" :isBack="true" :url="'/pages/index/index'">
				<block slot="content">市场中心</block>
			</cu-custom>

			<view class="bazaarIndex-header-search">
				<!-- 搜索框 -->
				<mSearch :mode="2" button="inside" :show="false" @search="search($event,3)"></mSearch>
				<!-- 搜索的值：{{val3}} -->
				<!-- 分类 -->
				<view class="uni-padding-wrap uni-common-mt">
					<view>
						<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
							<view @tap="activeClick(null)" v-bind:class="{
								active:active === null,
								'scroll-view-item' : true, 
								'uni-bg-red' : true
								} ">
								全部
							</view>
							<view @tap="activeClick(index)" v-for="(item, index) in esclassify" :key="index" :id="item.id" v-bind:class="{ 
								active:active === index,
								'scroll-view-item' : true, 
								'uni-bg-red' : true
								} ">
								{{item.name}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>

		</view>
		<!-- 头部end -->
		<!-- content -->

		<view class="shop-ul">
			<!-- 向下滑动  改变高度  王海龙改-->
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower1" style="height: 900px; ">
				<view class="uni-product-list">
					<view class="uni-product" v-for="(item,index) in shop" :key="index" @tap="dianji(item.shop_id)">
						<view class="image-view">
							<image v-if="renderImage" class="uni-product-image" :src="item.shop_img"></image>
						</view>
						<view class="uni-product-title">{{item.shop_name}}</view>
						<view class="uni-product-price">
							<text class="uni-product-price-favour">{{item.shop_describe}}</text><br>
							<text class="uni-product-price-original">￥{{item.shop_price}}</text>
							<text class="uni-product-tip">{{item.shop_num_new}}成新</text>
						</view>
					</view>
					<view v-if="queryInfo.ishave==true" style="width: 100%; height: 30upx; text-align: center;">
						{{queryInfo.have}}
					</view>
				</view>
			</scroll-view>

		</view>
		<view class="skip">
			<navigator url="/pages/xy/bazaarClass/bazaarClass">
				<svg t="1574043200263" class="icon" viewBox="0 0 1171 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5267"
				 width="20" height="20">
					<path d="M502.237757 1024 644.426501 829.679301 502.237757 788.716444 502.237757 1024 502.237757 1024ZM0 566.713817 403.967637 689.088066 901.485385 266.66003 515.916344 721.68034 947.825442 855.099648 1170.285714 0 0 566.713817 0 566.713817Z"
					 p-id="5268"></path>
				</svg>
			</navigator>
		</view>
		<!-- content -->
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		onLoad() {
			setTimeout(() => {
				this.renderImage = true;
			}, 300);
			uni.request({
				url: 'http://gs.itsse.cn:9999/api/v1/esclassify',
				method: 'GET',
				data: {},
				success: res => {
					this.esclassify = res.data.data[1]
				},
				fail: () => {},
				complete: () => {}
			});
			this.getShop()
		},
		data() {
			return {
				// 分页和收缩
				queryInfo: {
					pagenum: 1,
					pagesize: 10,
					ishave: false,
					have: "抱歉没有商品了"
				},
				// 控制自定义导航栏是否字体加粗
				isBold: true,

				// 搜索的值
				val3: '',
				// 搜所框提示信息
				placeholder: '动态占位内容',

				// 商品分类
				esclassify: [],
				// 滚动参数
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				// 判断分类是否选中
				active: null,

				// 商品数据
				shop: [],
				title: 'product-list',
				productList: [],
				renderImage: false
			}
		},
		methods: {
			// 向下滑动到 底部 王海龙改
			lower1(e) {
				this.queryInfo.pagenum = this.queryInfo.pagenum + 1;
				this.getShop();
			},
			getShop(e) {
				console.log(e);
				uni.request({
					url: `http://gs.itsse.cn:9999/api/v1/shop/${this.active}`,
					method: 'GET',
					data: {
						inputVal: e,
						pagesize: this.queryInfo.pagesize,
						pagenum: this.queryInfo.pagenum
					},
					success: res => {
						if (res.data.data[1].length !== 10 && res.data.data[1].length !== 0) {
							this.shop.push(...res.data.data[1])
						} else if (res.data.data[1].length == 0) {
							return this.queryInfo.ishave = true;
						}
						// console.log(res)
						this.shop.push(...res.data.data[1])
						console.log(this.shop)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			activeClick(index) {
				this.shop = [];
				this.queryInfo.pagenum = 1;
				this.active = index
				this.val3 = "";
				// console.log(this.active)
				// console.log(this.inputVal)
				this.getShop()
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			search(e, val) {
				this['val' + val] = e;
				this.active = null
				console.log(e)
				this.getShop(e)
			},
			// 点击购买
			dianji(shopid) {
				console.log(shopid)
				uni.setStorage({
					key: 'storage_key',
					data: {
						shopid
					},
					success: function() {}
				});
				uni.navigateTo({
					url: '../shopDetail/shopDetail?shopid=' + shopid,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		components: {
			cuCustom,
			mSearch
		},
		onPullDownRefresh() {
			this.loadData('refresh');
			// 实际开发中通常是网络请求，加载完数据后就停止。这里仅做演示，加延迟为了体现出效果。
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		}
	}
</script>

<style>
	.uni-product-price-favour {
		text-decoration: none;
	}

	.uni-bg-red {
		background-color: #fafafa;
		color: #000;
	}

	.uni-padding-wrap {
		padding: 0;
		margin: 0;
		width: auto;
	}

	/* product */
	page {
		background: #F8F8F8;
	}

	view {
		font-size: 28upx;
	}

	.uni-product-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		flex-direction: row;
	}

	.uni-product {
		padding: 20upx;
		display: flex;
		flex-direction: column;
	}

	.image-view {
		height: 330upx;
		width: 330upx;
		margin: 12upx 0;
	}

	.uni-product-image {
		height: 330upx;
		width: 330upx;
	}

	.uni-product-title {
		width: 300upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.uni-product-price span {
		word-break: break-all;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.uni-product-price {
		width: 300upx;
		word-break: break-all;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}

	.uni-product-price-original {
		color: #e80080;
	}

	.uni-product-price-favour {
		color: #888888;
		display: inline-block;
		width: 100%;
		white-space: normal;
		/* text-decoration: line-through; */
		margin-left: 10upx;
	}

	.uni-product-tip {
		position: absolute;
		right: 10upx;
		background-color: #ff3333;
		color: #ffffff;
		padding: 0 10upx;
		border-radius: 5upx;
	}

	.skip svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.skip {

		position: fixed;
		bottom: 160upx;
		right: 100upx;
		width: 40px;
		height: 40px;
		background-color: #f9e522;
		border-radius: 50%;
	}

	.bazaarIndex-header-search {
		background-color: #fafafa;
		padding-bottom: 10upx;
	}

	scroll-view {
		white-space: nowrap;
	}

	.scroll-view-item {
		display: inline-block;
		margin-left: 20upx;
		height: 60upx;
		margin-top: 15upx;
		padding: 10upx 20upx;
		border-radius: 30upx;
	}

	.active {
		background-color: #f8e620;
	}

	.bazaarIndex-header {
		background-color: #f9e522;
	}

	uni-page-body {
		height: 100%;
		background-color: #fff;
	}

	.search .content .content-box .input.center[data-v-3e2b9688] {
		width: 120upx !important;
	}
</style>
