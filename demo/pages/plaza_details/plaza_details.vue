<template>
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-white" :isBold="false" :isBack="true" :url='url'>
			<block slot="content">传智校园</block>
		</cu-custom>
		<!-- 卡片 -->
		<view class="cu-card dynamic no-card">
			<view class="cu-item shadow" v-for="(item, index) in pages" :key="index">
				<!-- 卡片头部 -->
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<!-- 头像 -->
						<view class="cu-avatar round lg" @tap="openpersonal()">
							<image class="cu-avatar round lg" :src="item.head_img" mode=""></image>
						</view>
						<view class="content flex-sub">
							<view>{{item.username}}</view>
							<view class="text-gray text-sm flex justify-between">{{item.add_time | dateForma}}</view>
							<view class="text-gray text-sm flex justify-between">{{item.add_time | dataFormat}}</view>
						</view>
					</view>
				</view>
				<!-- 卡片介绍 -->
				<view class="text-content">
					{{item.content}}
				</view>
				<!-- 卡片图片 -->
				<view class="grid flex-sub padding-lr col-3 grid-square">
					<view class="bg-img" v-for="(i,imgIndex) in item.plaza_img" :key="imgIndex">
						<image :src="i" mode=""></image>
					</view>
				</view>
				<!-- 卡片底部 -->
				<view class="margin-top-sm flex justify-between padding">
					<view class="text-gray text-df">
						<text class="cuIcon-likefill"></text>
						<text class="num">{{item.likefill}}</text>
						<text class="cuIcon-messagefill"></text>
						<text class="num">0</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<view class="pinglun">
			<view class="cf">
				<view class="tag padding">最新评论</view>
			</view>
			<scroll-view scroll-y="true" class="list">
				<view class="cu-card dynamic no-card">
					<view class="cu-item shadow" v-for="(item,index) in speakList" :key='index'>
						<!-- 卡片头部 -->
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<!-- 头像 -->
								<view class="cu-avatar round lg" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');"></view>
								<view class="content flex-sub">
									<view>{{item.username}}</view>
									<view class="text-gray text-sm flex justify-between">{{item.plaza_time}}</view>
								</view>
								<view class="padding" @tap="click(index)">
									<view class="lg text-gray cuIcon-appreciate" v-if="item.isClick == false"></view>
									<view class="cuIcon-appreciatefill text-red" v-else></view>
								</view>
							</view>
						</view>
						<!-- 评论 -->
						<view class="text-left padding-left">{{item.message}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-bar input">
			<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
			<view class="action">
				<text class="cuIcon-roundaddfill text-grey"></text>
			</view>
			<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" class="solid-bottom" maxlength="300"
			 cursor-spacing="10" v-model="text"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow-blur" @tap="addSpeak">发送</button>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				isBottom: false,
				InputBottom: 0,
				pages: [],
				plaza_id: 0,
				baseUrl: 'http://gs.itsse.cn:9999/api/v1/',
				// 评论
				speakList: [],
				text: '',
				url: '/pages/plaza/plaza'
			}
		},
		onLoad: function(option) {
			this.plaza_id = option.plazaid
			this.getPlaza(this.plaza_id)
			this.getSpeak(this.plaza_id)
		},
		methods: {
			getPlaza(plaza_id) {
				uni.request({
					url: this.baseUrl + 'plaza_details/' + plaza_id,
					method: 'GET',
					data: {},
					success: res => {
						// console.log(res.data)
						this.pages = res.data.data
						// console.log(this.pages)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getSpeak(plaza_id) {
				uni.request({
					url: this.baseUrl + '/getSpeak',
					data: {
						id: plaza_id
					},
					success: (res) => {
						this.speakList = res.data
						// console.log(this.speakList)
						let time = parseInt(new Date().getTime() / 1000)

						function transformTime(timestamp = +new Date()) {
							if (timestamp) {
								var time = new Date(timestamp);
								var y = time.getFullYear();
								var M = time.getMonth() + 1;
								var d = time.getDate();
								var h = time.getHours();
								var m = time.getMinutes();
								var s = time.getSeconds();
								return y + '-' + addZero(M) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
							} else {
								return '';
							}
						}

						function addZero(m) {
							return m < 10 ? '0' + m : m;
						}

						this.speakList.forEach(v => {
							// v.plaza_time = time - v.plaza_time
							v.plaza_time = transformTime(v.plaza_time * 1000);
						})
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			addSpeak() {
				console.log(this.pages)
				let time = parseInt(new Date().getTime() / 1000)
				let user_id = uni.getStorageSync('user_id')
				let info = {
					plaza_id: this.plaza_id,
					commont_id: user_id,
					message: this.text,
					beCommont_id: '',
					plaza_time: time
				}
				info.beCommont_id = this.pages[0].plazaUser_id
				// console.log(info)
				if (this.text !== '') {
					uni.request({
						url: this.baseUrl + '/addSpeak',
						data: info,
						header: {
							"content-type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						success: (res) => {
							// console.log(res.data)
						},
						fail: (err) => {
							console.log(err)
						}
					})
				} else {
					uni.showToast({
						title: '请填写您的 评论',
						image: '../../static/toast/error.png'
					})
				}
			},
			click(index) {
				console.log(this.speakList[index].isClick)
				this.speakList[index].isClick = !this.speakList[index].isClick
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			// 跳转到广场个人
			openpersonal() {
				uni.navigateTo({
					url: '../plaza_personal/plaza_personal'
				});
			},
		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item:after,
	.cu-list.menu>.cu-item:after {
		border-bottom: 0px
	}

	.pinglun {
		padding-bottom: 50px;
	}

	.cu-card {
		margin-bottom: 20rpx;
	}

	.cu-card.dynamic>.cu-item>.text-content {
		font-size: 14px;
	}

	.cu-btn {
		font-size: 12px;
		font-weight: 800;
		color: black;
	}

	.text-sm {
		display: inline-block;
		margin-right: 20rpx;
	}

	.num {
		margin-left: 10rpx;
		margin-right: 10rpx;
		font-size: 10rpx;
	}

	.pinglun {
		background-color: #ffffff;
		height: 100%;
	}

	.cu-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
