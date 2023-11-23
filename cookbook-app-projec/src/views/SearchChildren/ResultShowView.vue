<template>
  <div class="show-box">
    <div class="wrapper" ref="wrapper">
      <div class="countent">
        <!-- 骨架屏 -->
        <div class="skeleton" v-show="isSkeleton">
          <search-about-component v-for="e in skeletonList" :key="e" />
        </div>

        <favorite-and-search-component
          v-for="e in cookList"
          :key="e.r.id"
          :id="e.r.id"
          :authorImg="e.r.a.p"
          :authorName="e.r.a.n"
          :cookName="e.r.n"
          :img="e.r.img"
          :recommendationTag="e.r.recommendation_tag"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchResult } from "../../apis/search-data";
import BScroll from "@better-scroll/core";
import FavoriteAndSearchComponent from "../../components/FavoriteAndSearchComponent.vue";
import SearchAboutComponent from "../../components/skeleton/searchSkeletonComponent.vue";

export default {
  components: { FavoriteAndSearchComponent, SearchAboutComponent },
  props: ["kw", "order"],
  data() {
    return {
      skeletonList: [1, 2, 3, 4, 5, 6, 7],
      cookList: [],
      curBS: null,
      isSkeleton: true,
    };
  },
  methods: {
    async getCookList() {
      this.cookList = [];
      let { list } = await getSearchResult(this.kw, this.order);
      this.cookList = list.filter((e) => e.type == 13);
      this.isSkeleton = false;
    },
    initialBS() {
      if (!this.curBS) {
        this.curBS = new BScroll(this.$refs.wrapper, {
          click: true,
        });
      } else {
        this.curBS.refresh();
      }
    },
  },
  watch: {
    cookList() {
      this.$nextTick(() => {
        this.initialBS();
      });
    },
  },
  mounted() {
    console.log("我是mounted:", this.$route.params);
    this.getCookList();
  },
  beforeDestroy() {
    this.curBS?.destroy();
  },
  beforeRouteUpdate(to, from, next) {
    this.isSkeleton = true;
    console.log(to.params);
    this.getCookList();

    next();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 96px);
  padding: 0 10px;
  background-color: white;

  .myImg {
    aspect-ratio: 1.4;
  }
}

.countent {
  padding-top: 15px;
}
</style>