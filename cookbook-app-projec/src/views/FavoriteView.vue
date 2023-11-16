<template>
  <div class="box">
    <div class="head-box">
      <p>菜谱</p>
    </div>
    <div class="title-text">
      <p>一共1篇菜谱</p>
    </div>
    <div class="favorite-box">
      <!-- v-for="e in favoriteList"
        :key="e.cook_id" -->
      <!-- <favorite-and-search-component
        :cookName="favoriteList.title"
        :img="favoriteList.photo_path"
        :viewsCount="favoriteList.views_count_text"
        :id="favoriteList.cook_id"
        :authorImg="favoriteList.user.user_photo"
        :authorName="favoriteList.user.nick"
      /> -->
    </div>
  </div>
</template>

<script>
// import FavoriteAndSearchComponent from "../components/FavoriteAndSearchComponent.vue";
import { getFavoriteData } from "../apis/favorite-data";

export default {
  //   components: { FavoriteAndSearchComponent },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getData(curId) {
      let { recipe } = await getFavoriteData(curId);
      this.list.push(...recipe);
    },
  },
  computed: {
    localStorageFavoriteList: {
      get() {
        return this.$store.state.localStorageFavoriteList;
      },
      set(arr) {
        this.$store.commit("setLocalStorageFavoriteList", arr);
      },
    },
  },
  created() {
    this.localStorageFavoriteList = JSON.parse(
      localStorage.favoriteList || `[]`
    );
  },
  mounted() {
    // this.getData(3220455);
    // console.log(this.list);
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 10px;
}

.head-box {
  height: 45px;

  p {
    font-size: 17px;
    font-weight: 700;
    position: relative;

    &::after {
      content: "";
      display: inline-block;
      width: 28px;
      height: 4px;
      background-color: #ffc82f;

      position: absolute;
      left: 4px;
      bottom: -10px;
    }
  }
}
</style>