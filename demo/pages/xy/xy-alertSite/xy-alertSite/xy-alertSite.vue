<template>
	<view class="addSite">
		<cu-custom class="site-nav" bgColor="bg-gradual-black"  :isBack="true" :url="'/pages/xy/xy-site/site?path='+previousPage.path">
			<block slot="content">修改收货地址</block>
		</cu-custom>
		 <mpopup  ref="mpopup" :isdistance="true"></mpopup>  
		<view class="xy-name xy-siteBox">
			<span class="xy-siteBox-left">收货人</span>
			<input type="text" v-model="siteForm.users_name"/>
		</view>
		<view class="xy-phone xy-siteBox">
			<span class="xy-siteBox-left">手机号码</span>
			<input type="text" v-model="siteForm.users_mobile"/>
		</view>
		<view class="xy-area xy-siteBox">
			<span class="xy-siteBox-left">宿舍楼</span>
			<input type="text" v-model="siteForm.dormitory"/>
		</view>
		<view class="xy-area xy-siteBox">
			<span class="xy-siteBox-left">宿舍号</span>
			<input type="text"  v-model="siteForm.dormitory_no"/>
		</view>
		<view class="xy-inDetail xy-siteBox inDetail">
			<span class="xy-siteBox-left">详细地址</span>
			<textarea rows="3" cols="20" class="xy-inDetail-textarea" placeholder="街道,楼牌号等" v-model="siteForm.address"></textarea>
		</view>
		<view class="xy-setSite xy-siteBox defaultRess">
			<view class="xy-siteBox-top">
				<span class="xy-siteBox-left">设置默认地址</span>
				<span class="xy-siteBox-right">
					<async-switch :checked="checked1" @change="change1" color="#007aff"></async-switch>
				</span>
			</view>
			<span>提醒：每次下单会默认推荐使用该地址</span>
		</view>
		
		
		<view class="site-bootom">
			
			<view class="site-box">
				<view class="delete-site" @click="deleteSite">
					删除
				</view>
				<view class="site-addSite" @click="alertSite">
					保存
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import asyncSwitch from "@/components/helang-asyncSwitch/helang-asyncSwitch.vue"
	import mpopup from '../../../../components/xuan-popup/xuan-popup.vue'
	export default {
		data() {
			return {
				// 收货地址信息
				siteForm: {
					users_name:'',
					users_mobile:'',
					dormitory:'',
					dormitory_no:'',
					address:''
					
				},
				checked1:true,
				// siteForm:{},
				siteId : 0,
				previousPage:''
			}
		},
		methods: {	
			change1() {
				if(this.checked1) {
					this.checked1 = false
				} else {
					this.checked1 = true
				}
				
				console.log(this.checked1)
				},
			formData() {
				// console.log(this.siteId)
				const that = this
				uni.getStorage({
				    key: 'id',
				    success: function (res) {
						that.siteId = res.data	
						// console.log(that.siteId)
				    },
					
				});
				
			},
			// 确认修改
			alertSite() {
				if(this.siteForm.users_name == '') {
					this.$refs.mpopup.open({
					    type:'err',
					    content:'收货人姓名不能为空',
					    timeout:1000,
					    isClick:false
					});
					return
				} else if(this.siteForm.users_mobile == '' || parseInt(this.siteForm.users_mobile) != this.siteForm.users_mobile) {
					this.$refs.mpopup.open({
					    type:'err',
					    content:'收货人电话不能为空并且必须是数字',
					    timeout:1000,
					    isClick:false
					});
					return
				} else if(this.siteForm.dormitory == '') {
					this.$refs.mpopup.open({
					    type:'err',
					    content:'收货人宿舍楼不能为空',
					    timeout:1000,
					    isClick:false
					});
					return
				} else if(this.siteForm.dormitory_no == '') {
					this.$refs.mpopup.open({
					    type:'err',
					    content:'收货人宿舍号不能为空',
					    timeout:1000,
					    isClick:false
					});
					return
				}
				let id = uni.getStorageSync('user_id')
				uni.request({
					// 接口
					url: 'http://gs.itsse.cn:9999/api/v1/alertSite',
					// 请求方式
					method: 'GET',
					// 携带的数据
					data: {msg:this.siteForm,checked1:this.checked1,id:id},
					// 请求成功
					success: res => {
						// console.log(res)
						if(res.data.ok == 1) {
							this.$refs.mpopup.open({
							    type:'success',
							    content:'修改地址成功',
							    timeout:2000,
							});
							setTimeout(()=> {
								// 返回地址页面
								uni.navigateTo({
									url:'../../xy-site/site',
									success:res =>{},
									fail:()=>{},
									complete:()=>{}
								})
							},2000)
						}
						// 返回地址页面
						// uni.navigateTo({
						// 	url:'../../xy-site/site',
						// 	success:res =>{},
						// 	fail:()=>{},
						// 	complete:()=>{}
						// })
					},
					
					// 请求失败
					fail: () => {},
					complete: () => {}
				})
				
			},
			// 删除功能
			deleteSite() {
			
				uni.request({
					// 接口
					url: 'http://gs.itsse.cn:9999/api/v1/deleteSite',
					// 请求方式
					method: 'DELETE',
					// 携带的数据
					data: {id:this.siteId},
					// 请求成功
					success: res => {
						console.log(res)
						if(res.data.ok == 1) {
							this.$refs.mpopup.open({
							    type:'success',
							    content:'删除地址成功',
							    timeout:2000,
							});
							setTimeout(()=> {
								// 返回地址页面
								uni.navigateTo({
									url:'../../xy-site/site',
									success:res =>{},
									fail:()=>{},
									complete:()=>{}
								})
							},2000)
						}
						
					},
					
					// 请求失败
					fail: () => {},
					complete: () => {}
				})
				
			},
			alertForm() {
				uni.request({
					// 接口
					url: 'http://gs.itsse.cn:9999/api/v1/siteShow',
					// 请求方式
					method: 'GET',
					// 携带的数据
					data: {id:this.siteId},
					// 请求成功
					success: res => {
						this.siteForm = res.data.data[0]
						// console.log(res)
						// // this.$set('siteForm',res.data.data[0])
						// console.log(this.siteForm)
						if(res.data.data[0].sdefault === 1) {
							this.checked1 = true
						} else {
							this.checked1 = false
						}
					},
					// 请求失败
					fail: () => {},
					complete: () => {}
				})
			}
		},
		components: {
			cuCustom,
			"async-switch":asyncSwitch,
			mpopup
		},
		onShow(){
		},
		onLoad(e) {
			this.previousPage = e
			this.siteId = e.id 
			this.formData()
			// console.log(this.siteForm)
			this.alertForm()
		},
		
	}
