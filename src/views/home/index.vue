<template>
  <div class="homebody">
    <!-- 导航栏 -->
    <div class="nav">
      <van-icon size="20" name="location-o" />
      <van-icon size="20" name="search" />
      <div @click="openSearch">
        <input type="text" placeholder="搜索商品" />
      </div>
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
      <div>
        <div v-for="item in dataInfo.brandList" :key="item.id">
          <span class="name">{{ item.name }}</span>
          <span class="price">{{ item.floor_price }}</span>
          <img :src="item.new_pic_url" alt="" />
        </div>
      </div>
    </div>
    <!-- 新品首发 -->
    <div class="new-title">
      <img src="@/assets/bgcoimge/new.png" alt="" />
      <div>
        <span>新品首发</span>
        <span class="bgocolor"> <span>查看全部</span> </span>
      </div>
    </div>
    <!-- 新品首发的产品列 -->
    <div class="product">
      <ul>
        <li v-for="item in dataInfo.newGoods" :key="item.id">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="desc">{{ item.goods_brief }}</p>
          <span class="price">￥{{ item.retail_price }}</span>
        </li>
      </ul>
    </div>
    <!-- 好物精选 -->
    <div class="good-title">
      <img src="@/assets/bgcoimge/new2.png" alt="" />
      <div>
        <span>人气推荐</span>
        <span class="circle">.</span>
        <span>好物精选</span>
        <span class="bgocolor"> <span>查看全部</span></span>
      </div>
    </div>
    <!--  -->
    <div class="hotGoods">
      <ul>
        <li v-for="item in dataInfo.hotGoods" :key="item.id">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="goods_brief">{{ item.goods_brief }}</p>
          <span class="price">￥{{ item.retail_price }}</span>
        </li>
      </ul>
    </div>
    <!-- 专题精选 -->
    <div class="topicList">
      <div class="topicList-top">
        <span> 专题精选 </span>
        <van-icon name="play-circle-o" size="25" />
      </div>
      <ul>
        <li v-for="item in dataInfo.topicList" :key="item.id">
          <img :src="item.item_pic_url" alt="" />
          <div>
            <span class="title">{{ item.title }}</span>
            <span class="price">{{ item.price_info }}元起</span>
          </div>
          <p>{{ item.subtitle }}</p>
        </li>
      </ul>
    </div>
    <!-- newCategoryList 9个商品列表页 -->
    <div>
      <common :parentData="dataInfo"></common>
      <router-view></router-view>
    </div>

    <!-- 空的占位的,避免app.vue中遮挡内容 -->
    <div class="taber-kong"></div>
  </div>
</template>

<script>
import common from "./common/index.vue";
import { index } from "@/api/home"; // home路径下写的 index.js 可以省略
import Home from "../Home.vue";
export default {
  data() {
    return {
      dataInfo: "",
    };
  },
  components: {
    common,
    Home,
  },

  created() {
    // const { data:{newCategoryList,}} =await index()
    // console.log(newCategoryList);
    // this.dataInfo=newCategoryList;
    index()
      // home下的 index.js 文件中封装的 index 方法 必须 return 出去后; 这里才可以使用 .then 方法
      .then((res) => {
        // console.log(res.data);
        this.dataInfo = res.data;
      });
  },

  methods: {
    // 点击跳转到 search 页面
    openSearch() {
      this.$router.push("/home/search");
    },
  },
};
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  background-color: #f7f8f944;
  .nav {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    line-height: 16px;
    padding: 15px;
    .van-icon {
      margin: 0 10px;
    }
    div {
      width: 200px;
      height: 100%;
      input {
        box-sizing: border-box;
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
      flex-wrap: wrap;
      justify-content: center;
      span {
        display: block;
        margin: 5px 0;
      }
    }
  }
  p {
    font-size: 16px;
    line-height: 26px;
    margin: 20px auto;
  }
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    div {
      display: flex;
      justify-content: center;
      width: 1200px;
      div {
        position: relative;
        width: 170px;
        margin: 2px;
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
  }
  .new-title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      z-index: -3;
    }
    div {
      justify-content: center;
      width: 100px;
      padding: 15px;
      font-size: 16px;
      color: #8c9bae;
      span {
        margin-bottom: 10px;
      }
      .bgocolor {
        text-align: center;
        width: 80px;
        height: 30px;
        background-color: #d8e4f0;
        span {
          display: block;
          margin-top: 4px;
        }
      }
    }
  }
  .product {
    width: 100%;
    display: flex;
    justify-content: center;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 10px auto;
      li {
        position: relative;
        float: left;
        margin: 5px;
        p {
          position: relative;
          width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          top: -20px;
          margin: 0 auto;
        }
        .desc {
          color: #8c9bae;
        }
        img {
          width: 150px;
          height: 150px;
        }
        .price {
          position: absolute;
          font-size: 16px;
          left: 26px;
          bottom: 0;
          color: #9c3232;
        }
      }
    }
  }
  .good-title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      z-index: -3;
    }
    div {
      justify-content: center;
      padding: 15px;
      font-size: 16px;
      color: #8c9bae;
      width: 200px;
      float: left;
      .circle {
        line-height: 8px;
        font-size: 30px;
        margin: 0 5px;
      }
      span {
        margin-bottom: 10px;
      }
      .bgocolor {
        text-align: center;
        width: 80px;
        height: 30px;
        background-color: #f4e9cb;
        span {
          display: block;
          margin-top: 4px;
        }
      }
    }
  }
  .hotGoods {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 800px;
      justify-content: space-around;
      margin: 10px auto;
      :last-child {
        margin-right: 50%;
      }
      li {
        position: relative;
        float: left;
        margin: 5px;
        p {
          position: relative;
          width: 85px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          top: -20px;
          margin: 0 auto;
        }
        .goods_brief {
          color: #8c9bae;
        }
        img {
          width: 150px;
          height: 150px;
        }
        .price {
          position: absolute;
          font-size: 16px;
          left: 35px;
          bottom: 0;
          color: #9c3232;
        }
      }
    }
  }
  .topicList {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    .topicList-top {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      margin: 20px 500px;
      span {
        width: 50px;
      }
    }
    ul {
      width: 300px;
      height: 200px;
      overflow: auto;
      height: auto;
      display: flex;
      float: left;
      :last-child {
        margin-right: 0;
        p {
          width: 300px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      li {
        position: relative;
        height: 300px;
        margin-right: 20px;

        img {
          width: 350px;
          height: 200px;
        }
        div {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          .title {
            font-size: 16px;
            font-weight: 700;
          }
          .price {
            font-size: 16px;
            color: #9c3232;
          }
        }
        p {
          position: absolute;
          left: 0;
          margin-top: 5px;
        }
      }
    }
  }
  .taber-kong {
    width: 100%;
    height: 50px;
  }
}
</style>