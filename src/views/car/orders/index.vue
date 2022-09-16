<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 地址栏 -->
    <div class="content">
      <div
        class="nav-image"
        :style="{
          'background-image': `url(${require('@/assets/icon/address-bg-bd.png')})`,
        }"
      ></div>
      <div class="address-info">
        <div class="left">
          <div class="name">姓名</div>
          <div class="dot">默认</div>
        </div>
        <div class="detail-info">
          <p class="number">19541254578</p>
          <p class="address">内蒙古呼号浩特</p>
        </div>
        <van-icon class="right" name="arrow" />
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order-info">
      <div class="item">
        <span class="left">商品合计</span>
        <span class="right">￥1699</span>
      </div>
      <div class="item">
        <span class="left">运费</span>
        <span class="right">免运费</span>
      </div>
      <div class="item-last">
        <span class="left">优惠券</span>
        <span class="right">暂无</span>
      </div>
      <div class="item" v-if="false"></div>
    </div>
    <!-- 商品展示 -->
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    />
    <!-- 支付 -->
    <div class="paif">
      <div class="left">实付:￥1699</div>
      <div class="right">支付</div>
    </div>
  </div>
</template>

<script>
import { orderdetailAction, ordersubmitAction } from "@/api/orders";
export default {
  data() {
    return {};
  },

  created() {
    orderdetailAction({
      openId: localStorage.getItem("openId"),
      addressId: "",
    }).then((res) => {
      console.log(res);
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
  background-color: #f7f8f9b6;
  
  .van-nav-bar.van-hairline--bottom {
    background-color: #fff;
  }
  .content {
    background-color: #fff;
    .nav-image {
      width: 100%;
      height: 10px;
      background-repeat: repeat-x;
    }
    .address-info {
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      .left {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        height: 70px;
        margin-left: 5%;
        background-color: #fff;
        .name {
          margin-right: 50%;
          margin-left: 5px;
        }
        .dot {
          margin-top: 10px;
          width: 30px;
          height: 18px;
          border: 1px solid red;
          text-align: center;
        }
      }
      .detail-info {
        height: 80px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
        .number {
          line-height: 20px;
          margin-right: 50%;
        }
        .address {
          line-height: 20px;
        }
      }
      .right {
        margin-right: 5%;
        background-color: #fff;
      }
    }
  }
  .order-info {
    margin-top: 12px;
    width: 100%;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      background-color: #fff;
      margin-bottom: 2px;
      .left {
        margin-left: 5%;
      }
      .right {
        margin-right: 5%;
      }
    }
    .item-last {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      background-color: #fff;
      margin-bottom: 15px;
      .left {
        margin-left: 5%;
      }
      .right {
        margin-right: 5%;
      }
    }
  }
  .van-card {
    background-color: #fff;
    .van-card__header {
      background-color: #fff;
      .van-card__thumb {
        background-color: #fff;
        .van-image {
          background-color: #fff;
        }
      }
      .van-card__content {
        background-color: #fff;
        div {
          background-color: #fff;
        }
      }
    }
  }
  .paif {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    margin: 0;
    padding: 0;
    .left {
      margin-left: 20px;
    }
    .right {
      margin: 0;
      padding: 0;
      width: 70px;
      height: 50px;
      background-color: #b4282d;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>