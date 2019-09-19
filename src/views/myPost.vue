<template>
  <div class="myPost">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>我的帖子
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="add"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <van-tabs v-model="activeName">
        <van-tab title="家事讨论" name="a">
          <mu-list>
            <div v-for="(item,index) in postContent" :key="index">
              <mu-list-item
                avatar
                class="word-list muse-list"
                v-ripple
                @click.native="browsePost(item)"
              >
                <mu-list-item-action>
                  <mu-avatar :size="size">
                    <img :src="item.headUrl" />
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>{{item.title}}</mu-list-item-title>
              </mu-list-item>
            </div>
          </mu-list>
        </van-tab>
        <van-tab title="车位分享" name="b">
          <mu-list>
            <div v-for="(item,index) in vehicleData" :key="index">
              <mu-list-item
                avatar
                class="word-list muse-list"
                v-ripple
                @click.native="browsePost(item)"
              >
                <mu-list-item-action>
                  <mu-avatar :size="size">
                    <img :src="item.handImg" />
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>{{item.title}}</mu-list-item-title>
              </mu-list-item>
            </div>
          </mu-list>
        </van-tab>
        <van-tab title="闲置分享" name="c">
          <mu-list>
            <div v-for="(item,index) in shareData" :key="index">
              <mu-list-item
                avatar
                class="word-list muse-list"
                v-ripple
                @click.native="browsePost(item)"
              >
                <mu-list-item-action>
                  <mu-avatar :size="size">
                    <img :src="item.handImg" />
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>{{item.title}}</mu-list-item-title>
              </mu-list-item>
            </div>
          </mu-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      postContent: [],
      size: "36",
      activeName: "a",
      vehicleData: [],
      shareData: []
    };
  },
  created() {
    this.articleQueryAll();
    this.getCarData();
    this.getIdleShare();
    this.activeName = localStorage.getItem("activeName");
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
    browsePost(item) {
      localStorage.setItem("myPost", JSON.stringify(item));
      localStorage.setItem("activeName", this.activeName);
      this.$router.push("/postContent");
    },
    //查询本人发布的家事讨论的帖子
    articleQueryAll() {
      this.$axios({
        url: "admin/mobile/article/queryByAuthorId",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          authorId: sessionStorage.getItem("userId"),
          communityId: localStorage.getItem("communityId")
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.postContent = result.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询本人发布的闲置分享
    getIdleShare() {
      this.$axios({
        url: "admin/mobile/article/queryAllByCommunityIdAndCategary",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId"),
          communityId: localStorage.getItem("communityId")
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.shareData = result.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询本人发布的车位分享
    getCarData() {
      this.$axios({
        url: "admin/mobile/carport/getAll",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId"),
          communityId: localStorage.getItem("communityId")
          //   type: "1"
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.vehicleData = result.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    //查询本人发布的闲置分享
    // articleQueryAll() {
    //     this.$axios({
    //         url: "admin/mobile/article/queryByAuthorId",
    //         method: "post",
    //         headers: {
    //             Authorization: sessionStorage.getItem("token")
    //         },
    //         data: Qs.stringify({
    //             authorId: sessionStorage.getItem("userId"),
    //             communityId: localStorage.getItem("communityId")
    //         })
    //     })
    //         .then(result => {
    //             if (result.data.respCode == 1000) {
    //                 this.postContent = result.data.data;
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }
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