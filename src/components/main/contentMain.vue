<template>
    <div style="height:calc(100vh - 56px);overflow-y: scroll;">
        <!-- <transition :name="transitionName"> -->
            <!-- <keep-alive> -->
                <keep-alive>
                  <router-view v-if="$route.meta.keepAlive" class="Router"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive" class="Router"></router-view>
                <!-- <router-view :key="key" class="Router"/> -->
            <!-- </keep-alive> -->
        <!-- </transition> -->
    </div>
</template>
<script>
export default {
    name: "contentMain",
    data() {
        return {
            transitionName: "slide-right" // 默认动态路由变化为slide-right
        };
    },
    computed: {
        key() {
            return this.$route.fullPath;
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
<style scoped>
@import "../../assets/css/animation.css";
</style>
