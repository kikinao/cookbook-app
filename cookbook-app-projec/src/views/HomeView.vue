<template>
  <div>
    <div class="home">
      <van-search
        v-model="value"
        show-action
        placeholder="腌萝卜"
        @focus="$router.push({ name: 'search' })"
      >
        <template #action>
          <van-icon name="list-switch" size="24px" @click="jump" />
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
      <keep-alive>
        <router-view />
      </keep-alive>
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
  methods: {
    jump() {
      this.$router.push({ name: "cookmenu" });
    },
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

  z-index: 340;
}

.view-show {
  margin-top: 107px;
}

.nav-bar {
  height: 50px;
  font-size: 13px;
  padding: 15px;
  margin-top: -1px;
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
