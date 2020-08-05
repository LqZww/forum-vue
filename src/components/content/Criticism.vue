<template>
  <div class="criticism">
    <div class="toobar">
      <span>回复量：{{sum}}</span>
    </div>

    <div class="comment">
      <div>
        <form
          class="col-lg-12"
          @keyup.enter="submessage"
        >
          <input
            itype="text"
            style="display:none"
          />
          <div class="input-group  input-group-lg">
            <input
              type="text"
              v-model="maincontent.pcontent"
              placeholder="请输入评论内容😍"
              class="form-control"
            >
            <!-- <span class="input-group-btn"> -->
            <button
              class="btn btn-primary"
              type="button"
              @click="submessage"
            >
              提交留言
            </button>
            <!-- </span> -->
          </div>
        </form>
      </div>
    </div>

    <hr>

    <ul v-if="lists.length !== 0">
      <li v-for="list in rlists">
        <div class="info">
          <div class="info-nt">
            <span>{{list.name}}</span>
            <span class="last_reply">{{list.time | formatDate}}</span>

          </div>
          <div class="info-content">
            <div>{{list.pcontent}}</div>
          </div>
          <!-- <div v-show="showdelbtn">
            <button @click="delcom(list.pid,list.fid)">删除</button>
          </div> -->
        </div>
        <hr>
      </li>
    </ul>
    <div
      class="norestore"
      v-else
    >
      <div>暂无评论</div>
    </div>
    <div>
      <div class="alert alert-success text-center">
        留言成功!
      </div>
      <div class="alert alert-warning text-center">
        请输入留言内容！
      </div>
      <div class="alert alert-danger text-center">
        请先登录!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Criticism",
  data() {
    return {
      lists: [],
      comments: [],
      listComment_Fid: "",
      sum: "",
      maincontent: {
        userid: `${this.$store.state.userid}`,
        fid: `${this.$route.params.fid}`,
        pcontent: ""
      }
      // showdelbtn: true,
      // userid: ""
    };
  },
  computed: {
    rlists() {
      // 倒序
      return this.lists.reverse();
    }
  },
  methods: {
    // delcom(pid, fid) {
    //   this.$http
    //     .post(`/api/commentController/deleteComment/${pid}`)
    //     .then(res => {
    //       console.log(res);
    //       this.$http
    //         .post(`/api/commentController/getCommentFid/${fid}`)
    //         .then(res => {
    //           for (let j = 0; j < res.data.listComment.length; j++) {
    //             this.userid = res.data.listComment[0].userid;
    //           }
    //           console.log(res);
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    submessage() {
      if (this.$cookieStore.getCookie("name") == "") {
        $(".alert-danger")
          .show()
          .delay(1000)
          .hide(0);
        setTimeout(
          function() {
            this.$router.push("/signin");
          }.bind(this),
          2000
        );
      } else if (this.maincontent.pcontent == "") {
        $(".alert-warning")
          .show()
          .delay(1000)
          .hide(0);
      } else {
        let data = new FormData();
        for (let key in this.maincontent) {
          data.append(key, this.maincontent[key]);
        }

        this.$http
          .post(`/api/commentController/setComment`, data)
          .then(res => {
            if (res.data.resultCode == 200) {
              this.$http
                .post(
                  `/api/commentController/getCommentFid/${this.$route.params.fid}`
                )
                .then(res => {
                  // console.log(res);
                  this.maincontent.pcontent = "";
                  $(".alert-success")
                    .show()
                    .delay(1000)
                    .hide(0);

                  this.getCriticism();
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getCriticism() {
      this.$http
        .get(`/api/articleController/getArticleFid/${this.$route.params.fid}`)
        .then(res => {
          this.listComment_Fid = "listComment_" + `${this.$route.params.fid}`;
          // console.log(this.listComment_Fid);
          this.comments = res.data[this.listComment_Fid];
          this.lists = this.comments;
          // console.log(this.comments);
          // console.log(res);

          this.sum = res.data.listArticle.sum;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getCriticism();

    // console.log(this.$cookieStore.getCookie("name"));
    // console.log(this.$store.state.name);

    // if (this.$cookieStore.getCookie("name") == this.$store.state.name) {
    //   this.showdelbtn = true;
    // }
  },
  beforeCreate() {}
};
</script>

<style scoped>
.criticism {
  background-color: #ffffff;
  /* border: 1px solid red; */
  margin: 10px auto;
}

.toobar {
  height: 40px;
  background-color: #f5f5f5;
}
.toobar span {
  font-size: 14px;
  line-height: 40px;
  margin: 0 10px;
}

.info {
  /* border: 1px solid red; */
  margin: 10px auto;
}
.info-nt {
  padding: 0 0 0 10px;
}
.info-nt > :last-child {
  /* border: 1px solid red; */
  float: right;
  padding: 0 10px 0 0;
}
.info-content {
  /* border: 1px solid red; */
  padding: 6px 0 0 40px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  color: #778087;
  font-size: 12px;
}

.norestore {
  text-align: center;
  color: #ccccd0;
  font-size: 32px;
}

.alert {
  position: fixed;
  z-index: 111111;
  font-size: 22px;
  display: none;
  width: 220px;
  height: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
}
.comment {
  /* border: 1px solid red; */
  margin-top: 16px;
}
</style>