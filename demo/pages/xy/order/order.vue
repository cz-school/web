<template>
	<view class="order">
		<cu-custom bgColor="bg-gradual-white" :isBold="isBold" :isBack="true" :url="'/pages/self/self'"><block slot="content">我买到的</block></cu-custom>
		<view class="order-list">
			<!-- 第一个订单 -->
			<view class="order-box" v-for="(item,index) in orderlist" :key='index'>
				<!-- 订单图片名字价格状态 -->
				<view class="order-particulars">
					<view class="order-particulars-img"><image :src="item.shop_img"></image></view>
					<view class="order-particulars-specific">
						<view class="order-particulars-name"><text>{{item.shop_name}}</text></view>
						<view class="order-particulars-price"><text>￥{{item.shop_price}}</text></view>
						<view class="order-particulars-state"><text @tap="ck(item.order_comment)">交易成功</text></view>
					</view>
				</view>
				<!-- 订单评价 -->
				<view class="order-comment">
					<button  v-if="item.order_comment == null" @tap="btn(item.id)">评论</button>
					<button  v-if="item.order_comment !== null" @tap="examine(item.order_comment)">查看评论</button>
				</view>
				<view class="content">
				    <Modal v-model="show" :title='title' @confirm='confirm' @event='event'/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// 导航栏组件
import cuCustom from '@/colorui/components/cu-custom.vue';
// 
import Modal from '@/components/x-modal/x-modal'
export default {
	components: {
		cuCustom,
		Modal
	},
	data() {
		return {
			// 控制自定义导航栏是否字体加粗
			isBold: true,
			// 用户id
			userid:1,
			// 订单列表
			orderlist:[],
			show: false,
			title:'',
		};
	},
	methods: {
		ck(num){
			console.log(num)
		},
		gainOrder(){
			uni.request({
				url: 'http://gs.itsse.cn:9999/api/v1/gainOrder',
				method: 'POST',
				data:{userid:this.userid},
				success: res => {
					// console.log(res.data.data.reverse())
					
					this.orderlist = res.data.data.reverse()
				},
				fail: () => {},
				complete: () => {}
			});
		},
		// 评论
		btn(id){
			uni.navigateTo({
				url: '../evaluate/evaluate?id='+id,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		// 查看评论
		examine(comment){
			this.show = true
			this.title = comment
			console.log(comment)
		},
		confirm(e){
			   console.log(e,"成功");
		},
		event(e){
		console.log(e)
		},
	},
	onLoad(e) {
		this.gainOrder()
		uni.getStorage({
		    key: 'user_id',
		    success: function (res) {
		        // console.log(res.data);
				this.userid = res.data
		    }
		})
	}
};
</script>

<style>
.order-list {
	position: relative;
}
.order-box {
	display: flex;
	flex-direction: column;
	margin-bottom: 20upx;
	background-color: #FFFFFF;
}
.order-particulars {
	width: 100%;
	display: flex;
	flex-direction: row;
	background-color: #ffffff;
	padding: 20upx;
}
.order-particulars-img {
	width: 250upx;
	height: 250upx;
	margin-right: 20upx;
	box-sizing: border-box;
}
.order-particulars-img image {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}
.order-particulars-specific {
	display: flex;
	flex-direction: column;
}
.order-particulars-name {
	width: 100%;
	font-size: 32upx;
	font-weight: 500;
	color: #000000;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal ！important;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* 显示1行，为auto时不隐藏 */
	-webkit-box-orient: vertical;
}
.order-particulars-price {
	width: 100%;
	font-size: 32upx;
	color: #f43f3b;
	line-height: 150upx;
}
.order-particulars-state {
	width: 100%;
	font-size: 32upx;
	color: #000000;
}
.order-comment {
	width: 100%;
	height: 80upx;
	border-bottom: 1upx solid #eeeeee;
	border-top: 1upx solid #eeeeee;
	display: flex;
	flex-direction: row;
	position: relative;
	border-radius: 0;
}
.order-comment button {
	width: 200upx;
	height: 60upx;
	font-size: 14upx;
	border: 1upx solid #eeeeee;
	line-height: 60upx;
	background-color: #FFFFFF;
	align-self: center;
	position: absolute;
	right: 20upx;
}
</style>
