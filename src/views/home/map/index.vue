<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft(city)"
    />
    <van-search v-model="value" placeholder="请输入地址" />
    <!-- 搜索提示部分 -->
    <div class="notice">
      <ul>
        <li v-for="item in searchList" :key="item.id" @click="showGoods(item)">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- 添加地图容器 -->
    <div class="title">正在查找当前位置:</div>
    <div id="container"></div>
  </div>
</template>

<script>
// 四种映射的方法
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "LegouIndex",

  data() {
    return {
      value: "",
      city: "",
      searchList: [],
    };
  },
  watch: {
    value() {
      var _this = this;
      // JSAPI 2.0 输入提示插件名称由 AMap.Autocomplete 变更为 AMap.AutoComplete 啦！
      AMap.plugin("AMap.AutoComplete", function () {
        var autoOptions = {
          //city 限定城市，默认全国
          city: _this.city,
        };
        // 实例化AutoComplete
        var autoComplete = new AMap.AutoComplete(autoOptions);
        // 根据关键字进行搜索
        autoComplete.search(_this.value, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          //   console.log(result);
          _this.searchList = result.tips;
        });
      });
    },
  },
  mounted() {
    // 创建地图实例  必须是在 mounted 钩子函数内
    // 如果 vuex 中有数据 那么地图中展示的数据应为页面传递的数据
    var _this = this;

    AMap.plugin("AMap.CitySearch", function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          //   console.log(result);
          _this.city = result.city;
        }
      });
    });
    if (this.$store.state.cityInfo.name) {
      var cityInfo = this.$store.state.cityInfo;
      var map = new AMap.Map("container", {
        zoom: 18, //  放大级别 0~22
        center: [cityInfo.location.lng, cityInfo.location.lat],
      });
      var marker = new AMap.Marker({
        position: [cityInfo.location.lng, cityInfo.location.lat], //位置
      });
      map.add(marker); //添加到地图
      return;
    }
    var map = new AMap.Map("container", {
      zoom: 8, //  放大级别 0~22
    });

    // 创建标记

    // 具体位置需要使用浏览器定位 不需要更改啥 但是这是一个高精度的定位 很慢！！！

    // 我们使用的是方式三 获取的是一个大致的位置
    // 这里的 this 指向有问题需要保存一下 this 指向
  },

  methods: {
    // 映射传递的数据  有两种写法 数组 和 对象 两种写法
    // ...mapMutations(["upCityInfo"]),
    ...mapMutations({
      addCityInfo: "upCityInfo",
    }),
    // 点击返回到 首页
    onClickLeft(city) {
      this.$route.params.message = city;
      this.$router.back("/home");
    },
    // 点击搜索的地址定位并跳转至首页
    showGoods(val) {
      //   console.log(val);
      this.addCityInfo(val);
      this.city = val.name;
      this.onClickLeft(val.name);
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  .notice {
    height: 380px;
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
    overflow: auto;
    ul {
      height: 330px;
      width: 100%;
      overflow: auto;
      li {
        display: flex;
        justify-content: flex-start;
        margin: 15px 0;
        font-size: 15px;
        line-height: 20px;
      }
    }
  }
  .title {
    position: fixed;
    bottom: 210px;
    left: 10px;
    font-size: 16px;
    font-weight: 800;
  }
  #container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
  }
}
</style>