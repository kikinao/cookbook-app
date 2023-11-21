<template>
  <div class="cook-details-box">
    <div
      class="head"
      :style="{
        backgroundImage: `url(${curCook.thumb_path})`,
      }"
    >
      <div class="myNav-bar">
        <div class="left" @click="$router.go(-1)">
          <van-icon color="#fff" name="arrow-left" size="18" />
        </div>
        <div class="right">
          <van-icon color="#fff" name="share-o" size="18" />
        </div>
      </div>
    </div>

    <div class="main">
      <div class="top-about">
        <div class="cook-title">
          <h2>{{ curCook.title }}</h2>
          <p>
            精品 · 独家 · 浏览{{ curCook.views_count_text }} · 收藏{{
              curCook.favo_counts_text
            }}
          </p>
        </div>
        <div class="author-about">
          <div class="author">
            <van-image
              round
              width="30"
              height="30"
              :src="curCook.user.avatar_medium"
            />
            <p>{{ curCook.user.nickname }}</p>
            <i class="lv">lv{{ curCook.user.lvl }}</i>
          </div>
          <div class="attention">关注</div>
        </div>
        <p class="text">{{ curCook.cookstory }}</p>
      </div>
      <!-- 食材清单列表 -->
      <div ref="cook-foods" class="cook-foods">
        <van-sticky :container="cookFoods">
          <p class="cook-foods-title">食材清单</p>
        </van-sticky>
        <div class="food-item">
          <div class="food" v-for="(e, i) in curCook.major" :key="i">
            <p class="theFood">{{ e.title }}</p>
            <p class="much">{{ e.note }}</p>
          </div>
        </div>
      </div>
      我是菜谱详情页面
    </div>

    <!-- 分成5个小模块融成一个大页面 -->
    <div class="comment">
      <van-search
        v-model="value"
        shape="round"
        :clearable="false"
        background="#fff"
        placeholder="说点什么"
      />
    </div>
  </div>
</template>

<script>
import { getCookDetailsData } from "../apis/cookDetails-data";
import { mapState } from "vuex";

export default {
  data() {
    return {
      value: "",
      curCook: {},
      cookFoods: null,
    };
  },
  computed: {
    ...mapState(["cookID"]),
  },
  methods: {
    async getData() {
      console.log("开始发送请求");
      console.log(this.cookID);
      let { recipe } = await getCookDetailsData(this.cookID || 3269261);
      this.curCook = recipe;
      console.log(recipe);
    },
  },
  mounted() {
    this.getData();
    // this.cookFoods = this.$refs.cookFoods;
  },
};
</script>

<style lang="scss" scoped>
.cook-details-box {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: white;
  z-index: 300;
}

.head {
  height: 320px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.myNav-bar {
  height: 46px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: transparent;
  background-image: linear-gradient(
    #00000090,
    #00000060,
    #00000030,
    #00000010,
    #00000000
  );
}

.comment {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.main {
  padding: 0 10px;
}

.top-about {
  .cook-title {
    padding: 15px 0;

    h2 {
      font-size: 17px;
      font-weight: 700;
    }

    p {
      margin-top: 10px;
      font-size: 12px;
      color: gray;
    }
  }
}

.author-about {
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .author {
    display: flex;
    align-items: center;

    p {
      margin-left: 5px;
      font-size: 12px;
      font-weight: 700;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
      transform: scale(0.8);
      color: goldenrod;
    }
  }

  .attention {
    background-color: #ffc533;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 18px;
    border-radius: 999px;
  }
}

.text {
  width: 100%;
  padding: 15px 0;
  font-size: 14px;
}

.cook-foods {
  .food-item {
    margin-top: 8px;
  }

  .cook-foods-title {
    font-size: 13px;
    font-weight: 700;
  }
}

.food {
  font-size: 12px;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;

  .theFood {
    color: #50969f;
  }
}
</style>