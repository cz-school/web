<template>
	<view class="container">
		<!-- 自定义页头 -->
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" :url="previousPage.path?'/'+previousPage.path+'?id='+previousPage.win_id:'/pages/meituan/index'">
			<block slot="backText">返回</block>
			<block slot="content">购物车</block>
		</cu-custom>
		<!-- 空白页 -->
		<view v-if="!cartList.length >0 || !uid" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="uid" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="image-wrapper">
							<image :src="item.menu_img" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)"
							 @error="onImageError('cartList', index)"></image>
							<view class="yticon icon-xuanzhong2 checkbox" :class="item.menu_check? 'checked':''" @click="check('item', index)"></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.menu_name}}</text>
							<text class="attr text-cut">{{item.menu_describe}}</text>
							<text class="price">¥{{item.menu_price}}</text>
							<uni-number-box class="step" :min="1" :max="200" :value="item.menu_num>200?200:item.menu_num" :isMax="item.menu_num>=200 ?true:false"
							 :isMin="item.menu_num===1" :index="index" @eventChange="numberChange"></uni-number-box>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="allChecked?'/static/meituan/myCart/selected.png':'/static/meituan/myCart/select.png'" mode="aspectFit"
					 @click="check('all')"></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
					<!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{text}}
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false,
				hasLogin: false,
				cartList: [],
				modalName: null,
				text: null,
				previousPage: {},
				uid: null
			};
		},
		onLoad(e) {
			console.log(e)
			this.loadData();
			this.previousPage = e
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		computed: {

		},
		methods: {
			//请求数据
			loadData() {
				let id = uni.getStorageSync('user_id')
				this.uid = id
				uni.request({
					url: `http://gs.itsse.cn:9999/api/v1/myCart_st/${id}`, //仅为示例，并非真实接口地址。
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res.data.data)
						this.cartList = res.data.data;
						if (res.data.data.length != 0) {
							this.calcTotal();
						}
					}
				});
				// this.calcTotal(); //计算总价
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin() {
				uni.navigateTo({
					url: 'pages/login/login'
				})
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					uni.request({
						method: 'put',
						url: `http://gs.itsse.cn:9999/api/v1/myCart_st/${this.cartList[index].id}`, //仅为示例，并非真实接口地址。
						data: {
							ischeck: !(this.cartList[index].menu_check)
						},
						header: {
							// 'custom-header': 'hello' //自定义请求头信息
						},
						success: (res) => {
							if (res.data.ok === 1) {
								this.cartList[index].menu_check = !this.cartList[index].menu_check;
								this.calcTotal();
							} else {
								this.text = res.data.error
								this.modalName = 'Modal'
								this.calcTotal();
							}
						}
					});

				} else {
					const checked = !this.allChecked
					const ids = [];
					const list = this.cartList;
					list.forEach(item => {
						ids.push(item.id)
					})


					uni.request({
						method: 'put',
						url: `http://gs.itsse.cn:9999/api/v1/v1/myCart_s_all`, //仅为示例，并非真实接口地址。
						data: {
							ischeck: checked,
							id: ids
						},
						header: {
							// 'custom-header': 'hello' //自定义请求头信息
						},
						success: (res) => {
							if (res.data.ok === 1) {
								list.forEach(item => {
									item.menu_check = checked
								})
								this.allChecked = checked;
								this.calcTotal(type);
							} else {
								this.text = res.data.error
								this.modalName = 'Modal'
								this.calcTotal();
							}
						}
					});
				}
			},
			//数量
			numberChange(data) {
				if (data.number >= 200) {
					this.text = '每一个商品每次最多购买200件'
					this.modalName = 'Modal'
				}
				uni.request({
					method: 'put',
					url: 'http://gs.itsse.cn:9999/api/v1/myCart_st', //仅为示例，并非真实接口地址。
					data: {
						id: this.cartList[data.index].id,
						menu_num: data.number
					},
					header: {
						// 'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.ok === 1) {
							this.cartList[data.index].menu_num = data.number;
							this.calcTotal();
						} else {
							data.number = this.cartList[data.index].menu_num;
							this.calcTotal();
						}
					}
				});
			},
			//删除
			deleteCartItem(index) {
				uni.showModal({
					content: '您确定,要在购物车删除这份菜吗?',
					success: (e) => {
						if (e.confirm) {
							let list = this.cartList;
							let row = list[index];
							let id = row.id;
							// 发起请求 删除
							uni.request({
								method: 'DELETE',
								url: `http://gs.itsse.cn:9999/api/v1/myCart_st/${id}`, //仅为示例，并非真实接口地址。
								header: {
									// 'custom-header': 'hello' //自定义请求头信息
								},
								success: (res) => {
									if (res.data.ok === 1) {
										this.cartList.splice(index, 1);
										this.calcTotal();
										uni.hideLoading();
									} else {
										this.text = res.data.error
										this.modalName = 'Modal'
									}
								}
							});

						}
					}
				})

			},
			//清空
			clearCart() {
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							let ids = [];
							this.cartList.forEach(item => {
								ids.push(item.id)
							})
							// 发起请求 删除
							uni.request({
								method: 'DELETE',
								url: `http://gs.itsse.cn:9999/api/v1/myCart_st`, //仅为示例，并非真实接口地址。
								data: {
									id: ids
								},
								header: {
									// 'custom-header': 'hello' //自定义请求头信息
								},
								success: (res) => {
									if (res.data.ok === 1) {
										this.cartList = [];
										this.calcTotal();
										uni.hideLoading();
									} else {
										this.text = error
										this.modalName = 'Modal'
									}
								}
							});
						}
					}
				})
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.menu_check === true) {
						total += parseFloat(item.menu_price) * parseFloat(item.menu_num);
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder() {
				let list = this.cartList;
				let goodsData = [];
				list.forEach(item => {
					if (item.menu_check) {
						goodsData.push({
							id: item.menu_id,
							cartid: item.id,
							[item.menu_id]: {
								number: item.menu_num
							}
						})
					}
				})
				let data = JSON.stringify({
					goodsData: goodsData
				})
				// console.log(data)
				uni.setStorageSync('goodsData', data);
				uni.reLaunch({
					url: `/pages/meituan/purchase`
				});
			},
			// 关闭提示信息
			hideModal(e) {
				this.modalName = null
			}
		}
	}
