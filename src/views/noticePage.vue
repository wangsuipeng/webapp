<template>
  <div class="notic">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>公告
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <div class="notic-titlt">{{content.title}}</div>
      <div class="notic-content">{{content.content}}</div>
      <div class="notic-img">
        <div v-for="(item,index) in JSON.parse(content.imgJson)" :key="index">
          <img :src="item.path" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: {}
    };
  },
  created() {
    this.content = JSON.parse(localStorage.getItem("notic"));
    console.log(this.content);
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
.notic-titlt {
  padding: 15px 0;
  text-align: center;
}
.container-main {
  width: 100%;
  height: calc(100vh - 56px);
  overflow-y: auto;
  padding: 0 0.3rem;
}
.notic-content {
  text-indent: 20px;
}
.notic-img {
  width: 100%;
  margin-top: 0.5rem;
}
.notic-img img {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-size: cover;
}
</style>