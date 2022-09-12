<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs @click="sendId" v-model="active">
      <van-tab v-for="item in categoryNav.navData" :key="item.id" :title="item.name" :name="item.id" >
        <div class="header">
          <p class="title">{{ item.name }}</p>
          <p class="desc">{{ item.front_desc }}</p>
        </div>
        <div class="goodsList">
          <div class="goods">
            <div class="item" v-for="item in goodsList" :key="item.id">
              <img :src="item.list_pic_url" alt="" />
              <p class="title">{{ item.name }}</p>
              <p class="price">￥{{ item.retail_price }}</p>
            </div>
          </div>
        </div>
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
      categoryNav: {},
      goodsList: {},
      active:this.$route.params.id
    };
  },

  created() {
    // console.log(this.$route.params.id);
    categoryNav({
      id: this.$route.params.id,
    }).then((res) => {
      // console.log(res.data);
      this.categoryNav = res.data;
    });

    this.channelInit(this.$route.params.id)
  },

  methods: {
    onClickLeft() {
      this.$router.back("/home");
    },
    sendId(name) {
      // console.log(name);
      this.channelInit(name);
    },
    // 初始化 请求
    channelInit(val) {
      return goodsList({
        categoryId: val,
      }).then((res) => {
        // console.log(res.data.data);
        this.goodsList = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  .van-tab__pane {
    background-color: rgba(214, 212, 212, 0.269);
    padding-top: 10px;
    .header {
      padding-top: 5px;
      background-color: #fff;
      .title {
        margin-bottom: 5px;
        font-size: 16px;
        color: #333;
      }
      .desc {
        display: block;
        line-height: 20px;
        font-size: 12px;
        color: #999;
        padding-bottom: 10px;
      }
    }
    .goodsList {
      .goods {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width: 185px;
          background-color: #fff;
          margin-bottom: 5px;
          img {
            width: 167px;
            height: 167px;
          }
        }
      }
    }
  }
}
</style>