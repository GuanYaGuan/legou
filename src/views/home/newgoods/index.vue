<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="goods">
      <div class="goodsNav">
        <span>综合</span>
        <div class="price">
          <span>价格</span>
          <span class="arror">
            <van-icon name="arrow-up" />
            <van-icon name="arrow-down" />
          </span>
        </div>
        <span>分类</span>
      </div>
      <div>
        <div class="goodsBox" v-for="item in newgoods.data" :key="item.id">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">{{ item.retail_price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isNewHot } from "@/api/home/goodsList";
export default {
  name: "LegouIndex",

  data() {
    return {
      newgoods: [],
    };
  },

  created() {
    isNewHot({
      isHot: "",
      isNew: 1,
      order: "",
    }).then((res) => {
      console.log(res.data);
      this.newgoods = res.data;
    });
  },

  methods: {
    onClickLeft() {
      this.$router.back("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: rgba(227, 224, 224, 0.185);
  .van-nav-bar.van-hairline--bottom{
    background-color: #fff;
    margin: 0;
  }
  .goods {
    .goodsNav {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      background-color: #fff;
      margin-bottom: 5px;
      span {
        line-height: 40px;
        font-size: 14px;
      }
      .price {
        display: flex;
        justify-content: center;
        .arror {
          position: absolute;
          left: 55%;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          font-size: 1px;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
    div {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
      .goodsBox {
        width: 185px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 5px;
        background-color: #fff;
        img {
          width: 150px;
          height: 150px;
        }
        p{
            width: 100%;
            margin: 5px;
            font-size: 12px;
        }
      }
    }
  }
}
</style>