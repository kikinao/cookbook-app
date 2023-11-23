<template>
  <div class="skeleton-item">
    <div class="Img"></div>
    <div class="foot">
      <div class="left">
        <div class="logo">活动详情</div>
        <p class="left-text"></p>
      </div>
      <div class="right">
        <p class="join"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton-item {
  margin-top: 10px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .Img {
    width: 370px;
    height: 208px;
    background-color: rgb(233, 233, 233);
  }

  .foot {
    width: calc(100vw - 20px);
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    justify-self: start;
    display: flex;
    align-items: center;

    .logo {
      width: 85px;
      height: 25px;
      background-color: rgb(233, 233, 233);
      border-radius: 0px 10px 0px 10px;
      margin-right: 5px;

      text-align: center;
      line-height: 25px;
      font-size: 14px;
      color: grey;
    }

    .left-text {
      width: 100px;
      height: 15px;
      background-color: rgb(233, 233, 233);
    }
  }

  .right {
    width: 73px;
    height: 15px;
    background-color: rgb(233, 233, 233);
  }
}
</style>