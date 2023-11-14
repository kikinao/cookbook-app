<template>
  <div class="cook-box" :data-id="id">
    <div class="cook-user">
      <div class="cook-user-name">
        <van-image width="30" height="30" :round="true" :src="authorimg" />
        <van-image
          v-if="vipImg"
          class="vip-img"
          width="13"
          height="13"
          :src="vipImg"
        />
        <p>{{ authorName }}</p>
        <span>LV.{{ Lv }}</span>
      </div>
      <div class="another">...</div>
    </div>
    <div class="cook-image">
      <van-image v-if="cookImg" width="100%" height="100%" :src="cookImg" />
      <video
        ref="startVideo"
        v-if="videoSrc"
        :muted="true"
        width="100%"
        height="100%"
        :src="videoSrc"
        :loop="true"
        :poster="videoImg"
        @click="playVideo"
      ></video>
      <van-icon
        ref="playIco"
        class="play-ico"
        v-if="videoSrc"
        name="play-circle-o"
        size="60"
        color="white"
      />
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
    "videoSrc",
    "videoImg",
    "authorName",
    "Lv",
    "vipImg",
    "authorimg",
    "cookImg",
    "collectUsers",
    "collectCount",
    "cookName",
  ],
  data() {
    return {
      isAutoPlay: false,
      playIco: false,
    };
  },
  methods: {
    clickHandle() {
      this.isAutoPlay = true;
    },
    playVideo() {
      if (this.$refs.startVideo.paused) {
        this.$refs.startVideo.play();
        this.$refs.playIco.style.display = "none";
      } else {
        this.$refs.startVideo.pause();
        this.$refs.playIco.style.display = "block";
      }
    },
  },
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
    position: relative;

    .vip-img {
      position: absolute;
      left: 23px;
      bottom: 0px;
    }

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

.cook-image {
  position: relative;

  .play-ico {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -30px;
    margin-left: -30px;
    z-index: 10;
  }
}
</style>