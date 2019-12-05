<template>
	<view class="publish">
		<view class="cu-card dynamic no-card">
			<view class="cu-item shadow ">
				<!-- 自定义导航栏 -->
				<cu-custom bgColor="bg-white" :isBold="false" :isBack="true" :url='url'>
					<block slot="content">发布帖子</block>
				</cu-custom>
				<!-- input -->
				<view class="cu-form-group">
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="多行文本输入框"></textarea>
				</view>
				<!-- 图片上传 -->
				<sunui-upbasic :upImgConfig="upImgBasic" @onUpImg="upBasicData" @onImgDel="delImgInfo" ref="uImage"></sunui-upbasic>
				<!-- 单选框 -->
				<radio-group class="block" @change="RadioChange">
					<view class="cu-form-group">
						<view class="title">公开</view>
						<radio class="redio" value="0"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">仅自己可见</view>
						<radio class="redio" value="1"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">仅互相关注可见</view>
						<radio class="redio" value="2"></radio>
					</view>
				</radio-group>
				<button type="primary" class="plazaBtn" @tap="addPlaza()">发布</button>
			</view>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				url: '/pages/plaza/plaza',
				modalName: null,
				imgList: [],
				baseUrl: 'http://gs.itsse.cn:9999/api/v1/',
				// 输入框
				textareaAValue: '',
				radio: 0,
				user_id: '',
				basicArr: [],
				basic: [],
				// 基础版配置
				upImgBasic: {
					// 后端图片接口地址
					basicConfig: {
						url: 'http://gs.itsse.cn:9999/api/v1/upload_phone'
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
			}
		},
		components: {
			cuCustom
		},
		onLoad() {
			// that = this.user_id
			// console.log(this.user_id)
			var that = this
			// console.log(that)
			uni.getStorage({
				key: 'user_id',
				success: function(res) {
					that.user_id = res.data
					// console.log(that.user_id)
				}
			})
		},
		methods: {
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e, this.basicArr.splice(e.index, 1));
			},
			// 基础版
			async upBasicData(e) {
				console.log(e);
				// 上传图片数组
				let arrImg = [];
				// console.log(e[0].path_server.split(','))
				// arrImg = e[0].path_server.split(',')
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						if (e[i].path_server != "") {
							await arrImg.push(e[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				this.basicArr = arrImg;
				// console.log(this.basicArr)
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
			addPlaza() {
				if (this.textareaAValue !== "") {
					this.basic = this.basicArr.join(",")
					var date = new Date();
					// console.log(this.user_id)
					let info = {
						// 内容
						textareaAValue: this.textareaAValue,
						// 选择
						radio: this.radio,
						// 图片
						basic: this.basic,
						// 时间
						time: parseInt(Number(date) / 1000),
						// 用户id
						user_id: this.user_id
					}
					uni.request({
						url: this.baseUrl + 'addPlaza',
						method: 'POST',
						data: info,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					uni.showToast({
						title: "发布成功",

					})
					uni.navigateTo({
						url: '../plaza/plaza'
					});
				} else {
					uni.showToast({
						title: "请填写您要发布的内容",
						image: '../../static/toast/error.png'
					})
				}
			},
			RadioChange(e) {
				this.radio = e.detail.value
				console.log(this.radio)
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
				// console.log(this.textareaAValue)
			},
			openpersonal() {
				uni.navigateTo({
					url: '../plaza/plaza'
				});
			},
		}
	}
</script>

<style scoped="less">
	uni-page-body,
	uni-page-refresh {
		height: 100%;
	}

	.publish {
		width: 100%;
		height: 100%;
		background-color: #ffffff;
	}

	.tag {
		display: inline-block;
		float: left;
	}

	.up {
		display: inline-block;
		float: right;
	}

	.cu-form-group {
		padding-top: 20px;
		margin-bottom: 20px;
	}

	.cu-form-group[data-v-077a6806] {
		padding-top: 0px;
		margin-bottom: 20px;
	}

	.plazaBtn {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
