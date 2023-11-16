<template>
  <div>
    <div class="item">
      <van-image class="myImg" width="130" height="90" :src="img" radius="5" />
      <div class="item-about">
        <p class="cook-name">{{ cookName }}</p>
        <p class="details">{{ recommendationTag }}</p>
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
  props: ["img", "cookName", "recommendationTag", "authorImg", "authorName"],
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