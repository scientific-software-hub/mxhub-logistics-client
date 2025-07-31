import Vue from 'vue'


import App from './App.vue'
import store from './store'
import router from './router'

import 'typeface-cantarell'
import 'tailwindcss/tailwind.css'
import axios from 'axios'

import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router, 
  store,
  render: h => h(App)
}).$mount('#app')
