<template>
  <div class="integral">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;margin-bottom: 10px">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>我的积分
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <!-- <mu-list>
                <mu-list-item :ripple="false">
                    <mu-list-item-title style="width: 100px">{{nickName}}</mu-list-item-title>
                    <van-rate v-model="value" allow-half readonly color="#f44" void-color="#eee" size="25" />
                </mu-list-item>
                <mu-divider></mu-divider>
      </mu-list>-->
      <mu-list>
        <mu-list-item :ripple="false">
          <mu-list-item-title style="width: 100px">用户积分</mu-list-item-title>
          <div>{{integralData}}</div>
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
      value: null,
      integralData: "0" // 积分
    };
  },
  created() {
    this.nickName = localStorage.getItem("nickName");
    this.myIntegral();
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
    myIntegral() {
      this.$axios({
        url: "admin/mobile/article/queryArticlePoint",
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
            this.integralData = result.data.data.point;
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
