<template>
	<view class="index">
		<!-- 顶部导航 -->
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" :url="'/pages/index/index'">
			<block slot="backText">返回</block>
			<block slot="content" :isBold='isBold'>校园食堂</block>
		</cu-custom>
		<!-- 搜索栏 -->
		<view class="flex search_top p-xs margin-bottom-sm mb-sm">
			<view class="search_icon  padding-sm margin-xs radius">
				<view>
					<image src="../../static/meituan/index/search_icon.png" style="height: 100%;" mode=""></image>
				</view>
			</view>
			<view class="flex-twice search_input padding-sm margin-xs radius">
				<input @change="changeinput" type="text" maxlength="11" v-model="queryinfo.query" placeholder="查找菜品或店铺" @input="onKeyUserNameInput"
				 class="is-input1 " />
			</view>
		</view>
		<!-- 窗口展示 -->
		<view class="bg-white padding">
			<view class="grid margin-bottom text-center">
				<view class="padding win_show" v-for="(item,indexs) in winList" :key="indexs">{{item.win_name}}</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="swiper">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<!-- 食品分类模块 -->
		<view class="foodClassify">
			<view class="flex solid-bottom padding justify-center">
				<view class="classify_modle padding-sm margin-xs radius">
					<view class="classify_img">
						<image src="../../static/meituan/index/search_icon.png" mode=""></image>
					</view>
					<view class="classify_text">
						美食
					</view>
				</view>
				<view class="classify_modle padding-sm margin-xs radius">
					<view class="classify_img">
						<image src="../../static/meituan/index/search_icon.png" mode=""></image>
					</view>
					<view class="classify_text">
						美食
					</view>
				</view>
				<view class="classify_modle padding-sm margin-xs radius">
					<view class="classify_img">
						<image src="../../static/meituan/index/search_icon.png" mode=""></image>
					</view>
					<view class="classify_text">
						美食
					</view>
				</view>
				<view class="classify_modle padding-sm margin-xs radius">
					<view class="classify_img">
						<image src="../../static/meituan/index/search_icon.png" mode=""></image>
					</view>
					<view class="classify_text">
						美食
					</view>
				</view>
			</view>
		</view>
		<!-- 店铺推荐  tab切换-->
		<view class="uni-tab-bar">
			<scroll-view class="uni-swiper-tab" scroll-x>
				<block v-for="(tab,index) in tabBars" :key="tab.id" :style="scrollStyle">
					<view class="swiper-tab-list" :class="{'active' : tabIndex==index}" @tap="tabtap(index)">
						{{tab.name}} {{tab.num?tab.num:""}}
						<view class="swiper-tab-line"></view>
					</view>
				</block>
			</scroll-view>
			<!-- 该 高度需要 动态绑定-->
			<swiper class="swiper-box" :current="tabIndex" @change="tabChange">
				<swiper-item>
					<scroll-view class="tab_switcher" scroll-y @scroll="scrollx" @scrolltoupper="upper" @scrolltolower="lower"
					 :scroll-top="scrollTop">
						<!-- 下拉菜单 -->
						<sl-filter style="height: 100%;" :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList"
						 @result="result"></sl-filter>
						<view class="text">
							<view class="dowm_list">
								<scroll-view scroll-y="true" class="scroll-Y scroll_view">
									<view v-if="!win_menu">
										抱歉没有改店铺或食品数据
									</view>
									<!-- 循环 -->
									<view id="scrollmenu" class="uni-bg-red" v-for="(item,index) in  win_menu" :key=index @click="linkWin(item[win_id[index]].win_id)">
										<!-- 标题 -->
										<view class="scrollmenu_title">
											{{item[win_id[index]].win_name}}
											<view class="menu_delete">
												x
											</view>
										</view>
										<!-- 价格 -->
										<view class="scrollmenu_price">
											<view>
												4.3分
											</view>
											<view>
												￥38
											</view>
											<view>
												3,8km
											</view>
										</view>
										<!-- 套餐 -->
										<view class="scrollmenu_combo">
											<view>
												套餐
											</view>
											<view>
												{{item[win_id[index]].win_inter}}
											</view>
										</view>
										<!-- 标签 -->
										<view class="scrollmenu_label">
											<view>
												三匹马商业广场火锅第三名
											</view>
											<view>
												新店特惠
											</view>
										</view>
										<!-- 图片 -->
										<view class="scrollmenu_image">
											<view>
												<image v-if="item[win_id[index]].menu" :src="item[win_id[index]].menu.Menu_img" mode=""></image>
											</view>
											<view>
												<image v-if="item[win_id[index]].menu1" :src="item[win_id[index]].menu1.Menu_img" mode=""></image>
											</view>
											<view>
												<image v-if="item[win_id[index]].menu2" :src="item[win_id[index]].menu2.Menu_img" mode=""></image>
											</view>
										</view>
									</view>
									<view v-if="queryinfo.ishave==true" style="text-align: center; width: 100%; height: 30upx; line-height: 30upx;">
										{{queryinfo.have}}
									</view>
									<view id="scrollmenu" class="scroll-view-item uni-bg-red">
										<!-- 标题 -->
										<view class="scrollmenu_title">
											御前大卫三汁焖锅
											<view class="menu_delete">
												x
											</view>
										</view>
										<!-- 价格 -->
										<view class="scrollmenu_price">
											<view>
												4.3分
											</view>
											<view>
												￥38
											</view>
											<view>
												3,8km
											</view>
										</view>
										<!-- 套餐 -->
										<view class="scrollmenu_combo">
											<view>
												套餐
											</view>
											<view>
												8.8元女神共享单，2-4人餐149元13212312312312312312321312321
											</view>
										</view>
										<!-- 标签 -->
										<view class="scrollmenu_label">
											<view>
												三匹马商业广场火锅第三名
											</view>
											<view>
												新店特惠
											</view>
										</view>
										<!-- 图片 -->
										<view class="scrollmenu_image">
											<view>
												<image src="../../static/goodMood.jpg" mode=""></image>
											</view>
											<view>
												<image src="../../static/goodMood.jpg" mode=""></image>
											</view>
											<view>
												<image src="../../static/goodMood.jpg" mode=""></image>
											</view>
										</view>
									</view>
									<view id="scrollmenu" class="scroll-view-item uni-bg-red">
										<!-- 标题 -->
										<view class="scrollmenu_title">
											御前大卫三汁焖锅
											<view class="menu_delete">
												x
											</view>
										</view>
										<!-- 价格 -->
										<view class="scrollmenu_price">
											<view>
												4.3分
											</view>
											<view>
												￥38
											</view>
											<view>
												3,8km
											</view>
										</view>
										<!-- 套餐 -->
										<view class="scrollmenu_combo">
											<view>
												套餐
											</view>
											<view>
												8.8元女神共享单，2-4人餐149元13212312312312312312321312321
											</view>
										</view>
										<!-- 标签 -->
										<view class="scrollmenu_label">
											<view>
												三匹马商业广场火锅第三名
											</view>
											<view>
												新店特惠
											</view>
										</view>
										<!-- 图片 -->
										<view class="scrollmenu_image">
											<view>
												<image src="../../static/goodMood.jpg" mode=""></image>
											</view>
											<view>
												<image src="../../static/goodMood.jpg" mode=""></image>
											</view>
											<view>
												<image src="../../static/goodMood.jpg" mode=""></image>
											</view>
										</view>
									</view>
								</scroll-view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- tab切换菜单表 -->
				<swiper-item>
					<scroll-view class="tab_switcher" scroll-y @scrolltolower="lower1">
						<!-- 下拉菜单 -->
						<sl-filter style="height: 100%;" :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList1"
						 @result="result1"></sl-filter>
						<view class="text">
							<view class="dowm_list">
								<scroll-view scroll-y="true" class="scroll-Y  scroll_view">
									<view v-if="!menu">
										抱歉没有改店铺或食品数据
									</view>
									<!-- 循环 -->
									<view id="scrollmenu" class="scroll-view-item agion_down_list uni-bg-red" v-for="(item,index) in menu " :key="index">
										<view style="display: flex;">
											<view style="width: 30%;">
												<!-- 图片 -->
												<view class="scrollmenu_image agion_scrollmenu_image">
													<view>
														<image :src="item.Menu_img" mode=""></image>
													</view>
												</view>
											</view>
											<view style="width: 70%;">
												<!-- 标题 -->
												<view class="scrollmenu_title agion_scrollmenu_title">
													{{item.menu_name}}
													<view class="menu_delete">
														x
													</view>
												</view>
												<!-- 价格 -->
												<view class="scrollmenu_price agion_scrollmenu_price">
													<view>
														4.3分
													</view>
													<view>
														{{item.Menu_unit}}
													</view>
													<view>
														3,8km
													</view>
												</view>
												<!-- 标签 -->
												<view class="scrollmenu_label agion_scrollmenu_label">
													<view>
														{{item.Menu_describe}}
													</view>
												</view>
											</view>
										</view>
									</view>
									<view v-if="queryinfo1.ishave==true" style="text-align: center; width: 100%; height: 30upx; line-height: 30upx;">
										{{queryinfo1.have}}
									</view>

									<view id="scrollmenu" class="scroll-view-item agion_down_list uni-bg-red">
										<view style="display: flex;">
											<view style="width: 30%;">
												<!-- 图片 -->
												<view class="scrollmenu_image agion_scrollmenu_image">
													<view>
														<image src="../../static/goodMood.jpg" mode=""></image>
													</view>
												</view>
											</view>
											<view style="width: 70%;">
												<!-- 标题 -->
												<view class="scrollmenu_title agion_scrollmenu_title">
													御前大卫三汁焖锅
													<view class="menu_delete">
														x
													</view>
												</view>
												<!-- 价格 -->
												<view class="scrollmenu_price agion_scrollmenu_price">
													<view>
														4.3分
													</view>
													<view>
														￥38
													</view>
													<view>
														3,8km
													</view>
												</view>
												<!-- 标签 -->
												<view class="scrollmenu_label">
													<view>
														三匹马商业广场火锅第三名
													</view>
												</view>
											</view>
										</view>
									</view>

									<view id="scrollmenu" class="scroll-view-item agion_down_list uni-bg-red">
										<view style="display: flex;">
											<view style="width: 30%;">
												<!-- 图片 -->
												<view class="scrollmenu_image agion_scrollmenu_image">
													<view>
														<image src="../../static/goodMood.jpg" mode=""></image>
													</view>
												</view>
											</view>
											<view style="width: 70%;">
												<!-- 标题 -->
												<view class="scrollmenu_title agion_scrollmenu_title">
													御前大卫三汁焖锅
													<view class="menu_delete">
														x
													</view>
												</view>
												<!-- 价格 -->
												<view class="scrollmenu_price agion_scrollmenu_price">
													<view>
														4.3分
													</view>
													<view>
														￥38
													</view>
													<view>
														3,8km
													</view>
												</view>
												<!-- 标签 -->
												<view class="scrollmenu_label">
													<view>
														三匹马商业广场火锅第三名
													</view>
												</view>
											</view>
										</view>
									</view>

									<view id="scrollmenu" class="scroll-view-item agion_down_list uni-bg-red">
										<view style="display: flex;">
											<view style="width: 30%;">
												<!-- 图片 -->
												<view class="scrollmenu_image agion_scrollmenu_image">
													<view>
														<image src="../../static/goodMood.jpg" mode=""></image>
													</view>
												</view>
											</view>
											<view style="width: 70%;">
												<!-- 标题 -->
												<view class="scrollmenu_title agion_scrollmenu_title">
													御前大卫三汁焖锅
													<view class="menu_delete">
														x
													</view>
												</view>
												<!-- 价格 -->
												<view class="scrollmenu_price agion_scrollmenu_price">
													<view>
														4.3分
													</view>
													<view>
														￥38
													</view>
													<view>
														3,8km
													</view>
												</view>
												<!-- 标签 -->
												<view class="scrollmenu_label">
													<view>
														三匹马商业广场火锅第三名
													</view>
												</view>
											</view>
										</view>
									</view>

								</scroll-view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>

