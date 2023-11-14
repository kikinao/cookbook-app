<template>
  <div>
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
    };
  },
  methods: {
    async getCookList() {
      let { list } = await getVideoData();
      for (let i = 0; i < list.length; i++) {
        const ele = list[i];
        if (ele.type == 1) {
          this.cookList.push(ele);
        }
      }
    },
  },
  components: { CookComponent },
  mounted() {
    this.getCookList();
  },
};
</script>