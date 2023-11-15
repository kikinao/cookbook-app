<template>
  <div>
    <div class="attention-recommend">
      <p>豆果美食,会做饭很酷~</p>
      <div class="attentions">
        <p>你关注人的动态会出现在这</p>
        <p>为你推荐了一些有趣的人,快来关注TA们吧</p>
      </div>
    </div>
    <div class="recommend-box">
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
    };
  },
  methods: {
    async getData() {
      let { rfs } = await getAttentionData();
      this.atList = rfs;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
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