<template>
  <div id="app">
    <van-tabbar route active-color="#c35559" v-if="isShow">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/topic" icon="newspaper-o"
        >专题</van-tabbar-item
      >
      <van-tabbar-item replace to="/classify" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/car" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  // 监听页面路由的变化, 反向思维, 要去的路由路径在 以下 数组路径 当中 存在 就为 true
  watch: {
    $route(to, from) {
      var arr=["/home","/topic","/classify","/car","/my"]
      if (arr.includes(to.path)) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
