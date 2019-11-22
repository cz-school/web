<template>
	<view>
		<view class="bazaarIssue">
			<!-- 头部start -->
			<view class="bazaarIssue-header">
				<!-- 导航栏 -->
				<cu-custom cl bgColor="bg-gradual-white" :isBold="isBold" :isBack="true">
					<block slot="content">发布</block>
				</cu-custom>
			</view>

			<view class="IssueMsg">
				<view class="uni-form-item uni-column">
					<view class="title">标题</view>
					<input class="uni-input" name='shop_name' v-model="shop_name" placeholder="商品标题,品牌型号可以帮助和搜索" />
				</view>
				<view class="uni-form-item uni-textarea">
					<view class="title">描述</view>
					<textarea class="item-uni-textarea" name='shop_describe' v-model="shop_describe" placeholder-style="color:#a1a1a1"
					 placeholder="详细描述商品的新旧程度,使用情况及出售原因能更快的帮您将商品出售哦~" />
					</view>
					
					<view class="addImg-box">
						<robby-image-upload limit=1 :showUploadProgress="showUploadProgress" v-model="imageData" @delete="deleteImage" @add="addImage"></robby-image-upload>
					</view>
			</view>
			<view class="IssueMsg price">
				<view class="priceTitle">
					想卖多少钱
				</view>
				<view class="uni-form-item-ul">
					<view class="uni-form-item uni-column">
						<view class="title">价格</view>
						<input class="uni-input" name='shop_price' v-model="shop_price" placeholder="$0.00" type="number"/>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">原价</view>
						<input class="uni-input" name='shop_original_cost' v-model="shop_original_cost" placeholder="$0.00" type="number"/>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">计量单位</view>
						<input class="uni-input" v-model="shop_unit" name='shop_unit' placeholder="0" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">几成新</view>
						<input class="uni-input" v-model="shop_num_new" name="shop_num_new" placeholder="10" type="number" maxlength=1/>
					</view>
				</view>
				<!-- <view class="priceClass">
					<navigator url="/pages/xy/bazaarClass/bazaarClass">
						<view class="priceClassText">
							分类
						</view>
						<view class="priceClassIcon">
							<svg t="1574062221064" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1829" width="16" height="16"><path d="M438.584533 738.132267c14.946133 15.374933 39.2 15.374933 54.1792 0l192.600533-198.250667c14.9376-15.403733 14.9376-40.3744 0-55.746133L492.763733 285.890133c-14.9792-15.403733-39.233067-15.403733-54.1792 0-14.970667 15.3792-14.970667 40.3456 0 55.7504L604.1056 512.0064l-165.521067 170.346667C423.613867 697.7568 423.613867 722.7232 438.584533 738.132267L438.584533 738.132267zM438.584533 738.132267" p-id="1830"></path></svg>
						</view>
					</navigator>
				</view> -->
			</view>
			<view class="IssueMsg submit-box">
				<view class="submit-btn" @tap="addShop">
					发布商品
				</view>
			</view>
		</view>
		<view class="content">
		    <Modal v-model="show" title='请完善商品信息' @confirm='confirm' @event='event'/>
		</view>
		<view class="content">
		    <Modal v-model="show1" title='添加成功' @confirm='confirm' @event='event'/>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'
	import Modal from '@/components/x-modal/x-modal'
	export default {
		onLoad(e) {
			console.log(e)
			this.esclassifyId = e.id
		},
		data() {
			return {
				// 控制自定义导航栏是否字体加粗
				isBold: true,
				// 商品信息
				shop_name: "",
				shop_describe: "",
				shop_price: "",
				shop_original_cost: "",
				shop_unit: "",
				shop_num_new: "",
				// 上传图片
				// 删除图片
				enableDel : false,
				// 添加图片
				enableAdd : false,
				// 图片是否可拖动
				enableDrag : false,
				showUploadProgress: false,
				imageData : [],
				esclassifyId: null,
				shopId: null,
				show: false,
				show1: false
			}
		},
		methods: {
		    cancel(e){
			    console.log(e,"失败");
			},
			confirm(e){
				   console.log(e,"成功");
			},
			event(e){
			console.log(e)
			},
			// 上传图片
			deleteImage: function(e){
				// console.log
				
			    // console.log(e)
			},
			addImage: function(e){
				e.allImages = e.currentImages
			    // console.log(e)
			},
			addShop(e){
				if(this.shop_name==""||this.shop_describe==""||this.shop_price==""||this.imageData[0]==""||this.shop_original_cost==""||this.shop_unit==""||this.shop_num_new==""){
					return this.show = true
				}
				const shopData={
					shop_name:this.shop_name,
					shop_describe:this.shop_describe,
					shop_price:this.shop_price,
					shop_img:this.imageData[0],
					shop_original_cost:this.shop_original_cost,
					shop_unit:this.shop_unit,
					shop_num_new:this.shop_num_new
				}
				// console.log(shopData)
				uni.request({
					url: 'http://127.0.0.1:9999/api/v1/shop',
					method: 'post',
					data: {shopData},
					success: res => {
						// console.log(res.data.data[0].maxId)
						this.shopId = res.data.data[0].maxId
						uni.request({
							url: `http://127.0.0.1:9999/api/v1/esclassify_shop`,
							method: 'post',
							data: {
								esclassifyId:this.esclassifyId,
								shopId:this.shopId
							},
							success: res => {
								// console.log(res)
								this.esclassify = res.data.data
								this.show1 = true
								uni.navigateTo({
									url: '../bazaarIndex/bazaarIndex',
								});
							},
							fail: () => {},
							complete: () => {}
						});
					},
					fail: () => {},
					complete: () => {}
				});
				
			}
		},
		components: {
			cuCustom,
			robbyImageUpload,
		    Modal
		}
	}
