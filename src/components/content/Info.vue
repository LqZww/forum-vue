<template>
  <div class="info">
    <div class="toobar">
      <span>个人信息</span>
    </div>

    <div class="pip">
      <div v-if="list.userphoto === null">
        <img
          src="../../assets/img/defaultavatar.jpg"
          alt="默认头像"
          data-toggle="modal"
          data-target="#img"
        >
        <span>
          <img
            src="../../assets/img/leftarrow.jpeg"
            alt=""
            style="cursor:default;"
          >
          点它可以更新头像哟😋
        </span>
      </div>
      <div v-else>
        <img
          :src="'/api/static/upload/user/' + list.userphoto"
          alt="头像"
          data-toggle="modal"
          data-target="#img"
        >
        <span>
          <img
            src="../../assets/img/leftarrow.jpeg"
            alt=""
            style="cursor:default;"
          >
          点它可以更新头像哟😋
        </span>
      </div>

      <div
        class="modal fade"
        id="img"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4
                class="modal-title"
                id="myModalLabel"
              >
                头像修改
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >×
              </button>
            </div>
            <div class="modal-body">
              <div>
                <form
                  name="imgForm"
                  id="imgForm"
                  enctype="multipart/form-data"
                  action="/api/viaController/setUserPhoto"
                  method='post'
                >
                  <input
                    class="input-loc-img"
                    name="imgLocal"
                    id="imgLocal"
                    type='file'
                    accept="image/*"
                  />
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                @click="selectImg"
              >
                点击更新头像
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <ul>
      <li>
        <span class="icon iconfont icon-username"></span>
        <span>{{list.name}}</span>
      </li>
      <li>
        <span class="icon iconfont icon-sex"></span>
        <span>{{list.sex}}</span>
      </li>
      <li>
        <span class="icon iconfont icon-age"></span>
        <span v-if="list.age === null">暂未填写</span>
        <span v-else>{{list.age}}</span>
      </li>
      <li>
        <span class="icon iconfont icon-email"></span>
        <span>{{list.email}}</span>
      </li>
      <li>
        <span class="icon iconfont icon-address"></span>
        <span v-if="list.family === null">暂未填写</span>
        <span v-else>{{list.family}}</span>
      </li>
      <li>
        <span class="icon iconfont icon-synopsis"></span>
        <span>{{list.intro}}</span>
      </li>
    </ul>

    <button
      class="btn btn-link"
      data-toggle="modal"
      data-target="#myinfo"
    >点击修改资料</button>

    <div
      class="modal fade"
      id="myinfo"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header">
            <h4 class="modal-title">编辑个人资料</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
            >&times;</button>
          </div>

          <div class="modal-body">
            <div class="main">
              <form
                action="/api/userController/getMyselfUser"
                method="post"
                id="form_userUpdate"
              >

                <div id="myself_name">
                  <span class="userinfo text-right font-weight-bold">用户名</span>
                  <span class="editContent">{{list.name}}</span>
                </div>
                <div>
                  <label>
                    <span class="userinfo text-right font-weight-bold">年龄</span>
                    <input
                      class="editContent"
                      type="text"
                      v-model="formMess.age"
                    >
                  </label>
                </div>
                <div>
                  <span class="userinfo text-right font-weight-bold">性别</span>
                  <label class="editContent">
                    <input
                      type="radio"
                      name="sex"
                      id="myself_sex_age"
                      value="男"
                      v-model="formMess.sex"
                    >男
                  </label>

                  <label class="editContent">
                    <input
                      type="radio"
                      name="sex"
                      id=""
                      value="女"
                      v-model="formMess.sex"
                    >女
                  </label>
                </div>
                <div>
                  <span class="userinfo text-right font-weight-bold">email</span>
                  <span class="editContent">{{list.email}}</span>
                </div>
                <div>
                  <label>
                    <span class="userinfo text-right font-weight-bold">家庭住址</span>
                    <input
                      class="editContent"
                      type="text"
                      v-model="formMess.family"
                    >
                  </label>

                </div>
                <div>
                  <label>
                    <span class="userinfo text-right font-weight-bold">个人简介</span>
                    <textarea
                      class="editContent"
                      type="text"
                      name=""
                      id=""
                      v-model="formMess.intro"
                    ></textarea>
                  </label>
                </div>
              </form>
            </div>
          </div>

          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              @click="del()"
            >清除</button>
            <button
              @click="save"
              class="btn btn-primary"
            >保存修改</button>

          </div>

        </div>
      </div>
    </div>

    <div>
      <div class="alert alert-warning text-center">
        警告，请输入完整修改内容!
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      list: [],
      myinfo: [],
      formMess: {
        userid: `${this.$store.state.userid}`,
        age: "",
        sex: "",
        family: "",
        intro: ""
      }
    };
  },
  created() {},
  mounted() {
    // $("textarea").scroll(function() {
    //   $(this).css("height", $(this)[0].scrollHeight);
    // });
  },
  methods: {
    selectImg() {
      let that = this;
      let imgFile = $(this.$el).find("#imgLocal")[0].files[0]; //取到上传的图片
      console.log($(this.$el).find("#imgLocal")[0].files); //由打印的可以看到，图片信息就在files[0]里面
      let formData = new FormData(); //通过formdata上传
      formData.append("photo", imgFile);
      this.$http
        .post("/api/viaController/setUserPhoto", formData, {
          method: "post",
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(function(res) {
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    del() {
      this.formMess.age = "";
      this.formMess.sex = "";
      this.formMess.family = "";
      this.formMess.intro = "";
    },
    getInfo() {
      this.$http
        .get(`/api/userController/getMyselfUser`)
        .then(res => {
          // console.log(res);
          this.list = res.data.myListUser;
        })
        .catch(err => {
          console.log(err);
        });
    },
    save() {
      var that = this;
      if (
        this.formMess.age == "" ||
        this.formMess.sex == "" ||
        this.formMess.family == "" ||
        this.formMess.intro == ""
      ) {
        $(".alert-warning")
          .show()
          .delay(1000)
          .hide(0);
      } else {
        let formData = new FormData();
        for (let key in this.formMess) {
          formData.append(key, this.formMess[key]);
        }
        formData.append("userid", that.formMess.userid);
        formData.set("age", that.formMess.age);
        formData.set("sex", that.formMess.sex);
        formData.set("family", that.formMess.family);
        formData.set("intro", that.formMess.intro);

        this.$http
          .post(`/api/userController/updateUser`, formData)
          .then(res => {
            if (res.data.resultCode == 200) {
              this.$http
                .post(`/api/userController/getMyselfUser`)
                .then(res => {
                  console.log(res);
                  // res.data.myListUser.age = this.formMess.age;
                  // res.data.myListUser.age = Number(this.formMess.age);
                  // console.log(res);
                  // this.$set(res.data.myListUser, "age", this.age);

                  location.reload();
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              alert("失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  beforeMount() {
    this.getInfo();
  }
};
</script>

<style scoped>
.info {
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

.pip img {
  height: 50px;
  width: 50px;
  margin: 10px;
}
li {
  margin: 10px;
}
li span {
  vertical-align: middle;
  margin: auto 2px;
}

.userinfo {
  display: inline-block;
  width: 74px;
  margin: 8px;
  margin-left: -6px;
}
.editContent {
  margin-left: 12px;
}
textarea {
  resize: none;
  width: 200px;
  height: 78px;
  max-width: 200px;
  max-height: 78px;
}
img {
  cursor: pointer;
}

.alert {
  position: fixed;
  z-index: 111111;
  font-size: 22px;
  display: none;
  width: 340px;
  height: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
}
</style>