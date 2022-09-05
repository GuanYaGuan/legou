<template>
  <div>
    <van-search placeholder="商品搜索" input-align="center" />
    <van-tree-select
      height="110vw"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <van-image
          v-if="active === 0"
          src="https://img01.yzcdn.cn/vant/apple-1.jpg"
        />
        <van-image
          v-if="active === 1"
          src="https://img01.yzcdn.cn/vant/apple-2.jpg"
        />
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      items: [{ text: "居家" }, { text: "餐厨" }, { text: "饮食" }, { text: "配件" }
      , { text: "服装" }, { text: "婴童" }, { text: "杂货" }, { text: "洗护" }, { text: "志趣" }],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
</style>