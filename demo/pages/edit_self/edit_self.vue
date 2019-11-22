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
			<!-- 	<view class="photo_top">
				<view class="imageItem">
					<image class="image" :src="urlImge[0]" mode="aspectFill" @tap="ChooseImage"></image>
				</view>
				<view class="photo_uplod">
					<view class="imageUpload" @tap="selectImage1">+</view>
					<view class="imageUpload" @tap="selectImage2">+</view>
				</view>
			</view>
			<view class="photo_bottom">
<<<<<<< HEAD
				<view class="imageUpload" @tap="selectImage3">+</view>
				<view class="imageUpload" @tap="selectImage4">+</view>
				<view class="imageUpload" @tap="selectImage5">+</view>
			</view>

		</view <!-- card组件 -->
=======
				<view class="imageUpload" @tap="selectImage">+</view>
				<view class="imageUpload" @tap="selectImage">+</view>
				<view class="imageUpload" @tap="selectImage">+</view>
			</view> -->
			<!-- 上传显示 -->
			<!-- <image class="moveImage"></image> -->
			<sunui-upbasic :upImgConfig="upImgBasic" @onUpImg="upBasicData" @onImgDel="delImgInfo" ref="uImage"></sunui-upbasic>
		</view>
		<!-- card组件 -->
>>>>>>> chemengxiao
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
	import Attachment from '../../components/jin-attachment/jin-attachment.vue';
	export default {
		data() {
			return {
				// 选择性别的id
				sexindex: 0,
				sexbox: ['男', '女'],
				// 出生日期
<<<<<<< HEAD
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
=======
				birthday: '0000-00-00',
				modalName: null,
				basicArr: [],
				// 基础版配置
				upImgBasic: {
					// 后端图片接口地址
					basicConfig: {
						url: 'http://127.0.0.1:9999/api/v1/upload_phone'
					},
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: true,
					// 图片数量
					count: 2,
					// 相机来源(相机->camera,相册->album,两者都有->all,默认all)
					sourceType: 'camera',
					// 是否压缩上传照片(仅小程序生效)
					sizeType: true,
					// 上传图片背景修改 
					upBgColor: '#E8A400',
					// 上传icon图标颜色修改(仅限于iconfont)
					upIconColor: '#fff',
					// 上传svg图标名称
					// upSvgIconName: 'icon-card',
					// 上传文字描述(仅限四个字)
					// upTextDesc: '上传证书',
					// 删除按钮位置(left,right,bleft,bright),默认右上角
					delBtnLocation: '',
					// 是否隐藏添加图片
					isAddImage: false,
					// 是否隐藏删除图标
					// isDelIcon: false,
					// 删除图标定义背景颜色
					// delIconColor: '',
					// 删除图标字体颜色
					// delIconText: '',
					// 上传图标替换(+),是个http,https图片地址(https://www.playsort.cn/right.png)
					iconReplace: ''
				}
>>>>>>> chemengxiao
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
<<<<<<< HEAD
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
=======
				this.birthday = e.detail.value
			},
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e, this.basicArr.splice(e.index, 1));
			},
			// 基础版
			async upBasicData(e) {
				// console.log(e);
				// 上传图片数组
				let arrImg = [];
				console.log(e[0].path_server.split(','))
				arrImg = e[0].path_server.split(',')
				// for (let i = 0, len = e.length; i < len; i++) {
				// 	try {
				// 		if (e[i].path_server != "") {
				// 			await arrImg.push(e[i].path_server.split(','));
				// 		}
				// 	} catch (err) {
				// 		console.log('上传失败...');
				// 	}
				// }
				// 图片信息保存到data数组
				this.basicArr = arrImg;
				// // 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				// if (arrImg.length == this.upImgBasic.count) {
				// 	uni.showToast({
				// 		title: `loading`,
				// 		icon: 'none'
				// 	});
				// 	uni.hideLoading({
				// 		title: `上传成功`,
				// 		icon: 'none'
				// 	});
				// }
			},
			// 获取上传图片basic
			getUpImgInfoBasic() {
				console.log(this.basicArr.join().split(','));
>>>>>>> chemengxiao
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