</script>

<style lang='scss'>
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('../../static/meituan/myCart/yticon.ttf') format('truetype');
	}

	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-yiguoqi1:before {
		content: "\e700";
	}

	.icon-iconfontshanchu1:before {
		content: "\e619";
	}

	.icon-iconfontweixin:before {
		content: "\e611";
	}

	.icon-alipay:before {
		content: "\e636";
	}

	.icon-shang:before {
		content: "\e624";
	}

	.icon-shouye:before {
		content: "\e626";
	}

	.icon-shanchu4:before {
		content: "\e622";
	}

	.icon-xiaoxi:before {
		content: "\e618";
	}

	.icon-jiantour-copy:before {
		content: "\e600";
	}

	.icon-fenxiang2:before {
		content: "\e61e";
	}

	.icon-pingjia:before {
		content: "\e67b";
	}

	.icon-daifukuan:before {
		content: "\e68f";
	}

	.icon-pinglun-copy:before {
		content: "\e612";
	}

	.icon-dianhua-copy:before {
		content: "\e621";
	}

	.icon-shoucang:before {
		content: "\e645";
	}

	.icon-xuanzhong2:before {
		content: "\e62f";
	}

	.icon-gouwuche_:before {
		content: "\e630";
	}

	.icon-icon-test:before {
		content: "\e60c";
	}

	.icon-icon-test1:before {
		content: "\e632";
	}

	.icon-bianji:before {
		content: "\e646";
	}

	.icon-jiazailoading-A:before {
		content: "\e8fc";
	}

	.icon-zuoshang:before {
		content: "\e613";
	}

	.icon-jia2:before {
		content: "\e60a";
	}

	.icon-huifu:before {
		content: "\e68b";
	}

	.icon-sousuo:before {
		content: "\e7ce";
	}

	.icon-arrow-fine-up:before {
		content: "\e601";
	}

	.icon-hot:before {
		content: "\e60e";
	}

	.icon-lishijilu:before {
		content: "\e6b9";
	}

	.icon-zhengxinchaxun-zhifubaoceping-:before {
		content: "\e616";
	}

	.icon-naozhong:before {
		content: "\e64a";
	}

	.icon-xiatubiao--copy:before {
		content: "\e608";
	}

	.icon-shoucang_xuanzhongzhuangtai:before {
		content: "\e6a9";
	}

	.icon-jia1:before {
		content: "\e61c";
	}

	.icon-bangzhu1:before {
		content: "\e63d";
	}

	.icon-arrow-left-bottom:before {
		content: "\e602";
	}

	.icon-arrow-right-bottom:before {
		content: "\e603";
	}

	.icon-arrow-left-top:before {
		content: "\e604";
	}

	.icon-icon--:before {
		content: "\e744";
	}

	.icon-zuojiantou-up:before {
		content: "\e605";
	}

	.icon-xia:before {
		content: "\e62d";
	}

	.icon--jianhao:before {
		content: "\e60b";
	}

	.icon-weixinzhifu:before {
		content: "\e61a";
	}

	.icon-comment:before {
		content: "\e64f";
	}

	.icon-weixin:before {
		content: "\e61f";
	}

	.icon-fenlei1:before {
		content: "\e620";
	}

	.icon-erjiye-yucunkuan:before {
		content: "\e623";
	}

	.icon-Group-:before {
		content: "\e688";
	}

	.icon-you:before {
		content: "\e606";
	}

	.icon-forward:before {
		content: "\e607";
	}

	.icon-tuijian:before {
		content: "\e610";
	}

	.icon-bangzhu:before {
		content: "\e679";
	}

	.icon-share:before {
		content: "\e656";
	}

	.icon-yiguoqi:before {
		content: "\e997";
	}

	.icon-shezhi1:before {
		content: "\e61d";
	}

	.icon-fork:before {
		content: "\e61b";
	}

	.icon-kafei:before {
		content: "\e66a";
	}

	.icon-iLinkapp-:before {
		content: "\e654";
	}

	.icon-saomiao:before {
		content: "\e60d";
	}

	.icon-shezhi:before {
		content: "\e60f";
	}

	.icon-shouhoutuikuan:before {
		content: "\e631";
	}

	.icon-gouwuche:before {
		content: "\e609";
	}

	.icon-dizhi:before {
		content: "\e614";
	}

	.icon-fenlei:before {
		content: "\e706";
	}

	.icon-xingxing:before {
		content: "\e70b";
	}

	.icon-tuandui:before {
		content: "\e633";
	}

	.icon-zuanshi:before {
		content: "\e615";
	}

	.icon-zuo:before {
		content: "\e63c";
	}

	.icon-shoucang2:before {
		content: "\e62e";
	}

	.icon-shouhuodizhi:before {
		content: "\e712";
	}

	.icon-yishouhuo:before {
		content: "\e71a";
	}

	.icon-dianzan-ash:before {
		content: "\e617";
	}





	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	uni-button[type=default],
	button[type=default] {
		color: $font-color-dark;
	}

	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}

	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		.image-wrapper {
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position: relative;

			image {
				border-radius: 8upx;
			}
		}

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title,
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				color: $font-color-dark;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
</style>
