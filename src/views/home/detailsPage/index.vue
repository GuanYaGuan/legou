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
        <van-icon
          name="arrow"
          style="width: 30px"
          @click="opengoodInfo"
          size="20"
        />
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
            <!-- 底部的添加购物车 -->
          </div>
        </div>
      </div>
      <van-goods-action>
        <van-goods-action-icon
          icon="star-o"
          text="收藏"
          dot
          :color="isshow ? '' : '#b4282d'"
          @click="addcollect"
        />
        <van-goods-action-icon
          icon="cart-o"
          @click="opencarpage"
          text="购物车"
          :badge="getNumber"
        />
        <van-goods-action-button
          type="warning"
          @click="addCar"
          text="加入购物车"
          v-model="count"
        />
        <van-goods-action-button
          type="danger"
          @click="openOrder()"
          text="立即下单"
        />
      </van-goods-action>
      <!-- 弹出框 -->
      <van-popup
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '40%' }"
      >
        <img
          class="goods-image"
          style="width: 95px; height: 95px; margin: 20px"
          :src="detailData.info.primary_pic_url"
          v-if="detailData.info"
          alt=""
        />
        <p class="price" v-if="detailData.info">
          价格￥{{ detailData.info.retail_price }}
        </p>
        <p class="descInfo">请选择商品数量</p>
        <p class="numberTitle">数量</p>
        <van-stepper v-model="value" />
      </van-popup>
    </div>
  </div>
</template>

<script>
// 请求 购物车列表 获取一下购物车 列表数量
import { cartList } from "@/api/car";
// 添加购物车
import { addCart } from "@/api/car";
import "@/assets/detailCss/index.css";
// 商品详情
import { goodsDetails } from "@/api/home/detailsPage";
// 添加 收藏
import { addcollect } from "@/api/home/detailsPage/addcollect";
export default {
  data() {
    return {
      detailData: [],
      isshow: true,
      show: false,
      value: 1,
      count: 0,
      dataList: [],
    };
  },
  // 计算商品数量
  computed: {
    getNumber() {
      var total = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        total += this.dataList[i].number;
      }
      return total;
    },
  },
  created() {
    // 购物车列表
    this.initCart();
    // 商品详情
    goodsDetails({
      id: this.$route.query.id,
      openId: localStorage.getItem("openId"),
    }).then((res) => {
      // console.log(res.data);
      this.detailData = res.data;
    });
  },

  methods: {
    // 封装 初始化请求 列表数据
    initCart() {
      cartList({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res.data.data);
        // 对数据进行处理 添加一条 属性 来表示 选中的状态
        // 新添加的属性 不是 响应式的数据 必须在 赋值 之前 操作
        res.data.data.forEach((element) => {
          element.isSelected = false;
        });
        this.dataList = res.data.data;
      });
    },
    onClickLeft() {
      this.$router.back("/home");
    },
    // 点击 发送请求 添加收藏
    addcollect() {
      // console.log(val);
      addcollect({
        goodsId: this.$route.query.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res.data.data);
        if (res.data.data === "success") {
          this.isshow = !this.isshow;
        }
      });
    },
    // 点击打开 购物车 列表
    opencarpage() {
      this.$router.push("/car");
    },
    // 点击 打开商品参数
    opengoodInfo() {
      this.showPopup();
    },
    // 点击 打开 添加购物车
    addCar() {
      this.count++;
      this.showPopup();
      if (this.count === 2) {
        addCart({
          goodsId: this.$route.query.id,
          number: this.value,
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          // console.log(res.data.data);
          if (res.data.data === "success") {
            this.$toast.success("添加成功");
            this.initCart();
            this.show = false;
          }
        });
        this.count = 0;
      }
    },
    showPopup() {
      this.show = true;
    },
    // 点击 打开订单页面
    openOrder() {
      this.count++;
      this.showPopup();
      if (this.count === 2) {
        this.$router.push({
          name: "orders",
          query: {
            allPrise: this.detailData.info.retail_price * this.value,
          },
        });
        this.count = 0;
      }
    },
  },
};
</script>
 