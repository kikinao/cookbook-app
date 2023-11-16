<template>
  <div class="login-box">
    <van-nav-bar left-arrow @click-left="$router.go(-1)" />
    <div class="content">
      <div class="head">
        <div class="title">
          <h2>账号注册</h2>
          <p>Hi，欢迎来到豆果美食,会做饭很酷~</p>
        </div>
        <div class="login-about">
          <div class="have-input">
            <span>+86</span
            ><input v-model="name" type="number" placeholder="请输入手机号" />
          </div>
          <div class="have-input">
            <input v-model="paw" type="password" placeholder="请输入密码" />
          </div>
          <div class="options">
            <div
              :class="['login', { active: name && paw && checked }]"
              @click="isRegistered"
            >
              注册
            </div>
          </div>
        </div>
      </div>

      <!-- 其他登录选项 -->
      <div class="choose-box">
        <div class="author-login">
          <p>其他注册方式</p>
          <div class="pic">
            <van-icon name="qq" color="#44a3fc" size="22" />
            <van-icon name="weibo" color="#f66345" size="22" />
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      name: "",
      paw: "",
    };
  },
  methods: {
    isRegistered() {
      if (this.name && this.paw && this.checked) {
        // 先将localstorage拉出来
        let userList = localStorage.userList || `[]`;
        userList = JSON.parse(userList);

        // 寻找用户名是否存在,如果存在注册失败
        let index = userList.findIndex((e) => e.userName == this.name);

        if (index != -1) return alert("当前用户名已存在");

        userList.push({
          userName: this.name,
          userPassword: this.paw,
        });

        localStorage.userList = JSON.stringify(userList);

        // 注册完成后跳转到登录页面
        this.$router.replace({
          name: "login",
        });
      } else if (this.name && this.paw && !this.checked) {
        alert("请勾选《用户协议》和《隐私政策》!");
      } else {
        alert("请完成填写后再注册!");
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if ((this.name || this.paw) && !this.checked) {
      let res = confirm("确认取消注册吗?");
      next(res);
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 54px;

  background-color: white;
}

.content {
  padding: 0 15px;
  height: calc(100vh - 55px - 46px);

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
}

.title {
  h2 {
    font-size: 20px;
    font-weight: 700;
  }

  p {
    font-size: 12px;
    color: rgb(165, 165, 165);
    margin-top: 10px;
  }
}

.login-about {
  .have-input {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid gainsboro;

    input {
      width: 300px;
      height: 50px;
      outline: none;
      border-color: transparent;

      &:first-child {
        margin-left: 33px;
      }

      &::placeholder {
        color: rgb(165, 165, 165);
      }
    }

    &:first-child {
      margin-top: 20px;

      input {
        margin-left: 5px;
      }
    }
  }
}

.options {
  margin-top: 20px;

  .login {
    padding: 10px 0;
    font-weight: 700;
    text-align: center;
    color: grey;
    background-color: rgb(230, 230, 230, 0.7);
    border-radius: 999px;

    &.active {
      background-color: #ffc92f;
      color: black;
    }
  }
}

.author-login {
  font-size: 12px;
  color: gray;

  .pic {
    width: 60px;
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

.toRegister {
  font-size: 12px;
  margin-top: 20px;
  color: grey;
}
</style>