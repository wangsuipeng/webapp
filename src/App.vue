<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="Router" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-right" // 默认动态路由变化为slide-right
    };
  },
  created() {
    // var info = plus.push.getClientInfo();
    // alert(JSON.stringify(info));
    // /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/

    // plus.push.addEventListener(
    //   "click",
    //   function(msg) {
    //     console.log("click:" + JSON.stringify(msg));
    //     console.log(msg.payload);
    //     console.log(JSON.stringify(msg));
    //     //这里可以写跳转业务代码
    //   },
    //   false
    // );
    // // 监听在线消息事件
    // plus.push.addEventListener(
    //   "receive",
    //   function(msg) {
    //     // plus.ui.alert(2);
    //     //这里可以写跳转业务代码
    //     console.log("recevice:" + JSON.stringify(msg));
    //   },
    //   false
    // );
  },
  computed: {
    key() {
      return this.$router.pathPull;
    }
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>

<style>
@import "./assets/css/animation.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
ul,
li {
  list-style: none;
}
</style>
