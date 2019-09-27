<template>
  <div class="advertisement">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>
      {{content.title}}
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="comtainer-main">
      <div style="margin-bottom: 1rem">{{content.brief}}</div>
      <div class="content-img" v-for="(item,index) in imgUrl" :key="index">
        <img :src="item.path" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: {},
      imgUrl: {}
    };
  },
  created() {
    this.content = JSON.parse(localStorage.getItem("advertisement"));
    this.imgUrl = JSON.parse(
      JSON.parse(localStorage.getItem("advertisement")).imgs
    );
  },
  mounted() {
    mui.back = function() {
      history.go(-1); //回退到上一页面
    };
  },
  methods: {
    outPage() {
      this.$router.goBack();
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
.comtainer-main {
  width: 100%;
  height: calc(100vh - 56px);
  padding: 10px 10px;
  overflow-y: auto;
}
.content-img {
  width: 100%;
  height: 100%;
  margin-bottom: 0.5rem;
}
.content-img img {
  display: inline-block;                                                 
  width: 100%;
  height: 100%;
  background-size: cover;
}
</style>