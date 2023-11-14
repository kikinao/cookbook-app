<template>
  <div class="wrapper" ref="wrapper">
    <div class="allBox">
      <div class="item" v-for="e in list" :key="e.id">
        <van-image
          class="myImg"
          width="100%"
          height="63"
          v-if="e.image_url"
          :src="e.image_url"
        />
        <div class="cooksBox">
          <span v-for="c in e.cs" :key="c.id">{{ c.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenuData } from "../../apis/cookMenu-data";
import BScroll from "@better-scroll/core";

export default {
  props: ["id"],
  data() {
    return {
      list: [],
      menuBS: null,
    };
  },
  methods: {
    async getData() {
      let { cs } = await getMenuData();
      this.list = cs.find((e) => e.id == this.id).cs;
    },
    initialBScroll() {
      if (!this.menuBS) {
        this.menuBS = new BScroll(this.$refs.wrapper, {
          click: true,
          bounce: {
            bottom: false,
          },
        });
      } else {
        this.menuBS.refresh();
      }
    },
  },
  mounted() {
    this.getData();
  },
  beforeRouteUpdate(to, from, next) {
    this.$nextTick(() => {
      next();
      this.getData();
    });
  },
  //卸载BScroll
  beforeDestroy() {
    this.menuBS?.destroy();
  },
  watch: {
    list() {
      this.$nextTick(() => this.initialBScroll());
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  height: calc(100vh - 46px);
  background-color: white;

  .myImg {
    aspect-ratio: 4.5;
  }
}

.allBox {
  z-index: 200;
  padding: 10px;
  background-color: white;

  .item {
    margin-bottom: 10px;
  }
}

.cooksBox {
  display: flex;
  flex-flow: row wrap;
  // justify-content: space-between;

  span {
    display: inline-block;
    width: 90px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    padding: 0px 10px;
    border: 1px solid gainsboro;
    border-radius: 5px;
    margin-top: 10px;
    margin-right: 5px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>