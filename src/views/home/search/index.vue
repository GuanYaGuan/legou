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
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="historybox">
      <div class="title">
        <span>历史记录</span>
        <van-icon name="delete-o" />
      </div>
      <div class="desc">
        <ul>
          <li v-for="(item, index) in dataList.historyData" :key="index">
            <span>{{ item.keyword }}</span>
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
</template>

<script>
import { keywords } from "@/api/home/search";
export default {
  name: "LegouIndex",

  data() {
    return {
      value: "",
      dataList: "",
    };
  },

  async created() {
    const res = await keywords({
      openId: localStorage.getItem("openId"),
    });
    console.log(res.data);
    this.dataList = res.data;
  },

  methods: {
    onClickLeft() {
      this.$router.back("/home");
    },
    onSearch() {},
    onCancel() {},
  },
};
</script>

<style scoped lang="scss">
div {
  .historybox {
    width: 100%;
    height: 150px;
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
  }
  .hotbox {
    width: 100%;
    height: 150px;
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
</style>