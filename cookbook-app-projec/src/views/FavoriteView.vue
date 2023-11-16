<template>
  <div class="box">
    <div class="head-box">
      <p>菜谱</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  padding: 10px;
}

.head-box {
  p {
    font-size: 17px;
    font-weight: 700;
    position: relative;

    &::after {
      content: "";
      display: inline-block;
      width: 28px;
      height: 4px;
      background-color: #ffc82f;

      position: absolute;
      left: 4px;
      bottom: -10px;
    }
  }
}
</style>