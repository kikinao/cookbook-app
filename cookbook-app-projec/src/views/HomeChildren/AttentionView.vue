<template>
  <div class="attention-box">
    <div class="attention-recommend">
      <p>豆果美食,会做饭很酷~</p>
      <div class="attentions">
        <p>你关注人的动态会出现在这</p>
        <p>为你推荐了一些有趣的人,快来关注TA们吧</p>
      </div>
    </div>
    <div class="recommend-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多菜谱了，刷新一下吧~"
        @load="onload"
      >
        <cook-component
          v-for="(e, i) in atList"
          :key="i"
          :authorimg="e.u.p"
          :authorName="e.u.n"
          :collectCount="e.collect_count_text"
          :cookImg="e.img"
          :cookName="e.n"
          :followersCount="e.u.followers_count_text"
          :id="e.u.id"
          :Lv="e.u.lv"
          :recipesCount="e.u.recipes_count_text"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { getAttentionData } from "../../apis/home-date";
import CookComponent from "../../components/CookComponent.vue";

export default {
  components: { CookComponent },
  data() {
    return {
      atList: [],
      curType: 0,
      loading: false,
      finished: false,
    };
  },
  methods: {
    async getData(type) {
      let { rfs } = await getAttentionData(type);
      this.atList.push(...rfs);
    },
    onload() {
      // console.log("开始刷新请求", `curType:${this.curType}`);
      this.curType++;
      this.getData(this.curType * 20);
      this.loading = false;
      if (this.curType >= 5) {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.attention-box {
  margin-bottom: 55px;
}

.attention-recommend {
  height: 80px;
  margin-bottom: 15px;
  background-color: #fafafa;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;

  & > p {
    font-size: 14px;
    font-weight: 700;
  }

  .attentions {
    p {
      font-size: 12px;
      color: gray;

      &:last-child {
        margin-top: 5px;
      }
    }
  }
}
</style>