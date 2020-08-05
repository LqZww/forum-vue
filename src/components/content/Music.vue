<template>
  <div class="music">
    <div class="toobar">
      <span>音乐馆</span>
    </div>

    <div class="input-group">
      <input
        class="form-control"
        type="text"
        v-model="query"
        @keyup.enter="searchMusic"
        placeholder="请输入歌手或歌名"
      >
      <button
        class="input-group-text search"
        @click="searchMusic"
      >搜索</button>
    </div>

    <div class="musicList">
      <ul>
        <li
          class="lists"
          v-for="item in musicList"
        >

          <div
            class="ripple"
            @click="playMusic(item.id)"
          >
            <span> {{item.name}} -- </span>
            <span>{{item.artists[0].name}}</span>
          </div>
          <!-- <div class="MV text-center">
            <button
              class="btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#myModal"
              @click="playMv(item.mvid)"
            >MV</button>
          </div> -->

        </li>

      </ul>

    </div>

    <div class="song text-center">

      <scroll
        class="wrapper"
        ref="lyricList"
      >
        <div>
          <div class="content">
            <p
              v-for="(list,index) in lyricsArray"
              ref="lyricLine"
            >{{list.txt}}</p>
          </div>
        </div>
      </scroll>

    </div>

    <div class="hotComments">
      <h3 class="WonderfulComments">精彩评论</h3>
      <h3
        class="nohot text-center"
        v-if="hotComments == ''"
      >暂无评论</h3>
      <div
        v-else
        v-for="item in hotComments"
        class="clearfix itm"
      >
        <div class="head">
          <img
            :src="item.user.avatarUrl"
            alt="评论用户头像"
          >
        </div>
        <div class="maincomments">
          <span>
            {{item.user.nickname}} ： {{item.content}}
          </span>
        </div>

      </div>
    </div>

    <!-- MV模态框 -->
    <!-- <div
      class="modal fade"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      data-keyboard="false"
      data-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">

            <h4
              class="modal-title"
              id="myModalLabel"
            >
              MV视频
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              @click="mvUrl = ''"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <video
              :src="mvUrl"
              autoplay
              controls
              width="100%"
            ></video>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
              @click="mvUrl = ''"
            >关闭
            </button>

          </div>
        </div>
      </div>
    </div> -->

    <div class="audioplay">
      <div></div>
      <!-- <audio
        ref='audio'
        :src="musicUrl"
        controls
        autoplay
        loop
      ></audio> -->
      <vue-audio-native
        size="large"
        :url="musicUrl"
        :autoplay="true"
        hint="暂无有效音频..."
      >
      </vue-audio-native>
    </div>

  </div>
</template>

<script>
import Lyric from "lyric-parser";
import BScroll from "better-scroll";
import Scroll from "../content/scroll";

