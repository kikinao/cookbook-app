<template>
  <div class="recommend-box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="e in bannerList" :key="e.t" :data-id="e.id">
        <van-image width="100%" height="100%" :src="e.i" />
      </van-swipe-item>
    </van-swipe>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多菜谱了，刷新一下吧~"
      @load="onload"
    >
      <cook-component
        v-for="e in cookList"
        :key="e.r.id"
        :authorimg="e.r.a.p"
        :authorName="e.r.a.n"
        :collectCount="e.r.collect_count_text"
        :collectUsers="e.r.collect_users"
        :cookImg="e.r.img"
        :cookName="e.r.n"
        :id="e.r.id"
        :Lv="e.r.a.lvl"
        :vipImg="e.r.a.verified_image"
      />
    </van-list>
  </div>
</template>

<script>
import CookComponent from "../../components/CookComponent.vue";
import { getRecommendData } from "../../apis/home-date";

export default {
  data() {
    return {
      bannerList: [],
      cookList: [],
      curType: 0,
      loading: false,
      finished: false,
    };
  },
  methods: {
    async getCookList(type) {
      let { list } = await getRecommendData(type);
      let arr = await list.filter((e) => e.type == 1);
      this.cookList.push(...arr);
    },
    async getBannerList() {
      let data = await getRecommendData();
      this.bannerList = data.banner;
    },
    onload() {
      console.log("开始刷新请求", `curType:${this.curType}`);
      this.curType++;
      this.getCookList(this.curType * 10);
      this.loading = false;
      if (this.curType >= 5) {
        this.finished = true;
      }
    },
  },
  components: { CookComponent },
  mounted() {
    this.getBannerList();
    // this.getCookList();
  },
};
</script>

<style lang="scss" scoped>
.recommend-box {
  margin-bottom: 55px;
}
</style>