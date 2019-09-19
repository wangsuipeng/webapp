<template>
  <div class="browse">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>闲置分享
      <mu-button icon slot="right" @click="openBotttomSheet">
        <mu-icon size="30" value="more_horiz"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <div class="content-browse">
        <h2 class="title-text">{{postContent.title}}</h2>
        <p class="textarea-text">{{postContent.content}}</p>
        <div class="images" v-for="(item,index) in imageUrls" :key="index">
          <img :src="item" alt />
        </div>
      </div>
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo reading-volume" fill></mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>
          <ul class="share">
            <li @click="giveThumbs">
              <mu-icon :size="size" value="favorite_border" color="#B9B9B9"></mu-icon>
              <p style="display: inline-block">{{praiseNum}}</p>
            </li>
            <li>
              <mu-icon :size="size" value="chat_bubble_outline" color="#B9B9B9" @click="comment"></mu-icon>
              <p style="display: inline-block">90</p>
            </li>
            <!-- <li>
                            <mu-icon :size="size" value="share" color="#B9B9B9"></mu-icon>
                            <p>105</p>
            </li>-->
          </ul>
        </mu-flex>
      </mu-flex>
      <mu-flex class="content-line" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center"></mu-flex>
      </mu-flex>
      <div class="commentList">
        <ul>
          <li v-for="(item,index) in commData" :key="index">
            <div class="avat-img">
              <img :src="avatarImag" alt />
            </div>
            <div class="content-comm">
              <p>科比</p>
              <p>{{item.content}}</p>
              <div class="time">{{(item.createdAt).substr(0,19)}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="comment">
        <div class="avatia">
          <img :src="imgName" alt />
        </div>
        <div class="comment-text">
          <input type="text" placeholder="评论" v-model="commeText" id="inputText" />
          <span @click="addComment">发送</span>
        </div>
      </div>
      <mu-bottom-sheet :open.sync="open" overlay-close>
        <mu-list @close="closeBottomSheet">
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="create" color="orange"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title @click="editPost">编辑</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click.native="deleteArticle">
            <mu-list-item-action>
              <mu-icon value="delete" color="blue"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>删除</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="phone_in_talk" color="green"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>投诉</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
import imgSrc from "../assets/images/avatar.png";
export default {
  data() {
    return {
      open: false,
      number: "9999",
      size: "25",
      postContent: {},
      articleId: "", // 文章id
      loveBool: true,
      isloveBool: false,
      praiseNum: "0",
      imageUrls: [], // 发帖图片
      avatarImag: "",
      commeText: "", // 评论内容
      commData: [],
      imgName: ""
    };
  },
  created() {
    // this.sharingContent = JSON.parse(localStorage.getItem("browseShare"));
    // var obj = JSON.parse(JSON.parse(localStorage.getItem("browseShare")).imageUrls);
    // for (var key in obj) {
    //     this.imageUrls.push(obj[key])
    // }
    this.avatarImag = JSON.parse(localStorage.getItem("browseShare")).headUrl;
    var obj = JSON.parse(
      JSON.parse(localStorage.getItem("browseShare")).imageUrls
    );
    for (var key in obj) {
      this.imageUrls.push(obj[key]);
    }
    this.postContent = JSON.parse(localStorage.getItem("browseShare"));
    this.praiseNum =
      JSON.parse(localStorage.getItem("browseShare")).praiseNum || 0;
    this.queryComment();
    if (
      localStorage.getItem("handImgId") == "" ||
      localStorage.getItem("handImgId") == null
    ) {
      this.imgName = imgSrc;
    } else {
      this.imgName =
        "http://103.26.76.116:9999/" +
        "admin/welfare/sysFile/showPicForMany?id=" +
        localStorage.getItem("handImgId");
    }
  },
  mounted() {
    mui.back = function() {
      history.go(-1); //回退到上一页面
    };
  },
  methods: {
    comment() {
      document.getElementById("inputText").focus();
    },
    editPost() {
      this.$router.push("/editPost");
      this.$store.dispatch("ARTICLE_CONTENT", this.postContent);
    },
    outPage() {
      this.$router.goBack();
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    // 发表评论
    addComment() {
      this.$axios({
        url: "admin/mobile/article/addComment",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json;charset=utf8"
        },
        data: {
          content: this.commeText,
          userId: sessionStorage.getItem("userId"),
          articleId: this.postContent.articleId,
          communityId: localStorage.getItem("communityId")
        }
      })
        .then(result => {
          if (result.data.respCode === "1000") {
            this.commeText = "";
            this.queryComment();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询评论
    queryComment() {
      this.$axios({
        url: "admin/mobile/article/queryComment",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          articleId: this.postContent.articleId
        })
      })
        .then(result => {
          if (result.data.respCode === "1000") {
            this.commData = result.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点赞文章
    giveThumbs() {
      this.$axios({
        url: "admin/mobile/article/addPraiseNum",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId"),
          articleId: this.postContent.articleId
        })
      })
        .then(result => {
          if (result.data.respCode === "1000") {
            this.praiseNum = result.data.data.praiseNum;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除帖子
    deleteArticle() {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(({ result }) => {
        if (result) {
          this.$axios({
            url: "admin/mobile/article/deleteArticleByArticleId",
            method: "post",
            headers: {
              Authorization: sessionStorage.getItem("token")
            },
            data: Qs.stringify({
              articleId: this.articleId
            })
          })
            .then(result => {
              if (result.status === 200) {
                if (result.data.respCode == 1000) {
                  this.$router.push("/familyD");
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
.browse {
  background-color: #fff;
}
.container-main {
  width: 100%;
  height: calc(100vh - 126px);
  overflow-y: auto;
}
.flex-wrapper {
  width: 100%;
  height: 56px;
  margin-top: 8px;
}
.reading-volume {
  line-height: 40px;
  padding-left: 10px;
  color: #808080;
  font-size: 18px;
}
.flex-demo {
  width: 200px;
  height: 32px;
  text-align: center;
  margin-left: 8px;
}
.flex-wrapper:first-child {
  margin-top: 0;
}
.flex-demo:first-child {
  margin-left: 0;
}
.ret-btn {
  display: inline-block;
  color: #fff;
  font-size: 30px;
}
.title-text {
  width: 100%;
  padding: 15px 15px;
  background-color: rgb(204, 204, 204, 0.3);
  text-align: left;
  margin: 0 !important;
}
.text {
  padding: 0 5px;
  text-indent: 25px;
  font-size: 18px;
  margin: 10px;
}
.images {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
}
.images img {
  /* position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto; */
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.share li {
  position: relative;
  float: left;
  margin-left: 1.8rem;
}
.share li:nth-child(1) p {
  display: inline-blick;
  position: absolute;
  top: 3px;
  left: 30px;
}
.share li:nth-child(2) p {
  display: inline-blick;
  position: absolute;
  top: 3px;
  left: 30px;
}
.textarea-text {
  width: 100%;
  /* min-height: 15rem; */
  text-indent: 20px;
  outline: none;
  padding: 5px 10px;
}
.comment {
  width: 100%;
  border-top: 0.5px solid #e9e9e9;
  background-color: #fff;
  position: fixed;
  line-height: 0 !important;
  padding: 2.8%;
  bottom: 0;
  left: 0;
}
.avatia {
  float: left;
  width: 10%;
}
.comment-text {
  float: left;
  width: 90%;
}
.comment img {
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.comment input {
  display: block;
  width: 98%;
  height: 2rem;
  border-radius: 1.25rem;
  margin-left: 0.4rem;
  background-color: #fefbfa;
  border: 1px solid #e9e9e9;
  /* box-shadow:inset 0 0 2px 2px #E9E9E9; */
  border-color: #e9e9e9;
  /* outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #e9e9e9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #e9e9e9; */
  padding-left: 0.5rem;
  padding-right: 2.7rem;
  position: relative;
  background-color: white;
  caret-color: red;
}
.comment input:after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #d9d9d9;
  content: " ";
  display: block;
  transform: scaley(0.5);
}
.comment span {
  display: inline-block;
  position: absolute;
  color: red;
  top: 1.6rem;
  right: 1.6rem;
  font-weight: 600;
}
.content-line {
  margin-bottom: 10px;
}
.content-line .flex-demo {
  width: 100%;
  background-color: #f9f9f9;
  height: 0.5rem;
}
.avat-img {
  display: inline-block;
  width: 15%;
  vertical-align: top;
}
.avat-img img {
  margin-top: 3px;
  margin-left: 10px;
  display: inline-block;
  width: 2rem;
  height: 2rem;

  border-radius: 50%;
}
.content-comm {
  padding: 8px;
  display: inline-block;
  width: 82%;
  border-radius: 1rem;
  background-color: #f1f1f1;
}
.content-comm p {
  margin-bottom: 0 !important;
}
.content-comm p:nth-child(1) {
  color: #474747;
  font-weight: bold;
}
.content-comm p:nth-child(2) {
  color: #474747;
}
.commentList ul {
  padding-left: 0 !important;
}
.commentList ul li {
  margin-bottom: 8px;
}
.time {
  float: right;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
}
</style>
