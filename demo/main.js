import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
// 图片上传插件
import sunUiBasic from './components/sunui-upimg-basic.vue'
Vue.component('sunui-upbasic',sunUiBasic)
// 全局引入自定义导航栏
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

// // 时间过滤器
Vue.filter("dataFormat", function(value) {
	let date = new Date();
	let num = Math.floor((Number(String(date.getTime()).slice(0, 10)) - value))
	// let num = Math.floor((Number(String(date.getTime()).slice(0, 10))-originVal))
	// console.log(num)
	if (num > 60 * 60 * 24) {
		return Math.floor(num / 60 / 60 / 24) + "天前"
	} else if (num > 60 * 60) {
		return Math.floor(num / 60 / 60) + "小时前"
	} else if (num > 60) {
		return Math.floor(num / 60) + "分钟前"
	}
})

Vue.filter('dateForma', function(value) {
	var value = value * 1000
	var data = new Date(value)
	let year = data.getFullYear();
	let month = data.getMonth() + 1;
	let day = data.getDate();
	let hour = data.getHours();
	let minutes = data.getMinutes();
	let seconds = data.getSeconds();
	return `${year}-${month}-${day}`;
})

const app = new Vue({
	...App
})
app.$mount()
