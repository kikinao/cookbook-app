<template>
  <div>
    <!-- 等待页面 -->
    <div class="skeleton" v-if="!hasData">
      <cook-details-skeleton-component />
    </div>

    <div class="cook-details-box" v-if="hasData">
      <div class="wrapper" ref="wrapper">
        <div class="myTop">
          <div
            class="head"
            :style="{
              backgroundImage: `url(${curCook.original_photo_path})`,
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

              <!-- 作者相关 -->
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
                  <span class="vipImg" v-if="curCook.user.verified_image">
                    <van-image
                      width="12"
                      height="12"
                      :src="curCook.user.verified_image"
                    />
                  </span>
                </div>
                <div class="attention">关注</div>
              </div>
              <p class="text">{{ curCook.cookstory }}</p>

              <!-- 食材的制作时间和难度等级 -->
              <div class="cook-time-dif" v-if="curCook.cook_difficulty">
                <div class="time">
                  <van-image
                    width="20"
                    height="20"
                    :src="curCook.cook_time_image"
                  />
                  <p>{{ curCook.cook_time }}</p>
                </div>
                <div class="dif">
                  <van-image
                    width="20"
                    height="20"
                    :src="curCook.cook_difficulty_image"
                  />
                  <p>{{ curCook.cook_difficulty }}</p>
                </div>
              </div>
            </div>

            <!-- 食材清单列表 -->
            <div ref="cook-foods" class="cook-foods">
              <!-- <van-sticky :container="cookFoods"> -->
              <p class="cook-foods-title">食材清单</p>
              <!-- </van-sticky> -->
              <div class="food-item">
                <div class="food" v-for="(e, i) in curCook.major" :key="i">
                  <div
                    :class="['theFood', { active: e.tu }]"
                    @click="gotoCookMaterial(e.tu, $event)"
                  >
                    {{ e.title }}
                  </div>
                  <p class="much">{{ e.note }}</p>
                </div>
              </div>
            </div>

            <!-- 营养分析 -->
            <div
              ref="cook-nutrition"
              class="cook-nutrition"
              v-if="curCook.nutrition_facts.length != 0"
            >
              <div class="clickThings">
                <!-- <van-sticky :container="cookNutrition"> -->
                <p class="cook-foods-title">营养分析</p>
                <!-- </van-sticky> -->
                <span @click="gotoCalories(curCook.nutrition_facts_url)"
                  >查看详情</span
                >
              </div>
              <div class="nut-content">
                <div class="pieChart-about">
                  <!-- Echarts饼状图 -->
                  <div class="pieChart" ref="chart"></div>
                  <div class="pieChart-text">
                    <div
                      class="nut-text"
                      v-for="(c, i) in curCook.nutrition_facts"
                      :key="i"
                    >
                      <span
                        :style="{ backgroundColor: c.pie_chart_color }"
                      ></span>
                      <p>{{ c.nutrient }}</p>
                      <p class="nut-much">{{ c.amount }}</p>
                    </div>
                  </div>
                </div>
                <div class="calories">
                  <p>{{ curCook.energy }}</p>
                  <span>千卡</span>
                </div>
              </div>
              <p class="base-introduction">
                <van-image round width="15" height="15" src="/light.png" />
                {{ curCook.nutrition_facts_hint_text }}
              </p>
            </div>

            <!-- 烹饪步骤 -->
            <div ref="cook-todo" class="cook-todo">
              <!-- <van-sticky :container="cookTodo"> -->
              <p class="cook-todo-title">烹饪步骤</p>
              <!-- </van-sticky> -->
              <div class="cook-todo-list">
                <div
                  class="cook-todo-item"
                  v-for="(e, i) in curCook.cookstep"
                  :key="i"
                >
                  <p class="item-title">
                    步骤{{ e.position }}/{{ curCook.cookstep.length }}
                  </p>
                  <van-image
                    :style="{ 'aspect-ratio': cookStepImgList[i].aspectRatio }"
                    radius="15"
                    width="370"
                    height="100%"
                    :src="e.image"
                  />
                  <p>{{ e.content }}</p>
                </div>
              </div>
              <!-- 发布时间 -->
              <div class="upTime">
                {{ curCook.release_time }}
              </div>
            </div>

            <!-- 小贴士 -->
            <div class="tips" v-if="curCook.tips">
              <p class="tips-title">小贴士</p>
              <p>
                {{ curCook.tips }}
              </p>
            </div>

            <!-- 评论区 -->
            <div class="commentArea">
              <div class="title">
                <p>热门评论</p>
                <span></span>
              </div>
              <div class="commentArea-content">
                <div
                  class="commentArea-item"
                  v-for="e in commentList"
                  :key="e.id"
                >
                  <div class="theTop">
                    <div>
                      <van-image round width="20" height="20" :src="e.u.p" />
                      <div class="name-about">
                        <p class="commentArea-name">{{ e.u.n }}</p>
                        <span class="lv">lv{{ e.u.lvl }}</span>
                      </div>
                    </div>
                    <div class="click-licke">
                      <van-icon name="like-o" size="14" />
                      <span class="click-much">{{
                        e.like == 0 ? "赞" : e.like
                      }}</span>
                    </div>
                  </div>

                  <div class="commentArea-text">
                    <p>{{ e.content[0].c }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- myTop的底部 -->
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
  </div>
</template>

<script>
import { getCookDetailsData, getFlatcomments } from "../apis/cookDetails-data";
import { mapState } from "vuex";
import BScroll from "@better-scroll/core";
import * as echarts from "echarts";
import CookDetailsSkeletonComponent from "../components/skeleton/CookDetailsSkeletonComponent.vue";

export default {
  components: { CookDetailsSkeletonComponent },
  props: ["id"],
  data() {
    return {
      hasData: false,
      commentList: [],
      value: "",
      curCook: {},
      colors: [],
      cookStepImgList: [],
      proportion: [],
      theBS: null,
    };
  },
  computed: {
    ...mapState(["cookID"]),
    theLength() {
      let res = `暂无评论`;
      if (this.commentList.length > 0) {
        res = `${this.commentList.length}条评论`;
      }
      return res;
    },
  },
  methods: {
    async getData() {
      // console.log("cookID:", this.cookID);
      // console.log("cookID:", this.id);
      // 3242430 3269261
      // 获取粉丝数据
      let data = await getFlatcomments(this.id);
      if (!data.comments) {
        this.commentList = [];
      }
      this.commentList = data.comments;

      let { recipe } = await getCookDetailsData(this.id);
      this.curCook = recipe;

      this.hasData = true;

      for (let i = 0; i < recipe.nutrition_facts.length; i++) {
        const e = recipe.nutrition_facts[i];
        // 获取颜色
        this.colors.push(e.pie_chart_color);
        // 获取数据占比
        this.proportion.push(e.amount.replace(/ 克/g, ""));
      }

      for (let i = 0; i < recipe.cookstep.length; i++) {
        const e = recipe.cookstep[i];
        const aspectRatio = Number((e.image_width / e.image_height).toFixed(2));
        // 获取做饭步骤中的图片宽高
        this.cookStepImgList.push({
          position: e.position,
          aspectRatio,
        });
      }
    },
    // 跳转食材页面详情
    gotoCookMaterial(toUrl, e) {
      let isHasActive = e.srcElement._prevClass.indexOf("active") != -1;
      if (isHasActive) {
        window.location.href = `${toUrl}`;
      }
    },
    // 跳转营养页面详情
    gotoCalories(toUrl) {
      window.location.href = `${toUrl}`;
    },
    initialBScroll() {
      console.log("初始化BS");
      if (!this.theBS) {
        this.theBS = new BScroll(this.$refs.wrapper, {
          click: true,
          bounce: false,
        });
      } else {
        this.theBS.refresh();
      }
    },
    initChart() {
      let myChart = echarts.init(this.$refs.chart);
      myChart.setOption({
        color: this.colors,
        legend: {
          top: 0,
          left: "center",
        },
        series: [
          {
            type: "pie",
            radius: ["35%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.proportion[0] },
              { value: this.proportion[1] },
              { value: this.proportion[2] },
            ],
          },
        ],
      });
    },
  },
  mounted() {
    this.getData();
  },
  //卸载BScroll
  beforeDestroy() {
    this.theBS?.destroy();
  },
  watch: {
    curCook() {
      this.$nextTick(() => {
        // ↓如果没有就会报错"Initialize failed: invalid dom"
        console.log("获取ref");

        this.initialBScroll();
        if (this.curCook.nutrition_facts.length != 0) {
          this.initChart();
        }
      });
    },
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
  z-index: 350;
}

.wrapper {
  height: calc(100vh - 54px);
  background-color: white;
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
    position: relative;

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

    span {
      position: absolute;
      left: 22px;
      bottom: -3px;
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
    color: black;
  }

  .theFood.active {
    color: #50969f;
  }
}

.cook-time-dif {
  padding: 20px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  p {
    font-size: 12px;
    font-weight: 700;
    margin-left: 5px;
  }

  .time {
    display: flex;
    align-items: center;
  }

  .dif {
    display: flex;
    align-items: center;
  }
}

.cook-nutrition {
  margin-top: 10px;

  .cook-foods-title {
    padding: 10px 0;
    font-size: 13px;
    font-weight: 700;
  }
}

.clickThings {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 12px;
    color: #50969f;
    transform: scale(0.9);
  }
}

.nut-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pieChart-about {
  font-size: 12px;
  display: flex;
  align-items: center;

  .pieChart {
    width: 80px;
    height: 80px;
  }

  .pieChart-text {
    margin-left: 8px;
    display: flex;
    flex-flow: column nowrap;
  }
}

.nut-text {
  padding: 5px 0;
  display: flex;
  justify-content: space-between;

  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 999px;
  }

  p {
    margin-left: 10px;
    transform: scale(0.8);
    color: gray;
  }

  .nut-much {
    color: black;
    transform: scale(0.9);
    font-weight: 700;
  }
}

