<template>
    <div class="header">
        <mu-appbar color="#ff5242" style="text-align: center">
            <div>{{community}}</div>
        </mu-appbar>
        <div class="container-main">
            <div class="content">
                <mu-carousel transition="fade" hide-controls style="height: 150px">
                    <mu-carousel-item>
                        <img :src="carouselImg1" />
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg2" />
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg3" />
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg4" />
                    </mu-carousel-item>
                </mu-carousel>
                <div class="flex-box" v-ripple @click="applyRepair">
                    <mu-icon size="50" value="build" color="#ff5242"></mu-icon>
                    <div class="text">报修申请</div>
                </div>
                <div class="flex-box" v-ripple @click="familyDiscussion">
                    <mu-icon size="50" value="location_city" color="#ff5242"></mu-icon>
                    <div class="text">家事讨论</div>
                </div>
                <div class="flex-box" v-ripple @click="propertyPay">
                    <mu-icon size="50" value="account_circle" color="#ff5242"></mu-icon>
                    <div class="text">物业缴费</div>
                </div>
            </div>
            <div class="content">
                <div class="flex-box" v-ripple @click="parkingLot">
                    <mu-icon size="50" value="local_parking" color="#ff5242"></mu-icon>
                    <div class="text">车位分享</div>
                </div>
                <div class="flex-box" v-ripple  @click="share">
                    <mu-icon size="50" value="local_see" color="#ff5242"></mu-icon>
                    <div class="text">闲置分享</div>
                </div>
                <div class="flex-box" v-ripple @click="loveBank">
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
                    <li class="muse-list ">
                        <span>通知：</span>
                        <span>今日海尚菊园小区20：30~明日01：30停水检修。</span>
                    </li>
                    <li class="muse-list ">
                        <span>信息：</span>
                        <span>今日海尚菊园小区20：30~明日01：30停水检修。</span>
                    </li>
                    <li class="muse-list ">
                        <span>提醒：</span>
                        <span>今日海尚菊园小区20：30~明日01：30停水检修。</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import carouselImg1 from "../../assets/images/325453.jpg";
import carouselImg2 from "../../assets/images/325453.jpg";
import carouselImg3 from "../../assets/images/325453.jpg";
import carouselImg4 from "../../assets/images/325453.jpg";
import '../../assets/js/mui.js';
export default {
    data() {
        return {
            carouselImg1,
            carouselImg2,
            carouselImg3,
            carouselImg4,
            community: localStorage.getItem("myCommunity")
        };
    },
    mounted () {
        document.addEventListener("plusready", this.plusReady());    
    },
    methods: {
        plusReady() {
            // 监听“返回”按钮事件
            var first = null;
            plus.key.addEventListener("backbutton", function() {
                //首次按键，提示‘再按一次退出应用’
                if (!first) {
                    first = new Date().getTime();
                    // plus.nativeUI.alert("再按一次退出应用");
                    plus.nativeUI.toast(
                        '<font style="font-size:14px">再按一次返回键退出</font>',
                        {
                            type: "richtext",
                            duration: "long",
                            richTextStyle: { align: "center" }
                        }
                    );
                    setTimeout(function() {
                        plus.nativeUI.closeToast();
                    }, 500);
                    setTimeout(function() {
                        first = null;
                    }, 1000);
                } else {
                    if (new Date().getTime() - first < 1000) {
                        plus.runtime.quit();
                        // plus.nativeUI.alert("退出成功");
                    }
                }
            }); // 在这里调用plus api
        },
        familyDiscussion() {
            this.$router.push("/familyD");
        },
        propertyPay() {
            this.$router.push("/propertyPay");
        },
        loveBank() {
            this.$router.push("/loveBank");
        },
        share() {
            this.$router.push("/share")
        },
        applyRepair() {
            this.$router.push("/applyRepair")
        },
        parkingLot() {
            this.$router.push("/parkingLot")
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
    background-color: #F7F7F9;
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
.container-main {
    width: 100%;
    height: calc(100vh - 112px);
    overflow-y: scroll;
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
    /* border-bottom: 1px solid #ccc; */
}
.muse-list {
    position: relative;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .muse-list:before {
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        /* border-radius: 8px; */
        border-bottom: 1px solid #dcdcdc;
        -webkit-transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform: scale(0.5);
        transform-origin: 0 0;
    }
}
</style>
