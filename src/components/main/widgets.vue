<template>
  <div class="header">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="openBotttomSheet">
        <mu-icon value="menu" @click="open = !open"></mu-icon>
      </mu-button>
      {{community}}
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <div class="content">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item
            class="swipe"
            @click="swipeImg(item)"
            v-for="(item,index) in imagesData"
            :key="index"
          >
            <img :src="item.path" />
          </van-swipe-item>
        </van-swipe>
        <div class="flex-box" v-ripple @click="applyRepair">
          <mu-icon size="50" value="build" color="#ff5242"></mu-icon>
          <div class="text">报修申请</div>
        </div>
        <div class="flex-box" v-ripple @click="familyDiscussion">
          <mu-icon size="50" value="location_city" color="#ff5242"></mu-icon>
          <div class="text">家事讨论</div>
        </div>
        <div class="flex-box" v-ripple @click="propertyPay">
          <mu-icon size="50" value="account_circle" color="#ff5242"></mu-icon>
          <div class="text">物业缴费</div>
        </div>
      </div>
      <div class="content">
        <div class="flex-box" v-ripple @click="parkingLot">
          <mu-icon size="50" value="local_parking" color="#ff5242"></mu-icon>
          <div class="text">车位分享</div>
        </div>
        <div class="flex-box" v-ripple @click="share">
          <mu-icon size="50" value="local_see" color="#ff5242"></mu-icon>
          <div class="text">闲置分享</div>
        </div>
        <div class="flex-box" v-ripple @click="loveBank">
          <mu-icon class="icon-explain" size="50" value="local_shipping" color="#ff5242"></mu-icon>
          <div class="text">爱心银行</div>
        </div>
      </div>
      <div class="partition-line">
        <mu-flex class="flex-wrapper" justify-content="start">
          <mu-flex class="flex-demo partition" justify-content="center"></mu-flex>
        </mu-flex>
      </div>
      <div class="hot-tip">
        <mu-flex class="flex-wrapper" justify-content="start">
          <mu-flex class="flex-demo hot-more" justify-content="center">
            <span class="hotspot">
              <i class="vertical-line"></i>近期热点
            </span>
            <span class="more">更多></span>
          </mu-flex>
        </mu-flex>
      </div>
      <div class="hot-info">
        <ul>
          <li class="muse-list">
            <span>通知：</span>
            <span>今日海尚菊园小区20：30~明日01：30停水检修。</span>
          </li>
          <li class="muse-list">
            <span>信息：</span>
            <span>今日海尚菊园小区20：30~明日01：30停水检修。</span>
          </li>
          <li class="muse-list">
            <span>提醒：</span>
            <span>今日海尚菊园小区20：30~明日01：30停水检修。</span>
          </li>
        </ul>
      </div>
      <mu-bottom-sheet :open.sync="open" style="height: 250px;overflow: auto">
        <mu-list @item-click="closeBottomSheet">
          <mu-sub-header>选择社区</mu-sub-header>
          <mu-list-item
            button
            v-for="(item,index) in communData"
            :key="index"
            @click.native="selectComm(item.name,item.id)"
          >
            <mu-list-item-action>
              <mu-icon value="grade" color="orange"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{item.name}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
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
      docked: false,
      open: false,
      position: "left",
      imagesData: [],
      advertisement: [],
      community: localStorage.getItem("myCommunity"),
      communData: [], // 所有社区的集合
      pageSize: 10,
      currentPage: 1
    };
  },
  created() {
    this.getCommunity();
    this.getAdvertiseByCommunity();
  },
  mounted() {
    // document.addEventListener("plusready", this.plusReady());
    //首页返回键处理
    //处理逻辑：1秒内，连续两次按返回键，则退出应用；
    var first = null;
    mui.back = function() {
      //首次按键，提示 再按一次退出应用
      if (!first) {
        first = new Date().getTime(); //记录第一次按下回退键的时间
        mui.toast("再按一次退出社区"); //给出提示
        // history.go(-1); //回退到上一页面
        setTimeout(function() {
          //1s中后清除
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          //如果两次按下的时间小于1s，
          plus.runtime.quit(); //那么就退出app
        }
      }
    };
  },
  methods: {
    swipeImg(item) {
      for (let i = 0; i < this.advertisement.length; i++) {
        for (
          let j = 0;
          j < JSON.parse(this.advertisement[i].imgs).length;
          j++
        ) {
          if (item.name == JSON.parse(this.advertisement[i].imgs)[j].name) {
            localStorage.setItem(
              "advertisement",
              JSON.stringify(this.advertisement[i])
            );
          }
        }
      }
      this.$router.push("/advertisement");
    },
    selectComm(name, id) {
      this.community = name;
      localStorage.setItem("myCommunity", name);
      localStorage.setItem("communityId", id);
      this.imagesData = [];
      this.getAdvertiseByCommunity();
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    //查询所有新闻或公告
    articleFamilyQueryAll() {
      this.$axios({
        url: "admin/mobile/article/queryAllByCommunityIdAndCategary",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId"),
          communityId: localStorage.getItem("communityId"),
          category: "2"
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.$router.push("/familyD");
            // this.postContent = result.data.data;
          } else {
            Dialog.confirm({
              title: "标题",
              confirmButtonText: "去认证",
              confirmButtonColor: "#ff5242",
              message: result.data.errorMsg
            })
              .then(() => {
                this.$router.push("/authentication");
                // on confirm
              })
              .catch(() => {
                // on cancel
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
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
            this.$router.push("/share");
          } else {
            Dialog.confirm({
              title: "标题",
              confirmButtonText: "去认证",
              confirmButtonColor: "#ff5242",
              message: result.data.errorMsg
            })
              .then(() => {
                this.$router.push("/authentication");
                // on confirm
              })
              .catch(() => {
                // on cancel
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 爱心大厅
    queryAllTask() {
      this.$axios({
        url: "admin/mobile/welfare/queryAllTask",
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
            this.$router.push("/loveBank");
          } else {
            Dialog.confirm({
              title: "标题",
              confirmButtonText: "去认证",
              confirmButtonColor: "#ff5242",
              message: result.data.errorMsg
            })
              .then(() => {
                this.$router.push("/authentication");
                // on confirm
              })
              .catch(() => {
                // on cancel
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取出租车位信息
    getAll() {
      this.$axios({
        url: "admin/mobile/carport/getAll",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId"),
          communityId: localStorage.getItem("communityId"),
          type: "1"
        })
      })
        .then(result => {
          if (result.data.respCode == "1000") {
            this.$router.push("/parkingLot");
          } else {
            Dialog.confirm({
              title: "标题",
              confirmButtonText: "去认证",
              confirmButtonColor: "#ff5242",
              message: result.data.errorMsg
            })
              .then(() => {
                this.$router.push("/authentication");
                // on confirm
              })
              .catch(() => {
                // on cancel
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取所有社区
    getCommunity() {
      this.$axios({
        url: "admin/mobile/communityMessage/list",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          page: this.currentPage,
          limit: this.pageSize,
          name: "",
          cityName: ""
        })
      })
        .then(result => {
          this.communData = result.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取广告数据
    getAdvertiseByCommunity() {
      this.$axios({
        url: "admin/mobile/advertise/getAdvertiseByCommunity",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          communityId: localStorage.getItem("communityId")
        })
      })
        .then(result => {
          this.advertisement = result.data.data;
          for (let i = 0; i < result.data.data.length; i++) {
            for (
              let j = 0;
              j < JSON.parse(result.data.data[i].imgs).length;
              j++
            ) {
              this.imagesData.push(JSON.parse(result.data.data[i].imgs)[j]);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    plusReady() {
      // 监听“返回”按钮事件
      var first = null;
      plus.key.addEventListener("backbutton", function() {
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
          first = new Date().getTime();
          // plus.nativeUI.alert("再按一次退出应用");
          plus.nativeUI.toast(
            '<font style="font-size:14px">再按一次返回键退出</font>',
            {
              type: "richtext",
              duration: "long",
              richTextStyle: { align: "center" }
            }
          );
          setTimeout(function() {
            plus.nativeUI.closeToast();
          }, 500);
          setTimeout(function() {
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) {
            plus.runtime.quit();
            // plus.nativeUI.alert("退出成功");
          }
        }
      }); // 在这里调用plus api
    },
    //获取用户申请中的
    getUserApplyWorkflowInfo() {
      this.$axios({
        url: "admin/mobile/processCheck/getUserApplyWorkflowInfo",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          communityId: localStorage.getItem("communityId"),
          status: "0",
          userId: sessionStorage.getItem("userId")
        })
      })
        .then(result => {
          if (result.data.respCode === "1000") {
            this.$router.push("/applyRepair");
          } else {
            Dialog.confirm({
              title: "标题",
              confirmButtonText: "去认证",
              confirmButtonColor: "#ff5242",
              message: result.data.errorMsg
            })
              .then(() => {
                this.$router.push("/authentication");
                // on confirm
              })
              .catch(() => {
                // on cancel
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    familyDiscussion() {
      this.articleFamilyQueryAll();
    },
    propertyPay() {
      this.$router.push("/propertyPay");
    },
    loveBank() {
      localStorage.setItem("active3", 0);
      this.queryAllTask();
    },
    share() {
      this.articleQueryAll();
    },
    applyRepair() {
      this.getUserApplyWorkflowInfo();
    },
    parkingLot() {
      localStorage.setItem("active4", 0);
      this.getAll();
    }
  }
};
</script>
<style scoped>
.flex-wrapper {
  width: 100%;
}
.partition {
  height: 12px;
}
.flex-demo {
  width: 100%;
  background-color: #f7f7f9;
}
.header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
}
.fast-register {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #ff5242;
  font-size: 18px;
  color: #fff;
}
.ret-btn {
  display: inline-block;
  position: absolute;
  left: 10px;
  top: 3px;
  color: #fff;
  font-size: 30px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.iconfont {
  font-size: 30px;
  color: #ff5242;
}
.container-main {
  width: 100%;
  height: calc(100vh - 112px);
  overflow-y: scroll;
}
.content {
  width: 100%;
}
.flex-box {
  width: 33.3%;
  float: left;
  text-align: center;
  padding: 1.5vh 0;
}
.column {
  margin-top: 16vh;
  margin-bottom: 10vh;
}
.hotspot {
  float: left;
  font-size: 14px;
  font-weight: 700;
  margin-left: 20px;
}
.more {
  float: right;
  font-size: 16px;
  text-align: right;
  padding-right: 15px;
}
.hot-tip {
  margin-top: 15px;
}
.hot-more {
  background-color: #fff;
}
.vertical-line {
  display: inline-block;
  width: 4px;
  height: 20px;
  margin-right: 10px;
  background-color: #ff5242;
  vertical-align: top;
}
.hot-info {
  width: 100%;
}
.hot-info ul {
  width: 100%;
  padding-left: 0;
}
.hot-info ul li {
  width: 100%;
  padding: 15px 0px 15px 15px;
  /* border-bottom: 1px solid #ccc; */
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
.swipe img {
  display: inline-block;
  width: 100%;
  height: 9.5rem;
}
</style>
