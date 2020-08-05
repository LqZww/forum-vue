<template>
  <div class="postList">

    <div class="posts">
      <ul>
        <li>
          <div class="toobar">
            <span>主页 / 全部</span>
          </div>
        </li>
        <li v-for="post in posts">

          <img
            src="../../assets/img/defaultavatar.jpg"
            alt="默认头像"
            v-if="post.userphoto === null"
          >
          <img
            :src="'/api/static/upload/user/'  + post.userphoto"
            alt="头像"
            v-else
          >

          <!-- 评论数 -->
          <span
            class="allcount"
            title="评论数"
          >{{post.sum}}</span>

          <!-- 帖子分类 -->
          <span class="
            topiclist-tab">
            <span
              v-if="post.bname != null"
              title="分类"
            >{{post.bname}}</span>
            <span v-else>null</span>
          </span>
          <!-- 标题 -->
          <router-link :to="{name:'post_content',params:{fid:post.fid}}">
            <span>{{post.titles}}</span>
          </router-link>
          <!-- 时间 -->
          <span class="
              last_reply">{{post.time | formatDate}}</span>
        </li>

        <li>
          <!--分页-->

        </li>

      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: "PostList",
  data() {
    return {
      posts: []
    };
  },
  components: {
    "v-goTop": goTop
  },
  methods: {
    getData() {
      this.$http
        .get("/api/common/getAll")
        .then(res => {
          this.posts = res.data.listArticle;
          // console.log(this.posts);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>

<style scoped>
.postList {
  background-color: #ffffff;
  /* width: 100%; */
  /* float: left; */
}
.posts {
  margin-top: 10px;
}

.postList img {
  height: 36px;
  width: 36px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
  background: #f5f5f5;
}

li:last-child:hover {
  background: white;
}

li span {
  line-height: 30px;
}

.allcount {
  width: 50px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
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

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}
</style>