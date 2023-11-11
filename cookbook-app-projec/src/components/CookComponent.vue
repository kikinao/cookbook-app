<template>
  <div class="cook-box" :data-id="id">
    <div class="cook-user">
      <div class="cook-user-name">
        <van-image width="30" height="30" :round="true" :src="authorimg" />
        <p>{{ authorName }}</p>
        <span>LV.{{ Lv }}</span>
      </div>
      <div class="another">...</div>
    </div>
    <div class="cook-image">
      <van-image width="100%" height="100%" :src="cookImg" />
    </div>
    <div class="cook-introduce">
      <div class="cook-collect-count">
        <div class="cook-collect-user">
          <van-image
            width="18"
            height="18"
            v-for="(u, i) in collectUsers"
            :round="true"
            :key="i"
            :src="u.p"
          />
          <span>{{ collectCount }}</span>
        </div>
        <div class="cook-collect">
          <van-icon name="star-o" size="18" />
        </div>
      </div>
      <p>{{ cookName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "authorName",
    "Lv",
    "authorimg",
    "cookImg",
    "collectUsers",
    "collectCount",
    "cookName",
  ],
};
</script>

<style lang="scss" scoped>
.cook-box {
  & > div {
    margin: 10px 0px;
  }
}

.cook-user {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0px 10px;

  .cook-user-name {
    display: flex;
    align-items: center;
    font-size: 12px;

    p {
      margin-left: 8px;
    }

    span {
      transform: scale(0.7);
      color: goldenrod;
    }
  }

  .another {
    font-size: 25px;
  }
}

.cook-collect-count {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  position: relative;

  span {
    margin-left: 6px;
    font-size: 13px;
    vertical-align: 3px;
  }
}

.cook-introduce {
  p {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px;
  }
}
</style>