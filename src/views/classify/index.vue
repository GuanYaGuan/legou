<template>
  <div>
    <van-search placeholder="商品搜索" input-align="center" />
    <div class="classify">
      <div class="nav">
        <ul class="nav-box">
          <li
            class="item"
            v-for="item in items"
            :key="item.id"
            :class="{ active: spanactive == item.id }"
            @click="addActive(item.id)"
            :id="item.id"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="list">
        <img class="banner" :src="navList.banner_url" alt="" />
        <div class="item-a">
          <div class="line"></div>
          <span>{{ navList.name }}分类</span>
          <div class="line"></div>
        </div>
        <ul class="item">
          <li class="little" v-for="item in navList.subList" :key="item.id">
            <img :src="item.wap_banner_url" alt="" />
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { currentaction, indexaction } from "@/api/classify";
export default {
  data() {
    return {
      spanactive: "",
      items: [],
      navList: [],
    };
  },
  async created() {
    // 请求的分类导航
    const res = await indexaction();
    // console.log(res.data.categoryList);
    this.items = res.data.categoryList;
    /* 
      这里对这个数据进行了处理,本来用的是 vant 组件当中的 select 选择框, 需要这种类型的数据 items 但是样式不太好
      for (let i = 0; i < res.data.categoryList.length; i++) {
        this.items.push({
          active: res.data.categoryList[i].id,
          text: res.data.categoryList[i].name,
        });
      }
      */
    // 初始化居家数据
    this.initList(this.items[0].id);
    this.spanactive = this.items[0].id;
  },
  methods: {
    // vue 中点击那个给那个添加上 active 的类名
    addActive(val) {
      // console.log("被点击了");
      this.spanactive = val;
      this.initList(val);
    },
    // 请求的分类列表
    initList(num) {
      return currentaction({
        id: num,
      }).then((res) => {
        // console.log(res.data.data.currentOne);
        this.navList = res.data.data.currentOne;
      });
    },
  },
};
</script>

<style scoped lang="scss">
div {
  width: 100%;
  .classify {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .nav {
      width: 70px;
      .nav-box {
        .item {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 70px;
          height: 40px;
          font-size: 16px;
        }
        .item.active {
          border-left: 2px solid #ab2b2b;
          color: #ab2b2b;
          font-size: 20px;
        }
      }
    }
    .list {
      margin-left: 20px;
      width: calc(100% - 70px);
      .banner {
        width: 100%;
      }
      .item-a {
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        margin-top: 10px;
        .line {
          width: 20px;
          height: 1px;
          background-color: #000;
        }
        span {
          margin: 0 5px;
          font-size: 12px;
        }
      }
      .item {
        width: 100%;
        margin: 0 auto;
        overflow: auto;
        .little {
          float: left;
          margin-left: 5%;
          img {
            width: 79px;
            height: 79px;
          }
          p {
            text-align: center;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>