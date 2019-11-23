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
				<!-- <view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
						<image :src="imgList[0]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids"  v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view> -->
				<view class="imageItem">
					<image :src=" imgList[0]" mode="aspectFill" @tap="ChooseImage"></image>
				</view>
				<view class=" photo_uplod">
					<view class="imageUpload" @tap="selectImage">+</view>
					<view class="imageUpload" @tap="selectImage">+</view>
				</view>
			</view>
			<view class="photo_bottom">
				<view class="imageUpload" @tap="selectImage">+</view>
				<view class="imageUpload" @tap="selectImage">+</view>
				<view class="imageUpload" @tap="selectImage">+</view>
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
					<input placeholder="浅,陌" name="input"></input>
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
					<input placeholder="北京交通大学" name="input" :disabled="true"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">签名</view>
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请填写你的个性签名"></textarea>
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
				birthday: '0000-00-00',
				modalName: null,
				basicArr: [],
				forlist: [],
				baseUrl: 'http:/127.0.0.1:9999/api/v1',
				id: '',
				imgList: [],
			}
		},
		methods: {
			// 获取个人用户信息
			getselfInfo() {
				let userId = uni.getStorageSync('user_id')
				this.id = userId
				console.log(this.id)
				uni.request({
					url: this.baseUrl + `/selfInfo/${this.id}`,
					data:{
						id:this.id
					},
					method: 'GET',
					success: (res) => {
						console.log(res)
					}
				})
			},
			PickerChange(e) {
				console.log(e)
				this.sexindex = e.detail.value
			},
			DateChange(e) {
				this.birthday = e.detail.value
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
								console.log(this.imgList);
								// this.imgList.push(aa.info)
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
		margin-bottom: 1rpx;
		height: 500rpx;
		line-height: 240rpx;
		text-align: center;
		font-size: 150rpx;
		color: #D9D9D9;
		background-color: #8799A3;
	}

	.photo_bottom {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.photo_bottom .imageUpload {
		margin-right: 1rpx;
		width: 260rpx;
		height: 240rpx;
		line-height: 240rpx;
		text-align: center;
		font-size: 150rpx;
		color: #D9D9D9;
		background-color: #8799A3;
	}

	.content_tag {
		width: 600rpx;
	}

	.photo_bottom>.imageUpload:nth-child(3) {
		margin-right: 0rpx;
	}
</style>
