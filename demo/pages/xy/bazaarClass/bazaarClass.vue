<template>
	<view class="bazaarClass">
		<!-- 头部start -->
		<view class="bazaarClass-header">
			<!-- 导航栏 -->
			<cu-custom cl bgColor="bg-gradual-white" :isBold="isBold" :isBack="true">
				<block slot="content">分类</block>
			</cu-custom>
		</view>
		<view class="view-ul">
			<view class="view-li" v-for="(item, index) in esclassify" :key="index" @tap="openClass(item.id)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
		import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				// 控制自定义导航栏是否字体加粗
				isBold: true,
				
				// 商品分类
				esclassify: [],
			}
		},
		onLoad() {
			uni.request({
				url: 'http://gs.itsse.cn:9999/api/v1/esclassify',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
					this.esclassify = res.data.data[1]
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			openClass(id) {
				console.log(id)
				uni.navigateTo({
					url: '../bazaarIssue/bazaarIssue?id=' + id,
				});
			}
		},
		components: {
			cuCustom
		}
	}
</script>

<style>
	.view-li{
		margin:  0 50upx;
		line-height: 80upx;
		border-bottom:  1px solid #fafafa;
	}
	.bazaarClass,
	uni-page-body{
		height: 100%;
		background-color: #fff;
	}
</style>
