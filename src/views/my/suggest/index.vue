<template>
  <div>
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="title">意见与反馈</div>
    <div class="info">
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="150"
        placeholder="请填写意见与反馈"
        show-word-limit
      />
    </div>
    <div class="tel">
        <van-field v-model.trim.number="value" label="联系方式" placeholder="微信 / 电话 / QQ" />
    </div>
    <button class="submit" @click="addSuggest">提交</button>
  </div>
</template>

<script>
import {submitAction} from '@/api/my/suggest'
export default {
  name: "LegouIndex",

  data() {
    return {
      value: "",
      message:'',
    };
  },

  mounted() {},

  methods: {
    // 点击返回
    onClickLeft() {
      this.$router.back("/my");
    },
    // 点击 提交意见 与反馈
    addSuggest(){
      submitAction({
        content:this.message,
        name:localStorage.getItem("nickName"),
        openId:localStorage.getItem("openId"),
        phone:this.value,
      })
      .then(res=>{
        // console.log(res.data.data);
        if(res.data.data){
          this.$toast.success("反馈成功");
          this.$router.back('/my')
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.26);
    line-height: 20px;
    font-size: 12px;
    padding-left: 25px;
  }
  .info {
    width: 100%;
    height: 200px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.26);
  }
  .tel {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.26);
  }
  .submit{
    width: 90%;
    height: 50px;
    border-radius: 5px;
    background-color: #b4282d;;
    border: none;
    margin-top: 60px;
    color: #fff;
    font-size: 14px;
  }
}
</style>