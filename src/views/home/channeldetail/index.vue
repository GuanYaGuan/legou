<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs>
      <van-tab v-for="index in 7" :title="'标签 ' + index" :key="index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { categoryNav, goodsList } from "@/api/home/channeldetail";
export default {
  name: "LegouIndex",

  data() {
    return {
        categoryNav:[],
        goodsList:{}
    };
  },

  created() {
    categoryNav({
        id:1005000
    })
    .then(res=>{
        console.log(res);
    })
    goodsList({
        categoryId:1005000
    })
    .then(res=>{
        // console.log(res);
    })
  },

  methods: {
    onClickLeft(){
        this.$router.back("/home");
    }
  },
};
</script>

<style lang="scss" scoped>
</style>