<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <h3>商品详情页面</h3>
  </div>
</template>

<script>
export default {
  name: "LegouIndex",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    onClickLeft(){
        this.$router.back('/home')
    }
  },
};
</script>

<style lang="scss" scoped>
</style>