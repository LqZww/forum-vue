<template>
  <div class="friendlycommunity">
    <div class="text">
      <span class="icon iconfont icon-friendlycommunity input-group-addon"></span>
      <span>友情社区</span>
    </div>

    <hr>
    <ul class="main">
      <li>
        <a
          href="https://learnku.com/laravel"
          target="_blank"
        >
          <img
            src="../../assets/img/phphub-logo.png"
            alt="phphub-logo"
          >
        </a>
      </li>
      <li>
        <a
          href="https://ruby-china.org/"
          target="_blank"
        >
          <img
            src="../../assets/img/ruby-china.png"
            alt="ruby-china"
          >
        </a>
      </li>
      <li>
        <a
          href="https://testerhome.com/"
          target="_blank"
        >
          <img
            src="../../assets/img/testerhome.png"
            alt="testerhome"
          >
        </a>
      </li>
      <li>
        <a
          href="https://cnodejs.org/"
          target="_blank"
        >
          <img
            src="../../assets/img/cnodejs.png"
            alt="cnodejs"
          >
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "FriendlyCommunity"
};
</script>

<style scoped>
.friendlycommunity {
  background-color: #ffffff;
  /* width: 28%; */
  /* float: right; */
  margin-top: 10px;
  padding: 10px;
}
li {
  /* border: 1px solid red; */
  margin: 10px auto;
}
a {
  text-decoration: none;
}
a:hover {
  color: #0069d9;
}
img {
  width: 150px;
}
</style>