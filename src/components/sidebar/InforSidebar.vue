<template>
  <div class="infosidebar">
    <div class="text">
      <span class="icon iconfont icon-username input-group-addon"></span>
      <span>作者</span>
    </div>

    <hr>

    <div class="info">

      <router-link :to="{name:'post_info',params:{userid:infos.userid}}">
        <a href="#">
          <img
            src="../../assets/img/defaultavatar.jpg"
            alt="默认头像"
            v-if="infos.userphoto === null"
          >
          <img
            :src="'/api/static/upload/user/'  + infos.userphoto"
            alt="头像"
            v-else
          >
        </a>
      </router-link>

      <!-- <a
        @click="goInfo"
        href="'/info?userid=' + infos.userid"
      >
        <img
          :src="'http://localhost:8080/static/upload/user/'  + infos.userphoto"
          alt="1"
        >
      </a> -->

      <span>{{infos.username}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoSidebar",
  data() {
    return {
      infos: []
    };
  },
  methods: {
    getInfo() {
      this.$http
        .get(`/api/articleController/getArticleFid/${this.$route.params.fid}`)
        .then(res => {
          this.infos = res.data.listArticle;
          // console.log(this.infos);
          this.userid = this.infos.userid;
          // console.log(this.userid);
        })
        .catch(err => {
          console.log(err);
        });
    }
    // goInfo() {
    //   var that = this;
    //   this.$http
    //     .get(
    //       `/api/userController/getOthers?userid=${this.$route.params.userid}`
    //     )
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  beforeMount() {
    this.getInfo();

    // this.goInfo();
  }
};
</script>

<style scoped>
.infosidebar {
  background-color: #ffffff;
  margin-top: 10px;
  padding: 10px;
}
img {
  height: 50px;
  width: 50px;
  vertical-align: middle;
}
.info span {
  /* border: 1px solid red; */
  margin: 10px;
}
</style>