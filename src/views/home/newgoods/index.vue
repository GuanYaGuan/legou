<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="goods">
      <div class="goodsNav">
        <span :class="{ left: color }" @click="othera">综合</span>
        <div class="price" @click="sortPrice">
          <span :class="`${current == 'default' ? '' : 'on'}`">价格</span>
          <span class="arror">
            <van-icon
              :color="current == 'up' ? '#b4282d' : ''"
              name="arrow-up"
            />
            <van-icon
              :color="current == 'down' ? '#b4282d' : ''"
              name="arrow-down"
            />
          </span>
        </div>
        <span :class="{ right: show }" @click="otherb">分类</span>
      </div>
      <div>
        <div
          class="goodsBox"
          v-for="item in newgoods.data"
          :key="item.id"
          @click="opendetail(item.id)"
        >
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">{{ item.retail_price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isNewHot } from "@/api/home/goodsList";
export default {
  data() {
    return {
      newgoods: [],
      order: "",
      current: "default", // default up down
      color: true,
      show: false,
    };
  },
  created() {
    this.init();
    // 保存
  },

  methods: {
    init() {
      isNewHot({
        isHot: "" || this.$route.query.isNew,
        isNew: "" || this.$route.query.isHot,
        order: "" || this.order,
      }).then((res) => {
        // console.log(res.data);
        this.newgoods = res.data;
      });
    },
    // 点击排序价格
    sortPrice() {
      this.color = false;
      this.show = false;
      if (this.current == "default") {
        this.current = "up";
        this.order = "asc";
      } else if (this.current == "up") {
        this.current = "down";
        this.order = "desc";
      } else {
        this.current = "up";
        this.order = "asc";
      }
      this.init();
    },
    onClickLeft() {
      this.$router.back("/home");
    },
    // 点击价格以外的按钮
    othera() {
      this.show = false;
      this.current = "default";
      this.color = true;
      this.init();
    },
    otherb() {
      this.show = true;
      this.color = false;
      this.current = "default";
      this.init();
    },

    // 点击跳转至商品详情页
    opendetail(val) {
      this.$router.push({
        name: "detailsPage",
        params: {
          id: val,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: rgba(227, 224, 224, 0.185);
  .van-nav-bar.van-hairline--bottom {
    background-color: #fff;
    margin: 0;
  }
  .goods {
    .goodsNav {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      background-color: #fff;
      margin-bottom: 5px;
      .on {
        color: #b4282d;
      }
      .left {
        color: #b4282d;
      }
      .right {
        color: #b4282d;
      }
      span {
        line-height: 40px;
        font-size: 14px;
      }
      .price {
        display: flex;
        justify-content: center;
        .arror {
          position: absolute;
          left: 55%;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          font-size: 1px;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
    div {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      .goodsBox {
        width: 185px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 5px;
        background-color: #fff;
        img {
          width: 150px;
          height: 150px;
        }
        p {
          width: 100%;
          margin: 5px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>