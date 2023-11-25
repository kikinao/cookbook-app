<template>
  <div class="box">
    <div class="banner">
      <van-icon name="setting-o" />
      <div class="right-box">
        <van-icon name="more-o" badge="1" />
        <van-icon name="share-o" />
      </div>
    </div>
    <div class="main">
      <div class="user-about">
        <div class="user-name-box">
          <van-image
            round
            width="48"
            height="48"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="name">
            <p>踏实的莴苣很厌恶</p>
            <span>LV.1</span>
          </div>
        </div>
        <div class="user-introduce">
          <div>
            <p>厨娘</p>
            <p>豆龄0.1岁</p>
          </div>
          <p class="signature">吃货不是在吃就是在去吃的路上,没时间写签名</p>
        </div>
        <div class="user-author">
          <div>
            <span>0</span>
            <p>关注</p>
          </div>
          <div>
            <span>0</span>
            <p>粉丝</p>
          </div>
          <div>
            <span>0</span>
            <p>被收藏</p>
          </div>
          <div>
            <span>0</span>
            <p>被学做</p>
          </div>
          <div>
            <span>100</span>
            <p>经验值</p>
          </div>
        </div>
      </div>
      <div class="ad-about">
        <div>
          <van-icon name="photograph" />
          <p>首次打卡 +200经验</p>
        </div>
      </div>
      <div class="pic-box">
        <div>
          <van-icon size="22" name="desktop-o" />
          <p>创作者中心</p>
        </div>
        <div>
          <van-icon size="22" name="todo-list-o" />
          <p>草稿箱</p>
        </div>
        <div>
          <van-icon size="22" name="records-o" />
          <p>课堂</p>
        </div>
        <div>
          <van-icon size="22" name="send-gift-o" />
          <p>厨具管理</p>
        </div>
        <div>
          <van-icon size="22" name="clock-o" />
          <p>最近浏览</p>
        </div>
        <div>
          <van-icon size="22" name="balance-list-o" />
          <p>采购清单</p>
        </div>
        <div>
          <van-icon size="22" name="paid" />
          <p>钱包</p>
        </div>
        <div>
          <van-icon size="22" name="bag-o" />
          <p>商城</p>
        </div>
        <div>
          <van-icon size="22" name="coupon-o" />
          <p>优惠券</p>
        </div>
        <div>
          <van-icon size="22" name="description-o" />
          <p>订单</p>
        </div>
      </div>

      <div class="prompt">
        <p>↓今天你做菜了吗?</p>
      </div>

      <van-calendar
        title="日历"
        :poppable="false"
        :show-confirm="false"
        row-height="40"
        color="#ffc930"
        :show-mark="false"
        :show-title="false"
        :style="{ height: '280px' }"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  padding: 0 10px;
}

.main {
  height: calc(100vh - 55px - 46px - 70px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.banner {
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right-box {
    width: 40px;
    display: flex;
    justify-content: space-between;
  }
}

.user-about {
  height: 140px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.user-name-box {
  display: flex;
  align-items: center;

  .name {
    font-size: 14px;
    margin-left: 10px;
    display: flex;

    span {
      font-size: 12px;
      color: #ffc92f;
      margin-left: 10px;
    }
  }
}

.user-introduce {
  font-size: 14px;

  & > div {
    display: flex;

    p {
      font-weight: 700;

      &:last-child {
        margin-left: 10px;
      }
    }
  }

  .signature {
    font-size: 12px;
    margin-top: 10px;
  }
}

.user-author {
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-flow: column nowrap;
    text-align: center;

    span {
      font-size: 14px;
      font-weight: 700;
    }

    p {
      font-size: 12px;
    }
  }
}

.pic-box {
  height: 100px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: space-between;

  div {
    width: 20%;
    text-align: center;

    p {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}

.ad-about {
  text-align: center;
  background-color: #ffc92f;
  padding: 10px 15px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    justify-items: center;
    align-items: center;

    p {
      font-weight: 700;
      margin-left: 10px;
    }
  }
}

.prompt {
  text-align: right;

  p {
    font-size: 12px;
    color: grey;
  }
}
</style>