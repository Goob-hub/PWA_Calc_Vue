import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/constants.scss'

import './icons.js'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
