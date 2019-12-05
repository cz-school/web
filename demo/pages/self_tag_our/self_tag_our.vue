<template>
	<view class="action">
		<cu-custom bgColor="bg-gradual-green" :isBack="true" :url="'/pages/edit_self/edit_self'">
			<block slot="backText"></block>
			<block slot="content">我的个人标签</block>
		</cu-custom>
		<view class=" bg-white fixed  padding cf ">
			<view class="tag_icon fl" @tap="showModal" data-target="DialogModal1">+</view>
			<view class="tag_text fl text-red text-lg" @tap="showModal" data-target="DialogModal1">创建标签</view>
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">创建新标签</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<input type="text" v-model="inputvalue" placeholder="请创建你的标签" />
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
		<view class="tag_list">
			<view class="cu-bar bg-white" v-for="(item,index) in tagList" :key='index' @tap.stop="CheckboxChange(index)">
				<checkbox-group class="block">
					<view class="cu-form-group">
						<view class="title check_title">{{item.tag_name}}</view>
						<checkbox class='round' :class="item.checked?'checked':''" :checked="item.checked?true:false"></checkbox>
					</view>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			let userId = uni.getStorageSync('user_id');
			this.id = userId
			this.getdata()
		},
		data() {
			return {
				modalName: null,
				inputvalue: '',
				tagList: [],
				baseUrl: "http://gs.itsse.cn:9999/api/v1",
				// 用户id
				id: '',
				// 选中tag标签数组
				our_tag: [],
				num: 0
			}
		},
		// 离开页面的时候触发
		onUnload() {
			this.our_tag = []
			this.tagList.forEach((v, i) => v.checked == true ? this.our_tag.push(v) : [])
			uni.setStorageSync('ourTags', JSON.stringify(this.our_tag))
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 点击保存创建
			saveModal() {
				this.tagList.push({
					id: this.tagList.length,
					tag_name: this.inputvalue,
					checked: false
				})
				uni.request({
					url: this.baseUrl + `/add_our_tags/${this.id}`,
					method: "POST",
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					data: {
						tags: JSON.stringify(this.tagList),
						id: this.id
					},
					success: (res) => {
						if (res.data.ok == 1) {
							uni.showToast({
								title: "添加成功"
							})
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
				this.inputvalue = ''
				return this.modalName = null
			},
			getdata() {
				uni.request({
					url: this.baseUrl + `/ourTag/${this.id}`,
					method: 'GET',
					success: (res) => {
						if (res.data.ok !== 1) {
							uni.showToast({
								title: "请求失败",
								image: '../../static/toast/error.png'
							})
						}
						const data = res.data.data.tag_our_name.split(',')
						const taglist = data
						taglist.forEach((v, i) => {
							this.tagList.push({
								id: i,
								tag_name: v,
								checked: false
							})
						})
						uni.getStorage({
							key: 'ourTags',
							success: (res) => {
								this.our_tag = JSON.parse(res.data)
								this.our_tag.forEach(v => {
									let check = this.tagList.findIndex(i => v.id == i.id)
									this.tagList[check].checked = true
								})
							}
						})
					},
					fail(error) {
						console.log(error)
					}
				})
			},
			// 选中框
			CheckboxChange(index) {
				this.tagList[index].checked = !this.tagList[index].checked
			},
		}
	}
</script>

<style>
	.tag_icon {
		margin-top: 10rpx;
		border: 1rpx solid red;
		margin-right: 30rpx;
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		font-weight: 700;
		border-radius: 100%;
	}

	.check_title {
		width: 600rpx;
	}
</style>
