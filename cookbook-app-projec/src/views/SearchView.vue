<template>
  <div class="search-box">
    <van-search
      class="my-search"
      v-model.trim="value"
      show-action
      placeholder="腌萝卜"
      :clearable="false"
      @focus="isShow = false"
    >
      <template #left>
        <van-icon name="arrow-left" class="myLeft" @click="leftClick" />
      </template>
      <template #action>
        <div @click="gotoResult(value)">搜索</div>
      </template>
    </van-search>

    <!-- 默认搜索页 -->
    <div class="search-about" v-show="showDefault">
      <div class="search-about-item">
        <div class="search-history">
          <p>历史搜索</p>
          <van-icon name="delete-o" @click="clean" />
        </div>
        <div class="item-list">
          <span
            v-show="localStorageList != `[]`"
            v-for="(e, index) in localStorageList"
            :key="index"
            @click="gotoResult(e.name)"
          >
            {{ e.name }}
          </span>
        </div>
      </div>

      <div class="search-about-item">
        <p>热门搜索</p>
        <div class="item-list">
          <span
            v-for="e in hotList"
            :key="e.name"
            @click="gotoResult(e.name)"
            >{{ e.name }}</span
          >
        </div>
      </div>
    </div>

    <!-- 搜索推荐页 -->
    <div class="search-recommend" v-show="showResult">
      <ul>
        <li
          v-for="(e, i) in searchResultList"
          :key="i"
          @click="gotoResult(e.name)"
        >
          <p>{{ e.name }}</p>
          <span v-if="e.tag" :class="clasName(e.tag.name)">{{
            e.tag.name
          }}</span>
        </li>
      </ul>
    </div>

    <!-- 点击后的搜索结果页面 -->
    <div class="search-result" v-show="isShow">
      <router-view />
    </div>
  </div>
</template>

<script>
import { getHotResult, getSearchKeyword } from "../apis/search-data";
import _ from "lodash";
const curClasName = [
  { name: "热门", claName: "red" },
  { name: "经典", claName: "green" },
  { name: "快手", claName: "yellow" },
];

export default {
  data() {
    return {
      hotList: [],
      localStorageList: [],
      isShow: false,
      searchResultList: [],
      // 真正传值的是curKW
      curKW: "",
    };
  },
  methods: {
    async getHotResult() {
      this.hotList = await getHotResult();
    },
    getlocalStorage() {
      this.localStorageList = JSON.parse(localStorage.historyList || `[]`);
    },
    clean() {
      this.localStorageList = [];
      localStorage.historyList = ``;
    },
    async getSearhResult(kw) {
      let data = await getSearchKeyword(kw);
      this.searchResultList = data.suggests;
    },
    clasName(tag) {
      let n = curClasName.find((e) => e.name == tag);
      return n.claName;
    },
    gotoResult(kw) {
      if (!kw) return;
      this.isShow = true;
      this.value = kw;
      this.curKW = kw;
      this.$router.push({
        name: "searchresult",
        params: { kw: this.curKW },
      });

      let n = {
        name: this.value,
      };

      // 手动修改this.localStorageList为[]
      if (this.localStorageList == `[]`) {
        this.localStorageList = [];
      }

      // 查找是否搜索过该内容
      let i = this.localStorageList.findIndex((e) => e.name == n.name);
      if (i != -1) return;
      this.localStorageList.push(n);
      localStorage.historyList = JSON.stringify(this.localStorageList);
    },
    leftClick() {
      this.$router.go(-1);
      this.value = "";
    },
  },
  mounted() {
    this.getHotResult();
    this.getlocalStorage();

    this.mydebounce = _.debounce(this.getSearhResult, 800, {
      leading: true,
      trailing: true,
    });
  },
  computed: {
    showResult() {
      return Boolean(this.value) && !this.isShow;
    },
    showDefault() {
      return !this.showResult && !this.isShow;
    },
    // 通过vuex来修改值
    value: {
      get() {
        return this.$store.state.keyWord;
      },
      set(val) {
        this.$store.commit("setKeyWord", val);
      },
    },
  },
  watch: {
    async value(kw) {
      if (this.value) {
        this.mydebounce(kw);
      }

      if (this.value.length == 0) {
        this.isShow = false;
      }
    },
  },
  beforeDestroy() {
    this.mydebounce = "";
  },
};
</script>


<style lang="scss" scoped>
.my-search {
  position: relative;
  z-index: 999;
}

.search-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 200;
}

.myLeft {
  margin-right: 10px;
}

.search-about-item {
  padding: 0 10px;
  margin-top: 20px;

  &:last-child {
    margin-top: 30px;
  }

  p {
    font-size: 15px;
    font-weight: 700;
  }

  .item-list {
    display: flex;
    flex-flow: row wrap;

    font-size: 12px;
    span {
      display: inline-block;
      text-align: center;
      min-width: 40px;
      height: 25px;
      line-height: 25px;
      padding: 0 10px;
      margin-right: 4px;
      margin-top: 10px;
      background-color: #f7f8fa;
    }
  }

  .search-history {
    display: flex;
    justify-content: space-between;
  }
}

.search-recommend ul {
  li {
    height: 30px;
    padding: 0 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid gainsboro;
    display: flex;
    justify-content: space-between;

    P {
      font-size: 14px;
      line-height: 30px;
    }

    span {
      display: inline-block;
      width: 50px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 999px;
      margin-top: 3px;
      border: 1px solid black;
      background-color: pink;
      font-size: 12px;

      &.red {
        background-color: #fbf1f0;
        color: red;
        border-color: red;
      }

      &.green {
        background-color: #f9fff0;
        color: green;
        border-color: green;
      }

      &.yellow {
        background-color: #fefbea;
        color: orange;
        border-color: orange;
      }
    }
  }
}
</style>