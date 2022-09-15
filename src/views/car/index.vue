<template>
  <div>
    <!-- 30天无忧 -->
    <div class="worry">
      <div>
        <img class="image" src="@/assets/icon/redcircle.png" alt="" />
        <div class="item">30天无忧退货</div>
      </div>
      <div>
        <img class="image" src="@/assets/icon/redcircle.png" alt="" />
        <div class="item">48小时快速退款</div>
      </div>
      <div>
        <img class="image" src="@/assets/icon/redcircle.png" alt="" />
        <div class="item">满88元免邮费</div>
      </div>
    </div>
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    />
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: "",
    };
  },

  mounted() {},

  methods: {
    onSubmit() {},
    onClickEditAddress() {},
  },
};
</script>

<style scoped lang="scss">
div {
  .worry {
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f7f8f98c;
    div {
      display: flex;
      align-items: center;
      .image {
        display: block;
        float: left;
        width: 5px;
        height: 5px;
      }
      .item {
        float: left;
        padding-left: 5px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #666;
      }
    }
  }
  .van-card{
    background-color: #fff;
    border-bottom: 1px solid rgba(122, 120, 120, 0.08);
  }
  .van-submit-bar {
    margin-bottom: 50px;
  }
}
</style>