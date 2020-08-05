<template>
  <div class="sidebar">
    <div class="text">
      <span class="icon iconfont icon-sort input-group-addon"></span>
      <span>分类</span>
    </div>

    <hr>

    <ul class="row">
      <li
        class="label col-xs-6 col-md-6 text-center"
        v-for="label in labels"
      >
        <router-link :to="{name:'sort',params:{bid:label.bid,bname:label.bname}}">
          <span>{{label.bname}}</span>
        </router-link>
      </li>

    </ul>

  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      labels: []
    };
  },
  methods: {
    getData() {
      this.$http
        .get("/api/common/getAll")
        .then(res => {
          this.labels = res.data.plate;
          // console.log(this.labels);
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
.sidebar {
  background-color: #ffffff;
  /* width: 28%; */
  /* float: right; */
  margin-top: 10px;
  padding: 10px;
}
.label {
  /* border: 1px solid red; */
  padding: 10px;
}
.row {
  width: 100%;
  margin: 0;
}
a {
  text-decoration: none;
}
</style>