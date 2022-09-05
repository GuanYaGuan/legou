<template>
  <div>
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
      checked:'',
    };
  },

  mounted() {},

  methods: {
    onSubmit(){

    },
    onClickEditAddress(){

    }
  },
};
</script>

<style scoped lang="scss">
div {
  .van-submit-bar {
    margin-bottom: 50px;
  }
}
</style>