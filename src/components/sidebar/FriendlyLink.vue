<template>
  <div class="friendlylink">
    <div class="text">
      <span class="icon iconfont icon-friendlylink input-group-addon"></span>
      <span>友情链接</span>
    </div>

    <hr>
    <ul class="main">
      <li>
        <a
          href="https://github.com/LqZww"
          target="_blank"
        >Github</a>
      </li>
      <li>
        <a
          href="https://www.cnblogs.com/LqZww/"
          target="_blank"
        >博客园</a>
      </li>
      <li>
        <a
          href="https://zhouwanwen.com/"
          target="_blank"
        >个人博客</a>
      </li>
      <li>
        <a
          href="https://github.com/Binaryify/NeteaseCloudMusicApi"
          target="_blank"
        >网易云音乐API</a>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "FriendlyLink"
};
</script>

<style scoped>
.friendlylink {
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
</style>