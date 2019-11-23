<template>
	<view class="edit_self">
		<!-- 自定义导航栏 -->
		<view class="cu-bar bg-white fixed">
			<cu-custom bgColor="bg-gradual-white " :url="'/pages/self/self'" isBack="true">
				<block slot="content">编辑个人信息</block>
			</cu-custom>
		</view>
		<!-- 上传图片 -->
		<view class="photo">
			<view class="photo_top">
				<view class="imageItem">
					<image :src="imgList[imgList.length-1]" mode="aspectFill" @tap="ChooseImage"></image>
				</view>
				<view class="photo_uplod">
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
					<view class=' content_tag fl'>
						<view class='cu-tag bg-black margin-left-xs radius' v-for="v in ourTags">{{v.tag_name}}</view>
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
					<view class=' content_tag fl'>
						<view class='cu-tag bg-orange margin-left-xs radius' v-for="v in ourSports">{{v.tag_name}}</view>
					</view>
					<view class=" cuIcon-right fr"></view>
				</view>
				<view class="flex cf padding-sm" @tap='our_games'>
					<view class="cuIcon-game icon_tag fl text-bold text-xl margin-right-sm"></view>
					<view class=' content_tag fl'>
						<view class='cu-tag bg-purple margin-left-xs radius' v-for="v in ourGames">{{v.tag_name}}</view>
					</view>
					<view class=" cuIcon-right fr"></view>
				</view>
				<view class="flex cf padding-sm" @tap='our_music'>
					<view class="cuIcon-musicfill icon_tag fl text-bold text-xl margin-right-sm"></view>
					<view class=' content_tag fl'>
						<view class='cu-tag bg-cyan margin-left-xs radius' v-for="v in ourMusic">{{v.tag_name}}</view>
					</view>
					<view class=" cuIcon-right fr"></view>
				</view>
				<view class="flex cf padding-sm" @tap="our_foods">
					<view class="cuIcon-presentfill icon_tag fl text-bold text-xl margin-right-sm"></view>
					<view class=' content_tag fl'>
						<view class='cu-tag bg-pink margin-left-xs radius' v-for="v in ourFoods">{{v.tag_name}}</view>
					</view>
					<view class=" cuIcon-right fr"></view>
				</view>
			</view>
		</view>
		<view class="form_self">
			<form @submit="" @reset="">
				<view class="cu-form-group">
					<view class="title">昵称</view>
					<input v-model="formlist.username" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<!-- <input placeholder="请选择你的性别" name="input"></input> -->
					<picker @change="PickerChange" :value="sexindex" :range="sexbox">
						<view class="picker">
							{{sexindex>-1?sexbox[sexindex]:'请先选择性别'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">生日</view>
					<!-- <input placeholder="0000-00-00" name="input"></input> -->
					<picker mode="date" :value="birthday" start="1900-01-01" end="2019-12-12" @change="DateChange">
						<view class="picker">
							{{birthday}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">学校</view>
					<input v-model="formlist.school" name="input" :disabled="true"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">签名</view>
					<textarea v-model="formlist.sign" placeholder="请填写你的个性签名"></textarea>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-green lg" @tap="savefix">保存修改</button>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-grey lg" @tap="layout">退出登录</button>
				</view>
			</form>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
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
				modalName: null,
				basicArr: [],
				formlist: [],
				baseUrl: 'http://127.0.0.1:9999/api/v1',
				id: '',
				imgList: [],
				imgList1: ["http://zhangchaotang.oss-cn-beijing.aliyuncs.com/banana/3hgruxRBPWwOm92o.gif"],
				imgList2: ["http://zhangchaotang.oss-cn-beijing.aliyuncs.com/banana/mVZ9Us1wshsfZWyC.gif"]
			}
		},
		methods: {
			// 点击保存修改
			savefix() {
				let date = parseFloat(new Date(this.formlist.birthday).getTime() / 1000)
				this.formlist.birthday = date
				uni.request({
					url: this.baseUrl + `/update_info/${this.id}`,
					method: 'PUT',
					data: {
						info: JSON.stringify(this.formlist)
					},
					success: (res) => {
						if (res.data.ok == 1) {
							uni.showToast({
								title: "修改成功",
							})
						} else {
							uni.hideToast({
								title: "修改失败",
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
				uni.chooseImage({
					count: 1,
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: 'http://127.0.0.1:9999/api/v1/upload_phone',
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
							url: 'http://127.0.0.1:9999/api/v1/upload_phone',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								let aa = JSON.parse(uploadFileRes.data)
								this.imgList1.push(aa.info)
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
							url: 'http://127.0.0.1:9999/api/v1/upload_phone',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								let aa = JSON.parse(uploadFileRes.data)
								this.imgList2.push(aa.info)
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
				uni.clearStorage()
				uni.navigateTo({
					url: '../login/login'
				})
			},
			// 点击跳转到tag页面
			our_sports() {
				uni.navigateTo({
					url: '../self_tag_sports/self_tag_sports'
				})
			},
			our_tags() {
				uni.navigateTo({
					url: '../self_tag_our/self_tag_our'
				})
			},
			our_games() {
				uni.navigateTo({
					url: '../self_tag_games/self_tag_games'
				})
			},
			our_music() {
				uni.navigateTo({
					url: '../self_tag_music/self_tag_music'
				})
			},
			our_foods() {
				uni.navigateTo({
					url: '../self_tag_foods/self_tag_foods'
				})
			},
		}
	}
</script>
<style>
	.photo {
		margin-top: 100rpx;
		width: 100%;
	}

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
		height: 260rpx;
		text-align: center;
		font-size: 150rpx;
		color: #D9D9D9;
		background-color: #8799A3;
	}

	.content_tag {
		width: 600rpx;
	}
</style>
