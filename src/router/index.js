import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  // 进入项目第一个展示的页面
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/home',
    name:'home',
    component:Home
  },
  {
    path:'/topic',
    name:'topic',
    component:()=>import('../views/topic/index.vue')
  },
  {
    path:'/classify',
    name:'classify',
    component:()=>import('../views/classify/index.vue')
  },
  {
    path:'/car',
    name:'car',
    component:()=>import('../views/car/index.vue')
  },
  {
    path:'/my',
    name:'my',
    component:()=>import('../views/my/index.vue')
  },
  {
    path:'/home/search',
    name:'search',
    component:()=>import("../views/home/search/index.vue")
  },
  {
    path:'/home/channeldetail',
    name:'channeldetail',
    component:()=>import('../views/home/channeldetail/index.vue')
  },
  {
    path:'/home/clickbrand',
    name:'clickbrand',
    component:()=>import('../views/home/clickbrand/index.vue')
  },
  {
    path:'/home/detailsPage',
    name:'detailsPage',
    component:()=>import('../views/home/detailsPage/index.vue')
  },
  {
    path:'/home/newgoods',
    name:'newgoods',
    component:()=>import('../views/home/newgoods/index.vue'),
  },
  {
    path:'/topic/topicdetails',
    name:'topicdetails',
    component:()=>import('../views/topic/topicdetails/index.vue')
  },
  {
    path:'/home/map',
    name:'map',
    component:()=>import('../views/home/map/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
