<template>
  <div class="register">

    <div class="toobar">
      <span>注册</span>
    </div>

    <div class="log">
      <form
        action=""
        @keyup.enter="register"
      >
        <div>
          <label>
            <div class="input-group">
              <span class="icon iconfont icon-username input-group-addon"></span>
              <input
                type="text"
                placeholder="用户名"
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
          <label>
            <div class="input-group">
              <span class="icon iconfont icon-password input-group-addon"></span>
              <input
                type="password"
                placeholder="密码"
                v-model="pass"
                class="form-control"
                v-show="!showPass"
              >
              <input
                type="text"
                placeholder="密码"
                v-model="pass"
                class="form-control"
                v-show="showPass"
              >
              <span
                class="input-group-append eyeshow"
                @click="showPass = !showPass"
              >
                <span
                  v-show="!showPass"
                  class=" icon iconfont icon-noeye"
                ></span>
                <span
                  v-show="showPass"
                  class=" icon iconfont icon-eye"
                ></span>
              </span>
            </div>
          </label>
        </div>
        <div>
          <label>
            <div class="input-group">
              <span class="icon iconfont icon-repassword input-group-addon"></span>
              <input
                type="password"
                placeholder="确认密码"
                v-model="repass"
                class="form-control"
                v-show="!showRePass"
              >
              <input
                type="text"
                placeholder="确认密码"
                v-model="repass"
                class="form-control"
                v-show="showRePass"
              >
              <span
                class="input-group-append eyeshow"
                @click="showRePass = !showRePass"
              >
                <span
                  v-show="!showRePass"
                  class=" icon iconfont icon-noeye"
                ></span>
                <span
                  v-show="showRePass"
                  class=" icon iconfont icon-eye"
                ></span>
              </span>
            </div>
          </label>
        </div>
        <div>
          <label>
            <div class="input-group">
              <span class="icon iconfont icon-email input-group-addon"></span>
              <input
                type="text"
                placeholder="邮箱"
                v-model="email"
                class="form-control"
              >
              <span
                class="input-group-append closetext"
                @click="email = ''"
              >
                <span class="icon iconfont icon-close"></span>
              </span>
            </div>
          </label>
        </div>
        <div class="text-right">
          <a
            class="btn"
            href="/signin"
          >已有账号，立即登录</a>
        </div>
      </form>

      <div class="enter">
        <button
          class="btn btn-danger"
          @click="del()"
        >清除</button>
        <button
          class="btn btn-primary"
          @click="register()"
        >立即注册</button>
      </div>
    </div>
    <div>
      <div class="alert alert-success text-center">
        注册成功，即将跳转至登录界面！
      </div>
      <div class="alert alert-warning text-center full">
        请填写完整的注册信息！
      </div>
      <div class="alert alert-warning text-center differ">
        两次密码输入不一致，请重新输入！
      </div>
      <div class="alert alert-warning text-center exist">
        该用户名已存在，请重新输入！
      </div>
      <div class="alert alert-warning text-center email">
        警告，邮箱格式错误！
      </div>
      <div class="alert alert-warning text-center pass">
        警告，密码长度不得少于6位！
      </div>
      <div class="alert alert-warning text-center name">
        警告，用户名长度不得少于3位！
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      pass: "",
      repass: "",
      email: "",
      showPass: false,
      showRePass: false
    };
  },
  methods: {
    del() {
      this.name = "";
      this.pass = "";
      this.repass = "";
      this.email = "";
    },
    register() {
      var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (
        this.name == "" ||
        this.pass == "" ||
        this.repass == "" ||
        this.email == ""
      ) {
        $(".full")
          .show()
          .delay(1000)
          .hide(0);
      } else if (this.name.length < 3) {
        $(".name")
          .show()
          .delay(1000)
          .hide(0);
      } else if (this.pass.length < 6) {
        $(".pass")
          .show()
          .delay(1000)
          .hide(0);
      } else if (!regEmail.test(this.email)) {
        $(".email")
          .show()
          .delay(1000)
          .hide(0);
      } else {
        let data = {
          name: this.name,
          pass: this.pass,
          email: this.email,
          repass: this.repass
        };
        this.$http
          .post(
            `/api/userController/setSignUp?name=${this.name}&pass=${this.pass}&repass=${this.repass}&email=${this.email}`,
            data
          )
          .then(res => {
            console.log(res);
            if (res.data.trim() == "OK") {
              $(".alert-success")
                .show()
                .delay(1000)
                .hide(0);
              // setCookie("name", this.name, 1000 * 60);
              setTimeout(
                function() {
                  this.$router.push("/signin");
                }.bind(this),
                1000
              );
            } else if (res.data.trim() == "PASS") {
              $(".differ")
                .show()
                .delay(1000)
                .hide(0);
              this.pass = "";
              this.repass = "";
            } else if (res.data.trim() == "NO") {
              $(".exist")
                .show()
                .delay(1000)
                .hide(0);
              this.del();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
.register {
  background-color: #ffffff;
  /* border: 1px solid red; */
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
  width: 400px;
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