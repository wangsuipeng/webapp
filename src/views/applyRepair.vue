<template>
  <div class="applyRepair">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>报修申请
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <div class="content">
        <div class="flex-box" v-ripple @click="electricityRepair">
          <mu-icon size="50" value="flash_off" color="#ff5242"></mu-icon>
          <div class="text">电力报修</div>
        </div>
        <div class="flex-box" v-ripple @click="water">
          <mu-icon size="50" value="invert_colors" color="#ff5242"></mu-icon>
          <div class="text">供水报修</div>
        </div>
        <div class="flex-box" v-ripple @click="coalGas">
          <mu-icon class="icon-explain" size="50" value="cake" color="#ff5242"></mu-icon>
          <div class="text">煤气报修</div>
        </div>
        <div class="flex-box" v-ripple @click="house">
          <mu-icon class="icon-explain" size="50" value="domain" color="#ff5242"></mu-icon>
          <div class="text">房屋报修</div>
        </div>
      </div>
      <mu-flex class="flex-wrapper" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center"></mu-flex>
      </mu-flex>
      <div class>
        <van-tabs v-model="active" sticky>
          <van-tab title="当前申请">
            <div class="content-apply list-content">
              <div class="muse-list" v-for="(item,index) in listTable" :key="index"  @click="repairProcess(item)">
                <div v-if="item.repairsType === '房屋维修'" class="repair-title">
                  <i class="icon-ic_developer iconfont"></i>房屋报修
                </div>
                <div v-else-if="item.repairsType === '供水报修'" class="repair-title">
                  <i class="icon-gongshui1 iconfont"></i>供水报修
                </div>
                <div v-else-if="item.repairsType === '电力报修'" class="repair-title">
                  <i class="icon-dianqidianli iconfont"></i>电力报修
                </div>
                <div v-else class="repair-title">
                  <i class="icon-meiqi iconfont"></i>煤气报修
                </div>
                <div class="current-content">
                  <ul>
                    <li>
                      当前处理人：
                      <span>{{item.userRealName}}</span>
                    </li>
                    <li>
                      手机：
                      <span>{{item.userPhone}}</span>
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
          <van-tab title="历史申请">
            <table class="table">
              <tr>
                <th>序号</th>
                <th>报修时间</th>
                <th>事项</th>
                <th>处理人</th>
                <th>状态</th>
              </tr>
              <tr v-for="(item,index) in listTableHis" :key="index">
                <td>{{item.num}}</td>
                <td>{{item.createTime.substring(0,10)}}</td>
                <td>{{item.repairsType}}</td>
                <td>{{item.userRealName}}</td>
                <td>完成</td>
              </tr>
            </table>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      listTable: [], // 申请中的数据
      listTableHis: [], // 历史申请的数据
      timer: "",
      list: [],
      loading: false,
      loading1: false,
      total: 0,
      total1: 0,
      offset: 0,
      page: 0,
      limit: 1000,
      limit1: 10,
      error: false,
      error1: false,
      active: 2,
      PageIndex: 0,
      num: 10,
      loading: false,
      text: "List"
    };
  },
  created() {
    this.getUserApplyWorkflowInfo();
    this.getUserApplyInfoHistory();
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
    electricityRepair() {
      this.$router.push("/electricityRepair");
    },
    repairProcess(item) {
      localStorage.setItem("currRepairProcess", JSON.stringify(item));
      this.$router.push("/currRepairProcess");
    },
    handleSortChange({ name, order }) {
      this.list = this.list.sort((a, b) =>
        order === "asc" ? a[name] - b[name] : b[name] - a[name]
      );
    },
    water() {
      this.$router.push("/water");
    },
    coalGas() {
      this.$router.push("/coalGas");
    },
    house() {
      this.$router.push("/house");
    },
    //获取用户申请中的
    getUserApplyWorkflowInfo() {
      this.$axios({
        url: "admin/mobile/repairs/findRepairs",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          communityId: localStorage.getItem("communityId"),
          status: "3",
          repairsType: "",
          userId: sessionStorage.getItem("userId"),
          page: this.page,
          limit: this.limit
        })
      })
        .then(result => {
          if (result.data.respCode === "1000") {
            this.listTable = result.data.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取用户历史申请
    getUserApplyInfoHistory() {
      this.$axios({
        url: "admin/mobile/repairs/findRepairs",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          communityId: localStorage.getItem("communityId"),
          status: "2",
          repairsType: "",
          userId: sessionStorage.getItem("userId"),
          page: this.PageIndex,
          limit: this.limit1
        })
      })
        .then(result => {
          if (result.data.respCode === "1000") {
            this.listTableHis = result.data.data.list;
            for (let i = 0;i < this.listTableHis.length;i++) {
              this.listTableHis[i].num = i + 1;
            }
            console.log(this.listTableHis)
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
.muse-list {
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
}
.content-apply {
  width: 100%;
  height: calc(100vh - 196px);
  overflow-y: auto;
}
.content {
  width: 100%;
}
.flex-box {
  width: 25%;
  float: left;
  text-align: center;
  padding: 1vh 0;
}
.flex-wrapper {
  width: 100%;
  height: 0.4rem;
}
.flex-demo {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  opacity: 0.5;
}
.current-application {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  padding: 6px 10px;
}
.container {
  padding: 0;
}
.demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
.demo-loadmore-wrap .mu-appbar {
  width: 100%;
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
.repairs {
  color: #323233;
  font-size: 14px;
}
.repair-title {
  padding-left: 0.5rem;
  font-weight: 700;
  font-size: 16px;
}
.repair-title i {
  display: inline-block;
  padding-right: 0.3rem;
  font-size: 22px;
  color: orangered;
}
.current-content {
  padding: 0.2rem;
}
.current-content ul {
  padding-left: 0.6rem;
  color: rgb(85, 84, 84);
}
.current-content ul li {
  margin: 0.1rem 0;
}
.table {
  border-collapse: collapse;
  border-spacing: 0;
}
.table tr {
  width: calc(100vw - 1px);
  display: flex;
}
.table tr td,table tr th {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  text-align: center;
}
.table tr td:nth-child(1),.table tr th:nth-child(1) {
  flex: 1;
}
.table tr td:nth-child(2),.table tr th:nth-child(2) {
  flex: 2;
}
.table tr td:nth-child(3),.table tr th:nth-child(3) {
  flex: 2;
}
.table tr td:nth-child(4),.table tr th:nth-child(4) {
  flex: 1.5;
}
.table tr td:nth-child(5),.table tr th:nth-child(5) {
  flex: 1;
}
</style>
