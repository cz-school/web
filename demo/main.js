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

const app = new Vue({
	...App
})
app.$mount()
