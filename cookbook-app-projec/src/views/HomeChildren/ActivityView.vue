<template>
  <div>
    <van-notice-bar
      class="myNot-bar"
      :scrollable="false"
      background="#f5f5f5"
      color="black"
    >
      <span class="announcement">公告</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="1500"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(e, i) in bannerList" :key="i">
          <div class="content">
            <p class="text-strong">{{ e.nickname }}</p>
            <p>刚参加了活动</p>
            <p class="text-strong">{{ e.name }}</p>
          </div>
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>

    <div class="main">
      <div class="ongoing-box">
        <p class="title">热门活动上线中</p>
        <!-- 骨架屏 -->
        <div class="skeleton" v-show="isSkeleton">
          <activity-component />
          <activity-component />
          <activity-component />
        </div>

        <!-- 热门活动板块 -->
        <div class="item-box">
          <div class="item" v-for="e in ongoingList" :key="e.id">
            <van-image width="100%" height="100%" :src="e.image" />
            <div class="acyive-text">
              <div class="active-name">
                <span class="active-title">征集申领中</span>
                <p>{{ e.name }}</p>
              </div>
              <p class="active-add">立即参与 &gt;</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ended-box">
        <p class="title ended-title">往期回顾</p>
        <div class="item-box">
          <div class="item" v-for="e in endedList" :key="e.id">
            <van-image width="100%" height="100%" :src="e.image" />
            <div class="acyive-text">
              <div class="active-name">
                <span class="active-title ended-active-title">已结束</span>
                <p>{{ e.name }}</p>
              </div>
              <p class="active-add">立即参与 &gt;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActivityData } from "../../apis/home-date";
import ActivityComponent from "../../components/skeleton/ActivityComponent.vue";

export default {
  data() {
    return {
      bannerList: [],
      ongoingList: [],
      endedList: [],
      isSkeleton: true,
    };
  },
  methods: {
    async getData() {
      let { banner, ongoing, ended } = await getActivityData();
      this.bannerList = banner;
      this.ongoingList = ongoing.events;
      this.endedList = ended.events;
      this.isSkeleton = false;
    },
  },
  mounted() {
    this.getData();
  },
  components: { ActivityComponent },
};
</script>

<style lang="scss" scoped>
.myNot-bar {
  position: relative;

  .announcement {
    font-weight: 700;
    padding: 0 5px;
    background-color: #ffca2f;
    border-radius: 0px 10px 0px 10px;

    position: absolute;
    left: 0px;
    top: 50%;
    margin-top: -12px;
  }
}

.main {
  padding: 0 10px;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;

  margin-left: 50px;
}

.content {
  display: flex;

  p:nth-child(2) {
    margin: 0px 4px;
  }

  .text-strong {
    &:first-child,
    &:last-child {
      max-width: 110px;
      font-size: 15px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:last-child {
      max-width: 160px;
    }
  }
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin-top: 10px;
  padding: 10px;
}

.ended-title {
  margin-top: 20px;
}

.acyive-text {
  font-size: 15px;
  margin: 10px 0px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .active-name {
    display: flex;
    align-items: center;

    & > p {
      width: 175px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .active-title {
      padding: 5px;
      background-color: #ffca2f;
      border-radius: 0px 10px 0px 10px;
      margin-right: 5px;
    }

    .ended-active-title {
      background-color: gray;
      color: white;
    }
  }

  .active-add {
    color: #60a0a8;
  }
}

.item {
  margin-top: 25px;

  &:first-child {
    margin-top: 0px;
  }
}

.ended-box {
  margin-bottom: 55px;
}
</style>