</script>

<style>
.addSite {
	height: 1330upx;
	background-color: white;
}
.xy-siteBox {
	width: 690upx;
	height: 100upx;
	border-bottom: 1px solid #f0f0f0;
	line-height: 100upx;
	margin-left: 50upx;
}
.xy-siteBox-left {
	float: left;
	display: block;
	width: 180upx;
	height: 100%;
}
.xy-siteBox-right {
	float: right;
}
.xy-siteBox-top {
	width: 100%;
	height: 100upx;
}
.xy-inDetail-textarea {
	width: 510upx;
	float: right;
	padding-top: 32upx;
}
.inDetail {
	height: 300upx;
}
.defaultRess {
	height: 200upx;
}
.async-switch {
	color: #007AFF;
}
input {
	height: 100upx;
	line-height: 100upx;
}
.site-bootom {
	height: 240upx;
	width: 100%;
}
.site-box {
	width: 100%;
	height: 240upx;
	background-color: white;
	position: fixed;
	bottom: 0upx;
	/* left: 100upx; */
}
.site-addSite {
	position: absolute;
	left: 100upx;
	top: 20upx;
	width: 550upx;
	height: 60upx;
	background-color: #f01809;
	color: white;
	text-align: center;
	line-height: 60upx;
	border-radius: 30upx;
}
.delete-site {
	position: absolute;
	left: 100upx;
	top: 100upx;
	width: 550upx;
	height: 60upx;
	background-color: #007AFF;
	color: white;
	text-align: center;
	line-height: 60upx;
	border-radius: 30upx;
	}
</style>
