<template>
  <div class="searchResult-box">
    <div class="choose-bar">
      <router-link
        tag="div"
        replace
        :to="{ name: 'resultshow', params: { order: 0 } }"
        >综合</router-link
      >
      <router-link
        replace
        tag="div"
        :to="{ name: 'resultshow', params: { order: 2 } }"
        >收藏高</router-link
      >
      <router-link
        tag="div"
        replace
        :to="{ name: 'resultshow', params: { order: 3 } }"
        >学做多</router-link
      >
    </div>
    <div class="choosed-show">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.choose-bar {
  font-size: 14px;
  padding: 5px 0px;
  border-bottom: 1px solid rgba(220, 220, 220, 0.3);
  background-color: white;
  display: flex;

  div {
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 999px;
    margin-right: 10px;

    &.router-exact-active,
    &.active {
      font-weight: 700;
      background-color: #ffc533;
    }
  }
}
</style>