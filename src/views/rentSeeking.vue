<template>
  <div class="leasePark">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>求租车位
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <div class="content-sell">
        <div class="title-text">
          <div class="avats-img">
            <img :src="handImg" alt />
          </div>
          <div class="title-content">{{parkingLot.title}}</div>
          <div class="post-time">{{postTime}}</div>
        </div>
        <p class="textarea-text">{{parkingLot.content}}</p>
        <div class="images" v-for="(item,index) in imageUrls" :key="index">
          <img :src="item" alt />
        </div>
      </div>
      <div class="comment-number">
        <ul class="share">
          <li>
            <mu-icon :size="size" value="visibility" color="#B9B9B9"></mu-icon>
            <p style="display: inline-block">{{browsePerson}}</p>
          </li>
          <li>
            <mu-icon :size="size" value="chat_bubble_outline" color="#B9B9B9" @click="comment"></mu-icon>
            <p style="display: inline-block">{{numberComments}}</p>
          </li>
        </ul>
      </div>
      <div class="partition-line"></div>
      <div class="commentList">
        <ul>
          <li v-for="(item,index) in commData" :key="index">
            <div class="avat-img">
              <img :src="handImg" alt />
            </div>
            <div class="content-comm">
              <p>{{item.name}}</p>
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
    </div>
  </div>
</template>
<script>
import Qs from "qs";
import imgSrc from "../assets/images/avatar.png";
export default {
  data() {
    return {
      size: "25",
      parkingLot: {},
      handImg: "",
      commData: [],
      commeText: "",
      browsePerson: "", // 浏览人数
      numberComments: "",
      imgName: "",
      imageUrls: [],
      postTime: "",
      postId: ""
    };
  },
  created() {
    this.parkingLot = JSON.parse(localStorage.getItem("parkingLot"));
    this.postId = JSON.parse(localStorage.getItem("parkingLot")).id;
    this.postTime = JSON.parse(localStorage.getItem("parkingLot")).createTime.substr(0, 10)
    var obj = JSON.parse(
      JSON.parse(localStorage.getItem("parkingLot")).imgPath
    );
    for (var key in obj) {
      this.imageUrls.push(obj[key]);
    }
    this.handImg = JSON.parse(localStorage.getItem("parkingLot")).handImg;
    this.browsePerson =
      JSON.parse(localStorage.getItem("parkingLot")).browsePerson || 0;
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
    this.getCarportNum()
  },
  mounted() {
    mui.back = function() {
      history.go(-1); //回退到上一页面
    };
  },
  methods: {
    outPage() {
      this.$router.goBack();
    },
    comment() {
      document.getElementById("inputText").focus();
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
          articleId: this.parkingLot.id,
          communityId: localStorage.getItem("communityId")
        }
      })
        .then(result => {
          if (result.data.respCode === "1000") {
            (this.commeText = ""), this.queryComment();
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
          articleId: this.parkingLot.id
        })
      })
        .then(result => {
          if (result.data.respCode === "1000") {
            this.commData = result.data.data;
            this.numberComments = result.data.data.length;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询浏览量
    getCarportNum() {
      this.$axios({
        url: "admin/mobile/carport/getCarportById",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          id: this.postId
        })
      })
        .then(result => {
          if (result.data.respCode === "1000") {
            this.browsePerson = result.data.data.browsePerson
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.leasePark {
  background-color: #fff;
}
.ret-btn {
  display: inline-block;
  color: #fff;
  font-size: 30px;
}
.container-main {
  width: 100%;
  height: calc(100vh - 56px);
  overflow-y: auto;
}
.mu-item-sub-title,
.mu-item-title {
  margin-bottom: 10px;
}

.text-context {
  padding: 0 15px;
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
.title-text {
  clear: both;
  overflow: hidden;
  width: 100%;
  padding: 15px 15px;
  font-size: 20px;
  color: #808080;
  font-weight: 500;
  text-align: left;
  margin: 0 !important;
}
.images {
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  padding: 0 0.36rem;
}
.images img {
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.textarea-text {
  width: 100%;
  text-indent: 20px;
  outline: none;
  padding: 5px 10px;
}
.avats-img {
  float: left;
  width: 20%;
}
.avats-img img {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  background-size: cover;
  border-radius: 50%;
}
.title-content {
  float: left;
  width: 80%;
  font-size: 18px;
  margin-top: 0.6rem;
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
.comment-number {
  width: 100%;
  height: 50px;
}
.share {
  float: right;
  margin-right: 1rem;
}
.comment-number ul li {
  float: left;
}
.comment-number ul li:nth-child(1) {
  margin-right: 10px;
}
.comment-number ul li p {
  margin-top: 2px;
  vertical-align: top;
}
.partition-line {
  width: 100%;
  height: 0.6rem;
  margin-bottom: 0.5rem;
  background-color: #f9f9f9;
}
.time {
  float: right;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
}
.post-time {
  float: right;
  font-weight: normal;
  font-size: 14px;
  margin-top: 0.5rem;
  color: #a4a4a4;
}
</style>
<style>
.leasePark .mu-list-three-line .mu-item {
  height: 70px !important;
  margin-bottom: -13px;
}
</style>
 