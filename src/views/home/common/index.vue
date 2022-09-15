<template>
  <div>
    <div class="newcateglaryList">
      <div
        class="goodList"
        v-for="good in parentData.newCategoryList"
        :key="good.id"
      >
        <div class="name">{{ good.name }}</div>
        <div class="gooditem">
          <div
            v-for="gooditem in good.goodsList"
            :key="gooditem.id"
            @click="opendetail(gooditem.id)"
          >
            <img :src="gooditem.list_pic_url" alt="" />
            <div>
              <p>{{ gooditem.name }}</p>
              <span>￥{{ gooditem.retail_price }}</span>
            </div>
          </div>
          <div class="arrow">
            <p>{{ good.name }}</p>
            <img src="@/assets/icon/icon_go_more.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["parentData"],
  watch: {
    parentData() {
      // 打印传递过来的数据
      // console.log(this.parentData);
    },
  },
  created() {},

  methods: {
    // 点击跳转至商品详情页面
    opendetail(val) {
      this.$router.push({
        name: "detailsPage",
        query: {
          id: val,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
div {
  .newcateglaryList {
    .goodList {
      width: 100%;
      .name {
        width: 100px;
        line-height: 20px;
        font-size: 14px;
        margin: 10px auto;
      }
      .gooditem {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
        margin: 0 auto;
        /*
        :last-child {
          margin-right: 50%;
        }
        */
        div {
          width: 180px;
          background: #fff;
          margin-bottom: 5px;
          padding-bottom: 5px;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          img {
            width: 120px;
            height: 120px;
            display: block;
            margin: 0 auto;
          }
          div {
            width: 120px;
            margin-left: 20%;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span {
              color: #9c3232;
              margin-bottom: 5px;
            }
          }
        }
        .arrow {
          position: relative;
          p {
            position: absolute;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            width: 185px;
            line-height: 22px;
            font-size: 16px;
          }
          img {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
}
</style>