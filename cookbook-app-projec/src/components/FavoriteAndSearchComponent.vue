<template>
  <div>
    <div class="item" :data-id="id">
      <van-image
        :style="{ 'aspect-ratio': 1.5 }"
        class="myImg"
        height="95"
        :src="img"
        radius="5"
      />
      <div class="item-about" @click="gotoCookDetails(id)">
        <p class="cook-name">{{ cookName }}</p>
        <p class="details">
          <span v-if="recommendationTag">{{ recommendationTag }}</span>
          <span v-if="viewsCount">{{ viewsCount }}人看过</span>
        </p>
        <div class="author">
          <van-image width="20" height="20" :round="true" :src="authorImg" />
          <p>{{ authorName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "img",
    "cookName",
    "recommendationTag",
    "viewsCount",
    "authorImg",
    "authorName",
  ],
  methods: {
    gotoCookDetails(curId) {
      this.$router.push({ name: "cookdetails", params: { id: curId } });
      this.$store.commit("setCookId", curId);
    },
  },
};
</script>

<style lang="scss" scoped>
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