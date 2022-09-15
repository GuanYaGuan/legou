<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 新增收货地址按钮 -->
    <div class="addButton" @click="addAddress">
      +新建收货地址
    </div>
  </div>
</template>

<script>
// 四个接口分别是 获取 保存 详情 删除
import {
  getListAction,
  saveAction,
  detailAction,
  deleteAction,
} from "@/api/my/address";
export default {
  data() {
    return {};
  },

  created() {
    // 获取 地址 列表信息
    getListAction({
      openId: localStorage.getItem("openId"),
    }).then((res) => {
      console.log(res.data);
    });
  },

  methods: {
    // 点击返回 我的 页面
    onClickLeft() {
      this.$router.back("/my");
    },
    // 点击 添加 地址
    addAddress(){
        this.$router.push("/my/myaddress/addAdress");
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  .addButton {
    position: fixed;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    border: 1Px solid #f00;
    height: 40px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    padding: 0;
    font-size: 14px;
    color: #f00;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>