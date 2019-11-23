<template>
  <div class="contentApplication">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>报修内容
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <mu-container>
        <mu-row gutter>
          <mu-col span="12">
            <mu-paper :z-depth="0">
              <mu-list>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      业主：
                      <span>{{content.userRealName}}</span>
                    </mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      手机：
                      <span>{{content.userPhone}}</span>
                    </mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      社区：
                      <span>{{content.communityName}}</span>
                    </mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      位置：
                      <span>{{title}}</span>
                    </mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      事项：
                      <span>{{processName}}</span>
                    </mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      描述：
                      <span>{{content.detail}}</span>
                    </mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      状态：
                      <span>{{content.status}}</span>
                    </mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      上门时间：
                      <span>{{content.serviceDate}}</span>
                    </mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      逗留时间：
                      <span>{{stayTime}}</span>
                    </mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
              </mu-list>
            </mu-paper>
          </mu-col>
        </mu-row>
      </mu-container>
      <mu-flex justify-content="center" class="evaluatebtn">
        <span v-if="type == 0"></span>
        <van-button v-else type="danger" @click="openFullscreenDialog" style="font-size: 16px">评价</van-button>
      </mu-flex>
      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
        <mu-appbar title="报修评价" color="#ff5242">
          <mu-button slot="left" icon @click="closeFullscreenDialog">
            <mu-icon value="close"></mu-icon>
          </mu-button>
          <mu-button slot="right" style="font-size: 16px" flat @click="updateUserWorkflowInfo">发表</mu-button>
        </mu-appbar>
        <div>
          <div class="partition-line"></div>
          <mu-container>
            <mu-row gutter>
              <mu-col span="12">
                <mu-paper :z-depth="0">
                  <mu-list>
                    <mu-list-item>
                      <mu-list-item-content>
                        <mu-list-item-title>
                          维修人员：
                          <span>{{content.repairsName}}</span>
                        </mu-list-item-title>
                      </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider shallow-inset></mu-divider>
                    <mu-list-item>
                      <mu-list-item-content>
                        <mu-list-item-title>
                          维修人员号码：
                          <span>{{content.repairsPhone}}</span>
                        </mu-list-item-title>
                      </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider shallow-inset></mu-divider>
                    <mu-list-item>
                      <mu-list-item-content>
                        <mu-list-item-title>
                          维修完成时间：
                          <span>{{content.repairsTime}}</span>
                        </mu-list-item-title>
                      </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider shallow-inset></mu-divider>
                  </mu-list>
                </mu-paper>
              </mu-col>
            </mu-row>
          </mu-container>
          <div class="evaluate">
            <div class="evaluate-title">报修评价</div>
            <div style="margin-top: 20px">
              <mu-container>
                <mu-form :model="form" class="mu-demo-form" label-width="100">
                  <mu-form-item prop="textarea">
                    <mu-text-field
                      placeholder="用户意见"
                      multi-line
                      :rows="1"
                      :rows-max="6"
                      v-model="form.userOpinion"
                    ></mu-text-field>
                  </mu-form-item>
                </mu-form>
              </mu-container>
            </div>
            <ul>
              <li>
                <span style="display: inline-block;float: left;margin-top: 5px">星级评价</span>
                <span>
                  <van-rate
                    style="display: inline-block;margin-left: 20px"
                    v-model="form.starType"
                    size="25"
                    color="#f44"
                    void-icon="star"
                    void-color="#eee"
                  />
                </span>
                <span
                  style="float: right;margin-right: 60px;margin-top: 4px"
                  v-if="form.starType == 1"
                >非常差</span>
                <span
                  style="float: right;margin-right: 60px;margin-top: 4px"
                  v-else-if="form.starType == 2"
                >差</span>
                <span
                  style="float: right;margin-right: 60px;margin-top: 4px"
                  v-else-if="form.starType == 3"
                >一般</span>
                <span
                  style="float: right;margin-right: 60px;margin-top: 4px"
                  v-else-if="form.starType == 4"
                >好</span>
                <span
                  style="float: right;margin-right: 60px;margin-top: 4px"
                  v-else-if="form.starType == 5"
                >非常好</span>
              </li>
            </ul>
          </div>
        </div>
      </mu-dialog>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
import { Dialog } from "vant";
export default {
  data() {
    return {
      good: "",
      openFullscreen: false,
      content: "",
      title: "",
      processName: "",
      type: "",
      form: {
        userId: sessionStorage.getItem("userId"),
        communityId: localStorage.getItem("communityId"),
        userOpinion: "",
        type: "2",
        id: JSON.parse(localStorage.getItem("process")).id,
        starType: 0,
      },
      stayTime: ""
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  created() {
    this.getUserInfo(JSON.parse(localStorage.getItem("process")).id);
    this.type = JSON.parse(localStorage.getItem("process")).type;
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
    openFullscreenDialog() {
      this.openFullscreen = true;
    },
    closeFullscreenDialog() {
      this.openFullscreen = false;
    },
    // 用户评价
    updateUserWorkflowInfo() {
      this.$axios({
        url: "admin/mobile/processCheck/updateUserWorkflowInfo",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify(this.form)
      })
        .then(result => {
          if (result.status === 200) {
            if (result.data.respCode == "1000") {
              this.openFullscreen = false;
              this.$toast("评论成功");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取用户信息
    getUserInfo(id) {
      this.$axios({
        url: "admin/mobile/repairs/findRepairsById",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          id: id
        })
      })
        .then(result => {
          if (result.data.respCode == "1000") {
            this.content = result.data.data;
            this.title = result.data.data.location;
            this.processName = result.data.data.repairsType;
            setInterval(() => {
              this.nowTimeStr();
                let minutes = this.GetDateDiff(
                  result.data.data.createTime,
                  this.timer,
                  "minute"
                );
                this.stayTime = Math.floor(minutes / 60) + "小时" + (minutes % 60) + "分"
                // this.$set(
                //   this.listTable[i],
                //   "endTime",
                //   Math.floor(minutes / 60) + "小时" + (minutes % 60) + "分"
                // );
            }, 0);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    nowTimeStr() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      var timestr =
        year + "-" + month + "-" + day + "- " + h + ":" + m + ":" + s;
      this.timer = timestr;
    },
    GetDateDiff(startTime, endTime, diffType) {
      //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
      startTime = startTime.replace(/\-/g, "/");
      endTime = endTime.replace(/\-/g, "/");
      //将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase();
      var sTime = new Date(startTime); //开始时间
      var eTime = new Date(endTime); //结束时间
      //作为除数的数字
      var timeType = 1;
      switch (diffType) {
        case "second":
          timeType = 1000;
          break;
        case "minute":
          timeType = 1000 * 60;
          break;
        case "hour":
          timeType = 1000 * 3600;
          break;
        case "day":
          timeType = 1000 * 3600 * 24;
          break;
        default:
          break;
      }
      return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
    }
  }
};
</script>
<style scoped>
.contentApplication {
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
.partition-line {
  width: 100%;
  height: 0.6rem;
  background-color: #f4f4f4;
}
.evaluate-title {
  margin-top: 0.3rem;
  font-size: 14px;
}
.evaluate {
  padding: 0 0.8rem;
}
.evaluate ul {
  padding-left: 0 !important;
}
.evaluate ul li {
  width: 100%;
  height: 40px;
}
.evaluate ul li:nth-child(1) {
  margin-top: 0.8rem;
}
.textarea-evaluate {
  width: 100%;
  border-bottom: 1px solid #333;
}
.container {
  padding: 0 !important;
}
.evaluatebtn {
  padding: 0 0.5rem;
  margin-top: 0.6rem;
}
</style>
