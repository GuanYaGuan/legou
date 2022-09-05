<template>
  <div>
    <van-grid :border="false" :column-num="1">
      <van-grid-item>
        <img src="" alt="" />
        <p class="title"></p>
        <p class="desc"></p>
        <span class="price"></span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// import { index } from "@/api/topic";
export default {
  data() {
    return {
        dataInfo:''
    };
  },

  created() {
    // index()
    //   // home下的 index.js 文件中封装的 index 方法 必须 return 出去后; 这里才可以使用 .then 方法
    //   .then((res) => {
    //     // console.log(res);
    //     this.dataInfo = res;
    //   });
  },

  methods: {},
};
</script>

<style scoped>
</style>