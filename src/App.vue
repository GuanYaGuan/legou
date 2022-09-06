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
  // 这个项目不做登录页面 因为没有登录等相关的接口;  我们会在 本地存储一个 对象信息
  created() {
    var userInfo = {
      openId: "19513351429",
      nickName: "赵六",
      avatarUrl:
        "https://ts1.cn.mm.bing.net/th?id=OIP-C.EDFxoFWjEClOj5hNL6qFkQAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    };
    var openId = userInfo.openId;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("openId", openId);
  },
  // 监听页面路由的变化, 反向思维, 要去的路由路径在 以下 数组路径 当中 存在 就为 true
  watch: {
    $route(to, from) {
      var arr = ["/home", "/topic", "/classify", "/car", "/my"];
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
