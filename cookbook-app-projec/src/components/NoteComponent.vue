<template>
  <div>
    <div class="item">
      <van-image
        width="50%"
        height="50%"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="introduce">
        <p class="name">冬季养生汤!</p>
        <div class="bottom-about">
          <div class="author-about">
            <van-image
              width="30"
              height="30"
              :round="true"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <p class="author-name">厨房笔记-ung</p>
          </div>
          <div class="like-about">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNoteData } from "../apis/home-date";
export default {
  data() {
    return {};
  },
  async mounted() {
    let { list } = await getNoteData();
    console.log(list);
  },
};
</script>

<style lang="scss" scoped>
</style>