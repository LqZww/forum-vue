import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

import './assets/icon/iconfont.css'

import { setCookie, getCookie, delCookie } from './assets/js/cookie.js'

import vueAudioNative from 'vue-audio-native'
Vue.use(vueAudioNative)


// import $ from 'jquery'
import jquery from 'jquery'
Vue.prototype.$ = jquery

import ElementUI from 'element-ui';

Vue.use(ElementUI);

Axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.prototype.$http = Axios

Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
}

Axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
})
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data; boundary="+ boundary'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.filter('formatDate', function (str) {
  if (!str) return ''
  var date = new Date(str)
  // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  var time = new Date().getTime() - date.getTime()
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
}
)