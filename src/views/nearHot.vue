<template>
  <div class="hotspot">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>近期热点
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="more_horiz"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <div>
        <div class="content-browse">
          <h1 class="title">{{postContent.title}}</h1>
          <p class="textarea-text">{{postContent.content}}</p>
          <div class="images" v-for="(item,index) in imageUrls" :key="index">
            <img :src="item" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageUrls: [], // 发帖图片
      postContent: {},
    }
  },
  created () {
    this.postContent = JSON.parse(localStorage.getItem("nearHot"));
    let obj = JSON.parse(
        JSON.parse(localStorage.getItem("nearHot")).imageUrls
      );
      for (var key in obj) {
        this.imageUrls.push(obj[key]);
      }
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
  }
}
</script>

<style scoped>
.ret-btn {
  display: inline-block;
  color: #fff;
  font-size: 30px;
}
.container-main {
  width: 100%;
  height: calc(100vh - 56px);
  overflow: auto;
}
.title {
  width: 100%;
  padding: 15px 15px;
  background-color: rgb(204, 204, 204, 0.3);
  text-align: left;
  margin: 0 !important;
}
.textarea-text {
  padding: 0 5px;
  text-indent: 25px;
  font-size: 18px;
  margin: 10px;
}
.images {
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  /* overflow: hidden; */
  padding: 0 0.36rem;
}
.images img {
  /* position: absolute; */
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>