import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vant from '../src/plugs/vant'
import 'lib-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vant,
  render: h => h(App)
}).$mount('#app')
