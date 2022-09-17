<template>
  <div>
    <!-- 30天无忧 -->
    <div class="worry">
      <div>
        <img class="image" src="@/assets/icon/redcircle.png" alt="" />
        <div class="item">30天无忧退货</div>
      </div>
      <div>
        <img class="image" src="@/assets/icon/redcircle.png" alt="" />
        <div class="item">48小时快速退款</div>
      </div>
      <div>
        <img class="image" src="@/assets/icon/redcircle.png" alt="" />
        <div class="item">满88元免邮费</div>
      </div>
    </div>
    <!-- 购物车列表展示 -->
    <div class="goods-box">
      <van-swipe-cell v-for="item in dataList" :key="item.id">
        <van-checkbox v-model="item.isSelected"></van-checkbox>
        <van-card
          :num="item.number"
          :price="item.retail_price"
          :desc="item.goods_name"
          class="goods-card"
          :thumb="item.list_pic_url"
        />
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delList(item.id)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 底部提交订单 -->
    <div>
      <van-submit-bar
        :price="getTotal"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="isAllSelected">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { ordersubmitAction } from "@/api/orders";
import { cartList, deleteAction } from "@/api/car";
export default {
  data() {
    return {
      dataList: [],
    };
  },
  // 实现全选的方式 监听 数据的变化 watch 推荐 computed
  computed: {
    // 全选
    // isAllSelected 函数形式 默认 只读
    // isAllSelected() {
    //   return this.dataList.every(ele=>ele.isSelected==true);
    // },
    isAllSelected: {
      get() {
        return this.dataList.every((ele) => ele.isSelected == true);
      },
      set(val) {
        // console.log(val);
        // val 为赋值之后的结果
        this.dataList.forEach((element) => {
          element.isSelected = val;
        });
        /* 可以简写
        if (val == true) {
          this.dataList.forEach(element => {
            element.isSelected = true;
          });
        }else{
          this.dataList.forEach(element => {
            element.isSelected = false;
          });
        }
        */
      },
    },

    // 计算 总价格
    getTotal() {
      // total 为上一次 循环计算的结果  current 为 当次循环的数据
      return this.dataList.reduce((total, current) => {
        if (current.isSelected) {
          return total + current.retail_price * current.number * 100;
        } else {
          return total;
        }
      }, 0);
    },
  },
  created() {
    this.initCart();
  },
  methods: {
    // 封装 初始化请求 列表数据
    initCart() {
      cartList({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res.data.data);
        // 对数据进行处理 添加一条 属性 来表示 选中的状态
        // 新添加的属性 不是 响应式的数据 必须在 赋值 之前 操作
        res.data.data.forEach((element) => {
          element.isSelected = false;
        });
        this.dataList = res.data.data;
      });
    },
    // 点击删除 商品列表
    delList(val) {
      deleteAction({
        id: val,
      }).then((res) => {
        if ((res.data.data = "true")) {
          this.$toast.success("删除成功");
          this.initCart();
        }
      });
    },
    // 提交订单
    onSubmit() {
      this.$router.push("/car/orders");
      // // 过滤 获取 选中的商品
      // var arr=this.dataList.filter(ele=>ele.isSelected);
      // // 获取 商品 id
      // var newArr=arr.map(ele=>{
      //   return ele.goods_id
      // })
      // newArr.join(",")
      // console.log(newArr);
      ordersubmitAction({
        allPrise:this.getTotal,
        goodsId:this.dataList.filter(ele=>ele.isSelected).map(ele=>{return ele.goods_id}).join(","),
        openId:localStorage.getItem("openId")
      })
      .then(res=>{
        console.log(res);
      })
    },
  },
};
</script>

<style scoped lang="scss">
div {
  .worry {
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f7f8f98c;
    div {
      display: flex;
      align-items: center;
      .image {
        display: block;
        float: left;
        width: 5px;
        height: 5px;
      }
      .item {
        float: left;
        padding-left: 5px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #666;
      }
    }
  }
  .goods-box {
    width: 100%;
    height: 530px;
    overflow: auto;
  }
  .goods-card {
    margin: 0;

    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  .van-submit-bar {
    margin-bottom: 50px;
  }
  .van-swipe-cell .van-checkbox {
    position: relative;
    top: 55px;
    left: 18px;
    z-index: 21;
  }
  .goods-card.van-card {
    margin-left: 30px;
  }
  .van-card__content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .van-card__desc.van-ellipsis {
      margin-bottom: 10px;
    }
  }
  .van-card__price {
    color: #ee0a24;
    display: flex;
    justify-content: flex-start;
  }
  .van-card__num {
    margin-left: 160px;
  }
}
</style>