<template>
  <div>
    <div class="home">
      <van-search v-model="value" show-action placeholder="腌萝卜">
        <template #action>
          <van-icon name="list-switch" size="24px" />
        </template>
      </van-search>
      <div class="nav-bar">
        <router-link tag="span" :to="{ name: 'attention' }">关注</router-link>
        <router-link tag="span" :to="{ name: 'recommend' }">推荐</router-link>
        <router-link tag="span" :to="{ name: 'note' }">笔记</router-link>
        <router-link tag="span" :to="{ name: 'video' }">视频</router-link>
        <router-link tag="span" :to="{ name: 'activity' }">活动</router-link>
      </div>
    </div>
    <div class="view-show">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      value: "",
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.home {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;

  z-index: 999;
}

.view-show {
  margin-top: 107px;
}

.nav-bar {
  height: 50px;
  font-size: 13px;
  padding: 15px;
  background-color: white;
  display: flex;

  span {
    margin-right: 20px;

    &.router-exact-active {
      font-size: 18px;
      font-weight: 700;
      position: relative;

      &::after {
        content: "";
        display: inline-block;
        width: 20px;
        height: 4px;
        background-color: #ffcc2d;

        position: absolute;
        bottom: -7px;
        left: 8px;
      }
    }
  }
}
</style>