</script>

<style>
	.modal-col{
		line-height: 80upx;
	}
	uni-view{
		line-height: 34px !important;
	}
	.uni-input,
	.uni-form-item,
	.uni-form-item .title[data-v-ade4a690]{
		display: block;
		padding: 0;
		background-color: #fafafa;
	}
	.cu-custom{
		position: fixed !important;
		top: 0;
	}
	.submit-btn{
		color: #fff;
		text-align: center;
		/* padding: 30upx; */
		border-radius: 30px;
		background-color: #f8e620;
	}
	.submit-box{
		padding: 50upx 20upx;
	}
	.priceClassText{
		float: left;
		width: 90%;
	}
	.priceClassIcon svg{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
	}
	.priceClassIcon{
		position: relative;
		float: left;
		width: 10%;
	}
	.priceClass{
		overflow: hidden;
		font-size: 30upx;
		text-indent: 40upx;
		line-height: 80upx;
	}
	.price .uni-input{
		width: 65% !important;
		text-indent: 20upx;
	}
	.price .title{
		width: 35% !important;
	}
	.price .uni-form-item{
		float: left;
		width: 50%;
	}
	.uni-form-item-ul{
		overflow: hidden;
	}
	.priceTitle{
		text-align: center;
		font-size: 30upx;
		line-height: 100upx;
	}
	
	.addImg-box{
		margin: 0 0 60upx 60upx;
	}
	.item-uni-textarea{
		float: left;
		padding-right: 80upx;
		font-size: 30upx;
		width: 80%;
		margin-top: 20upx;
		/* line-height: 80upx; */
	}
	.uni-form-item {
		font-size: 30upx;
		overflow: hidden;
	}

	.uni-form-item .uni-input {
		font-size: 30upx;
		width: 80%;
		height: 80upx;
		line-height: 80upx;
	}

	.uni-form-item .title{
		text-align: center;
		width: 20%;
		float: left;
		line-height: 80upx;
	}
	
	.IssueMsg{
		margin-top: 20upx;
		overflow: hidden;
		background-color: #fafafa;
	}

	.bazaarIssue-header[data-v-ade4a690] {
		background-color: #fff;
	}
</style>