export default {
  name: "Music",
  data() {
    return {
      query: "",
      musicList: [],
      musicUrl: "",
      id: "",
      lyic: "",
      // currentLyric: {},
      currentLyric: {},
      currentLineNum: 0,
      lyricsArray: [],
      hotComments: []
      // mvUrl: "",
      // isShow: false
    };
  },
  components: {
    Scroll
  },
  mounted() {
    // let wrapper = document.querySelector(".wrapper");
    // let scroll = new BScroll(".wrapper", {
    //   scrollY: true,
    //   click: true
    // });
    this.$nextTick(() => {
      let wrapper = document.querySelector(".wrapper");
      let scroll = new BScroll(".wrapper", {
        scrollY: true,
        click: true
      });
    });
  },
  methods: {
    searchMusic() {
      var that = this;
      this.$http
        .get("https://autumnfish.cn/search?keywords=" + this.query)
        .then(res => {
          // console.log(res);
          that.musicList = res.data.result.songs;
          console.log(that.musicList);
        })
        .catch(err => {
          console.log(err);
        });
    },

    playMusic(musicId) {
      var that = this;
      this.$http
        .get("https://autumnfish.cn/song/url?id=" + musicId)
        .then(res => {
          // console.log(res);
          this.id = musicId;
          that.musicUrl = res.data.data[0].url;
        })
        .catch(err => {
          console.log(err);
        });
      this.$http
        .get("https://autumnfish.cn/lyric?id=" + musicId)
        .then(res => {
          // console.log(res.data.lrc.lyric);
          this.lyic = res.data.lrc.lyric;
          // console.log(this.lyic);
          // let lyric = new Lyric(lyricStr, handler);
          // let lyric = new Lyric(this.currentLyric, handler);
          // console.log(lyric);

          // function hanlder({ lineNum, txt }) {}
          // console.log(lyric);

          // that.musicUrl = res.data.data[0].url;
          this.currentLyric = new Lyric(this.lyic, this.handleLyric);

          console.log(this.currentLyric);
          this.lyricsArray = this.currentLyric.lines;
          console.log(this.lyricsArray);
        })
        .catch(err => {
          console.log(err);
        });

      this.$http
        .get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
        .then(res => {
          console.log(res);
          that.hotComments = res.data.hotComments;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 自动滚动暂未实现，https://www.cnblogs.com/catbrother/p/9181159.html
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        // 结合better-scroll，滚动歌词
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollToElement(0, 0, 1000);
      }
    }

    //播放mv
    // playMv(mvid) {
    //   var that = this;
    //   this.$http
    //     .get("https://autumnfish.cn/mv/url?id=" + mvid)
    //     .then(res => {
    //       that.isShow = true;
    //       that.mvUrl = res.data.data.url;
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }
};
</script>

<style scoped>
.music {
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
.input-group {
  margin-top: 2px;
}
.musicList {
  /* border: 1px solid #f5f5f5; */
  width: 30%;
  height: 300px;
  display: inline-block;
  overflow: auto;
  margin: 0 2px;
  color: black;
}
.song {
  /* border: 1px solid yellow; */
  width: 68%;
  /* height: 300px; */
  float: right;
  /* overflow: auto; */
  margin: 0 2px;
}
.wrapper {
  height: 300px;
  overflow: hidden;
}

.content {
  /* border: 1px solid red; */
  /* font-family: kaiti; */
}

.lists {
  /* border: 1px solid red; */
  /* position: relative; */
  padding: 2px;
}

/* 波纹效果 */
.ripple {
  position: relative;
  /* display: inline-block; */
  /* line-height: 100%; */

  overflow: hidden;
  /* padding: 2px auto; */
  padding: 6px;
  /* border: 1px solid #f5f5f5; */
  /* border: 1px solid red; */
}

.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.3s, opacity 0.5s;
}

.ripple:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}
audio {
  width: 100%;
  outline: none;
}
button {
  outline: none;
}
.search {
  /* border: 1px solid red; */
  position: absolute;
  right: 0;
  z-index: 999;
}
.audioplay {
  /* border: 1px solid red; */
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  width: 56%;
}
.vueAudioNative {
  display: none;
}
.audioplay:hover .vueAudioNative {
  display: inline-flex;
}
.vueAudioNative {
  border-radius: 3px;
  background-color: #2d2d2d;
  opacity: 0.8;
}
.audioplay div {
  height: 34px;
}

.WonderfulComments {
  margin-top: 20px;
  border-bottom: 1px solid #cfcfcf;
  /* height: 20px;
  top: 1px;
  position: relative; */
}
.hotComments {
  /* border: 1px solid red; */
  margin: auto 15px;
}

.itm {
  /* border: 1px solid red; */
  border-bottom: 1px dotted #ccc;
  /* margin: 10px auto; */
  padding: 15px 0;
}

img {
  vertical-align: middle;
}
.head,
img {
  width: 50px;
  height: 50px;
  float: left;
  /* display: block; */
}
.head {
  /* border: 1px solid red; */
}
.maincomments {
  /* border: 1px solid blue; */
  font-size: 14px;
  display: block;
  word-break: break-word;
  overflow: hidden;
  height: 100%;
  padding-left: 10px;
}
.maincomments span {
}
.nohot {
  height: 50%;
  color: #ccccd0;
  /* border: 1px solid red; */
  padding: 20px;
}

/* .MV > button {
  font-family: kaiti;
  margin-right: 30px;
  border: 1px solid #abca68;
  background-color: #abca68;
  width: 100%;
} */
</style>