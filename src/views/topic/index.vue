<template>
  <div>
    <!-- <ul id="topic-box">
      <li v-for="(item, index) in dataInfo.data" :key="index">
        <img :src="item.scene_pic_url" alt="" />
        <p class="title">{{ item.title }}</p>
        <p class="desc">{{ item.subtitle }}</p>
        <span class="price">{{ item.price_info }}元起</span>
      </li>
    </ul> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul id="topic-box">
        <li v-for="(item, index) in dataInfo.data" :key="index">
          <img :src="item.scene_pic_url" alt="" />
          <p class="title">{{ item.title }}</p>
          <p class="desc">{{ item.subtitle }}</p>
          <span class="price">{{ item.price_info }}元起</span>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { topic } from "@/api/topic";

export default {
  data() {
    return {
      dataInfo: "",
      loading: false,
      finished: false,
    };
  },

  created() {
    topic({
      page: 1,
    }).then((res) => {
      console.log(res.data);
      this.dataInfo = res.data;
    });
  },
  mounted() {},
  methods: {
    onLoad() {
      
    },
  },
};
</script>

<style scoped lang='scss'>
div {
  margin-bottom: 50px;
  ul {
    overflow: hidden;
    li {
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 200px;
      }
      .title {
        color: #333;
        font-size: 18px;
        margin-top: 10px;
      }
      .desc {
        color: #999;
        font-size: 14px;
        margin-top: 10px;
        padding: 5px;
      }
      .price {
        color: #b4282d;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }
}
</style>