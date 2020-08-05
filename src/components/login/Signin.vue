<template>
  <div class="login">

    <div class="toobar">
      <span>登录</span>
    </div>

    <div class="log">

      <form
        action=""
        method="post"
        @keyup.enter="submit"
      >

        <div>
          <label for="name">
            <div class="input-group">
              <span class="icon iconfont icon-username input-group-addon"></span>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="请输入用户名"
                v-model="name"
                class="form-control"
              >
              <span
                class="input-group-append closetext"
                @click="name = ''"
              >
                <span class="icon iconfont icon-close"></span>
              </span>
            </div>
          </label>
        </div>

        <div>
          <label for="password">
            <div class="input-group">
              <span class="icon iconfont icon-password input-group-addon"></span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="请输入密码"
                v-model="password"
                class="form-control"
                @submit.prevent="checkUsername"
                v-show="!showPass"
              >
              <input
                type="text"
                name="password"
                id="password"
                placeholder="请输入密码"
                v-model="password"
                class="form-control"
                @submit.prevent="checkUsername"
                v-show="showPass"
              >
              <span
                class="input-group-append eyeshow"
                @click="showPass = !showPass"
              >
                <span
                  v-show="!showPass"
                  class="icon iconfont icon-noeye"
                ></span>
                <span
                  v-show="showPass"
                  class="icon iconfont icon-eye"
                ></span>
              </span>

            </div>
          </label>
        </div>

        <div class="text-right">
          <a
            class="btn"
            href="/register"
          >立即注册</a>
        </div>

      </form>
      <div class="enter">
        <button
          class="btn btn-danger"
          @click="del()"
        >清除</button>
        <button
          class="btn btn-primary"
          @click="submit()"
        >登录</button>
      </div>
    </div>
    <div>
      <div class="alert alert-success text-center">
        登录成功，即将跳转！
      </div>
      <div class="alert alert-danger text-center alert-danger-error">
        账号或密码错误，请重新输入!
      </div>
      <div class="alert alert-danger text-center alert-danger-input">
        请输入用户名或密码！
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      name: "",
      password: "",
      showPass: false
    };
  },
  components: {},
  computed: {},
  mounted() {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if (this.$cookieStore.getCookie("name")) {
      this.$router.push("/");
    }
  },
  methods: {
    //判断用户名
    checkUsername() {
      var username = $("#name").val();
      var reg_username = /^\w{8,20}$/;
      var flag = reg_username.test(username);
      if (flag) {
        $("#username").css("border", "");
      } else {
        $("#username").css("border", "1px red solid");
      }
      return flag;
    },
    del() {
      this.name = "";
      this.password = "";
    },
    submit() {
      if (this.name == "" || this.password == "") {
        $(".alert-danger-input")
          .show()
          .delay(1000)
          .hide(0);
      } else {
        let data = JSON.stringify({
          name: this.name,
          password: this.password
        });
        /*接口请求*/
        this.$http
          .post(
            `/api/userController/getLoginAjax?name=${this.name}&password=${this.password}`,
            data
          )
          .then(res => {
            console.log(res);
            if (res.data.trim() == "OK") {
              // this.tishi = "登录成功";
              // this.showTishi = true;

              this.$cookieStore.setCookie("name", this.name, 10000 * 60);
              // window.localStorage["name"] = res.config.data.name;

              // var data1 = sessionStorage.getItem("key");
              // console.log(data1);

              //登录后改变登录状态 isLogin = 100
              // this.$store.commit("changeLogin", "100");
              $(".alert-success")
                .show()
                .delay(1000)
                .hide(0);
              // setTimeout(
              //   function() {
              //     this.$router.push("/");
              //   }.bind(this),
              //   2000
              // );
              // //刷新
              // location.reload();
              this.$router.go(0);
            } else {
              $(".alert-danger-error")
                .show()
                .delay(1000)
                .hide(0);
              this.name = "";
              this.password = "";
            }
          })
          .catch(err => {
            // console.log(err);
          });
      }
    }
  },
  watch: {}
};
</script>

<style scoped>
.login {
  background-color: #ffffff;
  margin-top: 10px;
}
.toobar {
  height: 40px;
  background-color: #f5f5f5;
}
.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
}
.log {
  /* border: 1px solid red; */
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
label {
  display: block;
}
.iconfont {
  /* border: 1px solid red; */
  margin: 6px;
}
.enter {
  margin: 6px auto;
}
.enter button {
  /* border: 1px solid blue; */
  margin: auto 10px;
}
.text-right > a {
  font-size: 12px;
}
.alert {
  position: fixed;
  z-index: 111111;
  font-size: 22px;
  display: none;
  width: 340px;
  height: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
}
.closetext,
.eyeshow {
  /* border: 1px solid red; */
  position: absolute;
  right: 0;
  z-index: 999;
}
</style>