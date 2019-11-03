<template>
  <div class="postContent">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>帖子
      <mu-button icon slot="right" @click="openBotttomSheet">
        <mu-icon size="30" value="more_horiz"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <div>
        <div class="content-browse" v-if="activeName == 2">
          <h1 class="title">{{postContent.serviceName}}</h1>
          <p class="textarea-text">{{postContent.seviceDetail}}</p>
          <div class="images" v-for="(item,index) in imageUrls" :key="index">
            <img :src="item" alt />
          </div>
        </div>
        <div class="content-browse" v-else>
          <h1 class="title">{{postContent.title}}</h1>
          <p class="textarea-text">{{postContent.content}}</p>
          <div class="images" v-for="(item,index) in imageUrls" :key="index">
            <img :src="item" alt />
          </div>
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
          <mu-list-item button @click.native="deleteAll">
            <mu-list-item-action>
              <mu-icon value="delete" color="blue"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>删除</mu-list-item-title>
          </mu-list-item>
          <!-- <mu-list-item button>
                        <mu-list-item-action>
                            <mu-icon value="phone_in_talk" color="green"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>投诉</mu-list-item-title>
          </mu-list-item>-->
        </mu-list>
      </mu-bottom-sheet>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      open: false,
      imageUrls: [], // 发帖图片
      postContent: {},
      activeName: ""
    };
  },
  created() {
    this.activeName = localStorage.getItem("activeName");
    console.log(this.activeName)
    if (localStorage.getItem("activeName") == 1) {
      var obj = JSON.parse(JSON.parse(localStorage.getItem("myPost")).imgPath);
      for (var key in obj) {
        this.imageUrls.push(obj[key]);
      }
      this.postContent = JSON.parse(localStorage.getItem("myPost"));
    } else if (localStorage.getItem("activeName") == 2) {
      var obj = JSON.parse(
        JSON.parse(localStorage.getItem("myPost")).imageUrls
      );
      for (var key in obj) {
        this.imageUrls.push(obj[key]);
      }
      this.postContent = JSON.parse(localStorage.getItem("myPost"));
    } else {
      var obj = JSON.parse(
        JSON.parse(localStorage.getItem("myPost")).imageUrls
      );
      for (var key in obj) {
        this.imageUrls.push(obj[key]);
      }
      this.postContent = JSON.parse(localStorage.getItem("myPost"));
    }
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
    openBotttomSheet() {
      this.open = true;
    },
    closeBottomSheet() {
      this.open = false;
    },
    editPost() {
      this.$router.push("/editPost");
      this.$store.dispatch("ARTICLE_CONTENT", this.postContent);
    },
    //删除
    deleteAll() {
      if (localStorage.getItem("activeName") == 0) {
        this.deleteArticle();
      } else if (localStorage.getItem("activeName") == 1) {
        this.deleteCar();
      }
    },
    // 删除家事讨论帖子
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
              articleId: this.postContent.articleId
            })
          })
            .then(result => {
              if (result.data.respCode == "1000") {
                this.$router.goBack();
                this.$toast({
                  message: "删除成功",
                  position: "middle",
                  duration: 1500
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    // 删除车位分享帖子
    deleteCar() {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(({ result }) => {
        if (result) {
          this.$axios({
            url: "admin/mobile/carport/deleteCarportById",
            method: "post",
            headers: {
              Authorization: sessionStorage.getItem("token")
            },
            data: Qs.stringify({
              id: this.postContent.id
            })
          })
            .then(result => {
              if (result.data.respCode == "1000") {
                this.$router.goBack();
                 this.$toast({
                  message: "删除成功",
                  position: "middle",
                  duration: 1500
                });
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
.title {
  width: 100%;
  padding: 15px 15px;
  background-color: rgb(204, 204, 204, 0.3);
  text-align: left;
  margin: 0 !important;
}
.textarea-text {
  padding: 0 5px;
  text-indent: 25px;
  font-size: 18px;
  margin: 10px;
}
.images {
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  /* overflow: hidden; */
  padding: 0 0.36rem;
}
.images img {
  /* position: absolute; */
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>