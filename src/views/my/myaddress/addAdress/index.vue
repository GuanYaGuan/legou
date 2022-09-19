<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 这个组件 缺少相应的 api 地址 数据 点击编辑的时候无法渲染
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
    /> -->
    <van-cell-group>
      <van-field
        v-model="formData.userName"
        label="姓名"
        placeholder="请输入用户名"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="formData.telNumber"
        label="手机号码"
        placeholder="请输入手机号码"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        @click.native="show = !show"
        readonly
        v-model="formData.address"
        label="请选择省市区"
        placeholder="请选择省市区"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="formData.detailadress"
        label="详细地址"
        placeholder="请输入详细地址"
      />
    </van-cell-group>
    <van-checkbox v-model="formData.checked" class="isAddress"
      >是否是默认地址</van-checkbox
    >
    <!-- 地址 选择 的 模态框 -->
    <van-popup v-model="show" position="bottom"
      ><van-area @confirm="selecteAddress" title="标题" :area-list="areaList"
    /></van-popup>
    <div class="bottom-button-save">
      <button class="save" @click="save">保存</button>
    </div>
    <div class="bottom-button-del">
      <button class="del" @click="onDelete">删除</button>
    </div>
  </div>
</template>

<script>
import { saveAction, detailAction, deleteAction } from "@/api/my/address";
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      areaList,
      // list: {
      //   name: "", // 名字
      //   tel: "", // 电话
      //   province: "", // 省份
      //   city: "", //城市
      //   county: "", // 县
      //   addressDetail: "", // 详细地址
      //   isDefault: "", // 是否为默认地址
      //   addressId: "",
      // },
      show: false,
      formData: {
        address: "",
        addressId: "",
        checked: ""||false,
        detailadress: "",
        openId: localStorage.getItem("openId"),
        telNumber: "",
        userName: "",
      },
    };
  },

  created() {
    if (this.$route.query.id) {
      detailAction({
        id: this.$route.query.id,
      }).then((res) => {
        this.formData.address = res.data.data.address;
        this.formData.detailadress = res.data.data.address_detail;
        this.formData.checked = res.data.data.is_default;
        this.formData.telNumber = res.data.data.mobile;
        this.formData.userName = res.data.data.name;
        this.formData.addressId = res.data.data.id;
      });
    }
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
    selecteAddress(val) {
      console.log(val);

      this.formData.address = val.map((ele) => ele.name).join(" ");
      this.show = !this.show;
    },
    // 点击保存
    save() {
      // 发送请求保存数据
      saveAction(this.formData).then((res) => {
        // console.log(res.data.data); // true or fasle
        if (res.data.data) {
          this.$toast.success("添加成功");
          this.$router.back("/my/myaddress");
        }
      });
    },
    // 点击删除
    onDelete() {
      deleteAction({
        id: this.$route.query.id,
      }).then((res) => {
        this.$toast.success("删除成功");
        this.$router.back("/my/myaddress");
      });
    },
  },
};
</script>

<style lang='scss' scoped>
div {
  .isAddress {
    float: right;
    margin: 25px;
  }
  .bottom-button-save {
    width: 100%;
    position: fixed;
    bottom: 50px;
    .save {
      height: 35px;
      width: 90%;
      border-radius: 5px;
      border: 0;
      background-color: #b4282d;
      color: #fff;
      font-size: 14px;
    }
  }
  .bottom-button-del {
    width: 100%;
    position: fixed;
    bottom: 10px;
    .del {
      width: 90%;
      height: 35px;
      border-radius: 5px;
      border: 0;
      background-color: rgb(242, 241, 241);
      font-size: 14px;
    }
  }
}
</style>