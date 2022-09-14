<template>
  <div>
    <van-search placeholder="商品搜索" input-align="center" />
    <div class="classify">
      <div class="nav">
        <ul class="nav-box">
          <li class="item" v-for="item in items" :key="item.active">
           <span class="navTitle"  @click="addActive"> {{ item.text }}</span>
          </li>
        </ul>
      </div>
      <div class="list"></div>
    </div>
    <!-- <van-tree-select
      height="115vw"
      :items="items"
      :main-active-index.sync="items.active"
      @click="sendId(items.active)"
    >
      <template slot="content" style="width: 200px; overflow-y: 0">
        <ul class="right-content">
          <img :src="navList.banner_url" style="width: 100%" alt="" />
          <li v-for="item in navList.subList" :key="item.id">
            <img :src="item.wap_banner_url" alt="" />
            {{ item.name }}
          </li>
        </ul>
      </template>
    </van-tree-select> -->
  </div>
</template>

<script>
import { currentaction, indexaction } from "@/api/classify";
export default {
  data() {
    return {
      active: "",
      items: [],
      navList: [],
    };
  },

  created() {
    // 请求的分类列表
    currentaction({
      id: 1005000,
    }).then((res) => {
      console.log(res.data.data.currentOne);
      this.navList = res.data.data.currentOne;
    });
    // 请求的分类导航
    indexaction().then((res) => {
      // console.log(res.data.categoryList);
      for (let i = 0; i < res.data.categoryList.length; i++) {
        this.items.push({
          active: res.data.categoryList[i].id,
          text: res.data.categoryList[i].name,
        });
      }
    });
  },
  methods: {
    addActive(){
      // console.log("被点击了");
      document.querySelector('.navTitle').addclass('active')
    }
  },
};
</script>

<style scoped lang="scss">
div {
  .classify {
    display: flex;
    justify-content: flex-start;
    .nav {
      width: 70px;
      .nav-box{
        margin-top: 10px;
        .item{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 50px;
          font-size: 16px;
          span{
            width: 70px;
            line-height: 50px;
          }
        }
        .item.active{
          border-left: 2px solid #ab2b2b;
        }
      }
    }
    .list {
    }
  }
}
</style>