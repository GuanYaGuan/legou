<template>
  <div>
    <!-- v-model 加载状态 -->
    <!-- finished 是否已经加载完成 -->
    <!-- load 用于请求下一页数据 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul id="topic-box">
        <li v-for="item in list" :key="item.id" @click="opendetails(item.id)">
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
      list:[],
      loading: false,
      finished: false,
      start: 1,
    };
  },

  created() {
    this.init();
  },
  mounted() {},
  methods: {
    // 请求下一页数据
    onLoad() {
      // console.log("到底了");
      this.start++;
      this.init();
    },
    // 初始化数据
    init() {
      topic({
        page: this.start,
      }).then(res => {
        // console.log(res.data);
        this.list.push(...res.data.data);
        // 当数据请求完毕  变更加载状态
        this.loading = false;
        // 请求到最后一页数据之后 终止请求操作 禁止 load 加载状态
        if (this.start >= res.data.total) {
          this.finished = true;
        }
      });
    },
    // 点击跳转至详情页面
    opendetails(val){
      this.$router.push({
        name:'topicdetails',
        params:{
          id:val
        }
        })
    }
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