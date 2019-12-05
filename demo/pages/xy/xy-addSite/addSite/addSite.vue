<template>
	<view class="addSite">
		<cu-custom class="site-nav" bgColor="bg-gradual-black"  :isBack="true" :url="'/pages/xy/xy-site/site'">
			<block slot="content">新建收货地址</block>
		</cu-custom>
		 <mpopup  ref="mpopup" :isdistance="true"></mpopup>  
		<view class="xy-name xy-siteBox">
			<span class="xy-siteBox-left">收货人</span>
			<input type="text" value="" v-model="siteMsg.name"/>
		</view>
		<view class="xy-phone xy-siteBox">
			<span class="xy-siteBox-left">手机号码</span>
			<input type="text" value="" v-model="siteMsg.phone"/>
		</view>
		<view class="xy-area xy-siteBox">
			<span class="xy-siteBox-left">宿舍楼</span>
			<input type="text" value="" v-model="siteMsg.dormitory"/>
		</view>
		<view class="xy-area xy-siteBox">
			<span class="xy-siteBox-left">宿舍号</span>
			<input type="text" value="" v-model="siteMsg.dormitory_no"/>
		</view>
		<view class="xy-inDetail xy-siteBox inDetail">
			<span class="xy-siteBox-left">详细地址</span>
			<textarea rows="3" cols="20" class="xy-inDetail-textarea" placeholder="街道,楼牌号等" v-model="siteMsg.address"></textarea>
		</view>
		<view class="xy-setSite xy-siteBox defaultRess">
			<view class="xy-siteBox-top">
				<span class="xy-siteBox-left">设置默认地址</span>
				<span class="xy-siteBox-right">
					<async-switch :checked="siteMsg.checked1" @change="change1" color="#007aff"></async-switch>
				</span>
			</view>
			<span>提醒：每次下单会默认推荐使用该地址</span>
		</view>
		<view class="site-bootom">
			<view class="site-box">
				<view class="site-addSite" @click="addSite">
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
				siteMsg: {
					name:'',
					phone:'',
					dormitory:'',
					dormitory_no:'',
					address:'',
					checked1:true
				}
			}
		},
		methods: {
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
				
			change1() {
				if(this.siteMsg.checked1) {
					this.siteMsg.checked1 = false
				} else {
					this.siteMsg.checked1 = true
				}
			},
			addSite() {
				// console.log(this.siteMsg.checked1)
				if(this.siteMsg.name == '') {
					this.$refs.mpopup.open({
					    type:'err',
					    content:'收货人姓名不能为空',
					    timeout:1000,
					    isClick:false
					});
					return
				} else if(this.siteMsg.phone == '' || parseInt(this.siteMsg.phone) != this.siteMsg.phone) {
					this.$refs.mpopup.open({
					    type:'err',
					    content:'收货人电话不能为空,并且必须是数字',
					    timeout:1000,
					    isClick:false
					});
					return
				} else if(this.siteMsg.dormitory == '') {
					this.$refs.mpopup.open({
					    type:'err',
					    content:'收货人宿舍楼不能为空',
					    timeout:1000,
					    isClick:false
					});
					return
				} else if(this.siteMsg.dormitory_no == '') {
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
					url: 'http://gs.itsse.cn:9999/api/v1/addSite',
					// 请求方式
					method: 'POST',
					// 携带的数据
					data: {addUsers:this.siteMsg,id:id},
					// 请求成功
					success: res => {
						// console.log(res)
						if(res.data.ok == 1) {
							this.$refs.mpopup.open({
							    type:'success',
							    content:'添加地址成功',
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
				
				// uni.navigateTo({
				// 	url:'../../xy-site/site',
				// 	success:res =>{},
				// 	fail:()=>{},
				// 	complete:()=>{}
				// })
			},
			
		},
		components: {
			cuCustom,
			"async-switch":asyncSwitch,
			mpopup
		},
		created() {
			
		}
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
	height: 100upx;
	width: 100%;
}
.site-box {
	width: 100%;
	height: 100upx;
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
</style>
