<template>
  <div class="box">
    <div class="top">
      <div class="top-title">
        <div>
          <div class="headImg"></div>
          <div class="name"></div>
        </div>
        <div v-if="!isAttention"></div>
        <div v-if="isAttention" class="attention">关注</div>
      </div>
      <!-- top-title结束 -->
      <div class="cookImg"></div>
    </div>
    <!-- top结束 -->
    <div class="bottom">
      <div class="bottom-head">
        <div class="bottom-head-people">
          <div class="peoples" v-for="(e, i) in userList" :key="i"></div>
          <div class="people-much"></div>
        </div>
        <!-- bottom-head-people结束  -->
        <div class="start"></div>
      </div>
      <div class="bottom-foot">
        <p class="cookText"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isAttention: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userList: [1, 2, 3, 4],
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-top: 10px;
  padding: 0 10px;
  display: flex;
  flex-flow: column nowrap;
}

.attention {
  font-size: 12px;
  padding: 6px 18px;
  background-color: #f5f5f5;
  border-radius: 999px;
  color: grey;
}

.top {
  .top-title {
    display: flex;
    justify-content: space-between;

    & > div {
      display: flex;
      align-items: center;
    }

    .headImg {
      width: 30px;
      height: 30px;
      background-color: #f5f5f5;
      border-radius: 999px;
    }
    .name {
      margin-left: 5px;
      width: 100px;
      height: 15px;
      background-color: #f5f5f5;
    }
  }

  .cookImg {
    margin-top: 10px;
    width: 370px;
    height: 280px;
    background-color: #f5f5f5;
  }
}

.bottom {
  display: flex;
  flex-flow: column nowrap;

  .bottom-head {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .bottom-head-people {
      display: flex;
    }

    .peoples {
      width: 18px;
      height: 18px;
      background-color: #f5f5f5;
      border-radius: 999px;
    }

    .people-much {
      margin-left: 5px;
      width: 80px;
      height: 13px;
      background-color: #f5f5f5;
    }
  }

  .start {
    border-radius: 999px;
    width: 18px;
    height: 18px;
    background-color: #f5f5f5;
  }

  .bottom-foot {
    margin-top: 10px;
    width: 100%;
    height: 15px;
    background-color: #f5f5f5;
  }
}
</style>