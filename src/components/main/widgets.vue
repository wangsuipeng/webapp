<template>
    <div class="header">
        <!-- <mu-flex class="flex-wrapper" justify-content="center">
            <i class="iconfont icon-fanhui ret-btn" @click="outPage"></i>
            <mu-flex class="flex-demo fast-register" justify-content="center">海尚菊苑</mu-flex>
        </mu-flex>-->
        <mu-appbar color="#ff5242" style="text-align: center">
            <div>海尚菊苑</div>
        </mu-appbar>
        <div class="content">
            <div class="flex-box" v-ripple>
                <mu-icon size="50" value="build" color="#ff5242"></mu-icon>
                <div class="text">报修申请</div>
            </div>
            <div class="flex-box" v-ripple @click="familyDiscussion">
                <mu-icon size="50" value="location_city" color="#ff5242"></mu-icon>
                <div class="text">家事讨论</div>
            </div>
            <div class="flex-box" v-ripple>
                <mu-icon size="50" value="account_circle" color="#ff5242"></mu-icon>
                <div class="text">物业缴费</div>
            </div>
        </div>
        <div class="content">
            <div class="flex-box" v-ripple>
                <mu-icon size="50" value="local_parking" color="#ff5242"></mu-icon>
                <div class="text">车位分享</div>
            </div>
            <div class="flex-box" v-ripple>
                <mu-icon size="50" value="local_see" color="#ff5242"></mu-icon>
                <div class="text">闲置分享</div>
            </div>
            <div class="flex-box" v-ripple>
                <mu-icon class="icon-explain" size="50" value="local_shipping" color="#ff5242"></mu-icon>
                <div class="text">爱心银行</div>
            </div>
        </div>
        <div class="partition-line">
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo partition" justify-content="center"></mu-flex>
            </mu-flex>
        </div>
        <div class="hot-tip">
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo hot-more" justify-content="center">
                    <span class="hotspot">
                        <i class="vertical-line"></i>近期热点
                    </span>
                    <span class="more">更多></span>
                </mu-flex>
            </mu-flex>
        </div>
        <div class="hot-info">
            <ul>
                <li><span>通知：</span><span>今日海尚菊园小区20：30~明日01：30停水检修。</span></li>
                <li><span>信息：</span><span>今日海尚菊园小区20：30~明日01：30停水检修。</span></li>
                <li><span>提醒：</span><span>今日海尚菊园小区20：30~明日01：30停水检修。</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        familyDiscussion() {
            this.$router.push('/familyD');
        }
    }
};
</script>
<style scoped>
.flex-wrapper {
    width: 100%;
}
.partition {
    height: 12px;
}
.flex-demo {
    width: 100%;
    background-color: #e0e0e0;
}
.header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
}
.fast-register {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #ff5242;
    font-size: 18px;
    color: #fff;
}
.ret-btn {
    display: inline-block;
    position: absolute;
    left: 10px;
    top: 3px;
    color: #fff;
    font-size: 30px;
}
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.iconfont {
    font-size: 30px;
    color: #ff5242;
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
.column {
    margin-top: 16vh;
    margin-bottom: 10vh;
}
.hotspot {
    float: left;
    font-size: 14px;
    font-weight: 700;
    margin-left: 20px;
}
.more {
    float: right;
    font-size: 16px;
    text-align: right;
    padding-right: 15px;
}
.hot-tip {
    margin-top: 15px;
}
.hot-more {
    background-color: #fff;
}
.vertical-line {
    display: inline-block;
    width: 4px;
    height: 20px;
    margin-right: 10px;
    background-color: #ff5242;
    vertical-align: top;
}
.hot-info {
    width: 100%;
}
.hot-info ul {
    width: 100%;
    padding-left: 0;
}
.hot-info ul li {
    width: 100%;
    padding: 15px 0px 15px 15px;
    border-bottom: 1px solid #ccc;
}
</style>
