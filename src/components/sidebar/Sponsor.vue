<template>
  <div class="sponsor">
    <div class="text">
      <span class="icon iconfont icon-support input-group-addon"></span>
      <span>赞助</span>
    </div>

    <hr>
    <div class="sponsormain">
      <span>您的赞助将用于该项目后期的维护与更新！</span>
      <div>
        <img
          src="../../assets/img/alipay.jpg"
          alt="alipay"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sponsor"
};
</script>

<style scoped>
.sponsor {
  background-color: #ffffff;
  margin-top: 10px;
  padding: 10px;
}
.sponsormain {
  padding: 10px;
}
.sponsormain > span {
  font-size: 14px;
}
img {
  width: 100%;
}
</style>