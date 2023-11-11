<template>
  <div class="menuList">
    <van-nav-bar title="菜谱分类" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="search" size="18" color="black" />
      </template>
    </van-nav-bar>
    我是菜谱列表
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="scss" scoped>
.menuList {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  background-color: pink;
}
</style>