<template>
  <div class="login-box">
    <van-nav-bar left-arrow @click-left="$router.go(-1)" />
    <div class="content">
      <div class="head">
        <div class="title">
          <h2>密码登录</h2>
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
              @click="isHasUser"
            >
              登录
            </div>
          </div>
          <div class="toRegister">
            <p @click="gotoRegister">没有账号?点击去注册</p>
          </div>
        </div>
      </div>

      <!-- 其他登录选项 -->
      <div class="choose-box">
        <div class="author-login">
          <p>其他登录方式</p>
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
    gotoRegister() {
      this.$router.push({ name: "register" });
    },
    isHasUser() {
      if (this.name && this.paw && this.checked) {
        let userList = localStorage.userList || `[]`;
        userList = JSON.parse(userList);

        let curU = userList.find((e) => e.userName == this.name);

        if (!curU) return alert("当前用户名不存在");

        if (curU.userPassword != this.paw) return alert(`您的密码错误`);

        localStorage.token = "salkjdklsdfjkg111";

        // 接受方法修改跳转页面
        this.$emit("changeBackName");
      } else if (this.name && this.paw && !this.checked) {
        alert("请勾选《用户协议》和《隐私政策》!");
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    let { userName, userPassword } = to.query;

    let res = this.userList.findIndex((e) => {
      if (e.userName == userName && e.userPassword == userPassword) {
        return e;
      }
    });

    if (res != -1) {
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