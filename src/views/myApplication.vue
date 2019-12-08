<template>
  <div class="myApplication">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>报修申请
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <!-- <van-collapse v-model="activeNames">
        <van-collapse-item title="我的申请" name="1">
          <mu-list>
            <mu-list-item
              avatar
              button
              v-ripple
              class="muse-list"
              v-for="(item,index) in postContent"
              :key="index"
              @click="contentApplication(item,'1')"
            >
              <mu-list-item-title>{{item.repairsType}}</mu-list-item-title>
              <mu-list-item-action>
                <span>状态：{{item.status}}</span>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </van-collapse-item>
        <van-collapse-item title="我的处理" name="2">
          <mu-list>
            <mu-list-item
              avatar
              button
              v-ripple
              class="muse-list"
              v-for="(item,index) in detailWorkflowData"
              :key="index"
              @click="workApply(item.id,'2')"
            >
              <mu-list-item-title>{{item.repairsType}}</mu-list-item-title>
              <mu-list-item-action>
                <span>状态：{{item.status}}</span>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </van-collapse-item>
      </van-collapse> -->
      <van-tabs v-model="active" sticky>
          <van-tab title="房屋报修">
            <div class="content-apply list-content">
              <div class="muse-list" v-for="(item,index) in postContent" :key="index"  @click="repairProcess(item)">
                <div class="repair-title">
                  <img src="../assets/images/325543.jpg" alt="">
                  <span>爱奔跑的女孩</span>
                </div>
                <div class="current-content">
                  <ul>
                    <li>
                      报修位置：
                      <span>{{item.userRealName}}</span>
                    </li>
                    <li>
                      报修人手机：
                      <span>{{item.userPhone}}</span>
                    </li>
                    <li>
                      可上门维修时间：
                      <span>{{item.createTime}}</span>
                    </li>
                    <li>
                      报修时间：
                      <span>{{item.createTime}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="电力报修">
            <div class="content-apply list-content">
              <div class="muse-list" v-for="(item,index) in postContent" :key="index"  @click="repairProcess(item)">
                <div class="repair-title">
                  <img src="../assets/images/325543.jpg" alt="">
                  <span>爱奔跑的女孩</span>
                </div>
                <div class="current-content">
                  <ul>
                    <li>
                      报修位置：
                      <span>{{item.userRealName}}</span>
                    </li>
                    <li>
                      报修人手机：
                      <span>{{item.userPhone}}</span>
                    </li>
                    <li>
                      可上门维修时间：
                      <span>{{item.createTime}}</span>
                    </li>
                    <li>
                      报修时间：
                      <span>{{item.createTime}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="煤气报修">
            <div class="content-apply list-content">
              <div class="muse-list" v-for="(item,index) in postContent" :key="index"  @click="repairProcess(item)">
                <div class="repair-title">
                  <img src="../assets/images/325543.jpg" alt="">
                  <span>爱奔跑的女孩</span>
                </div>
                <div class="current-content">
                  <ul>
                    <li>
                      报修位置：
                      <span>{{item.userRealName}}</span>
                    </li>
                    <li>
                      报修人手机：
                      <span>{{item.userPhone}}</span>
                    </li>
                    <li>
                      可上门维修时间：
                      <span>{{item.createTime}}</span>
                    </li>
                    <li>
                      报修时间：
                      <span>{{item.createTime}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="供水报修">
            <div class="content-apply list-content">
              <div class="muse-list" v-for="(item,index) in postContent" :key="index"  @click="repairProcess(item)">
                <div class="repair-title">
                  <img src="../assets/images/325543.jpg" alt="">
                  <span>爱奔跑的女孩</span>
                </div>
                <div class="current-content">
                  <ul>
                    <li>
                      报修位置：
                      <span>{{item.userRealName}}</span>
                    </li>
                    <li>
                      报修人手机：
                      <span>{{item.userPhone}}</span>
                    </li>
                    <li>
                      可上门维修时间：
                      <span>{{item.createTime}}</span>
                    </li>
                    <li>
                      报修时间：
                      <span>{{item.createTime}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
      activeNames: ['1'],
      active: 0,
      postContent: [],
      detailWorkflowData: []
    };
  },
  created() {
    this.activeNames.splice(0,1,sessionStorage.getItem("activeNames")) || ['1']
    console.log(this.activeNames)
    this.getUserApplyWorkflowInfo();
    this.getUserDetailWorkflow();
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
    contentApplication(item,id) {
      sessionStorage.setItem("activeNames",id)
      localStorage.setItem("process", JSON.stringify(item));
      this.$router.push("/contentApplication");
    },
    workApply(item,id) {
      sessionStorage.setItem("activeNames",id)
      localStorage.setItem("processId", item);
      this.$router.push("/workApply");
    },
    repairProcess(item) {
      localStorage.setItem("repairProcess", JSON.stringify(item));
      this.$router.push("/repairProcess");
    },
    //获取我的申请
    getUserApplyWorkflowInfo() {
      this.$axios({
        url: "admin/mobile/repairs/findRepairs",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId"),
          communityId: localStorage.getItem("communityId"),
          page: 1,
          limit: 1000
        })
      })
        .then(result => {
            if (result.data.respCode == "1000") {
              this.postContent = result.data.data.list;
            }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取工作人员处理的流程
    getUserDetailWorkflow() {
      this.$axios({
        url: "admin/mobile/repairs/findRepairs",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId"),
          communityId: localStorage.getItem("communityId"),
          page: 1,
          limit: 1000
        })
      })
        .then(result => {
          if (result.status === 200) {
            if (result.data.respCode == "1000") {
              this.detailWorkflowData = result.data.data.list;
            }
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
.ret-btn {
  display: inline-block;
  color: #fff;
  font-size: 30px;
}
.muse-list {
  position: relative;
}
.container-main {
  width: 100%;
  height: calc(100vh - 56px);
  overflow-y: auto;
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
.content-apply {
  width: 100%;
  height: calc(100vh - 106px);
  overflow-y: auto;
}
.repair-title {
  position: relative;
  padding-left: 0.5rem;
  font-weight: 700;
  font-size: 16px;
}
.repair-title img {
  width: 2rem;
  height: 2rem;
  margin-top: 10px;
  border-radius: 50%;
}
.repair-title span {
  position: absolute;
  top: 20px;
  left: 54px;
}
ul {
  padding-left: 10px;
}
</style>
<style>
.myApplication .mu-item-action {
  min-width: 120px;
}
</style>   