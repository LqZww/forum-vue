<template>
  <div class="article">
    <div class="header">
      <div class="article-title">
        <span>{{post.titles}}</span>
      </div>
      <div class="article-info">
        <span>🙃最后更新于{{post.time | formatDate}} </span>
        <span>🙃作者：{{post.username}}</span>
      </div>
    </div>
    <hr>

    <div>
      <img
        :src="'/api/static/upload/article/'  + post.photo"
        alt="文章配图"
      >
      <div
        class="article-content"
        v-html="article_content"
      ></div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      post: {},
      comments: [],
      listComment_Fid: "",
      article_content: ""
    };
  },
  components: {
    "v-goTop": goTop
  },
  methods: {
    backTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    getArticleData() {
      this.$http
        .post(`/api/articleController/getArticleFid/${this.$route.params.fid}`)
        .then(res => {
          this.post = res.data.listArticle;
          this.listComment_Fid = "listComment_" + `${this.$route.params.fid}`;
          // console.log(this.listComment_Fid);
          this.comments = res.data[this.listComment_Fid];
          this.article_content = this.post.fcontent;
          // console.log(this.comments);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getArticleData();
  },
  watch: {
    $route(to, from) {
      this.getArticleData();
    }
  }
};
</script>

<style scoped>
.article {
  background-color: #ffffff;
  margin-top: 10px;
}

.header {
  /* border: 1px solid red; */
}
.article-title {
  /* border: 1px solid red; */
  color: #333333;
  font-size: 22px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  padding: 10px 0 0 20px;
}
.article-info {
  /* border: 1px solid red; */
  font-size: 12px;
  color: #838383;
  padding: 10px 0 0 10px;
}
.article-content {
  /* border: 1px solid red; */
  padding: 20px;
}
img {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
}
</style>