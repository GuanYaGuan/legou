<template>
  <div class="detail-box">
    <div class="detail-item">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in detailData.gallery" :key="item.id">
          <img :src="item.img_url" alt="" />
        </van-swipe-item>
      </van-swipe>
      <!-- 30天无忧 -->
      <div class="worry">
        <div>
          <img class="image" src="@/assets/icon/redcircle.png" alt="" />
          <div class="item">30天无忧退货</div>
        </div>
        <div>
          <img class="image" src="@/assets/icon/redcircle.png" alt="" />
          <div class="item">48小时快速退款</div>
        </div>
        <div>
          <img class="image" src="@/assets/icon/redcircle.png" alt="" />
          <div class="item">满88元免邮费</div>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="goodsinfo">
        <h3 class="name" v-if="detailData.info">{{ detailData.info.name }}</h3>
        <p class="desc" v-if="detailData.info">
          {{ detailData.info.goods_brief }}
        </p>
        <p class="price" v-if="detailData.info">
          ￥{{ detailData.info.retail_price }}
        </p>
      </div>
      <!-- 选择产品数量 -->
      <div class="section-nav">
        <span>请选择商品数量</span>
        <van-icon name="arrow" size="20" />
      </div>
      <!-- 灰色的横条 -->
      <div class="color"></div>
      <!-- 商品参数表格 -->
      <div class="attribute">
        <h3 class="title">商品参数</h3>
        <div
          class="item"
          v-for="(item, index) in detailData.attribute"
          :key="index"
        >
          <span class="name">{{ item.name }}</span>
          <span class="value">{{ item.value }}</span>
        </div>
      </div>
      <!-- 灰色的横条 -->
      <div class="color"></div>
      <!-- 下面的图片展示 -->
      <div
        class="desc"
        v-html="detailData.info.goods_desc"
        v-if="detailData.info"
      ></div>
      <!-- 灰色的横条 -->
      <div class="color"></div>
      <!-- 常见问题 -->
      <div class="common-problem">
        <div class="item-a">
          <div class="line"></div>
          <span>常见问题</span>
          <div class="line"></div>
        </div>
        <div class="item-b" v-for="item in detailData.issue" :key="item.id">
          <div class="ques">
            <img src="@/assets/icon/redcircle.png" alt="" />
            <span>{{ item.question }}</span>
          </div>
          <span class="answer">
            {{ item.answer }}
          </span>
        </div>
      </div>
      <!-- 灰色的横条 -->
      <div class="color" style="height: 60px; margin-top: 15px"></div>
      <!-- 大家都在看 -->
      <div class="seeAll">
        <div class="item-a">
          <div class="line"></div>
          <span>大家都在看</span>
          <div class="line"></div>
        </div>
        <div class="goodsList">
          <div
            class="item"
            v-for="item in detailData.productList"
            :key="item.id"
          >
            <img :src="item.list_pic_url" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">￥{{ item.retail_price }}</p>
          </div>
        </div>
      </div>
      <!-- 底部的添加购物车 -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="0" />
        <van-goods-action-icon icon="shop-o" text="店铺" badge="0" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import "@/assets/detailCss/index.css";
import { goodsDetails } from "@/api/home/detailsPage";
export default {


  data() {
    return {
      detailData: [],
    };
  },

  created() {
    goodsDetails({
      id: this.$route.query.id,
      openId: localStorage.getItem("openId"),
    }).then((res) => {
      // console.log(res.data);
      this.detailData = res.data;
    });
  },

  methods: {
    onClickLeft() {
      this.$router.back("/home");
    },
  },
};
</script>
 