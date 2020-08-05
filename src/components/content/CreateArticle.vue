<template>
  <div class="createarticle">
    <ul>
      <li>
        <div class="toobar">
          <span>创建的文章</span>
        </div>
      </li>
      <li
        v-if="articles == ''"
        class="text-center"
      >
        <span class="noart">暂无文章</span>
      </li>
      <li
        v-else
        v-for="article in articles"
      >
        <!-- 标题 -->
        <router-link :to="{name:'post_content',params:{fid:article.fid}}">
          <span>{{article.titles}}</span>
        </router-link>

        <!-- 帖子分类 -->
        <span class="article_category topiclist-tab">
          <span v-if="article.bname != null">{{article.bname}}</span>
          <span v-else>null</span>
        </span>

        <!-- 时间 -->
        <span class="last_reply">{{article.time}}</span>

        <div class="text-right changebtn clearfix">
          <span
            class="check checkpass"
            v-if="article.status ==1"
          >
            通过
          </span>

          <span
            class="check checkno"
            v-else
          >
            暂未通过
          </span>
          <router-link :to="{name:'change_article',params:{fid:article.fid,userid:article.userid}}">
            <button class="btn btn-primary">修改</button>
          </router-link>
          <button
            class="btn btn-danger"
            data-toggle="modal"
            data-target="#delart"
            @click="delartid(article.fid)"
          >删除</button>

          <div
            class="modal fade"
            id="delart"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">提示</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                  >&times;</button>
                </div>
                <div class="modal-body">
                  <div class="main text-center">
                    <div>您确认要删除该文章吗？
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    关闭
                  </button>
                  <button
                    @click="delart(getfid)"
                    class="btn btn-primary"
                  >确认</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: "CreateArticle",
  data() {
    return {
      articles: [],
      getfid: ""
    };
  },
  methods: {
    delartid(fid) {
      this.getfid = fid;
    },
    delart(fid) {
      this.$http
        .post(`/api/articleController/deleteArticle/${fid}`)
        .then(res => {
          // console.log(res);
          // location.reload();
          $("#delart").modal("hide");
          this.getInfoArticle();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getInfoArticle() {
      this.$http
        .post("/api/userController/getMyselfArticle")
        .then(res => {
          this.articles = res.data.myListArticles;
          // console.log(this.article);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getInfoArticle();
  }
};
</script>

<style scoped>
.createarticle {
  background-color: #ffffff;
  /* border: 1px solid red; */
  margin-top: 10px;
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

.article_category {
  margin: auto 10px;
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

.changebtn button {
  margin: 4px;
}
.check {
  float: left;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.checkpass {
  color: #17a2b8;
}
.checkno {
  color: #e87c87;
}
.noart {
  color: #ccccd0;
}
</style>