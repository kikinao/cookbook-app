<template>
  <div>
    <!-- 活动 骨架屏 -->
    <div class="skeleton-active" v-show="isSkeletonActive">
      <div class="skeleton-active-item">
        <span v-for="e in skeletonList" :key="e"></span>
      </div>
      <div class="skeleton-active-item">
        <span v-for="e in skeletonList" :key="e"></span>
      </div>
    </div>

    <div class="active-box wrapper" ref="wrapper">
      <div class="active-content">
        <div class="theActives" v-for="(e, i) in activeList" :key="i">
          <span v-for="s in e" :key="s.id"># {{ s.name }}</span>
        </div>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多菜谱了，刷新一下吧~"
      @load="onload"
      :immediate-check="false"
    >
      <!-- 瀑布流 骨架屏 -->
      <div class="skeleton-body" v-show="isSkeletonBody">
        <div class="skeleton-body-item" v-for="e in skeletonList" :key="e">
          <div class="Img"></div>
          <div class="foot">
            <div class="name"></div>
            <div class="author">
              <div class="user">
                <div class="pic"></div>
                <div class="user-name"></div>
              </div>
              <div class="like">
                <div class="ico"></div>
                <div class="much"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="notes-box" v-masonry transition-duration="0s">
        <div v-masonry-tile v-for="e in curNoteList" :key="e.id">
          <div class="item">
            <van-image width="175" height="60%" :src="e.note.image_u" />
            <div class="introduce">
              <p class="name">{{ e.note.title }}</p>
              <div class="bottom-about">
                <div class="author-about">
                  <van-image
                    width="20"
                    height="20"
                    :round="true"
                    :src="e.note.author.p"
                  />
                  <p class="author-name">{{ e.note.author.n }}</p>
                </div>
                <div class="like-about">
                  <van-icon name="like-o" />
                  <p class="likes">{{ e.note.like_count }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getNoteData } from "../../apis/home-date";
import BScroll from "@better-scroll/core";

export default {
  data() {
    return {
      skeletonList: [1, 2, 3, 4],
      noteList: [],
      activeList: [],
      isSkeletonActive: true,
      isSkeletonBody: true,
      noteBS: null,
      curType: 1,
      loading: false,
      finished: false,
    };
  },
  methods: {
    async getFirst() {
      let { list } = await getNoteData();
      this.noteList = list;
      this.isSkeletonBody = false;
    },
    async getTitleData() {
      let { topics } = await getNoteData();
      this.activeList = topics;
      this.isSkeletonActive = false;
    },
    async getNoteData(type) {
      let { list } = await getNoteData(type);
      this.noteList.push(...list);
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    initialBScroll() {
      if (!this.noteBS) {
        this.noteBS = new BScroll(this.$refs.wrapper, {
          click: true,
          scrollX: true,
          scrollY: false,
        });
      } else {
        this.noteBS.refresh();
      }
    },
    onload() {
      // console.log("开始刷新请求", `curType:${this.curType}`);
      this.curType++;
      this.getNoteData(this.curType * 10);

      if (this.curType > 3) {
        this.finished = true;
      }
    },
  },
  computed: {
    curNoteList() {
      let res = [];
      if (this.noteList) {
        res = this.noteList.filter((e) => e.note != undefined);
      }
      return res;
    },
  },
  watch: {
    activeList() {
      this.$nextTick(() => this.initialBScroll());
    },
  },
  created() {
    this.getFirst();
  },
  mounted() {
    this.getNoteData();
    this.getTitleData();
  },
  beforeDestroy() {
    this.noteBS?.destroy();
  },
};
</script>

<style lang="scss" scoped>
.skeleton-body {
  width: 100vw;
  margin-top: 10px;
  padding: 0 15px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.skeleton-body-item {
  margin-top: 10px;

  .Img {
    width: 175px;
    height: 300px;
    background-color: #f5f5f5;
  }

  .name {
    margin-top: 10px;
    width: 80px;
    height: 16px;
    background-color: #f5f5f5;
  }

  .author {
    margin-top: 10px;
    width: 175px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user {
    display: flex;

    .pic {
      width: 20px;
      height: 20px;
      border-radius: 999px;
      background-color: #f5f5f5;
    }

    .user-name {
      margin-left: 5px;
      width: 50px;
      height: 16px;
      background-color: #f5f5f5;
    }
  }

  .like {
    display: flex;

    .ico {
      width: 14px;
      height: 14px;
      border-radius: 999px;
      background-color: #f5f5f5;
    }

    .much {
      margin-left: 5px;
      width: 30px;
      height: 16px;
      background-color: #f5f5f5;
    }
  }
}

.skeleton-active {
  width: 100vw;
  overflow: hidden;

  .skeleton-active-item {
    white-space: nowrap;

    span {
      display: inline-block;
      width: 126px;
      height: 32px;
      background-color: #f5f5f5;
      border-radius: 999px;
      margin-left: 10px;

      &:first-child {
        margin-left: 5px;
      }
    }
  }

  .skeleton-active-item:last-child {
    margin-top: 10px;
  }
}

.active-box {
  width: 100vw;
  overflow: hidden;
  background-color: white;
  position: relative;

  .active-content {
    width: 230%;
  }
}

.notes-box {
  padding-left: 15px;
  margin-right: 0px;
}

.theActives {
  span {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    color: #50969f;
    background-color: #f3f9fa;
    border-radius: 999px;
    padding: 10px;

    &:first-child {
      margin-left: 5px;
    }
  }
}

.theActives:last-child {
  span {
    margin-top: 10px;

    &:last-child {
      border: 1px solid #50969f;
    }
  }
}

.item {
  font-size: 14px;
  width: 182px;
  padding: 10px 0;
  background-color: white;
}

.author-about {
  display: flex;
  align-items: center;
}

.author-name,
.likes {
  font-size: 12px;
  color: gray;
  margin-left: 5px;
}

.bottom-about {
  width: 175px;
  display: flex;
  justify-content: space-between;
}

.like-about {
  display: flex;
  align-items: center;
}

.introduce {
  & > div {
    margin-top: 10px;
  }

  & > p {
    margin-top: 10px;
  }

  .name {
    width: 172px;
    height: 20px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>