<script>
	import slFilter from '../../components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		components: {
			slFilter,
			cuCustom
		},
		data() {
			return {
			host: "http://gs.itsse.cn:9999/api/v1",
			// host: "http://127.0.0.1:9999/api/v1",
				win_menu: [],
				menu: [],
				win_id: [],
				winList: '',
				isBold: false,
				// sclltop
				scrollTop: '0',
				old: {
					scrollTop: 0
				},
				queryinfo: {
					pagesize: 1,
					pagenum: 1,
					query: "",
					win_start: "",
					win_end: "",
					menu_price_min: "",
					menu_price_max: "",
					ishave:"false",
					have: '没有菜品数据了'

				},
				// 菜品的
				queryinfo1: {
					pagesize: 2,
					pagenum: 1,
					query: "",
					ishave: "false",
					have: '没有菜品数据了',
					stclassify_id: "",
					menu_price_min: "",
					menu_price_max: ""
				},
				// 轮播图
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}],
				dotStyle: false,
				tabIndex: 0, // 选中的
				tabBars: [{
						name: "附近商家",
						id: "shangjia"
					},
					{
						name: "发现好菜",
						id: "haocai"
					}
				],
				// 下拉菜单
				themeColor: '#000000',
				titleColor: '#666666',
				filterResult: '',
				menuList: [{
						'title': '价格',
						'detailTitle': '请选择价格（单选）',
						'key': 'jobType',
						'isMutiple': false,
						'reflexTitle': true,
						// 'defaultSelectedIndex': [0],
						'detailList': [{
								'title': '最好吃',
								'value': ''
							},
							{
								'title': '0-10',
								'value': '0-10'
							},
							{
								'title': '10-20',
								'value': '10-20'
							},
							{
								'title': '20-30',
								'value': '20-30'
							},
							{
								'title': '30-40',
								'value': '30-40'
							},
							{
								'title': '40-50',
								'value': '40-50'
							},
							{
								'title': '50-60',
								'value': '50-60'
							},
							{
								'title': '60-70',
								'value': '60-70'
							},
							{
								'title': '70-80',
								'value': '70-80'
							},
							{
								'title': '80-100',
								'value': '100-100'
							},
							{
								'title': '100以上',
								'value': '100-'
							}
						]

					},
					{
						'title': '开放时间',
						'key': 'single',
						'isMutiple': false,
						'detailTitle': '请选择（单选）',
						'reflexTitle': true,
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '00:00:00~06:00:00',
								'value': '00:00:00~06:00:00'
							},
							{
								'title': '06:00:00~08:00:00',
								'value': '06:00:00~08:00:00'
							},
							{
								'title': '08:00:00~10:00:00',
								'value': '08:00:00~10:00:00'
							},
							{
								'title': '10:00:00~14:00:00',
								'value': '10:00:00~14:00:00'
							},
							{
								'title': '14:00:00~16:00:00',
								'value': '14:00:00~16:00:00'
							},
							{
								'title': '16:00:00~20:00:00',
								'value': '16:00:00~20:00:00'
							},
							{
								'title': '20:00:00~24:00:00',
								'value': '24:00:00~24:00:00'
							}
						]

					},

				],

				// 菜单显示中的下拉菜单
				menuList1: [{
						'title': '菜品分类',
						'detailTitle': '请选择分类（单选）',
						'key': 'jobType1',
						'isMutiple': false,
						'reflexTitle': true,
						// 'defaultSelectedIndex': [0],
						'detailList': [{
								'title': '最好吃',
								'value': ''
							},
							{
								'title': '0-10',
								'value': '0-10'
							},
							{
								'title': '10-20',
								'value': '10-20'
							},
							{
								'title': '20-30',
								'value': '20-30'
							},
							{
								'title': '30-40',
								'value': '30-40'
							},
							{
								'title': '40-50',
								'value': '40-50'
							},
							{
								'title': '50-60',
								'value': '50-60'
							},
							{
								'title': '60-70',
								'value': '60-70'
							},
							{
								'title': '70-80',
								'value': '70-80'
							},
							{
								'title': '80-100',
								'value': '100-100'
							},
							{
								'title': '100以上',
								'value': '100-'
							}
						]

					},
					{
						'title': '菜品单价',
						'key': 'single1',
						'isMutiple': false,
						'detailTitle': '请选择（单选）',
						'reflexTitle': true,
						'detailList': [{
								'title': '最好吃',
								'value': ''
							},
							{
								'title': '0-10',
								'value': '0-10'
							},
							{
								'title': '10-20',
								'value': '10-20'
							},
							{
								'title': '20-30',
								'value': '20-30'
							},
							{
								'title': '30-40',
								'value': '30-40'
							},
							{
								'title': '40-50',
								'value': '40-50'
							},
							{
								'title': '50-60',
								'value': '50-60'
							},
							{
								'title': '60-70',
								'value': '60-70'
							},
							{
								'title': '70-80',
								'value': '70-80'
							},
							{
								'title': '80-100',
								'value': '100-100'
							},
							{
								'title': '100以上',
								'value': '100-'
							}
						]

					},

				]
			}
		},
		methods: {
			// 跳转窗口页面
			linkWin(id) {
				uni.reLaunch({
					url: `/pages/meituan/win?id=${id}`

				});
			},
			// 搜索功能
			changeinput() {
				// console.log(1);
				this.getwin_menu();
			},
			// 当这个滑倒顶部
			upper: function(e) {
				// console.log(e)
			},
			// 当这个滑倒底部
			lower: function(e) {
				// console.log(e)
				this.queryinfo.pagenum += 1;
				this.getwin_menu();

			},
			scrollx: function(e) {
				// console.log(e);
				this.old.scrollTop = e.detail.scrollTop;
			},
			onKeyUserNameInput() {

			},

			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index) {
				this.tabIndex = index;
				// console.log(this.tabIndex)
			},
			// 窗口下拉
			result(val) {
				// console.log(val);
				this.win_menu = [];
				this.win_id = [];
				this.queryinfo.pagenum = 1;
				this.filterResult = JSON.stringify(val, null, 2);

				if (val.single == "" && val.jobType == "") {
					this.queryinfo.win_start = "";
					this.queryinfo.win_end = "";
					this.queryinfo.menu_price_min = "";
					this.queryinfo.menu_price_max = "";
					return this.getwin_menu();
				}
				// 价格下拉
				if (val.jobType !== undefined) {
					this.queryinfo.menu_price_min = "";
					this.queryinfo.menu_price_max = "";
					if (val.jobType == "") {
						return this.getwin_menu();
					}
					let arr = val.jobType.split("-")
					this.queryinfo.menu_price_min = arr[0];
					this.queryinfo.menu_price_max = arr[1];
					return this.getwin_menu()
				}
				// 时间下拉
				if (val.single !== undefined) {
					this.queryinfo.win_start = "";
					this.queryinfo.win_end = "";
					if (val.single == "") {
						return this.getwin_menu();
					}
					let arr = val.single.split("~")
					let date = new Date();
					// console.log(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${arr[0]}`)
					this.queryinfo.win_start = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${arr[0]}`;
					this.queryinfo.win_end = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${arr[1]}`
					return this.getwin_menu()
				}
			},
			getwin() {
				uni.request({
					url: `${this.host}/win_st`,
					data: {
						pagesize: 4,
						pagenum: 1,
					},
					success: (res) => {
						console.log(res.data)
						this.winList = res.data.data;
					}
				})
			},
			// 获取到具体的模块
			getwin_menu() {
				uni.request({
					url: `${this.host}/win_list_st`,
					data: {
						pagesize: this.queryinfo.pagesize,
						pagenum: this.queryinfo.pagenum,
						query: this.queryinfo.query,
						win_start: this.queryinfo.win_start,
						win_end: this.queryinfo.win_end,
						menu_price_min: this.queryinfo.menu_price_min,
						menu_price_max: this.queryinfo.menu_price_max
					},
					success: (res) => {
						console.log(res);
						if (res.data.data.datalist !== undefined) {
							this.win_menu.push(res.data.data.datalist);
							this.win_id = this.win_id.concat(res.data.data.idlist);
						}else{
							this.queryinfo.ishave = true;
						}
						// console.log(this.win_menu);
						// console.log(this.win_id)
					}
				})

			},

			// 获取到对应的菜品分类
			getClassify() {
				uni.request({
					url: `${this.host}/menu_classify_st`,
					data: "",
					success: (res) => {
						this.menuList1[0].detailList = [];
						this.menuList1[0].detailList.push({
							'title': '最好吃',
							'value': ''
						})
						res.data.data.forEach((item, index) => {
							this.menuList1[0].detailList.push({
								'title': `${item.name}`,
								'value': `${item.id}`
							});
						})

					}
				})
			},
			// 获取到具体的菜品数据
			getmenu() {
				uni.request({
					url: `${this.host}/list_st`,
					data: {
						pagesize: this.queryinfo1.pagesize,
						pagenum: this.queryinfo1.pagenum,
						query: this.queryinfo1.query,
						stclassify_id: this.queryinfo1.stclassify_id,
						menu_price_min: this.queryinfo1.menu_price_min,
						menu_price_max: this.queryinfo1.menu_price_max
					},
					success: (res) => {
						// console.log(res.data.data)
						if (res.data.data !== undefined && res.data.data.length != 0) {
							this.menu.push(...res.data.data);
						} else {
							this.queryinfo1.ishave = true;
						}
					}
				})
			},
			// 菜单下拉到底部
			lower1: function(e) {
				// console.log(e)
				this.queryinfo1.pagenum += 1;
				this.getmenu();

			},
			// 对应的菜单选择框下拉
			// 下拉
			result1(val) {
				// console.log(val);
				this.menu = [];
				this.queryinfo1.pagenum = 1;
				this.queryinfo1.ishave = false;

				if (val.single1 == "" && val.jobType1 == "") {
					this.queryinfo1.stclassify_id = ""
					this.queryinfo1.menu_price_min = ""
					this.queryinfo1.menu_price_max = ""
					return this.getmenu();
				}

				// 菜品分类
				if (val.jobType1 !== undefined) {
					this.queryinfo1.stclassify_id = ""

					if (val.jobType1 == "") {
						return this.getmenu();


					}
					this.queryinfo1.stclassify_id = val.jobType1;
					return this.getmenu()

				}
				// 价格下拉
				if (val.single1 !== undefined) {
					this.queryinfo1.menu_price_min = ""
					this.queryinfo1.menu_price_max = ""
					if (val.single1 == "") {
						return this.getmenu();
					}
					let arr = val.single1.split("-")
					this.queryinfo1.menu_price_min = arr[0];
					this.queryinfo1.menu_price_max = arr[1];
					return this.getmenu()

				}
			},
		},
		onShow() {
			this.getwin();
			this.getwin_menu();
			this.getClassify();
			this.getmenu();

		},
		onHide() {
			this.getwin_menu();
		},
		onLaunch() {

		}

	}
