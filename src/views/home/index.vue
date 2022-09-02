<template>
  <div>
    <div class="nav">
      <van-icon size="20" name="location-o" />
      <van-icon size="20" name="search" />
      <input type="text" placeholder="搜索商品" />
    </div>
    <div class="banner">
      <van-swipe autoplay="2000" indicator-color="#000">
        <van-swipe-item  v-for="item in dataInfo.banner" :key="item.id">
          <img :src="item.image_url" width="100%" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import {
  index
  } from "@/api/home" // home路径下写的 index.js 可以省略
export default {
  data() {
    return {
      dataInfo:''
    };
  },

  created() {
    index()
    // home下的 index.js 文件中封装的 index 方法 必须 return 出去后; 这里才可以使用 .then 方法
    .then(res=>{
      // console.log(res);
      this.dataInfo=res
    })
  },

  methods: {},
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 16px;
  .van-icon{
    margin: 0 10px;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
  }
}
.banner{
    width: 100%;
}
</style>