<template>
  <div class="box">
    <div class="head-box">
      <p>菜谱</p>
    </div>
    <div class="title-text">
      <div class="introduce">
        <van-icon name="star" color="#ffcb2f" size="30" />
        <div>
          <p class="wight">您收藏了</p>
          <p>共{{ toLength }}篇菜谱</p>
        </div>
      </div>
      <div class="chooseFavorite">
        <p @click="gotoSetFavorite">管理</p>
        <div class="search">
          <van-icon name="search" size="14" />
          <p>搜索</p>
        </div>
      </div>
    </div>

    <!-- 骨架屏 -->
    <div class="skeleton" v-show="isSkeleton">
      <search-about-component v-for="(c, i) in skeletonList" :key="i" />
    </div>

    <div class="favorite-box">
      <favorite-and-search-component
        v-for="e in list"
        :key="e.cook_id"
        :cookName="e.title"
        :img="e.photo_path"
        :viewsCount="e.views_count_text"
        :id="e.cook_id"
        :authorImg="e.user.user_photo"
        :authorName="e.user.nick"
      />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import FavoriteAndSearchComponent from "../components/FavoriteAndSearchComponent.vue";
import searchAboutComponent from "../components/skeleton/searchSkeletonComponent.vue";
import { getFavoriteData } from "../apis/favorite-data";

export default {
  components: { FavoriteAndSearchComponent, searchAboutComponent },
  data() {
    return {
      toLength: 0,
      list: [],
      skeletonList: [],
      isSkeleton: true,
    };
  },
  methods: {
    async getData(curId) {
      let { recipe } = await getFavoriteData(curId);
      this.list.push(recipe);
      // 关闭骨架屏
      this.isSkeleton = false;
    },
    async getId() {
      this.list = [];
      this.localStorageFavoriteList = JSON.parse(
        localStorage.favoriteList || `[]`
      );
      const arr = Array.from(this.localStorageFavoriteList);
      for (const value of arr) {
        let theId = value.id;
        this.getData(theId);
      }
    },
    gotoSetFavorite() {
      this.$router.push({ name: "setfavorite" });
    },
    getLength() {
      this.toLength = JSON.parse(localStorage.favoriteList || `[]`).length;
      this.skeletonList = JSON.parse(localStorage.favoriteList || `[]`);
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
    this.getLength();
  },
  mounted() {
    this.getId();
  },
  beforeRouteUpdate(to, from, next) {
    this.isSkeleton = true;
    this.getLength();
    this.getId();
    next();
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

.favorite-box {
  margin-bottom: 55px;
}

.title-text {
  font-size: 12px;
  color: gray;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .introduce {
    display: flex;

    & > div {
      margin-left: 10px;

      p.wight {
        font-size: 15px;
        font-weight: 700;
        color: black;
        margin-bottom: 3px;
      }
    }
  }

  .chooseFavorite {
    display: flex;

    .search {
      margin-left: 15px;
    }

    p:first-child {
      position: relative;

      &::after {
        content: "";
        width: 1px;
        height: 12px;
        background-color: gray;

        position: absolute;
        right: -10px;
      }
    }

    div {
      display: flex;
    }
  }
}
</style>