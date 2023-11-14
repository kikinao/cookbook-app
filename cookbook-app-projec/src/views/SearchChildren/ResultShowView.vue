<template>
  <div class="show-box">
    <div class="wrapper" ref="wrapper">
      <div class="countent">
        <div class="item" v-for="e in cookList" :key="e.r.id">
          <van-image
            class="myImg"
            width="130"
            height="90"
            :src="e.r.img"
            radius="5"
          />
          <div class="item-about">
            <p class="cook-name">{{ e.r.n }}</p>
            <p class="details">{{ e.r.recommendation_tag }}</p>
            <div class="author">
              <van-image width="20" height="20" :round="true" :src="e.r.a.p" />
              <p>{{ e.r.a.n }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchResult } from "../../apis/search-data";
import BScroll from "@better-scroll/core";

export default {
  props: ["kw", "order"],
  data() {
    return {
      cookList: [],
      curBS: null,
    };
  },
  methods: {
    async getCookList() {
      this.cookList = [];
      let { list } = await getSearchResult(this.kw, this.order);
      this.cookList = list.filter((e) => e.type == 13);
    },
    initialBS() {
      if (!this.curBS) {
        this.curBS = new BScroll(this.$refs.wrapper);
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
    console.log(to.params);
    this.getCookList();

    next();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 96px);
  background-color: white;

  .myImg {
    aspect-ratio: 1.4;
  }
}

.countent {
  padding-top: 15px;
}

.item {
  height: 110px;
  font-size: 14px;
  display: flex;

  .item-about {
    height: 90px;
    margin-left: 10px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;

    .author {
      display: flex;

      p {
        font-size: 12px;
        margin-left: 2px;
        color: gray;
        margin-top: 4px;
      }
    }

    .details {
      font-size: 12px;
      color: gray;
    }
  }
}

.cook-name {
  width: 200px;
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>