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
      <div class="address-info" @click="openAddress" v-if="address">
        <div class="left">
          <div class="name">{{ address.name }}</div>
          <div class="dot">默认</div>
        </div>
        <div class="detail-info">
          <p class="number">{{ address.mobile }}</p>
          <p class="address">
            {{ address.address + address.address_detail }}
          </p>
        </div>
        <van-icon class="right" name="arrow" />
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order-info">
      <div class="item" v-if="orderList.allPrise">
        <span class="left">商品合计</span>
        <span class="right">￥{{ orderList.allPrise }}</span>
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
    <div class="goods-list">
      <van-swipe-cell v-for="item in orderList.goodsList" :key="item.id">
        <van-card
          :num="item.number"
          :price="item.retail_price"
          :desc="item.goods_name"
          class="goods-card"
          :thumb="item.list_pic_url"
        />
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delList(item.id)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 支付 -->
    <div class="paif">
      <div class="left">实付:￥{{ orderList.allPrise }}</div>
      <div class="right">支付</div>
    </div>
  </div>
</template>

<script>
import { orderdetailAction } from "@/api/orders";
export default {
  data() {
    return {
      orderList: [],
      address:{}
    };
  },

  created() {
    
    this.init()
  },
  methods: {
    init() {
      orderdetailAction({
        openId: localStorage.getItem("openId"),
        addressId: "",
      }).then((res) => {
        console.log(res.data);
        this.orderList = res.data;
        var address=JSON.parse(localStorage.getItem("address"));
        if(address){
          this.address=address
        }else{
          this.address=res.data.address
        }
      });
    },
    // 点击返回
    onClickLeft() {
      this.$router.back("/my");
    },
    // 点击 打开 选择地址
    openAddress() {
      this.$router.push("/my/myAddress");
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
          width: 13px;
          overflow: hidden;
          text-overflow: " ";
          white-space: nowrap;
          margin-right: 50%;
          margin-left: 10px;
          letter-spacing: 3px;
        }
        .dot {
          margin-top: 10px;
          width: 30px;
          height: 18px;
          border: 1px solid red;
          display: flex;
          justify-content: center;
          align-items: center;
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
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background-color: #fff;
        div {
          background-color: #fff;
        }
        .van-card__bottom {
          width: calc(100% - 10px);
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
      }
    }
  }
  .goods-list {
    width: 100%;
    height: 325px;
    overflow: auto;
    background-color: #fff;
  }
  .van-button__content {
    background-color: #ee0a24;
  }
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  .paif {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    margin: 0;
    padding: 0;
    .left {
      margin-left: 20px;
      font-size: 14px;
      color: #b4282d;
    }
    .right {
      margin: 0;
      padding: 0;
      width: 100px;
      height: 60px;
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