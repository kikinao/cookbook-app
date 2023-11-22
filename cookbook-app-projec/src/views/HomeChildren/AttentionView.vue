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
        :immediate-check="false"
      >
        <cook-component
          v-for="e in atList"
          :key="e.share_info.object_id"
          :authorimg="e.u.p"
          :authorName="e.u.n"
          :collectCount="e.collect_count_text"
          :cookImg="e.img"
          :cookName="e.n"
          :followersCount="e.u.followers_count_text"
          :id="e.share_info.object_id"
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
      curType: 1,
      loading: false,
      finished: false,
    };
  },
  methods: {
    async getFirst() {
      let { rfs } = await getAttentionData();
      this.atList = rfs;
      // console.log(this.atList);
    },
    async getData(type) {
      let { rfs } = await getAttentionData(type);
      this.atList.push(...rfs);
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    onload() {
      // console.log("开始刷新请求", `curType:${this.curType}`);
      this.curType++;
      this.getData(this.curType * 10);

      if (this.curType > 4) {
        this.finished = true;
      }
    },
  },
  created() {
    this.getFirst();
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
  padding: 0 10px;
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