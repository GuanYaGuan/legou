<template>
  <div>
    <div class="usericon">
      <img src="@/assets/usericon/default.png" alt="" />
      <p>用户</p>
    </div>
    <van-grid :column-num="3">
      <van-grid-item
      style="height:70px;"
        v-for="value in mydata"
        :key="value"
        :text="value"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
        mydata:["我的订单","优惠券","我的足迹","我的收藏","地址管理","联系客服","帮助中心","意见反馈"]
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped lang="scss">
div {
  .usericon {
    position: relative;
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    background: #333;
    padding: 0 10px;
    box-sizing: border-box;
    img {
      display: block;
      width: 74px;
      height: 74px;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
    }
    p {
      position: absolute;
      left: 110px;
      color: #fff;
      font-size: 18px;
      line-height: 22px;
    }
  }
}
</style>