<template>
  <div class="messagewall">
    <div class="toobar">
      <span>留言墙</span>
    </div>

    <div class="container">
      <div class="input-group">
        <input
          autofocus
          v-model="newMsg"
          class="form-control"
          placeholder="请输入留言内容"
          @keyup.enter="addMsg"
        >
        <span class="input-group-addon">
          <button
            @click="addMsg"
            class="btn btn-primary btn-block"
          >提交</button>
        </span>
        <span class="input-group-addon">
          <button
            @click="removeMsgs"
            v-show="msgs.length > 0"
            class="btn btn-danger btn-block"
          >清空留言</button>
        </span>
      </div>
    </div>

    <div class="container">
      <div class="panel panel-default">
        <div class="panel-heading">内容展示区</div>
        <div class="panel-body">
          <ul class="list-group">

            <li
              class="list-group-item"
              v-for="msg in msgs"
            >{{msg.title}}</li>
          </ul>

        </div>
      </div>
    </div>

  </div>
</template>


<script>
var STORAGE_KEY = "LZ forum liuyanban";
var msgStorage = {
  fetch: function() {
    var msgs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    msgs.forEach(function(msg, index) {
      msg.id = index;
    });
    msgStorage.uid = msgs.length;
    return msgs;
  },
  save: function(msgs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  }
};
export default {
  name: "MessageWall",
  data() {
    return {
      msgs: msgStorage.fetch(),
      newMsg: ""
    };
  },
  watch: {
    msgs: {
      handler: function(msgs) {
        msgStorage.save(msgs);
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    addMsg: function() {
      var value = this.newMsg && this.newMsg.trim();
      if (!value) {
        return;
      }
      this.msgs.push({
        id: msgStorage.uid++,
        title: value
      });
      this.newMsg = "";
    },
    removeMsgs: function() {
      msgStorage.uid = 0;
      return (this.msgs = []);
    }
  }
};
</script>

<style scoped>
@import url("/assets/css/style.css");
.messagewall {
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
.container {
  margin: 10px auto;
}
.panel-body {
  /* border: 1px solid red; */
  height: 300px;
  overflow: auto;
}
</style>