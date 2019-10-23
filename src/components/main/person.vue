<template>
    <div class="person">
        <div class="avatar" @click="personalCenter">
            <mu-container style="padding: 16px 0;">
                <mu-row justify-content="center">
                    <mu-avatar :size="size">
                        <img :src="avatar" />
                    </mu-avatar>
                </mu-row>
                <p
                    style="text-align: center;font-size: 20px;margin-top: 10px;color: #fff"
                >{{nickName}}</p>
            </mu-container>
        </div>
        <div class="container-main">
            <mu-paper :z-depth="0" class="demo-list-wrap">
                <mu-list>
                    <!-- <mu-sub-header>Today</mu-sub-header> -->
                    <mu-list-item
                        avatar
                        button
                        :ripple="true"
                        class="word-list muse-list"
                        @click.native="integral"
                    >
                        <mu-list-item-action>
                            <img class="picture-img" src="../../assets/images/integral.png" />
                        </mu-list-item-action>
                        <mu-list-item-title>爱心金币</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon size="25" value="chevron_right"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-list-item
                        avatar
                        button
                        :ripple="true"
                        class="word-list muse-list"
                        @click.native="myIntegral"
                    >
                        <mu-list-item-action>
                            <img class="picture-img" src="../../assets/images/jifen.png" />
                        </mu-list-item-action>
                        <mu-list-item-title>我的积分</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon size="25" value="chevron_right"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-list-item
                        avatar
                        button
                        :ripple="true"
                        class="word-list muse-list"
                        @click.native="myLove"
                    >
                        <mu-list-item-action>
                            <img class="picture-img" src="../../assets/images/love.png" />
                        </mu-list-item-action>
                        <mu-list-item-title>我的爱心</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon size="25" value="chevron_right"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-list-item
                        avatar
                        button
                        :ripple="true"
                        class="word-list muse-list"
                        @click.native="myPost"
                    >
                        <mu-list-item-action>
                            <img class="picture-img" src="../../assets/images/tiezi1.png" />
                        </mu-list-item-action>
                        <mu-list-item-title>我的帖子</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon size="25" value="chevron_right"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-flex class="flex-wrapper" justify-content="start">
                        <mu-flex class="flex-demo" justify-content="center"></mu-flex>
                    </mu-flex>
                    <mu-list-item
                        avatar
                        button
                        :ripple="true"
                        class="word-list muse-list"
                        @click.native="myApplication"
                    >
                        <mu-list-item-action>
                            <img class="picture-img" src="../../assets/images/apply.png" />
                        </mu-list-item-action>
                        <mu-list-item-title>报修申请</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon size="25" value="chevron_right"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-list-item
                        avatar
                        button
                        :ripple="true"
                        class="word-list muse-list"
                        @click.native="authentication"
                    >
                        <mu-list-item-action>
                            <img class="picture-img" src="../../assets/images/authentication.png" />
                        </mu-list-item-action>
                        <mu-list-item-title>我的认证</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon size="25" value="chevron_right"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-list-item avatar button :ripple="true" class="word-list muse-list">
                        <mu-list-item-action>
                            <img class="picture-img" src="../../assets/images/security.png" />
                        </mu-list-item-action>
                        <mu-list-item-title>安全设置</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon size="25" value="chevron_right"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-list-item
                        avatar
                        button
                        :ripple="true"
                        class="word-list muse-list"
                        @click="about"
                    >
                        <mu-list-item-action>
                            <img class="picture-img" src="../../assets/images/about.png" />
                        </mu-list-item-action>
                        <mu-list-item-title>关于</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon size="25" value="chevron_right"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                </mu-list>
            </mu-paper>
        </div>
    </div>
</template>
<script>
import imgSrc from "../../assets/images/avatar.png";
import "../../assets/js/mui.js";
import Qs from "qs";
export default {
    data() {
        return {
            size: 100,
            avatar: "", // 头像
            nickName: "", // 昵称
            imgSrc: "../../assets/images/avatar.png",
        };
    },
    created() {
        if (localStorage.getItem("nickName") == 'null') {
            this.nickName = "";
        } else {
            this.nickName = localStorage.getItem("nickName")
        }
        if (this.$store.getters.headPortrait == "") {
            this.avatar = imgSrc;
        } else {
            this.avatar =
                "http://103.26.76.116:9999/" +
                "admin/welfare/sysFile/showPicForMany?id=" +
                this.$store.getters.headPortrait;
        }
    },
    mounted() {
        //首页返回键处理
        //处理逻辑：1秒内，连续两次按返回键，则退出应用；
        var first = null;
        mui.back = function () {
            //首次按键，提示 再按一次退出应用
            if (!first) {
                first = new Date().getTime(); //记录第一次按下回退键的时间
                mui.toast("再按一次退出社区"); //给出提示
                // history.go(-1); //回退到上一页面
                setTimeout(function () {
                    //1s中后清除
                    first = null;
                }, 1000);
            } else {
                if (new Date().getTime() - first < 1000) {
                    //如果两次按下的时间小于1s，
                    plus.runtime.quit(); //那么就退出app
                }
            }
        };
        // document.addEventListener("plusready", this.plusReady());
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
        personalCenter() {
            this.$router.push("/personalCenter");
        },
        about() {
            this.$router.push("/about");
        },
        authentication() {
            this.$router.push("/authentication");
        },
        integral() {
            this.$router.push("/integral");
        },
        myLove() {
            localStorage.setItem("active2",0)
            this.$router.push("/myLove");
        },
        myIntegral() {
            this.$router.push("/myIntegral");
        },
        myApplication() {
            sessionStorage.removeItem("activeNames")
            this.$router.push("/myApplication");
        },
        myPost() {
            localStorage.setItem("activeName",0)
            this.$router.push("/myPost");
        },
        
    }
};
</script>
<style scoped>
.demo-list-wrap {
    width: 100%;
    margin-top: 0;
}
.flex-demo {
    width: 100%;
    height: 0.5rem;
    background-color: #f7f7f9;
}
.person {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: scroll;
}
.mu-list {
    padding: 0;
}
.avatar {
    width: 100%;
    height: 10.82rem;
    background-color: rgb(255, 225, 196);
    padding-top: 1rem;
}
.muse-list {
    position: relative;
}
.container-main {
    width: 100%;
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
.picture-img {
    width: 25px;
    height: 25px;
}
.has-avatar {
    height: 48px !important;
}
</style>
