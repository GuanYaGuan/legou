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
          <div v-for="gooditem in good.goodsList" :key="gooditem.id">
            <img :src="gooditem.list_pic_url" alt="" />
            <div>
              <p>{{ gooditem.name }}</p>
              <span>￥{{ gooditem.retail_price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LegouIndex",

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

  methods: {},
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
        :last-child {
          margin-right: 50%;
        }
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
      }
    }
  }
}
</style>