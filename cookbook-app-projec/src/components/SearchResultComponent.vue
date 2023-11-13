<template>
  <div class="countent">
    我是搜索结果
    <div class="item">
      <van-image
        width="136"
        height="93"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="item-about">
        <p class="cook-name">煎蛋萝卜汤</p>
        <p class="details">内容详情</p>
        <div class="author">
          <van-image
            width="20"
            height="20"
            :round="true"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <p>怪味熙</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import { getSearchKeyword } from "../apis/search-data";

export default {
  props: ["keyword"],
  data() {
    return {};
  },
  methods: {
    async getCookList() {
      //   let data = await getSearchKeyword(this.keyword);
      //   console.log(data);
    },
  },
  mounted() {
    this.getCookList();
  },
};
</script>

<style lang="scss" scoped>
.item {
  font-size: 14px;
  margin-top: 15px;
  display: flex;

  .item-about {
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
</style>