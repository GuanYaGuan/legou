import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as vant from '../src/plugs/vant.js'
import 'lib-flexible'

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vant,
  render: h => h(App)
}).$mount('#app')
