<template>
  <div class="header">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <a
        class="navbar-brand logo"
        href="/admin"
      >LZ fourm 管理系统</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            class="nav-link"
            href="/admin/user"
          >
            用户管理
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/admin/article"
          >
            文章管理
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/admin/sort"
          >
            分类管理
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/admin/signin"
            v-show="this.$cookieStore.getCookie('aname') == ''"
          >
            登录
          </a>
          <a
            class="nav-link"
            href="/admin"
            v-show="this.$cookieStore.getCookie('aname') != ''"
            @click="signout"
          >
            登出
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="javascript:void(0)"
            @click="refresh"
          >
            <span class="icon iconfont icon-refresh input-group-addon"></span>
          </a>
        </li>
      </ul>
    </nav>
    <div
      class="container-fluid"
      style="margin-top:70px"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: "AHeader",
  methods: {
    signout() {
      this.$cookieStore.getCookie("aname");
      this.$cookieStore.delCookie("aname");

      $(".alert-success")
        .show()
        .delay(1000)
        .hide(0);
      // location.reload();
    },
    refresh() {
      this.$router.go(0);
    }
  }
};
</script>


<style scoped>
.logo {
  color: #80bd01;
}
</style>
