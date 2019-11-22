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
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
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
	import robbyTags from '@/components/robby-tags/robby-tags.vue'
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				url: '/pages/plaza/plaza',
				modalName: null,
				imgList: [],
				baseUrl: 'http://127.0.0.1:9999/api/v1/',
				// 输入框
				textareaAValue: '',
				radio: 0
			}
		},
		components: {
			robbyTags,
			cuCustom
		},
		methods: {
			addPlaza() {
				if (this.textareaAValue !== "") {
					let info = {
						textareaAValue: this.textareaAValue,
						radio: this.radio
					}
					// console.log(info)
					uni.request({
						url: this.baseUrl + 'addPlaza',
						method: 'POST',
						data: info,
						success: res => {},
						fail: () => {},
						complete: () => {}
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
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			DelImg(e) {
				uni.showModal({
					content: '确定要删除这段回忆吗？',
					cancelText: '留下',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
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
