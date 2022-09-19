<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs @click="sendId" v-model="active">
      <van-tab
        v-for="item in categoryNav.navData"
        :key="item.id"
        :title="item.name"
        :name="item.id"
      >
        <div class="header">
          <p class="title">{{ item.name }}</p>
          <p class="desc">{{ item.front_desc }}</p>
        </div>
        <div class="goodsList" v-if="isshow">
          <div class="goods">
            <div
              class="item"
              v-for="item in goodsList"
              :key="item.id"
              @click="opendetail(item.id)"
            >
              <img :src="item.list_pic_url" alt="" />
              <p class="title">{{ item.name }}</p>
              <p class="price">￥{{ item.retail_price }}</p>
            </div>
          </div>
        </div>
        <!-- 没有商品是显示 -->
        <div class="brandTip" v-else>数据库暂无数据...</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { categoryNav, goodsList } from "@/api/home/channeldetail";
export default {
  data() {
    return {
      categoryNav: {},
      goodsList: {},
      active: this.$route.query.id,
      isshow: true,
    };
  },
  // 监听数据
  watch: {
    goodsList: function (val) {
      if (val == "undefinded" || val.length <= 0) {
        // console.log("数据为空");
        this.isshow = false;
      }
    },
  },
  async created() {
    // console.log(this.$route.params.id);
    const res = await categoryNav({
      id: this.$route.query.id,
    });
    // console.log(res.data);
    this.categoryNav = res.data;

    await this.channelInit(this.$route.query.id);
  },

  methods: {
    // 点击跳转至商品详情
    opendetail(val) {
      this.$router.push({
        name: "detailsPage",
        query: {
          id: val,
        },
      });
    },
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
  .van-nav-bar.van-hairline--bottom {
    width: 100%;
    position: fixed;
    top: 0;
  }
  .van-tabs.van-tabs--line {
    margin-top: 50px;
  }
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
    .brandTip {
      width: 100%;
      height: 470px;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
    }
  }
}
</style>