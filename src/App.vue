<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view class="Router"/>
        </transition>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            transitionName: "slide-right" // 默认动态路由变化为slide-right
        }
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
    },
};
</script>

<style>
@import './assets/css/animation.css';
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
}
html,body{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
ul,li {
    list-style: none;
}
.word-list {
    border-bottom: 0.5px solid #ccc !important;
}
</style>
