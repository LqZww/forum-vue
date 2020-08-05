<template>
  <div class="header">
    <div class="main">
      <!-- <router-link :to="{name:'root'}"> -->
      <!-- <img
        src="@/assets/img/logo.jpg"
        alt="logo"
      > -->
      <a
        href="/"
        class="headname"
      >LZ forum</a>
      <!-- </router-link> -->
      <ul>
        <div>
          <li><a href="/">首页</a></li>
        </div>
        <div>
          <li><a href="/music">音乐</a></li>
        </div>
        <div>
          <li><a href="/messagewall">留言墙</a></li>
        </div>
        <div v-show="this.$cookieStore.getCookie('name')=='' ">
          <li><a href="/register">注册</a></li>
          <li><a href="/signin">登录</a></li>
          <li><a
              href="javascript:void(0)"
              @click="refresh"
            >
              <span class="icon iconfont icon-refresh input-group-addon"></span>
            </a></li>

        </div>
        <div v-show="this.$cookieStore.getCookie('name')!='' ">
          <li><a href="/writing">写作</a></li>
          <li><a href="/info">主页</a></li>
          <li @click="signout"><a href="#">登出</a></li>
          <li><a
              href="javascript:void(0)"
              @click="refresh"
            >
              <span class="icon iconfont icon-refresh input-group-addon"></span>
            </a></li>

        </div>
      </ul>

      <div>
        <div class="alert alert-success text-center">
          退出登录成功!
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header",
  inject: ["reload"],
  methods: {
    signout() {
      this.$cookieStore.getCookie("name");
      this.$cookieStore.delCookie("name");
      this.$cookieStore.delCookie("aname");

      $(".alert-success")
        .show()
        .delay(1000)
        .hide(0);
      // this.$router.go(0);
      setTimeout(() => {
        this.reload();
        this.$router.push("/");
      }, 1500);
      // console.log(this.$cookieStore.getCookie("name"));
    },
    refresh() {
      this.$router.go(0);
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #5a5555;
  height: 50px;
}
.main {
  height: 100%;
  /* border: 1px solid red; */
  margin: 0 120px;
}
/* img {
  max-width: 40px;
  max-height: 40px;
  margin-left: 50px;
  margin-top: 12px;
} */
ul {
  float: right;
  margin: 4px;
  /* border: 1px solid red; */
  display: flex;
}
li {
  display: inline-block;
  padding: 10px 15px;
}
li:hover > a {
  color: white;
}
a {
  text-decoration: none;
  color: #ccc;
  font-size: 14px;
  text-shadow: none;
}
.alert {
  position: fixed;
  z-index: 111111;
  font-size: 22px;
  display: none;
  width: 220px;
  height: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
}
.headname {
  color: #80bd01;
  line-height: 100%;
  display: inline-block;
  font-size: 32px;
  margin-top: 9px;
}
.refresh {
  border: 1px solid red;
  float: right;
}
</style>