</script>

<style>
	.index {
		height: 100%;
		background-color: #ffffff;
	}

	/* 搜索功能 */
	.search_top {
		margin: 20upx 20upx 0upx 20upx;
		background-color: #f1f1f1;
		border-radius: 10upx;
	}

	.search_icon {
		padding: 0upx;
		width: 10%;
	}

	.search_icon>view {
		width: 40upx;
		height: 40upx;
		margin: 6upx auto;

	}

	.search_input {
		padding: 10upx;
	}

	/* 窗口展示 */
	.win_show {
		width: 25%;
		border-right: 1upx solid #878787;
		margin-top: 10upx;
		padding: 7upx 0upx;
		text-align: center;
	}

	.win_show:last-child {
		border-right: 0upx;
	}

	.swiper {
		min-height: 150upx;
		min-width: 320upx;
	}

	/* 轮播图 */

	/* 食品分类 */
	.foodClassify {
		min-width: 320upx;
	}

	.classify_modle {
		width: 25%;
	}

	.classify_img {
		width: 80upx;
		height: 80upx;
		margin: 0 auto;
	}

	.classify_img>image {
		width: 100%;
		height: 100%;
	}

	.classify_text {
		height: 30upx;
		min-width: 80upx;
		text-align: center;
	}

	.swiper-box {
		height: 900upx !important;
	}

	/* tab_切换 */
	.uni-tab-bar{
		text-align: center
	}

	.tab_switcher {
		height: 100%;
		width: 100%;
	}


	.text {
		height: 100%;
		width: 100%;
	}

	/* 下拉列表 */
	/* dowm_list */

	.scroll_view {
		width: 100%;
	}

	/* 下拉列表中的card */
	#scrollmenu {
		width: 90%;
		margin: 20upx auto;
		height: 500upx;
		border-radius: 15upx;
		padding: 15upx;
	}

	#scrollmenu>view {
		margin: 15upx 0upx;
		width: 100%;
		overflow: hidden;
	}

	.scrollmenu_title {
		font-size: 35upx;
		color: #363636;
		font-weight: 900;
		text-align: left;
		/* 超出一行文字自动隐藏 */
		overflow: hidden;
		/* 文字隐藏后添加省略号 */
		text-overflow: ellipsis;
		/* //强制不换行 */
		white-space: nowrap;
	}

	.menu_delete {
		float: right;
		width: 10%;
		text-align: center;
		border: 1upx solid green;
		border-radius: 10upx;
	}

	/*评分  价格  距离*/
	.scrollmenu_price {
		font-size: 20upx;
	}

	.scrollmenu_price>view {
		float: left;
		height: 25upx;
		line-height: 25upx;
	}

	.scrollmenu_price>view:nth-child(1) {
		color: blue;
		border-right: 1px solid white;
	}

	.scrollmenu_price>view:nth-child(2) {
		color: blue;
	}

	.scrollmenu_price>view:nth-child(3) {
		float: right;
		color: black;
	}

	/* 套餐 */
	.scrollmenu_combo {
		font-size: 20upx;
		margin-top: 15upx;
	}

	.scrollmenu_combo>view {
		float: left;
		height: 35upx;
		line-height: 30upx;
	}

	.scrollmenu_combo>view:nth-child(1) {
		width: 70upx;
		text-align: center;
		background-color: green;
		color: white;
	}

	.scrollmenu_combo>view:nth-child(2) {
		margin-left: 10upx;
		width: 560upx;
		color: #424242;
		/* 超出一行文字自动隐藏 */
		overflow: hidden;
		/* 文字隐藏后添加省略号 */
		text-overflow: ellipsis;
		/* //强制不换行 */
		white-space: nowrap;
	}

	/* 标签 */
	.scrollmenu_label {
		font-size: 20upx;
		margin-top: 15upx;
	}

	.scrollmenu_label>view {
		float: left;
		height: 40upx;
		line-height: 30upx;
		border: 1px solid #e8e8e8;
		backgorund-color: #fefefe;
		margin-right: 10upx;
		border-radius: 10upx;
		padding: 5upx;
	}

	/* 图片 */
	.scrollmenu_image {
		height: 250upx;
		width: 100%;
		display: flex
	}

	.scrollmenu_image>view {
		width: 300upx;
		height: 200upx;
		flex: 1;
		margin-right: 20upx;
	}

	.scrollmenu_image>view>image {
		width: 100%;
		height: 100%;
	}

	/*  */
	.agion_combo>view:nth-child(1) {
		width: 70upx;
		text-align: center;
		background-color: green;
		color: white;
	}

	.agion_down_list {
		height: 240upx !important;
	}

	.agion_scrollmenu_image {
		height: 180upx;
	}

	/* 	.agion_scrollmenu_title{
		margin: 20upx 0upx;
	} */

	.agion_scrollmenu_price {
		margin: 20upx 0upx;
		height: 30upx;
	}

	.agion_scrollmenu_label>view {
		width: 450upx;
		/* 超出一行文字自动隐藏 */
		overflow: hidden;
		/* 文字隐藏后添加省略号 */
		text-overflow: ellipsis;
		/* //强制不换行 */
		white-space: nowrap;
	}
</style>
