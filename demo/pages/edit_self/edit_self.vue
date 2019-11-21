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
					<image class="image" :src="urlImge[0]" mode="aspectFill" @tap="ChooseImage"></image>
				</view>
				<view class="photo_uplod">
					<view class="imageUpload" @tap="selectImage1">+</view>
					<view class="imageUpload" @tap="selectImage2">+</view>
				</view>
			</view>
			<view class="photo_bottom">
				<view class="imageUpload" @tap="selectImage3">+</view>
				<view class="imageUpload" @tap="selectImage4">+</view>
				<view class="imageUpload" @tap="selectImage5">+</view>
			</view>

		</view <!-- card组件 -->
		<!-- 我的标签 -->
		<view class="cu-bar bg-white padding">
			<view class="tag_box">
				<view class="cu-bar bg-white">
					<view class='action'>
						<text class='text-black'>我的标签</text>
					</view>
				</view>
				<view class="tag_content text-left cf" @tap="getOurTag">
					<view class="icon_tag padding-left-sm text-bold text-lg fl margin-top-sm margin-right-sm">#</view>
					<input v-if="our_tag.length==0" placeholder="没有个性标签,请选择" name="input"></input>
					<view v-else class='cu-tag bg-black tag_posi fl margin-top-xs' v-for="(item,index) in our_tag" :key='index'>{{item.tag_name}}</view>
					<view class="cuIcon-right fr margin-top-sm"></view>
				</view>
			</view>
		</view>
		<!-- 我的兴趣 -->
		<view class="cu-bar bg-white padding  solid-bottom">
			<view class="tag_box">
				<view class="cu-bar bg-white">
					<view class='action'>
						<text class='text-black'>我的兴趣</text>
					</view>
				</view>
				<!-- 运动 -->
				<view class="tag_content text-left cf" @tap="getsportTag">
					<view class="cuIcon-cartfill  margin-top-sm text-bold text-lg fl margin-right-sm"></view>
					<input v-if="our_tag.length==0" placeholder="没有个性标签,请选择" name="input"></input>
					<view v-else class='cu-tag bg-black tag_posi fl margin-top-xs' v-for="(item,index) in our_sports" :key='index'>{{item.tag_name}}</view>
					<view class="cuIcon-right fr margin-top-sm"></view>
				</view>
				<!-- 游戏 -->
				<view class="tag_content text-left cf" @tap="getgamesTag">
					<view class="cuIcon-game  margin-top-sm text-bold text-lg fl margin-right-sm"></view>
					<input v-if="our_tag.length==0" placeholder="没有个性标签,请选择" name="input"></input>
					<view v-else class='cu-tag bg-black tag_posi fl margin-top-xs' v-for="(item,index) in our_games" :key='index'>{{item.tag_name}}</view>
					<view class="cuIcon-right fr margin-top-sm"></view>
				</view>
				<!-- 音乐 -->
				<view class="tag_content text-left cf" @tap="getmusicTag">
					<view class="cuIcon-musicfill margin-top-sm  text-bold text-lg fl margin-right-sm"></view>
					<input v-if="our_tag.length==0" placeholder="没有个性标签,请选择" name="input"></input>
					<view v-else class='cu-tag bg-gradual-purple tag_posi fl margin-top-xs' v-for="(item,index) in our_music" :key='index'>{{item.tag_name}}</view>
					<view class="cuIcon-right fr margin-top-sm"></view>
				</view>
				<!-- 美食 -->
				<view class="tag_content text-left cf" @tap="getfoodsTag">
					<view class="cuIcon-shopfill margin-top-sm  text-bold text-sl fl margin-right-sm"></view>
					<view class='cu-tag bg-pink tag_posi fl margin-top-xs' v-for="(item,index) in our_foods" :key='index'>{{item.tag_name}}</view>
					<view class="cuIcon-right fr margin-top-sm"></view>
				</view>
			</view>
		</view>
		<view class="form_self">
			<form @submit="" @reset="">
				<view class="cu-form-group">
					<view class="title">昵称</view>
					<input v-model="userInfo.username" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<picker @change="PickerChange" :value="sexindex" :range="sexbox">
						<view class="picker">
							{{sexindex>-1?sexbox[sexindex]:'请先选择性别'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">生日</view>
					<picker mode="date" :value="userInfo.birthday" start="1980-01-01" end="2019-12-12" @change="DateChange">
						<view class="picker">
							{{userInfo.birthday}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">学校</view>
					<input v-model="userInfo.school" name="input" :disabled="true"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">签名</view>
					<textarea v-model="userInfo.sign" placeholder="请填写你的个性签名"></textarea>
				</view>
			</form>
			<view class="padding">
				<button class="cu-btn block bg-green margin-tb-sm lg" @tap="showModal" data-target="DialogModal">保存修改</button>
				<button class="cu-btn block bg-grey margin-tb-sm lg" @tap="layout">退出登录</button>
			</view>
			<!-- 保存确认框 -->
			<view class="cu-modal" :class="dialogname=='DialogModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">您是否要保存你的修改</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="saveModal">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 选择性别的id
				sexindex: 0,
				sexbox: ['男', '女'],
				// 出生日期
				modalName: null,
				// 用户id
				userId: '',
				baseUrl: 'http://127.0.0.1:9999/api/v1',
				// 用户信息
				userInfo: {
					username: '',
					birthday: '',
					sign: '',
					sex: ''
				},
				imgList: [],
				// 控制模态框的现因
				dialogname: null,
				// 我的tag个性标签数组
				our_tag: [],
				// 我的游戏tag
				our_foods: [],
				// 我的游戏tag
				our_games: [],
				// 我的运动tag
				our_sports: [],
				// 我的getmusic
				our_music: [],
				urlImge: []
			}
		},
		onLoad() {
			let userId = uni.getStorageSync('user_id');
			this.userId = userId
			uni.request({
				url: this.baseUrl + `/self_info/${this.userId}`,
				method: 'GET',
				data: {
					id: this.userIds
				},
				success: (res) => {
					if (res.data.data.birthday == null) {
						res.data.data.birthday = '1970-01-01'
					} else {
						const dt = new Date((res.data.data.birthday * 1000));
						const y = dt.getFullYear();
						const m = (dt.getMonth() + 1 + "").padStart(2, "0");
						const d = (dt.getDate() + "").padStart(2, "0");
						res.data.data.birthday = `${y}-${m}-${d}`
					}
					this.userInfo = res.data.data
					this.userInfo.sex = this.sexindex
					console.log(this.userInfo.head_img)
					this.urlImge.push(this.userInfo.head_img)
				}
			})
			// 获取我的tag数据
			let our_tag = JSON.parse(uni.getStorageSync('our_tag'))
			this.our_tag = our_tag
			// // 获取我的游戏数据
			let our_games = JSON.parse(uni.getStorageSync('our_games'))
			this.our_games = our_games
			// // 获取我的foods数据
			let our_foods = JSON.parse(uni.getStorageSync('our_foods'))
			this.our_foods = our_foods
			// // 获取我的music数据
			let our_music = JSON.parse(uni.getStorageSync('our_music'))
			this.our_music = our_music
			// // 获取我的sports数据
			let our_sports = JSON.parse(uni.getStorageSync('our_sports'))
			this.our_sports = our_sports
		},
		methods: {
			showModal(e) {
				this.dialogname = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.dialogname = null
			},
			PickerChange(e) {
				this.sexindex = e.detail.value
				this.userInfo.sex = this.sexindex
			},
			DateChange(e) {
				this.userInfo.birthday = e.detail.value
			},
			// 获取我的标签
			getOurTag() {
				uni.navigateTo({
					url: '../self_tag_our/self_tag_our'
				})
			},
			// 获取体育标签
			getsportTag() {
				uni.navigateTo({
					url: '../self_tag_sports/self_tag_sports'
				})
			},
			// 获取音乐标签
			getmusicTag() {
				uni.navigateTo({
					url: '../self_tag_music/self_tag_music'
				})
			},
			// 获取食物标签
			getfoodsTag() {
				uni.navigateTo({
					url: '../self_tag_foods/self_tag_foods'
				})
			},
			// 获取游戏标签
			getgamesTag() {
				uni.navigateTo({
					url: '../self_tag_games/self_tag_games'
				})
			},
			// 编辑保存信息
			saveModal() {
				let datatime = parseInt((new Date(this.userInfo.birthday).getTime()) / 1000)
				let userinfo = {
					...this.userInfo
				}
				userinfo.birthday = datatime
				console.log(userinfo)
				uni.request({
					url: this.baseUrl + `/update_info/${this.userId}`,
					method: 'put',
					data: {
						data: userinfo
					},
					success: (res) => {
						if (res.data.ok == 1) {
							this.dialogname = null
						}
					}
				})
			},
			// 退出登录
			layout() {
				uni.showLoading({
					title: 'loading'
				});
				uni.removeStorage({
					key: 'token',
				});
				uni.removeStorage({
					key: 'user_id',
				});
				uni.navigateTo({
					url: '../login/login'
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album'],
					success: (res) => {
						this.urlImge = res.tempFilePaths
						console.log(res)
						uni.request({
							url: this.baseUrl + `/upload_phone/${this.userId}`,
							method: 'POST',
							data: {
								url: JSON.stringify(this.urlImge[0])
							},
							success: (res) => {
								console.log(res)
							}
						})
					}
				})
			}
		}
	}
</script>
<style>
	.edit_self .save_info {
		margin-right: 20rpx;
		color: red;
		font-size: 35rpx;
	}

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

	.photo_top .image {
		width: 500rpx;
		height: 500rpx;
	}

	.photo_uplod {
		width: 33.3%;
		display: flex;
		flex-direction: column;
	}

	.photo_uplod .imageUpload {
		margin-bottom: 2rpx;
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
		margin-right: 2rpx;
		width: 260rpx;
		height: 240rpx;
		line-height: 240rpx;
		text-align: center;
		font-size: 150rpx;
		color: #D9D9D9;
		background-color: #8799A3;
	}

	.photo_bottom>.imageUpload:nth-child(3) {
		margin-right: 0rpx;
	}

	.tag_box .tag_posi {
		text-align: left;
	}

	.tag_content {
		width: 700rpx;
		padding: 30rpx 10rpx;
	}
</style>
