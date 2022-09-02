<template>
  <div>
    <!-- 导航栏 -->
    <div class="nav">
      <van-icon size="20" name="location-o" />
      <van-icon size="20" name="search" />
      <input type="text" placeholder="搜索商品" />
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe autoplay="2000" indicator-color="#000">
        <van-swipe-item v-for="item in dataInfo.banner" :key="item.id">
          <img :src="item.image_url" width="100%" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 居中描述 -->
    <div class="channel">
      <div v-for="item in dataInfo.channel" :key="item.id">
        <img :src="item.icon_url" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- 品牌制造商直供 -->
    <p>品牌制造商直供</p>
    <div class="brand">
      <div v-for="item in dataInfo.brandList" :key="item.id">
        <span class="name">{{ item.name }}</span>
        <span class="price">{{ item.floor_price }}</span>
        <img :src="item.new_pic_url" alt="" />
      </div>
    </div>
    <!-- 新品首发 -->
    <div class="new-title"></div>
  </div>
</template>

<script>
import { index } from "@/api/home"; // home路径下写的 index.js 可以省略
export default {
  data() {
    return {
      dataInfo: "",
    };
  },

  created() {
    index()
      // home下的 index.js 文件中封装的 index 方法 必须 return 出去后; 这里才可以使用 .then 方法
      .then((res) => {
        console.log(res);
        this.dataInfo = res;
      });
  },

  methods: {},
};
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  .nav {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    height: 50px;
    line-height: 16px;
    .van-icon {
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
  .banner {
    width: 100%;
  }
  .channel {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 80px;
    div {
      width: 44px;
      display: flex;
      justify-content: center;
      span{
        margin: 5px 0;
      }
    }
  }
  p {
    font-size: 16px;
    line-height: 26px;
    margin: 0 auto;
  }
  .brand {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 300px;
    margin: 20px auto;
    div {
      position: relative;
      min-width: calc((100% - 400px) / 2);
      height: 200px;
      margin: 5px;
      float: left;
      span {
        position: absolute;
        left: 20px;
      }
      .name {
        top: 20px;
      }
      .price {
        top: 40px;
        font-size: 16px;
        line-height: 20px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .new-title {
    display: flex;
    width: 100%;
    height: 150px;
  }
}
</style>