<template>
  <div class="skeleton-menu-item">
    <div class="Img"></div>
    <div class="foot-box">
      <span v-for="e in list" :key="e"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7],
    };
  },
};
</script>

<style lang="scss" scoped>
.skeleton-menu-item {
  margin-top: 10px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .Img {
    width: 285px;
    height: 63px;
    background-color: #f5f5f5;
  }
  .foot-box {
    width: 285px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    span {
      display: inline-block;
      width: 90px;
      height: 30px;
      background-color: #f5f5f5;
      border-radius: 5px;
      margin-top: 10px;
    }
  }
}
</style>