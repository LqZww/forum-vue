<template>
  <div class="signin">
    <form action="">

    </form>

    <div class="log">

      <form
        action=""
        method="post"
      >
        <div>
          <label for="name">
            <div class="input-group">
              <span class="icon iconfont icon-username input-group-addon"></span>

              <input
                type="text"
                name="name"
                id="name"
                placeholder="请输入管理员用户名"
                v-model="admin.aname"
                class="form-control"
              >
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
                placeholder="请输入管理员密码"
                v-model="admin.apassword"
                class="form-control"
              >
            </div>
          </label>
        </div>
      </form>
      <div class="enter">
        <button
          class="btn btn-danger"
          @click="del()"
        >清除</button>
        <button
          class="btn btn-primary"
          @click="signin()"
        >登录</button>
      </div>
    </div>
    <div>
      <div class="alert alert-success text-center">
        登录成功，即将跳转！
      </div>
      <div class="alert alert-danger text-center">
        请完整输入管理员账号或密码!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ASignin",
  inject: ["reload"],

  data() {
    return {
      admin: {
        aname: "",
        apassword: ""
      }
    };
  },
  methods: {
    del() {
      this.admin.aname = "";
      this.admin.apassword = "";
    },
    // async signin() {
    //   try {
    //     const res = await this.awitsignin();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    signin() {
      if (this.admin.aname == "" || this.admin.apassword == "") {
        $(".alert-danger")
          .show()
          .delay(1000)
          .hide(0);
      } else {
        let formData = new FormData();
        formData.append("aname", this.admin.aname);
        formData.append("apassword", this.admin.apassword);

        this.$http
          .post(`/api/adminController/getLogin`, formData)
          .then(res => {
            this.$cookieStore.setCookie("aname", this.admin.aname, 10000 * 60);
            $(".alert-success")
              .show()
              .delay(1000)
              .hide(0);

            setTimeout(
              function() {
                this.$router.push("/admin", err => {
                  console.log(err);
                });
              }.bind(this),
              1500
            );
            // this.$router.go(0);

            // console.log(res);
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
.signin {
  background-color: #ffffff;
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
</style>