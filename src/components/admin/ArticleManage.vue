<template>
  <div class="articlemanage">
    <div class="container">
      <h3>文章管理</h3>
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <td width="8%">用户名</td>
            <td width="10%">标题</td>
            <!-- <td width="50%">内容</td> -->
            <td width="4%">分类</td>
            <td width="12%">更新时间</td>
            <td width="8%">状态</td>
            <td width="8%">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="art in arts">
            <td>{{art.username}}</td>
            <td>{{art.titles}}</td>
            <!-- <td class="fcontent">{{art.fcontent}}</td> -->
            <td>{{art.bname}}</td>
            <td>{{art.time}}</td>
            <td>
              <div v-if="art.status == 1">
                <button
                  type="button"
                  class="btn btn-info btn-sm"
                  disabled="disabled"
                >通过</button>
              </div>
              <div v-else>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  disabled="disabled"
                >拒绝</button>
              </div>

            </td>
            <td class="handle">
              <button
                class="btn btn-info btn-sm"
                @click="passart(art.fid)"
              >通过</button>
              <br>
              <button
                class="btn btn-danger btn-sm"
                @click="rejectart(art.fid)"
              >拒绝</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleManage",
  data() {
    return {
      arts: [],
      pass: {
        fid: "",
        status: "1"
      },
      reject: {
        fid: "",
        status: 0
      }
    };
  },
  methods: {
    rejectart(fid) {
      let formData = new FormData();
      formData.append("fid", fid);
      formData.append("status", this.reject.status);
      this.$http
        .post(`/api/articleController/articleStatus`, formData)
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
    passart(fid) {
      let formData = new FormData();
      formData.append("fid", fid);
      formData.append("status", this.pass.status);
      this.$http
        .post(`/api/articleController/articleStatus`, formData)
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
          // console.log(res);
          this.arts = res.data.listArticle;
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
.articlemanage {
  background-color: white;
}
/* table tbody {
  display: block;
  height: 60vh;
  overflow-y: scroll;
}

table thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
} */
.handle button {
  margin: 2px auto;
}
/* .fcontent {
  border-bottom: none;
  border-right: none;
  border-left: none;

  display: block;
  max-height: 94px;
  overflow: auto;
} */

h3 {
  padding: 14px 10px;
}
</style>