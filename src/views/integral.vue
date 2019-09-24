<template>
  <div class="integral">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;margin-bottom: 10px">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>爱心金币
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <mu-list>
        <mu-list-item :ripple="false">
          <mu-list-item-title style="width: 100px">{{nickName}}</mu-list-item-title>
          <van-rate v-model="value" allow-half readonly color="#f44" void-color="#eee" size="25" />
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
      <mu-list>
        <mu-list-item :ripple="false">
          <mu-list-item-title style="width: 100px">用户金币</mu-list-item-title>
          <div>{{points}}</div>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      points: "",
      nickName: "",
      value: null
    };
  },
  created() {
    this.nickName = localStorage.getItem("nickName") || "";
    this.statisticGold();
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
    //统计个人金币
    statisticGold() {
      this.$axios({
        url: "admin/mobile/welfare/statisticGold",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId")
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.points = result.data.points.points;
            if (this.points < 200) {
              this.value = 0.5;
            } else if (this.points > 280 && this.points <= 300) {
              this.value = 1;
            } else if (this.points > 300 && this.points < 900) {
              this.value = 1.5;
            } else if (this.points > 900 && this.points <= 1000) {
              this.value = 2;
            } else if (this.points > 1000 && this.points <= 2500) {
              this.value = 2.5;
            } else if (this.points > 2500 && this.points <= 3000) {
              this.value = 3;
            } else if (this.points > 3000 && this.points <= 4000) {
              this.value = 3.5;
            } else if (this.points > 4000 && this.points <= 6000) {
              this.value = 4;
            } else if (this.points > 6000) {
              this.value = 5;
            }
            // this.value = parseFloat((result.data.points.points/50).toFixed(1));
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
.mu-item-title {
  flex: inherit !important;
}
</style>
