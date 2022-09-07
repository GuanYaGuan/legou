<template>
  <div>
    <div class="big-goodList">
      <!-- <div class="goodList" v-for="(good, index) in item" :key="index">
        <div class="name">{{ good.name }}</div>
        <div class="gooditem" v-for="gooditem in good" :key="gooditem.id">
          <img :src="gooditem.list_pic_url" alt="" />
          <p>{{ gooditem.name }}</p>
          <span>{{ gooditem.retail_price }}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "LegouIndex",

  data() {
    return {
    };
  },
  props: ["parentData"],

  created() {
  },

  methods: {},
};
</script>

<style scoped>
</style>