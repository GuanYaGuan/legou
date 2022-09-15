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
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="this.list"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { saveAction, detailAction, deleteAction } from "@/api/my/address";
import "@/assets/addAddressCss/index.css";
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      areaList,
      list: {
        name: "", // 名字
        tel: "", // 电话
        province: "", // 省份
        city: "", //城市
        county: "", // 县
        addressDetail: "", // 详细地址
        isDefault: "false", // 是否为默认地址
      },
    };
  },

  created() {
    detailAction({
      id: this.$route.query.id,
    })
    .then(res=>{
      console.log(res.data.data);
      this.list=res.data.data;
    })
  },

  methods: {
    // 手机号的校验
    validator(e) {
      let myreg1 =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!myreg1.test(e)) {
        // console.log("手机号错误");
        return false;
      } else {
        // console.log("手机号正确");
        return true;
      }
    },
    // 点击返回 新增地址 页面
    onClickLeft() {
      this.$router.back("/my/myaddress");
    },
    // 点击保存
    onSave(list) {
      // 发送请求保存数据
      saveAction({
        address: list.province + list.city + list.county,
        addressId: "",
        checked: list.isDefault,
        detailadress: list.addressDetail,
        telNumber: list.tel,
        userName: list.name,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res.data.data); // true or fasle
        if (res.data.data) {
          this.$toast.success("添加成功");
          this.$router.back('/my/myaddress');
        }
      });
    },
    // 点击删除
    onDelete(val) {
      deleteAction({
        id:this.$route.query.id
      })
      .then(res=>{
        this.$toast.success("删除成功");
        this.$router.back('/my/myaddress');
      })
    },
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
