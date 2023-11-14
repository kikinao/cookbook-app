<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="e in bannerList" :key="e.t" :data-id="e.id">
        <van-image width="100%" height="100%" :src="e.i" />
      </van-swipe-item>
    </van-swipe>
    <cook-component
      v-for="e in cookList"
      :key="e.r.id"
      :authorimg="e.r.a.p"
      :authorName="e.r.a.n"
      :collectCount="e.r['collect_count_text']"
      :collectUsers="e.r['collect_users']"
      :cookImg="e.r.p"
      :cookName="e.r.n"
      :id="e.r.id"
      :Lv="e.r.a.lvl"
      :vipImg="e.r.a.verified_image"
    />
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
    };
  },
  methods: {
    async getCookList() {
      let data = await getRecommendData();
      for (let i = 0; i < data.list.length; i++) {
        const ele = data.list[i];
        if (ele.type == 1) {
          this.cookList.push(ele);
        }
      }
    },
    async getBannerList() {
      let data = await getRecommendData();
      this.bannerList = data.banner;
    },
  },
  components: { CookComponent },
  mounted() {
    this.getBannerList();
    this.getCookList();
  },
};
</script>