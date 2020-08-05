<template>
  <div class="writing">
    <div class="toobar">
      <span>写文章</span>
    </div>

    <div>
      <form
        method="POST"
        enctype="multipart/form-data"
      >
        <input
          itype="text"
          style="display:none"
        />
        <div class="input-group input-group-lg">
          <input
            type="text"
            class="form-control"
            placeholder="请输入文章标题"
            v-model="main.titles"
          >
        </div>
        <div>
          <select
            class="selectpicker form-control"
            v-model="main.bid"
          >
            <option
              disabled
              value=""
            >请选择分类</option>
            <option
              v-for="plate in plates"
              :value="plate.bid"
            >
              {{plate.bname}}
            </option>
          </select>

        </div>
        <div>
          <input
            class="input-loc-img form-control"
            name="imgLocal"
            id="imgLocal"
            type='file'
            accept="image/*"
          />
        </div>
        <div>
          <div :id="editorId"></div>
        </div>
      </form>
      <div class="text-right">
        <button
          class="btn btn-danger"
          @click="del()"
        >清除内容</button>
        <button
          class="btn btn-primary"
          @click="save()"
        >发布文章</button>
      </div>

    </div>
    <div>
      <div class="alert alert-success text-center">
        文章提交成功，即将跳转！
      </div>
      <div class="alert alert-warning text-center">
        警告！请输入完整文章内容！
      </div>
    </div>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  name: "Writing",
  data() {
    return {
      editorId: "",
      editor: null,
      content: "",
      main: {
        userid: `${this.$store.state.userid}`,
        username: `${this.$store.state.username}`,
        photo: "",
        titles: "",
        bid: "",
        fcontent: "",
        "my-editormd-html-code": ""
      },
      plates: []
      // bname: ""
    };
  },
  watch: {
    value(newval) {
      if (this.editor) {
        this.editor.txt.html(newval);
      }
    }
  },
  beforeMount() {
    this.write();
  },
  mounted() {},
  methods: {
    del() {
      this.main.titles = "";
      this.main.bid = "";
      this.main.fcontent = "";
      this.main["my-editormd-html-code"] = "";
      this.editor.txt.html("");
    },
    save() {
      let that = this;
      let imgFile = $(this.$el).find("#imgLocal")[0].files[0]; //取到上传的图片
      console.log($(this.$el).find("#imgLocal")[0].files); //图片信息在files[0]里面
      let formData = new FormData(); //通过formdata上传

      this.main.fcontent = this.editor.txt.html();
      this.main["my-editormd-html-code"] = this.editor.txt.html();

      formData.append("photo", imgFile);
      formData.append("titles", this.main.titles);
      formData.append("bid", this.main.bid);
      formData.append("fcontent", this.main.fcontent);
      formData.append(
        "my-editormd-html-code",
        this.main["my-editormd-html-code"]
      );
      if (
        $(this.$el).find("#imgLocal")[0].files.length == 0 ||
        this.main.titles == "" ||
        this.main.bid == "" ||
        this.main.fcontent == "" ||
        this.main["my-editormd-html-code"] == ""
      ) {
        $(".alert-warning")
          .show()
          .delay(1000)
          .hide(0);
      } else {
        this.$http
          .post(`/api/articleController/setArticle`, formData)
          .then(res => {
            console.log(res.data);
            $(".alert-success")
              .show()
              .delay(1000)
              .hide(0);
            setTimeout(
              function() {
                this.$router.push("/");
              }.bind(this),
              2000
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    write() {
      this.$http
        .post(`/api/plateController/getPlate2`)
        .then(res => {
          if (res.data.resultCode == 200) {
            this.plates = res.data.plate;

            // console.log(this.plates);
          } else {
            alert("错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //生成一个随机不重复id,可以通过时间和随机数生成
    randomId() {
      let baseId = "wang_editor";
      let now = Date.now();
      let num = Math.random().toFixed(2) * 100;
      return `${baseId}_${now}_${num}`;
    },
    //初始化编辑器
    initEditor() {
      let _this = this;
      _this.editorId = _this.randomId(); //生成一个id
      this.$nextTick(() => {
        //获取实例,wangEditor是被注册在window的
        let editor = new wangEditor("#" + _this.editorId);
        _this.editor = editor; //将实例保存待调用其他api
        _this.setConfig();
        editor.create(); //开始创建编辑器；
        _this.editor.txt.html(this.value);

        // editor.txt.html("");
        // this.editor.customConfig.uploadImgServer =
        //   "/api/articleController/uploadPicture";
        // this.editor.customConfig.uploadFileName = "photo";
        this.editor.customConfig.withCredentials = true;
        editor.customConfig.uploadImgShowBase64 = true;
        // editor.customConfig.uploadImgParamsWithUrl = true;
        // editor.customConfig.withCredentials = true;

        // 设置是否可编辑
        if (this.disabled !== "undefined") {
          this.editor.$textElem.attr("contenteditable", !this.disabled);
        }
      });
    },
    // 创建富文本编辑器
    setConfig() {
      var _this = this;
      // 开始创建
      let setting = {
        uploadImgShowBase64: true, // 是否允许上传base64位图片
        pasteFilterStyle: true, // 是否过滤粘贴的样式
        zIndex: 100, //设置层叠位置
        //菜单列表
        menus: [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // "quote", // 引用
          // "image", // 插入图片
          // "table", // 表格
          "code", // 插入代码
          "undo", // 撤销
          "redo" // 恢复
        ],
        showLinkImg: false, //是否显示“网络图片”tab
        //监听用户输入后的change事件
        onchange: function(html) {
          _this.$emit("input", html);
        }
      };
      //配置给编辑器
      _this.editor.customConfig = Object.assign(
        _this.editor.customConfig,
        setting
      );
    }
  },
  created() {
    // 创建editor实例
    this.initEditor();
  }
};
</script>

<style scoped>
.writing {
  background-color: #ffffff;
  /* border: 1px solid red; */
  /* margin-top: 10px;
  margin-bottom: 10px; */
  margin: 10px auto;
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
form div {
  margin: 6px auto;
}
.text-right {
  /* border: 1px solid red; */
  padding: 10px;
}
.text-right button {
  margin: 0 10px;
}
.alert {
  position: fixed;
  z-index: 111111;
  font-size: 22px;
  display: none;
  width: 330px;
  height: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
}
</style>