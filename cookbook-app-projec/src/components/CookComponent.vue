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
        <div>
          <div class="author-vip">
            <p>{{ authorName }}</p>
            <span>LV.{{ Lv }}</span>
          </div>
          <p class="fans" v-if="followersCount">
            {{ followersCount }} · {{ recipesCount }}
          </p>
        </div>
      </div>
      <div class="another">
        <p v-if="!followersCount">...</p>
        <span v-if="followersCount" class="attention">关注</span>
      </div>
    </div>
    <div class="cook-image">
      <van-image
        v-if="cookImg"
        width="100%"
        height="100%"
        :src="cookImg"
        @click="gotoCookDetails(id)"
      />
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
            v-for="(u, i) in curCollectUsers"
            :round="true"
            :key="i"
            :src="u.p"
          />
          <span>{{ collectCount }}</span>
        </div>
        <div class="cook-collect">
          <van-icon
            :name="star"
            :color="starColor"
            size="18"
            @click="collectCook(id, cookName)"
          />
        </div>
      </div>
      <p @click="gotoCookDetails(id)">{{ cookName }}</p>
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
    "followersCount",
    "recipesCount",
  ],
  data() {
    return {
      isAutoPlay: false,
      playIco: false,
      star: "star-o",
      starColor: "black",
      localList: [],
      idArr: [],
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
    collectCook(curId, curName) {
      console.log(curId, curName);
      if (this.star == "star-o") {
        this.star = "star";
        this.starColor = "#ffcb2f";

        //存入收藏中
        this.$store.commit("pushLocalStorageFavoriteList", {
          name: curName,
          id: curId,
        });
      } else {
        this.star = "star-o";
        this.starColor = "black";

        //删除收藏中
        this.$store.commit("removeLocalStorageFavoriteList", {
          name: curName,
          id: curId,
        });
      }
    },
    getId() {
      this.localList = JSON.parse(localStorage.favoriteList || `[]`);
      const arr = Array.from(this.localList);
      for (const value of arr) {
        this.idArr.push(value.id);
      }
    },
    gotoCookDetails(curId) {
      this.$router.push({ name: "cookdetails", params: { id: curId } });
      this.$store.commit("setCookId", curId);
    },
  },
  computed: {
    curCollectUsers() {
      let res = [];
      if (this.collectUsers) {
        res = this.collectUsers.filter((e) => e != null);
      }
      return res;
    },
  },
  mounted() {
    this.getId();
    this.localList = JSON.parse(localStorage.favoriteList || `[]`);
    this.idArr.map((e) => {
      if (e == this.id) {
        this.star = "star";
        this.starColor = "#ffcb2f";
      }
    });
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

    .fans {
      font-size: 12px;
      margin-top: 8px;
      margin-left: 4px;
      transform: scale(0.9);
      color: #b1b1b1;
    }

    .author-vip {
      display: flex;

      span {
        transform: scale(0.7);
        color: goldenrod;
        margin-left: 3px;
      }
    }

    .vip-img {
      position: absolute;
      left: 23px;
      bottom: 0px;
    }

    p {
      margin-left: 8px;
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

.attention {
  font-size: 12px;
  padding: 6px 18px;
  background-color: #ffca2f;
  border-radius: 999px;
}
</style>