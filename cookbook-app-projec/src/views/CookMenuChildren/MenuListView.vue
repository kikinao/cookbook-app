<template>
  <div class="allBox">
    {{ id }}
    <!-- <div class="item" v-for="e in list" :key="e.id">
      <van-image
        width="100%"
        height="100%"
        v-if="e.image_url"
        :src="e.image_url"
      />
      <div class="cooksBox">
        <span v-for="c in e.cs" :key="c.id">{{ c.name }}</span>
      </div>
    </div> -->
  </div>
</template>

<script>
// import { getMenuData } from "../../apis/cookMenu-data";

export default {
  props: ["id"],
  data() {
    return {
      list: [],
    };
  },
  methods: {
    // async getData() {
    //   let { cs } = await getMenuData();
    // this.list = cs[this.index].cs;
    //   console.log(cs);
    // },
  },
  mounted() {
    // this.getData();
  },
  beforeRouteEnter(to, from, next) {
    console.log("路由将要进入", to);
    next();
  },
  beforeRouteUpdate() {
    console.log("路由数据将要改变");
    console.log(this.$route.params);
  },
};
</script>

<style lang="scss" scoped>
.allBox {
  padding: 10px;
  background-color: white;

  .item {
    margin-bottom: 10px;
  }
}

.cooksBox {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  span {
    display: inline-block;
    width: 90px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    border: 1px solid gainsboro;
    border-radius: 5px;
    margin-top: 10px;
  }
}
</style>