<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 顶部标题 -->
    <div>
      <div class="header" v-if="brandList.data">
        <img :src="brandList.data.list_pic_url" alt="" />
        <span class="name">{{ brandList.data.name }}</span>
      </div>
      <div class="desc" v-if="brandList.data">
        {{ brandList.data.simple_desc }}
      </div>
    </div>
    <!-- 底部商品页面 -->
    <div class="brandList" v-if="isshow">
      <div class="item" v-for="item in brandList.goodsList" :key="item.id">
        <img :src="item.list_pic_url" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">￥{{ item.retail_price }}</p>
      </div>
    </div>
    <!-- 没有商品是显示 -->
    <div class="brandTip" v-else>数据库暂无数据...</div>
  </div>
</template>

<script>
import { detailaction } from "@/api/home/clickbrand";
export default {
  name: "LegouIndex",

  data() {
    return {
      brandList: [],
      isshow: true,
    };
  },

  created() {
    this.init();
  },

  methods: {
    // 点击返回 home 页面
    onClickLeft() {
      this.$router.back("/home");
    },
    // 初始化数据
    init() {
      detailaction({
        id: this.$route.params.id,
      }).then((res) => {
        // console.log(res.data);
        this.brandList = res.data;
      });
    },
    // 放置页面刷新之后不渲染数据将传递的参数信息保存
  },
  // 监听数据
  watch: {
    "brandList.goodsList": function (val) {
      if (val == "undefinded" || val.length <= 0) {
        // console.log("数据为空");
        this.isshow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
  div {
    .header {
      position: relative;
      img {
        width: 100%;
        z-index: -2;
      }
      span {
        font-size: 0.50667rem;
        color: #fff;
        border-bottom: 2px solid #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .desc {
      background: #fff;
      padding: 20px;
      font-size: 16px;
      color: #666;
      text-align: center;
    }
  }
  .brandList {
    width: 100%;
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: rgba(102, 102, 102, 0.121);
    .item {
      width: 185px;
      background-color: #fff;
      margin-bottom: 5px;
      img {
        width: 167px;
        height: 167px;
      }
      .name {
        margin: 5px 0 5px 0;
        text-align: center;
        font-size: 12px;
      }
      .price{
        font-size: 14px;
        color: #b4282d;
      }
    }
  }
  .brandTip {
    width: 100%;
    height: 310px;
    background-color: rgba(102, 102, 102, 0.121);
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
  }
}
</style>