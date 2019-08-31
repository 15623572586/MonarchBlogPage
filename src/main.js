import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElemnetUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookie from 'cookie'
import axios from 'axios'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(ElemnetUI)
Vue.use(VueCookie) //使用cookies

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
