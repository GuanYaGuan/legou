<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 获取的地址列表展示区域 -->
    <div class="address">
      <ul class="list">
        <li
          class="item"
          @click="openOrder(item)"
          v-for="item in addressList"
          :key="item.id"
        >
          <div class="left">{{ item.name }}</div>
          <div class="detail">
            <p class="tel">{{ item.mobile }}</p>
            <p class="address">{{ item.address + item.address_detail }}</p>
          </div>
          <div class="right">
            <van-icon size="25" name="edit" @click="openEdit(item.id)" />
          </div>
        </li>
      </ul>
    </div>
    <!-- 新增收货地址按钮 -->
    <div class="addButton" @click="addAddress">+新建收货地址</div>
  </div>
</template>

<script>
// 四个接口分别是 获取 保存 详情 删除
import { getListAction, detailAction, deleteAction } from "@/api/my/address";
export default {
  data() {
    return {
      addressList: [],
    };
  },

  created() {
    // 获取 地址 列表信息
    getListAction({
      openId: localStorage.getItem("openId"),
    }).then((res) => {
      //   console.log(res.data.data);
      this.addressList = res.data.data;
    });
  },

  methods: {
    // 点击返回 我的 页面
    onClickLeft() {
      this.$router.back();
    },
    // 点击 添加 地址
    addAddress() {
      this.$router.push("/my/myaddress/addAdress");
    },
    // 点击 打开 编辑页面
    openEdit(val) {
      this.$router.push({
        name: "addAdress",
        query: {
          id: val,
        },
      });
    },
    // 点击地址跳转至订单页面
    openOrder(val) {
      localStorage.setItem("address", JSON.stringify(val));
      // 使用 push 的方法 浏览器历史记录会增加一条记录 所以会在 两个页面之间来回切换
      this.$router.push("/car/orders");

    },
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
    border: 1px solid #f00;
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
  .address {
    width: 100%;
    .list {
      height: 560px;
      overflow: auto;
      .item {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 10px 0;
        border-bottom: 1px solid rgba(204, 204, 204, 0.295);
        .left {
          width: 20%;
          margin: 0 10px;
          height: 40px;
        }
        .detail {
          width: 60%;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-content: center;
          width: 220px;
          margin: 0 10px;
          height: 80px;
          .tel {
            height: 20px;
            margin: 0;
            padding: 0;
          }
          .address {
            display: flex;
            justify-content: flex-start;
            height: 20px;
            margin: 0;
            padding: 0;
          }
        }
        .right {
          width: 20%;
        }
      }
    }
  }
}
</style>