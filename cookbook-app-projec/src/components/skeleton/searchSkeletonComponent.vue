<template>
  <div class="result-skeleton-item">
    <div class="left">
      <div class="Img"></div>
    </div>
    <div class="right">
      <div class="name"></div>
      <div class="watch"></div>
      <div class="user">
        <div class="pic"></div>
        <div class="user-name"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result-skeleton-item {
  margin-bottom: 15px;
  height: 90px;
  display: flex;

  .left {
    .Img {
      width: 130px;
      height: 90px;
      background-color: #f5f5f5;
    }
  }

  .right {
    margin-left: 10px;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    .name {
      width: 90px;
      height: 15px;
      background-color: #f5f5f5;
    }

    .watch {
      width: 60px;
      height: 14px;
      background-color: #f5f5f5;
    }
  }

  .user {
    display: flex;

    .pic {
      width: 20px;
      height: 20px;
      background-color: #f5f5f5;
      border-radius: 999px;
    }
    .user-name {
      margin-left: 5px;
      width: 50px;
      height: 15px;
      background-color: #f5f5f5;
    }
  }
}
</style>