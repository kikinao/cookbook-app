<template>
  <div id="app">
    <div class="tab-bar">
      <router-link tag="span" :to="{ name: 'home' }">
        <van-icon name="wap-home-o" size="25px" color="gray" />
        首页
      </router-link>

      <router-link tag="span" :to="{ name: 'favorite' }">
        <van-icon name="star-o" size="25px" color="gray" />
        收藏
      </router-link>

      <router-link tag="span" :to="{ name: 'user' }">
        <van-icon name="contact-o" size="25px" color="gray" />
        我的
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.tab-bar {
  height: 55px;
  padding: 0px 20px;
  text-align: center;
  line-height: 55px;
  background-color: white;
  border-top: 1px solid gainsboro;
  z-index: 200;

  display: flex;
  justify-content: space-between;

  position: fixed;
  bottom: -2px;
  left: 0px;
  right: 0px;

  span {
    line-height: 84px;
    position: relative;
    font-size: 12px;

    .van-icon {
      &::before {
        z-index: 1;
        position: absolute;
        top: -39px;
        left: 4px;
      }
    }
  }
}

span.router-active {
  & .van-icon {
    &::after {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background-color: #ffca2e;

      position: absolute;
      left: 17px;
      bottom: 27px;
    }
  }
}
</style>
