<template>
  <div class="share">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>闲置分享
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <mu-paper :z-depth="0" class="demo-list-wrap">
        <mu-list>
          <div v-for="(item,index) in postContent" :key="index">
            <mu-list-item avatar button v-ripple class="muse-list" @click="browseShare(item)">
              <mu-list-item-action>
                <mu-avatar>
                  <img v-if="item.headUrl" :src="item.headUrl" />
                  <img v-else src="../assets/images/avatar.png" />
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
              <!-- <mu-list-item-action>
                                <mu-icon value="chat_bubble"></mu-icon>
              </mu-list-item-action>-->
            </mu-list-item>
          </div>
        </mu-list>
      </mu-paper>
      <mu-button fab color="#FF5242" class="create-articles" @click="sharePosts">
        <mu-icon size="28" value="edit"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
import { Dialog } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      size: "36",
      active: 0,
      postContent: []
    };
  },
  created() {
    this.articleQueryAll();
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
    sharePosts() {
      this.$router.push("/sharePosts");
    },
    browseShare(item) {
      this.readNum(item)
      localStorage.setItem("browseShare", JSON.stringify(item));
      this.$router.push("/browseShare");
    },
    //查询所有新闻或公告
    articleQueryAll() {
      this.$axios({
        url: "admin/mobile/article/queryAllByCommunityIdAndCategary",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId"),
          communityId: localStorage.getItem("communityId"),
          category: "3"
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.postContent = result.data.data;
          } else {
            Dialog.alert({
              title: "提示",
              message: result.data.errorMsg
            }).then(() => {
              this.$router.goBack();
              // on close
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    readNum(item) {
      this.$axios({
        url: "admin/mobile/article/addViewByArticleId",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          articleId: item.articleId
        })
      })
        .then(result => {
          if (result.status === 200) {
            
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
.demo-list-wrap {
  width: 100%;
}
.container {
  padding: 0 !important;
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
  margin-top: 10px;
}
.mu-tabs {
  height: 40px !important;
}
.create-articles {
  position: absolute;
  right: 1rem;
  bottom: 2rem;
  /* z-index: 9999; */
}
.muse-list {
  position: relative;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .muse-list:before {
    content: "";
    pointer-events: none; /* 防止点击触发 */
    box-sizing: border-box;
    position: absolute;
    width: 200%;
    height: 200%;
    left: 0;
    top: 0;
    /* border-radius: 8px; */
    border-bottom: 1px solid #dcdcdc;
    -webkit-transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform: scale(0.5);
    transform-origin: 0 0;
  }
}
</style>
