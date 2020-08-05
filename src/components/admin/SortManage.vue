<template>
  <div class="sortmanage">
    <div class="container">
      <div class="header row">
        <div class="col-md-10">
          <span class="headsize">分类管理</span>
        </div>
        <div class="text-right col-md-2">
          <button
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#addsorts"
          >新增分类</button>
          <div
            class="modal fade"
            id="addsorts"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">增加分类</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                  >&times;</button>
                </div>
                <div class="modal-body">
                  <div class="main">
                    <form action="">
                      <div class="input-group">
                        <span class="input-group-btn">
                          <button
                            class="btn btn-default"
                            type="button"
                            disabled="disabled"
                          >分类名：</button>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="请输入分类名"
                          v-model="addsortname"
                        >
                      </div>
                    </form>
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
                    @click="addsorts()"
                    class="btn btn-primary"
                  >确认</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <td>分类名</td>
            <td>最后更新时间</td>
            <td>修改</td>
            <td>删除</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sort in sorts">
            <!-- <td>{{sort.bid}}</td> -->
            <td>{{sort.bname}}</td>
            <td>{{sort.btime}}</td>
            <td>
              <button
                class="btn btn-link"
                data-toggle="modal"
                data-target="#amend"
                @click="plateShow(sort.bid)"
              >修改</button>
              <div
                class="modal fade"
                id="amend"
              >
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">修改分类</h4>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                      >&times;</button>
                    </div>
                    <div class="modal-body">
                      <div class="main">
                        <form action="">
                          <div>
                            <span>原分类名：</span>
                            <span>{{sort.bname}}</span>
                          </div>
                          <br>
                          <div class="input-group">
                            <span class="input-group-btn">
                              <button
                                class="btn btn-default"
                                type="button"
                                disabled="disabled"
                              >修改为：</button>
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="请输入新分类名"
                              v-model="sortdata.bname"
                            >
                          </div>
                        </form>
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
                        @click="revise(sort.bid,sort.bname)"
                        class="btn btn-primary"
                      >确认</button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <button
                class="btn btn-link"
                data-toggle="modal"
                data-target="#omit"
                @click="plateShow(sort.bid)"
              >删除</button>
              <div
                class="modal fade"
                id="omit"
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
                          您确认要删除改该分类吗？
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
                        @click="delsort(sortdata.bid)"
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
    <div>
      <div class="alert alert-success text-center">
        成功！
      </div>
      <div class="alert alert-warning text-center">
        警告！该分类已存在，请重新输入！
      </div>
      <div class="alert alert-danger text-center alert-danger-content">
        请输入内容！
      </div>
      <div class="alert alert-danger text-center alert-danger-error">
        失败！
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "SortManage",
  data() {
    return {
      sorts: [],
      sortdata: {
        bid: "",
        bname: ""
      },
      addsortname: ""
    };
  },
  methods: {
    addsorts() {
      if (this.addsortname == "") {
        $(".alert-danger-content")
          .show()
          .delay(1000)
          .hide(0);
      } else {
        let sortdata = new FormData();
        sortdata.append("bname", this.addsortname);
        this.$http
          .post(`/api/plateController/setPlate`, sortdata)
          .then(res => {
            console.log(res);
            if (res.data.resultCode == 200) {
              location.reload();
            } else if (res.data.resultCode == 201) {
              $(".alert-warning")
                .show()
                .delay(1000)
                .hide(0);
              this.addsortname = "";
            } else {
              $(".alert-danger-error")
                .show()
                .delay(1000)
                .hide(0);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    delsort(bid) {
      this.$http
        .post(`/api/plateController/deletePlate/${bid}`)
        .then(res => {
          if (res.data.resultCode == 200) {
            $(".alert-success")
              .show()
              .delay(1000)
              .hide(0);
            location.reload();
            // console.log(res);
          } else {
            $(".alert-danger-error")
              .show()
              .delay(1000)
              .hide(0);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    plateShow(bid) {
      this.sortdata.bid = bid;
    },
    revise(bid, bname) {
      if (this.sortdata.bname == "") {
        $(".alert-danger-content")
          .show()
          .delay(1000)
          .hide(0);
      } else {
        let formData = new FormData();
        formData.append("bid", this.sortdata.bid);
        formData.append("bname", this.sortdata.bname);

        this.$http
          .post(`/api/plateController/updatePlate`, formData)
          .then(res => {
            if (res.data.resultCode == 200) {
              $(".alert-success")
                .show()
                .delay(1000)
                .hide(0);
              location.reload();
            } else {
              $(".alert-danger-error")
                .show()
                .delay(1000)
                .hide(0);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    getData() {
      this.$http
        .post(`/api/common/getAll_Admin`)
        .then(res => {
          // console.log(res);
          this.sorts = res.data.plate;
          console.log(res.data.plate);
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
.sortmanage {
  /* border: 1px solid red; */
  background-color: white;
}
.header {
  /* display: inline-block; */
  /* border: 1px solid red; */
  padding: 10px;
}
.headsize {
  font-size: 28px;
}
.alert {
  position: fixed;
  z-index: 111111;
  font-size: 22px;
  display: none;
  width: 400px;
  height: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
}
</style>