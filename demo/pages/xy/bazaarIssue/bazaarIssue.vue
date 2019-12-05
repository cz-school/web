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
					
					<!-- 发布商品缩略图 -->
						<view>
							<view class="title padding-lr-lg">商品缩略图</view>
							<view @tap="uImageTap" class="addImg-box">
								<sunui-upbasic  :upImgConfig="upImgBasic" @onUpImg="upBasicData" @onImgDel="delImgInfo" ref="uImage"></sunui-upbasic>
							</view>
						</view>
					<!-- 发布商品详情图 -->
					<view>
						<view class="title padding-lr-lg">商品缩略图</view>
						<view @tap="uImagesTap" class="addImg-box">
							<sunui-upbasic  :upImgConfig="upImgBasics" @onUpImg="upBasicsData" @onImgDel="delImgsInfo" ref="uImages"></sunui-upbasic>
						</view>
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
				basicArr:null, //商品缩略图
				basicsArr:null, // 商品详情图
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
				show1: false,
				// 基础版配置
				upImgBasic: {
					// 后端图片接口地址
					basicConfig: {
						url: 'http://gs.itsse.cn:9999/api/v1/upload_phone'
					},
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 1,
					// 相机来源(相机->camera,相册->album,两者都有->all,默认all)
					sourceType: 'all',
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
				},
				upImgBasics: {
					// 后端图片接口地址
					basicConfig: {
						url: 'http://gs.itsse.cn:9999/api/v1/upload_phone'
					},
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
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
					// isAddImage: false,
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
			addShop(e){
				if(this.shop_name==""||this.shop_describe==""||this.shop_price==""||this.imageData[0]==""||this.shop_original_cost==""||this.shop_unit==""||this.shop_num_new==""){
					return this.show = true
				}
				const shopData={
					shop_name:this.shop_name,
					shop_describe:this.shop_describe,
					shop_price:this.shop_price,
					shop_img:this.basicArr[0],
					shop_original_cost:this.shop_original_cost,
					shop_unit:this.shop_unit,
					shop_num_new:this.shop_num_new,
					shop_imgList:this.basicsArr
				}
				// console.log(shopData)
				uni.request({
					url: 'http://gs.itsse.cn:9999/api/v1/shop',
					method: 'post',
					data: {shopData},
					success: res => {
						// console.log(res.data.data[0].maxId)
						this.shopId = res.data.data
						uni.request({
							url: `http://gs.itsse.cn:9999/api/v1/esclassify_shop`,
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
				
			},
			// 手动上传图片(适用于表单等上传) -2019/05/10增加
			uImageTap() {
				this.$refs.uImage.uploadimage(this.upImgBasic);
			},
			uImagesTap (){
				this.$refs.uImages.uploadimage(this.upImgBasics);
			},
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e, this.basicArr.splice(e.index, 1));
			},
			async delImgsInfo(e) {
				console.log('你删除的图片地址为:', e, this.basicsArr.splice(e.index, 1));
			},
			// 存储商品缩略图 方法
			async upBasicData(e) {
				console.log('===>',e);
				// 上传图片数组
				let arrImg = [];
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						if (e[i].path_server != "") {
							await arrImg.push(e[i].path_server);
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				console.log(arrImg)
				this.basicArr = arrImg;
			
				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				if (arrImg.length == this.upImgBasic.count) {
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
			},
			// 存储商品详情图方法
			async upBasicsData(e) {
				console.log('===>',e);
				// 上传图片数组
				let arrImg = [];
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						if (e[i].path_server != "") {
							await arrImg.push(e[i].path_server);
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				this.basicsArr = arrImg;
			
				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				if (arrImg.length == this.upImgBasic.count) {
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
			},
		
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
	.sunsin_width[data-v-3e62d6e2]{
		width: auto !important;
		height: auto !important;
	}
	uni-view.sunsin_add_image.sunsin_width{
		width: 70px !important;
		height: 70px !important;
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
