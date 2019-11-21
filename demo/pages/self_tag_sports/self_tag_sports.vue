<template>
	<view class="self_tag_our">
		<view class="cu-bar bg-white fixed">
			<cu-custom bgColor="bg-gradual-white" :isBack="true" :url="'/pages/edit_self/edit_self'">
				<block slot="backText"></block>
				<block slot="content">我的个人标签</block>
			</cu-custom>
		</view>
		<view class="cu-bar bg-white  create_tag">
			<view class="tag_icon" @tap="showModal" data-target="DialogModal1">+</view>
			<view class="tag_text" @tap="showModal" data-target="DialogModal1">创建标签</view>
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
			<view class="cu-bar bg-white" v-for="(item,index) in tagList" :key='index'>
				<checkbox-group class="block" @change="CheckboxChange(index)">
					<view class="cu-form-group">
						<view class="title check_title">{{item.tag_name}}</view>
						<checkbox class='round ' :class="item.checked?'checked':''" :checked="item.checked?true:false"></checkbox>
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
				baseUrl: "http://127.0.0.1:9999/api/v1",
				// 用户id
				id: '',
				// 选中tag标签数组
				our_tag: [],
				num: 0
			}
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
					url: this.baseUrl + `/add_sports_tag/${this.id}`,
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
					url: this.baseUrl + `/our_sports/${this.id}`,
					method: 'GET',
					success: (res) => {
						if (res.data.ok !== 1) {
							uni.showToast({
								title: "请求失败"
							})
						}
						let data = res.data.data.tag_sport_name.split(',')
							let our_tag = JSON.parse(uni.getStorageSync('our_sports'))
							if (our_tag) {
								this.our_tag = our_tag
							}

						data.forEach((v, i) => {
							this.tagList.push({
								id: i,
								tag_name: v,
								checked: false
							})
						})
						our_tag.forEach((v, i) => {
							let check = this.tagList.findIndex(item => {
								return item.tag_name == v.tag_name
							})
							this.tagList[check].checked = true
						})

					},
					fail(error) {
						console.log(error)
					}
				})
			},
			// 选中框
			CheckboxChange(index) {
				if (this.num < 5) {
					this.tagList[index].checked = !this.tagList[index].checked
				} else {
					uni.showToast({
						title: "亲，只能添加五个奥"
					})
					return
				}
				if (this.tagList[index].checked == true) {
					this.num++
					this.our_tag.push({
						id: index,
						tag_name: this.tagList[index].tag_name,
						checked: this.tagList[index].checked
					})
				} else {
					this.num--
					let a = this.our_tag.findIndex(v => v.id == index)
					this.our_tag.splice(a, 1)
				}
				uni.setStorage({
					key: 'our_sports',
					data: JSON.stringify(this.our_tag)
				})
			},
		}
	}
</script>

<style>
	.self_tag_our {
		width: 100%;
		margin-top: 100rpx;
	}

	.create_tag {
		z-index: 10;
		margin-bottom: 100rpx;
		width: 100%;
		position: fixed;
		left: 0rpx;
		top: 100rpx;
		padding: 0rpx 20rpx;
		font-size: 30rpx;
		color: red;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.create_tag .tag_icon {
		border: 1rpx solid red;
		margin-right: 30rpx;
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		font-weight: 700;
		border-radius: 100%;
	}

	.tag_list {
		margin-top: 200rpx;
	}

	.check_title {
		width: 600rpx;
	}
</style>
