<template>
    <div class="applyRepair">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>家事讨论
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <div class="content">
                <div class="flex-box" v-ripple>
                    <mu-icon size="50" value="local_parking" color="#ff5242"></mu-icon>
                    <div class="text">电力报修</div>
                </div>
                <div class="flex-box" v-ripple  @click="share">
                    <mu-icon size="50" value="local_see" color="#ff5242"></mu-icon>
                    <div class="text">供水报修</div>
                </div>
                <div class="flex-box" v-ripple @click="loveBank">
                    <mu-icon class="icon-explain" size="50" value="local_shipping" color="#ff5242"></mu-icon>
                    <div class="text">煤气报修</div>
                </div>
                <div class="flex-box" v-ripple @click="loveBank">
                    <mu-icon class="icon-explain" size="50" value="local_shipping" color="#ff5242"></mu-icon>
                    <div class="text">房屋报修</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
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
    overflow-y: auto;
}
.content {
    width: 100%;
}
.flex-box {
    width: 25%;
    float: left;
    text-align: center;
    padding: 1.5vh 0;
}
</style>
