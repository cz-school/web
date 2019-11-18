import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 全局引入自定义导航栏
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

const app = new Vue({
	...App
})
app.$mount()
