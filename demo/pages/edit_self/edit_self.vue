<template>
	<view class="edit_self">
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-green" :isBack="true" :url="'/pages/self/self'">
			<block slot="backText"></block>
			<block slot="content">编辑个人信息</block>
		</cu-custom>
		<!-- 上传图片 -->
		<view class="photo">
			<view class="photo_top">
				<view class="imageItem">
					<image :src="imgList[imgList.length-1]" mode="aspectFill" @tap="ChooseImage"></image>
				</view>
				<view class="photo_uplod solid-bottom">
					<view class="imageUpload">
						<image :src="imgList1[imgList1.length-1]" mode="widthFix" @tap="ChooseImage1"></image>
					</view>
					<view class="imageUpload">
						<image :src="imgList2[imgList2.length-1]" mode="widthFix" @tap="ChooseImage2"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- card组件 -->
		<!-- 我的标签 -->
		<view class="cu-bar bg-white padding">
			<view class="tag_box">
				<view class="tag_title">
					<text>我的标签</text>
				</view>
				<view class="flex cf padding-sm" @tap="our_tags">
					<view class=" fl text-bold text-xl margin-right-sm text-bold">#</view>
					<view class=' content_tag fl' v-if="ourTags.length>0">
						<view class='cu-tag bg-black margin-left-xs radius' v-for="v in ourTags">{{v.tag_name}}</view>
					</view>
					<view class="content_tag fl margin-top-xs" v-else>
						<input type="text" placeholder="添加我的标签" :disabled="true" />
					</view>
					<view class=" cuIcon-right fr"></view>
				</view>
			</view>
		</view>
		<!-- 我的兴趣 -->
		<view class="cu-bar bg-white padding  solid-bottom">
			<view class="tag_box">
				<view class="tag_title">
					<text>我的兴趣</text>
				</view>
				<view class="flex cf padding-sm" @tap='our_sports'>
					<view class="cuIcon-brand icon_tag fl text-bold text-xl margin-right-sm"></view>
					<view class=' content_tag fl' v-if="ourSports.length>0">
						<view class='cu-tag bg-orange margin-left-xs radius' v-for="v in ourSports">{{v.tag_name}}</view>
					</view>
					<view class="content_tag fl " v-else>
						<input type="text" placeholder="我热爱的运动" :disabled="true" />
					</view>
					<view class=" cuIcon-right fr"></view>
				</view>
				<view class="flex cf padding-sm" @tap='our_games'>
					<view class="cuIcon-game icon_tag fl text-bold text-xl margin-right-sm"></view>
					<view class=' content_tag fl' v-if="ourGames.length>0">
						<view class='cu-tag bg-purple margin-left-xs radius' v-for="v in ourGames">{{v.tag_name}}</view>
					</view>
					<view class="content_tag fl " v-else>
						<input type="text" placeholder="我喜欢的游戏" :disabled="true" />
					</view>
					<view class=" cuIcon-right fr"></view>
				</view>
				<view class="flex cf padding-sm" @tap='our_music'>
					<view class="cuIcon-musicfill icon_tag fl text-bold text-xl margin-right-sm"></view>
					<view class=' content_tag fl' v-if="ourMusic.length>0">
						<view class='cu-tag bg-cyan margin-left-xs radius' v-for="v in ourMusic">{{v.tag_name}}</view>
					</view>
					<view class="content_tag fl  " v-else>
						<input type="text" placeholder="我常听的音乐" :disabled="true" />
					</view>
					<view class=" cuIcon-right fr"></view>
				</view>
				<view class="flex cf padding-sm" @tap="our_foods">
					<view class="cuIcon-presentfill icon_tag fl text-bold text-xl margin-right-sm"></view>
					<view class=' content_tag fl' v-if="ourFoods.length>0">
						<view class='cu-tag bg-pink margin-left-xs radius' v-for="v in ourFoods">{{v.tag_name}}</view>
					</view>
					<view class="content_tag fl " v-else>
						<input type="text" placeholder="我爱吃的美食" :disabled="true" />
					</view>
					<view class=" cuIcon-right fr"></view>
				</view>
			</view>
		</view>
		<view class="form_self">
			<form>
				<view class="cu-form-group flex flex-wrap padding">
					<view class='basis-xl padding-top-sm'>
						<text class='title'>昵称</text>
					</view>
					<view class="action basis-xl ">
						<input v-model="formlist.username" name="input"></input>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap padding">
					<view class='basis-xl padding-top-sm'>
						<view class="title">性别</view>
					</view>
					<view class="action basis-xl ">
						<picker @change="PickerChange" :value="sexindex" :range="sexbox">
							{{sexindex>-1?sexbox[sexindex]:'请先选择性别'}}
						</picker>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap padding">
					<view class='basis-xl padding-top-sm'>
						<view class="title">生日</view>
					</view>
					<view class="action basis-xl ">
						<picker mode="date" :value="birthday" start="1990-00-00" end="2019-12-12" @change="DateChange">
							<view class="picker">
								{{birthday}}
							</view>
						</picker>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap padding">
					<view class='basis-xl padding-top-sm'>
						<text class='title'>学校</text>
					</view>
					<view class="action basis-xl ">
						<input v-model="formlist.school" name="input" :disabled="true"></input>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap padding">
					<view class='basis-xl padding-top-sm'>
						<text class='title'>签名</text>
					</view>
					<view class="action basis-xl ">
						<textarea v-model="formlist.sign" placeholder="请填写你的个性签名"></textarea>
					</view>
				</view>
				<view class="padding-bottom-xl flex flex-direction">
					<button class="cu-btn bg-green lg" @tap="saveselfInfo">保存修改</button>
				</view>
				<view class="padding-bottom-xl flex flex-direction">
					<button class="cu-btn bg-grey lg" @tap="layout">退出登录</button>
				</view>
			</form>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		// 当页面显示时触发
		onShow() {
			// 获取编辑个人数据
			this.getselfInfo()
			// 获取game tag
			uni.getStorage({
				key: 'games',
				success: (res) => {
					this.ourGames = JSON.parse(res.data)
				}
			})
			// 获取我的tag
			uni.getStorage({
				key: 'ourTags',
				success: (res) => {
					this.ourTags = JSON.parse(res.data)
				}
			})
			// 获取 sports tag
			uni.getStorage({
				key: 'ourSports',
				success: (res) => {
					this.ourSports = JSON.parse(res.data)
				}
			})
			// 获取 music tag
			uni.getStorage({
				key: 'ourMusic',
				success: (res) => {
					this.ourMusic = JSON.parse(res.data)
				}
			})
			// 获取 foods tag
			uni.getStorage({
				key: 'ourFoods',
				success: (res) => {
					this.ourFoods = JSON.parse(res.data)
				}
			})
			// 获取图片1
			uni.getStorage({
				key: 'photo_one',
				success: (res) => {
					// console.log(res)
					this.imgList1.push(res.data)
				}
			})
			// 获取图片2
			uni.getStorage({
				key: 'photo_two',
				success: (res) => {
					// console.log(res)
					this.imgList2.push(res.data)
				}
			})
		},
		data() {
			return {
				imgList: [],
				// 游戏tag
				ourGames: [],
				// 我的tag
				ourTags: [],
				// 我的运动
				ourSports: [],
				// 我的食物
				ourFoods: [],
				// 我的音乐
				ourMusic: [],
				sexindex: -1,
				sexbox: ['男', '女'],
				// 出生日期
				birthday: '1970-01-01',
				basicArr: [],
				formlist: [],
				baseUrl: 'http://gs.itsse.cn:9999/api/v1',
				id: '',
				imgList: [],
				imgList1: ["http://hbimg.b0.upaiyun.com/9817192fbf6914a38e77e0d289253e6d2f8d88b71635-VDp6dR_fw658"],
				imgList2: ["http://hbimg.b0.upaiyun.com/9817192fbf6914a38e77e0d289253e6d2f8d88b71635-VDp6dR_fw658"],
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 点击保存修改
			saveselfInfo() {
				let date = parseFloat(new Date(this.formlist.birthday).getTime() / 1000)
				this.formlist.birthday = date
				uni.showModal({
					title: '保存修改',
					content: '亲。你确认要修改个人信息吗？',
					cancelText: '取消，再看看',
					cancelColor: '#D1372C',
					confirmText: '确认修改',
					confirmColor: '#09BB07',
					success: (res) => {
						if (res.cancel == true) {
							return uni.showToast({
								title: '已取消修改'
							})
						} else {
							uni.request({
								url: this.baseUrl + `/update_info/${this.id}`,
								method: 'PUT',
								data: {
									info: JSON.stringify(this.formlist)
								},
								success: (res) => {
									if (res.data.ok == 1) {
										return uni.showToast({
											title: "修改成功",
										})
									}
								}
							})
						}
					}
				})

			},
			// 获取个人用户信息
			getselfInfo() {
				let userId = uni.getStorageSync('user_id')
				this.id = userId
				uni.request({
					url: this.baseUrl + `/selfInfo/${userId}`,
					data: {
						id: this.id
					},
					method: 'GET',
					success: (res) => {
						this.formlist = res.data.data
						this.imgList.push(res.data.data.head_img)
						const dt = new Date(this.formlist.birthday * 1000);
						const y = dt.getFullYear();
						const m = (dt.getMonth() + 1 + "").padStart(2, "0");
						const d = (dt.getDate() + "").padStart(2, "0");
						let data = `${y}-${m}-${d}`
						this.formlist.birthday = data
						this.birthday = this.formlist.birthday
						this.sexindex = this.formlist.sex
						// 当页面加载的时候把生日传递给form表单
						if (this.formlist.birthday == null) {
							this.formlist.birthday = '1970-01-01'
						}
					}
				})
			},
			PickerChange(e) {
				this.sexindex = e.detail.value
				this.formlist.sex = this.sexindex
			},
			DateChange(e) {
				this.birthday = e.detail.value
				this.formlist.birthday = this.birthday
			},
			ChooseImage() {
				let _self = this;
				uni.showLoading({
					title: 'loading'
				})
				uni.chooseImage({
					count: 1,
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						uni.hideLoading()
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: 'http://gs.itsse.cn:9999/api/v1/upload_phone',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								let aa = JSON.parse(uploadFileRes.data)
								this.imgList.push(aa.info)
								this.formlist.head_img = this.imgList[this.imgList.length - 1]
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});

			},
			ChooseImage1() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: 'http://gs.itsse.cn:9999/api/v1/upload_phone',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								let aa = JSON.parse(uploadFileRes.data)
								this.imgList1.push(aa.info)
								uni.setStorage({
									key: 'photo_one',
									data: aa.info
								})
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			ChooseImage2() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: 'http://gs.itsse.cn:9999/api/v1/upload_phone',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								let aa = JSON.parse(uploadFileRes.data)
								this.imgList2.push(aa.info)
								uni.setStorage({
									key: 'photo_two',
									data: aa.info
								})
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			// 退出登录
			layout() {
				uni.showLoading({
					title: '正在加载中...'
				})
				setTimeout(function() {
					uni.hideLoading();
					uni.clearStorage()
					uni.reLaunch({
						url: '../login/login'
					})
				}, 300);
			},
			// 点击跳转到tag页面
			our_sports() {
				uni.showLoading({
					title: 'loading'
				})
				setTimeout(function() {
					uni.navigateTo({
						url: '../self_tag_sports/self_tag_sports'
					})
					uni.hideLoading();
				}, 300);
			},
			our_tags() {
				uni.showLoading({
					title: 'loading'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '../self_tag_our/self_tag_our'
					})
					uni.hideLoading()
				}, 300)
			},
			our_games() {
				uni.showLoading({
					title: 'loading'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '../self_tag_games/self_tag_games'
					})
					uni.hideLoading()
				}, 300)
			},
			our_music() {
				uni.showLoading({
					title: 'loading'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '../self_tag_music/self_tag_music'
					})
					uni.hideLoading()
				}, 300);
			},
			our_foods() {
				uni.showLoading({
					title: 'loading'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '../self_tag_foods/self_tag_foods'
					})
					uni.hideLoading()
				}, 300)

			},
		}
	}
</script>
<style>
	.photo_top {
		display: flex;
		flex-direction: row;
		height: 500rpx;
	}

	.photo_top .imageItem {
		width: 66.6%;
		height: 500rpx;
	}

	.photo_top .imageItem image {
		height: 500rpx;
	}

	.photo_uplod {
		width: 33.3%;
		display: flex;
		flex-direction: column;
	}

	.photo_uplod .imageUpload {
		height: 250rpx;
		font-size: 150rpx;
	}

	.content_tag {
		width: 600rpx;
	}

	.cu-form-group picker::after {
		content: "";
	}

	.cu-form-group picker .picker {
		text-align: left
	}
</style>
