<template>
	<view class="edit_self">
		<!-- 自定义导航栏 -->
		<view class="cu-bar bg-white fixed">
			<cu-custom bgColor="bg-gradual-white " :url="'/pages/self/self'" isBack="true">
				<block slot="content">编辑个人信息</block>
			</cu-custom>
			<text class="save_info">保存</text>
		</view>
		<!-- 上传图片 -->
		<view class="photo">
			<view class="photo_top">
				<view class="imageItem">
					<image src="../../static/goodMood.jpg" mode=""></image>
				</view>
				<view class="photo_uplod">
					<view class="imageUpload" @tap="selectImage">+</view>
					<view class="imageUpload" @tap="selectImage">+</view>
				</view>
			</view>
			<view class="photo_bottom">
				<view class="imageUpload" @tap="selectImage">+</view>
				<view class="imageUpload" @tap="selectImage">+</view>
				<view class="imageUpload" @tap="selectImage">+</view>
			</view>
			<!-- 上传显示 -->
			<!-- <image class="moveImage"></image> -->
		</view>
		<!-- card组件 -->
		<!-- 我的标签 -->
		<view class="cu-bar bg-white padding">
			<view class="tag_box">
				<view class="tag_title">
					<text>我的标签</text>
				</view>
				<view class="tag_content">
					<view class="icon_tag">#</view>
					<view class='cu-tag bg-black'>无趣</view>
					<view class="cuIcon-right"></view>
				</view>
			</view>
		</view>
		<!-- 我的兴趣 -->
		<view class="cu-bar bg-white padding  solid-bottom">
			<view class="tag_box">
				<view class="tag_title">
					<text>我的兴趣</text>
				</view>
				<view class="tag_content">
					<view class="cuIcon-tag icon_tag"></view>
					<view class='cu-tag bg-black'>极品飞车</view>
					<view class="cuIcon-right"></view>
				</view>
				<view class="tag_content">
					<view class="cuIcon-tag icon_tag"></view>
					<view class='cu-tag bg-purple'>民谣</view>
					<view class="cuIcon-right"></view>
				</view>
				<view class="tag_content">
					<view class="cuIcon-musicfill icon_tag"></view>
					<view class='cu-tag bg-brown'>戏剧</view>
					<view class="cuIcon-right"></view>
				</view>
				<view class="tag_content">
					<view class="cuIcon-tag icon_tag"></view>
					<view class='cu-tag bg-orange'>北京烤鸭</view>
					<view class="cuIcon-right"></view>
				</view>
			</view>
		</view>
		<view class="form_self">
			<form @submit="" @reset="">
				<view class="cu-form-group">
					<view class="title">昵称</view>
					<input placeholder="浅,陌" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<!-- <input placeholder="请选择你的性别" name="input"></input> -->
					<picker @change="PickerChange" :value="sexindex" :range="sexbox">
						<view class="picker">
							{{sexindex>-1?sexbox[sexindex]:'请先选择性别'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">生日</view>
					<!-- <input placeholder="0000-00-00" name="input"></input> -->
					<picker mode="date" :value="birthday" start="1900-01-01" end="2019-12-12" @change="DateChange">
						<view class="picker">
							{{birthday}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">学校</view>
					<input placeholder="北京交通大学" name="input" :disabled="true"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">签名</view>
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请填写你的个性签名"></textarea>
				</view>
			</form>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexindex: -1,
				sexbox: ['男', '女'],
				// 出生日期
				birthday: '0000-00-00',
				modalName: null
			}
		},
		methods: {
			PickerChange(e) {
				console.log(e)
				this.sexindex = e.detail.value
			},
			DateChange(e) {
				this.birthday = e.detail.value
			}
		}
	}
</script>
<style>
	.edit_self .save_info {
		margin-right: 20rpx;
		color: red;
		font-size: 35rpx;
	}

	.photo {
		margin-top: 100rpx;
		width: 100%;
	}

	.photo_top {
		display: flex;
		flex-direction: row;
		height: 500rpx;
	}

	.photo_top .imageItem {
		width: 66.6%;
		height: 500rpx;
	}

	.photo_top .imageItem image {
		height: 500rpx;
	}

	.photo_uplod {
		width: 33.3%;
		display: flex;
		flex-direction: column;
	}

	.photo_uplod .imageUpload {
		margin-bottom: 1rpx;
		height: 500rpx;
		line-height: 240rpx;
		text-align: center;
		font-size: 150rpx;
		color: #D9D9D9;
		background-color: #8799A3;
	}

	.photo_bottom {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.photo_bottom .imageUpload {
		margin-right: 1rpx;
		width: 260rpx;
		height: 240rpx;
		line-height: 240rpx;
		text-align: center;
		font-size: 150rpx;
		color: #D9D9D9;
		background-color: #8799A3;
	}

	.photo_bottom>.imageUpload:nth-child(3) {
		margin-right: 0rpx;
	}

	.tag_box {
		width: 700rpx;
	}

	.tag_title {
		width: 100%;
		font-size: 30rpx;
		font-weight: 700;
	}

	.tag_content {
		float: left;
		padding: 20rpx 0rpx;
		width: 700rpx;
		line-height: 40rpx;
	}

	.tag_content .icon_tag {
		float: left;
		font-weight: 700;
		font-size: 30rpx;
		margin-right: 20rpx;
	}

	.tag_content .cu-tag {
		float: left;
	}

	.tag_content .cuIcon-right {
		float: right;
		margin-left: 100rpx;
	}
</style>
