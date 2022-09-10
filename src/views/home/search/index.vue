<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <form action="/">
      <van-search
        v-model.trim="iptVal"
        show-action
        placeholder="请输入搜索关键词"
        @input="iptEvent"
      />
    </form>
    <!-- 默认部分 搜索页的历史记录和关键词 -->
    <div class="default" v-if="current == 'default'">
      <div class="historybox">
        <div class="title">
          <span>历史记录</span>
          <van-icon name="delete-o" @click="delHistory()" />
        </div>
        <div class="desc" v-show="isshow">
          <ul>
            <li v-for="(item, index) in dataList.historyData" :key="index">
              <span @click="openGoods(item.keyword)">{{ item.keyword }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="hotbox">
        <div class="title">
          <span>热门搜索</span>
        </div>
        <div class="desc">
          <ul>
            <li v-for="(item, index) in dataList.hotKeywordList" :key="index">
              <span>{{ item.keyword }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 搜索提示部分 -->
    <div class="notice" v-else-if="current == 'notice'">
      <ul>
        <li
          v-for="item in noticeList"
          :key="item.id"
          @click="showGoods(item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- 点击搜索提示所对应的商品, 商品页面 -->
    <div class="goods" v-else>
      <div class="goodsNav">
        <span>综合</span>
        <div class="price" @click="setcolor">
          <span>价格</span>
          <span class="arror">
            <van-icon name="arrow-up" />
            <van-icon name="arrow-down" />
          </span>
        </div>
        <span>分类</span>
      </div>
      <div class="goodsBox" v-for="item in goodsList" :key="item.id">
        <img :src="item.list_pic_url" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">{{ item.retail_price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { keywords, searchTip, addHistory, delHistory } from "@/api/home/search";
export default {
  name: "LegouIndex",

  data() {
    return {
      iptVal: "",
      dataList: "",
      isshow: false,
      current: "default", // 三个节点 default  notice  goods
      noticeList: [],
      goodsList: [],
    };
  },
  /* 监听输入框的数据的更改  因为数据是双向绑定的 所以可以使用 watch 监听
     还有 input 事件也可以监听 @input="iptEvent"  然后在 method  方法中 书写 iptEvent(){}
  watch:{
    iptVal(){
      console.log("数据改变了");
    }
  },
  */
  created() {
    this.isshow = true;
    keywords({
      openId: localStorage.getItem("openId"),
    }).then((res) => {
      this.dataList = res.data;
    });
  },

  methods: {
    onClickLeft() {
      this.$router.back("/home");
    },
    // 监听输入框改变
    iptEvent() {
      // console.log("改变了");
      if (this.iptVal) {
        this.current = "notice";
        // 调接口 渲染搜索提示
        searchTip({
          keyword: this.iptVal,
          // 没有传递一个空的字符
          order: "",
        }).then((res) => {
          // console.log(res);
          this.noticeList = res.data.keywords;
        });
      } else {
        this.current = "default";
        // 初始化更新 历史记录页面数据
        this.isshow = true;
        keywords({
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          this.dataList = res.data;
        });
      }
    },
    // 点击展示商品
    showGoods(val) {
      this.current = "goods";
      searchTip({
        keyword: val,
        // 没有传递一个空的字符
        order: "",
      }).then((res) => {
        // console.log(res);
        this.goodsList = res.data.keywords;
      });
      // 保存搜索时的历史记录
      addHistory({
        keyword: val,
        openId: localStorage.getItem("openId"),
      });
    },
    // 点击删除 历史记录
    delHistory() {
      this.isshow = false;
      delHistory({
        openId: localStorage.getItem("openId"),
      });
    },
    // 点击改变箭头的颜色
    setcolor() {},
    // 点击历史记录打开详情
    openGoods(val) {
      this.current = "goods";
      searchTip({
        keyword: val,
        // 没有传递一个空的字符
        order: "",
      }).then((res) => {
        // console.log(res);
        this.goodsList = res.data.keywords;
      });
    },
  },
};
</script>

<style scoped lang="scss">
div {
  .default {
    .historybox {
      width: 100%;
      margin-top: 20px;
      .title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 30px;
        font-size: 14px;
        span {
          margin: 10px 20px;
        }
        .van-icon.van-icon-delete-o {
          margin: 10px 20px;
        }
      }
      .desc {
        ul {
          li {
            float: left;
            border: 1px solid #333;
            padding: 5px;
            margin: 10px 20px;
          }
        }
      }
    }
    .hotbox {
      width: 100%;
      .title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 30px;
        font-size: 14px;
        span {
          margin: 10px 20px;
        }
      }
      .desc {
        ul {
          li {
            float: left;
            border: 1px solid #333;
            padding: 5px;
            margin: 10px 20px;
          }
        }
      }
    }
  }
  .notice {
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
    ul {
      li {
        display: flex;
        justify-content: flex-start;
        margin: 15px 0;
        font-size: 15px;
        line-height: 20px;
      }
    }
  }
  .goods {
    .goodsNav {
      position: relative;
      border-bottom: 1px solid #d9d9d9;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
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
    .goodsBox {
      width: 50%;
      border-right: 1px solid #d9d9d9;
      img {
        width: 150px;
        height: 150px;
      }
    }
  }
}
</style>