.calories {
  font-size: 12px;
  flex: 0 1 50px;
  text-align: center;

  p {
    font-size: 14px;
    font-weight: 700;
    position: relative;

    &::before {
      content: "";
      display: inline-block;
      width: 1px;
      height: 30px;
      background-color: gainsboro;

      position: absolute;
      left: -10px;
      top: 50%;
      margin-top: -15px;
    }
  }

  span {
    color: gray;
  }
}

.base-introduction {
  font-size: 12px;
  font-weight: 700;
  width: calc(100vh - 20px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cook-todo {
  margin-top: 20px;
}

.cook-todo-title {
  font-size: 13px;
  font-weight: 700;
}

.cook-todo-list {
  font-size: 13px;

  .cook-todo-item {
    padding: 13px 0;
  }

  p {
    padding: 6px 0;
  }

  .item-title {
    font-size: 12px;
    font-weight: 700;
  }
}

.upTime {
  font-size: 12px;
  color: grey;
  transform: scale(0.8);
  margin-left: -40px;
}

.tips {
  margin-top: 20px;
  P {
    font-size: 13px;
  }

  .tips-title {
    font-weight: 700;
    margin-bottom: 10px;
  }
}

.commentArea {
  margin-top: 20px;

  .title {
    display: flex;

    p {
      font-weight: 700;
      font-size: 13px;
    }

    span {
      font-size: 12px;
      margin-left: 8px;
      color: #50969f;
    }
  }
}

.commentArea-item {
  margin-top: 10px;
  padding: 10px;
  height: 67px;

  .theTop {
    display: flex;
    justify-content: space-between;

    & > div {
      display: flex;
    }
  }

  .name-about {
    margin-left: 8px;
    display: flex;

    .commentArea-name {
      font-size: 12px;
      font-weight: 700;
    }

    .lv {
      margin-left: 5px;
      font-size: 12px;
      color: goldenrod;
      transform: scale(0.8);
    }
  }

  .click-like {
    display: flex;
  }

  .click-much {
    margin-left: 3px;
    font-size: 12px;
    transform: scale(0.9);
  }

  .commentArea-text {
    font-size: 12px;
    margin: 5px 0 10px 30px;
  }
}
</style>