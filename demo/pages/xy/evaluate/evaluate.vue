<template>
	<view class="evaluate">
		<cu-custom bgColor="bg-gradual-white" :isBold="isBold" :isBack="true" :url="'../order/order'"><block slot="content">评价</block></cu-custom>
		<view class="evaluate-box">
			<textarea maxlength='250' placeholder="聊聊这次交易您的感受" v-model="value"/>
		</view>
		<view class="discuss-btn">
			<button @tap="publish" form-type='submit'>发表评价</button>
		</view>
	</view>
</template>

<script>
// 导航栏组件
import cuCustom from '@/colorui/components/cu-custom.vue';
export default {
	components: {
		cuCustom
	},
	data() {
		return {
			// 控制自定义导航栏是否字体加粗
			isBold: true,
			// 评论
			value:'',
			// 订单id
			id:2
		};
	},
	methods:{
		publish(){
			uni.request({
				url: 'http://gs.itsse.cn:9999/api/v1/comment',
				method: 'POST',
				data: { id: this.id,value:this.value},
				success: res => {
					uni.navigateTo({
						url: '../order/order',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	onLoad(e){
		this.id = e.id
	}
};
</script>

<style>
	.evaluate-box{
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.evaluate-box textarea{
		width: 100%;
		height: 100%;
	}
	.discuss-btn{
		width: 100%;
		height: 150upx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0upx;
		text-align: center;
		display: flex;
		align-items: center;
	}
	.discuss-btn button{
		background-color: #F8E622;
		width: 90%;
		height: 100upx;
		border-radius: 0;
	}
</style>
