<template>
  <div class="video-box">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多菜谱了，刷新一下吧~"
      @load="onload"
      :immediate-check="false"
    >
      <cook-component
        v-for="e in cookList"
        :key="e.r.id"
        :videoImg="e.r.img"
        :videoSrc="e.r.vu"
        :authorimg="e.r.a.p"
        :authorName="e.r.a.n"
        :collectCount="e.r['collect_count_text']"
        :collectUsers="e.r['collect_users']"
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
import { getVideoData } from "../../apis/home-date";

export default {
  data() {
    return {
      bannerList: [],
      cookList: [],
      curType: 1,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    async getFirst() {
      let { list } = await getVideoData();
      let arr = list.filter((e) => e.type == 1);
      this.cookList = arr;
    },
    async getCookList(type) {
      let { list } = await getVideoData(type);
      let arr = list.filter((e) => e.type == 1);
      this.cookList.push(...arr);
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    onload() {
      // console.log("开始刷新请求", `curType:${this.curType}`);
      this.curType++;
      this.getCookList(this.curType * 10);

      if (this.curType >= 3) {
        this.finished = true;
      }
    },
  },
  created() {
    this.getFirst();
  },
  components: { CookComponent },
};
</script>

<style lang="scss" scoped>
.video-box {
  margin-bottom: 55px;
}
</style>