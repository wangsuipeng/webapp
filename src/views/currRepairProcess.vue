<template>
  <div class="repairProcess">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>报修处理
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <van-cell title="位置" value="富都名邸3号901室" size="large" />
      <van-cell title="保修时间：" :value="content.createTime" size="large" />
      <van-cell title="上门时间：" is-link :value="valueType" @click="openSelect" />
      <van-cell title="当前环节停留时间：" :value="stayTime" size="large" />
      <van-cell title="处理人：" :value="content.userRealName+content.userPhone" size="large" />
      <div class="describe">描述：</div>
      <p class="text">{{content.detail}}</p>
      <div class="images">
        <img v-for="(item,index) in imageUrls" :key="index" :src="item" alt srcset />
      </div>
      <div style="padding: 0 1rem;margin-top: 0.6rem">
        <van-button class="sumbit" type="danger">修 改</van-button>
        <van-button style="margin-top: 12px" class="sumbit" type="default" @click="revokeApply">撤销申请</van-button>
      </div>
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @select="selectValue"
        @cancel="onCancel"
      />
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      valueType: "",
      actions: [
        { name: "立即上门" },
        { name: "9:00-11:00" },
        { name: "11:00-13:00" },
        { name: "13:00-15:00" },
        { name: "15:00-17:00" }
      ],
      show: false,
      message: "",
      content: "",
      imageUrls: [],
      stayTime: ""
    };
  },
  created() {
    this.content = JSON.parse(localStorage.getItem("currRepairProcess"));
    // var obj = JSON.parse(
    //   JSON.parse(localStorage.getItem("currRepairProcess")).imageUrls
    // );
    // for (var key in obj) {
    //   this.imageUrls.push(obj[key]);
    // }
    this.nowTimeStr();
    let minutes = this.GetDateDiff(
      this.content.createTime,
      this.timer,
      "minute"
    );
    this.stayTime = Math.floor(minutes / 60) + "小时" + (minutes % 60) + "分";
  },
  methods: {
    outPage() {
      this.$router.goBack();
    },
    onCancel() {
      this.show = false;
    },
    openSelect() {
      this.show = true;
    },
    selectValue(item) {
      this.show = false;
      this.valueType = item.name;
    },
    revokeApply() {
      Dialog.confirm({
        title: "标题",
        message: "是否撤销申请"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
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
.repairProcess {
  background-color: #fff;
}
.container-main {
  width: 100%;
  height: calc(100vh - 66px);
  overflow-y: auto;
  padding-bottom: 100px;
}
.ret-btn {
  display: inline-block;
  color: #fff;
  font-size: 30px;
}
.describe {
  margin-top: 0.3rem;
  font-size: 16px;
  padding: 0 0.3rem;
}
.text {
  font-size: 14px;
  padding: 0 0.3rem;
}
.images {
  width: 100%;
  padding: 0 0.3rem;
}
.images img {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.sumbit {
  width: 100%;
  margin-top: 1.6rem;
  border-radius: 22px;
}
</style>