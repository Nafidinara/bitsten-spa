import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import VueStringFilter from 'vue-string-filter'

Vue.use(VueStringFilter)

import "./assets/css/bootstrap.min.css"
import "./assets/css/style.css"
import "./assets/css/cek.css"

import '@/assets/js/jquery-3.4.1.min.js'
import '@/assets/js/popper.min.js'
import '@/assets/js/bootstrap.min.js'
import '@/assets/js/Chart.bundle.min.js'
import '@/assets/js/amcharts-core.min.js'
import '@/assets/js/amcharts.min.js'
import '@/assets/js/custom.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
