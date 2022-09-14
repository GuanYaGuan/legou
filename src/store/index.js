import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityInfo:{}
  },
  mutations: {
    // 使用的方法 this.$store.commit("upCityInfo",传递的参数)
    upCityInfo(state,val){ // val 载荷 一次只可以传递一个 {} []
      state.cityInfo=val;
    }
  },
  actions: {
  },
  modules: {
  }
})
