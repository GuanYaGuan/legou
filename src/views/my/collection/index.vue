<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <h3 class="title">我的收藏页面</h3>
    <!-- 收藏商品列表 -->
    <div class="collect-goods">
      <ul class="list">
        <li class="item" v-for="item in collectData" :key="item.id">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">{{ item.retail_price }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { collectlistAction } from "@/api/my/collect";
export default {
  data() {
    return {
      collectData: [],
    };
  },

  created() {
    collectlistAction({
      openId: localStorage.getItem("openId"),
    }).then((res) => {
      // console.log(res.data.collectGoodsList);
      this.collectData = res.data.collectGoodsList;
    });
  },

  methods: {
    // 点击返回
    onClickLeft() {
      this.$router.back("/my");
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: rgba(245, 245, 245, 0.689);
  height: 100%;
  .van-nav-bar.van-hairline--bottom{
    background-color: #fff;
  }
  .title {
    padding: 20px 0;
    text-align: center;
    background: #fff;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 700;
    border-bottom: 1px solid rgba(204, 204, 204, 0.283);
  }
  .collect-goods {
    height: 100%;
    .list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      background-color: rgba(245, 245, 245, 0.689);
      height: 100%;
      .item {
        width: 185px;
        background-color: #fff;
        margin-bottom: 5px;
        img {
          width: 160px;
          height: 160px;
        }
        .name {
          margin: 0;
          padding: 0;
        }
        .price {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>