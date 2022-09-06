<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script>
import { keywords } from "@/api/home/search";
export default {
  name: "LegouIndex",

  data() {
    return {
      value: "",
    };
  },

  async created() {
    const res=await keywords({
      openId: localStorage.getItem("openId"),
    })
      console.log(res.data);
  },

  methods: {
    onClickLeft() {
      this.$router.back("/home");
    },
    onSearch() {},
    onCancel() {},
  },
};
</script>

<style scoped>
</style>