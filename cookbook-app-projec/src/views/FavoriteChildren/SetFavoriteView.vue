<template>
  <div class="box">
    <van-nav-bar title="管理 菜谱" left-arrow @click-left="$router.go(-1)" />
    <div class="wrapper" ref="wrapper">
      <div class="all-content">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-checkbox
            v-for="e in list"
            :key="e.cook_id"
            :name="e.cook_id"
            :label-disabled="true"
          >
            <!-- 骨架屏 -->
            <div class="skeleton" v-show="isSkeleton">
              <search-about-component v-for="(e, i) in skeletonList" :key="i" />
            </div>

            <favorite-and-search-component
              :cookName="e.title"
              :img="e.photo_path"
              :viewsCount="e.views_count_text"
              :id="e.cook_id"
              :authorImg="e.user.user_photo"
              :authorName="e.user.nick"
            />
          </van-checkbox>
        </van-checkbox-group>
        <div class="btns">
          <div class="checked-box">
            <p>已选中{{ result.length }}篇菜谱</p>
          </div>
          <div>
            <button class="myBtn-toggle" @click="toggleAll">切换选择</button>
            <button class="myBtn-remove" @click="removeList">取消收藏</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteAndSearchComponent from "../../components/FavoriteAndSearchComponent.vue";
import { getFavoriteData } from "../../apis/favorite-data";
import BScroll from "@better-scroll/core";
import SearchAboutComponent from "../../components/skeleton/searchSkeletonComponent.vue";

export default {
  data() {
    return {
      skeletonList: [],
      result: [],
      list: [],
      noteBS: null,
      isSkeleton: true,
    };
  },
  methods: {
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    async getData(curId) {
      let { recipe } = await getFavoriteData(curId);
      this.list.push(recipe);

      // 关闭骨架屏
      this.isSkeleton = false;
    },
    getId() {
      this.localStorageFavoriteList = JSON.parse(
        localStorage.favoriteList || `[]`
      );
      const arr = Array.from(this.localStorageFavoriteList);
      for (const value of arr) {
        let theId = value.id;
        this.getData(theId);
      }
    },
    removeList() {
      for (let i = 0; i < this.result.length; i++) {
        let e = this.result[i];
        this.$store.commit("removeLocalStorageFavoriteList", {
          name: "",
          id: e,
        });
      }
      this.$router.replace({ name: "favorite" });
    },
    initialBScroll() {
      if (!this.noteBS) {
        this.noteBS = new BScroll(this.$refs.wrapper, {
          click: true,
          //   scrollX: true,
          //   scrollY: false,
        });
      } else {
        this.noteBS.refresh();
      }
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
  watch: {
    list() {
      this.$nextTick(() => this.initialBScroll());
    },
  },
  components: { FavoriteAndSearchComponent, SearchAboutComponent },
  created() {
    this.skeletonList = JSON.parse(localStorage.favoriteList || `[]`);
  },
  mounted() {
    this.getId();
  },
  beforeDestroy() {
    this.noteBS?.destroy();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 46px - 55px);
  background-color: white;
}

.box {
  background-color: white;
  padding: 0px;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 55px;
}

.all-content {
  margin-top: 3px;
  padding: 0 10px;
  margin-bottom: 55px;
}

.btns {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .checked-box {
    p {
      color: gray;
    }
  }

  .myBtn-toggle {
    background-color: #ffc533;
    border-radius: 999px;
    border: none;
    padding: 8px 10px;
    color: black;
  }

  .myBtn-remove {
    background-color: #e2483c;
    border-radius: 999px;
    border: none;
    padding: 8px 10px;
    color: white;
    margin-left: 10px;
  }
}
</style>