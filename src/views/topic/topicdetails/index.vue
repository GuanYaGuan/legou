<template>
  <div class="topicDetails-box">
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 热门好物推荐 -->
    <div class="hotgoods">
      <img :src="topicData.data.scene_pic_url" alt="" v-if="topicData.data" />
      <van-icon
        name="fire-o"
        size="30"
        color="#ee0a24"
        :badge="topicData.data.read_count"
        v-if="topicData.data"
      />
    </div>
    <div
      class="content"
      v-html="topicData.data.content"
      v-if="topicData.data"
    ></div>
    <div class="list">
      <h3 class="title">专题推荐</h3>
      <div class="item" v-for="item in topicData.recommendList" :key="item.id">
        <img :src="item.scene_pic_url" alt="" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/topicdetailsCss/index.css";
import { topicDetail } from "@/api/topic";
export default {
  data() {
    return {
      topicData: [],
    };
  },

  created() {
    topicDetail({
      id: this.$route.params.id,
    }).then((res) => {
      // console.log(res.data);
      this.topicData = res.data;
    });
  },

  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>