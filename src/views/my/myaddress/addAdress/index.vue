<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-edit
      :area-list="areaList"
      show-delete
      tel-maxlength="11"
      :tel-validator="validator"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import "@/assets/addAddressCss/index.css";
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },

  mounted() {},

  methods: {
    // 手机号的校验 
    validator(e) {
      let myreg1 =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!myreg1.test(e)) {
        console.log("手机号错误");
        return false;
      } else {
        console.log("手机号正确");
        return true;
      }
    },
    // 点击返回 新增地址 页面
    onClickLeft() {
      this.$router.back("/my/myaddress");
    },
    // 点击保存
    onSave() {
      console.log(this.searchResult);
    },
    // 点击删除
    onDelete() {},
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: val,
            address: val,
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>
