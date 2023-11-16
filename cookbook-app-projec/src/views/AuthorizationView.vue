<template>
  <div class="box">
    <div class="title">
      <h2>豆果美食</h2>
      <h2>会做饭很酷~</h2>
    </div>
    <div class="content">
      <div class="options">
        <div class="login" @click="gotoLogin">手机号登录</div>
      </div>
      <div class="author-login">
        <p>其他登录方式</p>
        <div class="pic">
          <van-icon name="qq" color="#44a3fc" size="22" />
          <van-icon name="weibo" color="#f66345" size="22" />
          <van-icon name="graphic" color="#44a3fc" size="22" />
        </div>
      </div>
      <div class="chooseInp">
        <van-checkbox v-model="checked" :label-disabled="true" icon-size="12">
          登录注册即表示同意
          <span class="blue">《用户协议》</span>
          和
          <span class="blue">《隐私政策》</span>
        </van-checkbox>
      </div>
    </div>
    <div>
      <router-view @changeBackName="changeBackName" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      fromName: null,
    };
  },
  methods: {
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    changeBackName() {
      this.$router.replace({
        name: this.fromName,
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.params.name);
    // console.log(from);

    next((vm) => {
      vm.fromName = to.params.name || "home";
    });
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 55px);
  padding: 0 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
}

.title {
  h2 {
    font-size: 20px;
    font-weight: 700;

    &:last-child {
      margin-top: 15px;
    }
  }
}

.content {
  height: 130px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.options {
  .login {
    padding: 10px 0;
    font-weight: 700;
    text-align: center;
    background-color: #ffc92f;
    border-radius: 999px;
  }
}

.author-login {
  font-size: 12px;
  color: gray;

  .pic {
    width: 100px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
}

.chooseInp {
  font-size: 12px;
  margin-top: 10px;
  .blue {
    color: #50969f;
  }
}
</style>