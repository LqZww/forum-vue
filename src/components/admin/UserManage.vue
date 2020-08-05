<template>
  <div class="usermanage">

    <div class="container">
      <h3>用户管理</h3>
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <td width="9%">用户名</td>
            <td width="6%">年龄</td>
            <td width="6%">性别</td>
            <td>email</td>
            <td width="13%">住址</td>
            <td>个人简介</td>
            <td width="7%">头像</td>
            <td width="6%">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users">
            <td>{{user.name}}</td>
            <td>{{user.age}}</td>
            <td>{{user.sex}}</td>
            <td>{{user.email}}</td>
            <td>{{user.family}}</td>
            <td>{{user.intro}}</td>
            <td>
              <img
                src="../../assets/img/defaultavatar.jpg"
                alt="默认头像"
                v-if="user.userphoto === null"
              >
              <img
                :src="'/api/static/upload/user/' + user.userphoto"
                alt="头像"
                v-else
              >
            </td>
            <td>
              <button
                class="btn btn-link"
                data-toggle="modal"
                data-target="#myinfo"
              >&times;</button>
              <div
                class="modal fade"
                id="myinfo"
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
                      <div class="main">
                        <div id="myself_name">
                          您确认要删除该用户吗？
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
                        @click="deluser(user.userid)"
                        class="btn btn-primary"
                      >确认</button>
                    </div>
                  </div>
                </div>
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "UserManage",
  data() {
    return {
      users: []
    };
  },

  methods: {
    deluser(userid) {
      this.$http
        .post(`/api/userController/deleteUser/${userid}`)
        .then(res => {
          if (res.data.resultCode == 200) {
            console.log(res);
            location.reload();
          } else {
            alert("失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      this.$http
        .post(`/api/common/getAll_Admin`)
        .then(res => {
          console.log(res);
          this.users = res.data.listUser;
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
.usermanage {
  /* border: 1px solid red; */
  background-color: white;
  /* height: 100%; */
}
.container {
  /* border: 1px solid #dee2e6; */
}
img {
  width: 50px;
  height: 50px;
}
h3 {
  padding: 14px 10px;
}
</style>