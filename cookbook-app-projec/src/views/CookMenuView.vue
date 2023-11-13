<template>
  <div class="menuList">
    <van-nav-bar
      title="菜谱分类"
      left-arrow
      @click-left="$router.push({ name: 'recommend' })"
    >
      <template #right>
        <van-icon name="search" size="18" color="black" />
      </template>
    </van-nav-bar>
    <div class="menu-main">
      <div class="chooseMenu">
        <div
          :class="['item', { active: activeKey == index }]"
          v-for="(e, index) in menuList"
          :key="e.id"
          :data-id="e.id"
          @click="clickHandle(index)"
        >
          <router-link
            tag="span"
            :to="{ name: 'menulist', params: { id: e.id } }"
            >{{ e.name }}</router-link
          >
        </div>
      </div>
      <div style="flex: 1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { getMenuData } from "../apis/cookMenu-data";
export default {
  data() {
    return {
      activeKey: 0,
      menuList: [],
      menuBS: null,
    };
  },
  methods: {
    clickHandle(index) {
      this.activeKey = index;
    },
    async getMenuList() {
      let { cs } = await getMenuData();
      this.menuList = cs;
    },
  },
  mounted() {
    this.getMenuList();
  },
};
</script>


<style lang="scss" scoped>
.menuList {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 200;
}

.menu-main {
  display: flex;
}

.chooseMenu {
  height: 100vh;
  background-color: #f5f5f5;

  .item {
    width: 85px;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;

    &.active {
      background-color: white;
      position: relative;

      &::after {
        content: "";
        display: inline-block;
        width: 4px;
        height: 20px;
        border-radius: 999px;
        background-color: #ffc830;

        position: absolute;
        right: 0px;
        top: 50%;
        margin-top: -10px;
      }
    }
  }
}
</style>