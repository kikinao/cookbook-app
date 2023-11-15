<template>
  <div>
    <div class="active-box wrapper" ref="wrapper">
      <div class="active-content">
        <div class="theActives" v-for="(e, i) in activeList" :key="i">
          <span v-for="s in e" :key="s.id"># {{ s.name }}</span>
        </div>
      </div>
    </div>
    <div class="notes-box" v-masonry transition-duration="0s">
      <div v-masonry-tile v-for="e in noteList" :key="e.id">
        <div class="item">
          <van-image width="185" height="60%" :src="e.note.image_u" />
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
  </div>
</template>

<script>
import { getNoteData } from "../../apis/home-date";
import BScroll from "@better-scroll/core";

export default {
  data() {
    return {
      noteList: [],
      activeList: [],
      noteBS: null,
    };
  },
  methods: {
    async getNoteData() {
      let { list, topics } = await getNoteData();
      this.noteList = list;
      this.activeList = topics;
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
  },
  watch: {
    activeList() {
      this.$nextTick(() => this.initialBScroll());
    },
  },
  mounted() {
    this.getNoteData();
  },
  beforeDestroy() {
    this.noteBS?.destroy();
  },
};
</script>

<style lang="scss" scoped>
.active-box {
  width: 100vw;
  overflow: hidden;
  background-color: white;
  position: relative;

  .active-content {
    width: 230%;
  }
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
  }

  &:last-child {
    span {
      margin-top: 10px;

      &:last-child {
        border: 1px solid #50969f;
      }
    }
  }
}

.notes-box {
  margin-bottom: 55px;
}

.item {
  font-size: 14px;
  width: 192px;
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
  width: 185px;
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
    width: 192px;
    height: 20px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>