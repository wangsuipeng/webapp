<template>
  <div class="pay">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>物业缴费
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="more_horiz"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <div class="content">
        <div class="flex-box" v-ripple @click="propertyFee">
          <mu-icon size="50" value="account_balance" color="#ff5242"></mu-icon>
          <div class="text">物业费</div>
        </div>
        <div class="flex-box" v-ripple>
          <mu-icon size="50" value="delete" color="#ff5242"></mu-icon>
          <div class="text">垃圾分类费</div>
        </div>
        <div class="flex-box" v-ripple>
          <mu-icon class="icon-explain" size="50" value="extension" color="#ff5242"></mu-icon>
          <div class="text">维修费</div>
        </div>
      </div>
      <div class="content">
        <div class="flex-box" v-ripple>
          <mu-icon size="50" value="directions_bike" color="#ff5242"></mu-icon>
          <div class="text">快递代收</div>
        </div>
        <div class="flex-box" v-ripple>
          <mu-icon size="50" value="fitness_center" color="#ff5242"></mu-icon>
          <div class="text">健身费</div>
        </div>
      </div>
      <mu-flex class="flex-wrapper" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center"></mu-flex>
      </mu-flex>
      <mu-container>
        <mu-row gutter>
          <mu-col span="12">
            <mu-paper :z-depth="0">
              <mu-list>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>缴费记录：</mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>List Item 2</mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
                <mu-list-item>
                  <mu-list-item-content>
                    <mu-list-item-title>List Item 3</mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset></mu-divider>
              </mu-list>
            </mu-paper>
          </mu-col>
        </mu-row>
      </mu-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
    propertyFee() {
      this.$router.push("/propertyFee");
    }
  }
};
</script>
<style scoped>
.container {
  padding: 0 !important;
}
.flex-wrapper {
  width: 100%;
  height: 15px;
  margin-top: 8px;
}
.flex-demo {
  width: 100%;
  height: 15px;
  background-color: #e0e0e0;
  text-align: center;
}
.flex-wrapper:first-child {
  margin-top: 0;
}
.flex-demo:first-child {
  margin-left: 0;
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
.content {
  width: 100%;
}
.flex-box {
  width: 33.3%;
  float: left;
  text-align: center;
  padding: 1.5vh 0;
}
</style>
