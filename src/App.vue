<template>
  <div id="app">
    <!-- <Header></Header> -->
    <router-view
      name="header"
      v-if="isRouterAlive"
    ></router-view>
    <router-view
      name="adminuser"
      v-if="isRouterAlive"
    ></router-view>

    <div class="main">
      <div class="left">
        <!-- <PostList></PostList> -->
        <router-view name="main"></router-view>
        <router-view name="criticism"></router-view>
      </div>
      <div class="right">
        <router-view name="slidebar1"></router-view>
        <router-view name="slidebar2"></router-view>
        <router-view name="slidebar3"></router-view>
        <router-view name="slidebar4"></router-view>

        <!-- <Sidebar></Sidebar>
        <Catenate></Catenate> -->
      </div>
    </div>
    <v-gotop></v-gotop>
  </div>
</template>

<script>
import goTop from "./components/backtop/goTop";
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    "v-gotop": goTop
  },
  created() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    getdata() {
      if (this.$cookieStore.getCookie("name") != "") {
        this.$http
          .post(`/api/userController/getMyself`)
          .then(res => {
            // console.log(res);
            this.$store.commit("getuserid", res.data.myListUser.userid);
            this.$store.commit("getusername", res.data.myListUser.name);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("还未登录");
      }
    }
  },
  beforeMount() {
    this.getdata();
  },
  mounted() {}
};
</script>

<style>
@import url("assets/css/base.css");

/* 去除滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
/* .main {
  width: 80%;
  margin: 0 auto;
} */

.main {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.left {
  /* border: 1px solid blue; */
  float: left;
  width: 70%;
}
.right {
  /* border: 1px solid red; */
  float: right;
  width: 28%;
}

input:focus {
  border-color: #ced4da !important;
  box-shadow: none !important;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: none !important;
  box-shadow: none !important;
}

.text {
  color: #80bd01;
}
.clearfix {
  content: "";
  display: block;
  clear: both;
}
</style>
