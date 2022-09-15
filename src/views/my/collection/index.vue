<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <h3>我的收藏页面</h3>
  </div>
</template>

<script>
import {collectlistAction} from '@/api/my/collect'
export default {
  data() {
    return {};
  },

  created() {
    collectlistAction({
        openId:localStorage.getItem("openId")
    })
    .then(res=>{
        console.log(res);
    })
  },

  methods: {
    // 点击返回
    onClickLeft(){
        this.$router.back('/my')
    }
  },
};
</script>

<style lang="scss" scoped>
</style>