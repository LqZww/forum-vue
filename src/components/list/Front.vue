<template>
  <div class="front">

    <div class="posts">
      <ul>
        <li>
          <div class="toobar">
            <span
              @click="goBack"
              class="icon iconfont icon-return"
            ></span>
            <span>分类 / {{this.$route.params.bname}}</span>
          </div>
        </li>
        <li
          class="text-center text-lowercase"
          v-if="posts ==''"
        >
          <h3 class="nocontent">暂无文章</h3>
        </li>
        <li
          v-for="post in posts"
          v-else
        >
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
          <span class="allcount">{{post.sum}}</span>
          <!-- 帖子分类 -->
          <span class="topiclist-tab">
            <span>{{post.bname}}</span>
          </span>
          <!-- 标题 -->
          <router-link :to="{name:'post_content',params:{fid:post.fid}}">
            <span>{{post.titles}}</span>
          </router-link>
          <!-- 时间 -->
          <span class="last_reply">{{post.time | formatDate}}</span>
        </li>

      </ul>

    </div>

  </div>
</template>

<script>
export default {
  name: "Front",
  data() {
    return {
      posts: []
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    getData() {
      this.$http
        .post(`/api/common/getArticleBid/${this.$route.params.bid}`)
        .then(res => {
          this.posts = res.data.listArticle;

          console.log(this.posts);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getData();
  },
  watch: {
    $route(to, from) {
      this.getData();
    }
  }
};
</script>

<style scoped>
.front {
  background-color: #ffffff;
  /* width: 100%; */
  /* float: left; */
}
.posts {
  margin-top: 10px;
}

.front img {
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
li:not(:first-child):hover {
  background: #f5f5f5;
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

.toobar span:last-child {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  /* margin: 0 10px; */
}
.toobar span:first-child {
  cursor: pointer;
}

.toobar span:hover {
  color: #9e78c0;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
.iconfont {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
}
.nocontent {
  color: #ccccd0;
}
</style>