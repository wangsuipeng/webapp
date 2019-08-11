<template>
    <div class="notice">
        <mu-paper :z-depth="0" class="demo-list-wrap" style="height: 2.8rem">
            <mu-appbar color="#ff5242">
                <mu-button icon slot="left">
                    <mu-icon value="menu"></mu-icon>
                </mu-button>
                <div>{{community}}</div>
                <mu-menu slot="right">
                    <mu-button flat>MENU</mu-button>
                    <mu-list slot="content">
                        <mu-list-item button>
                            <mu-list-item-content>
                                <mu-list-item-title>Menu Item 1</mu-list-item-title>
                            </mu-list-item-content>
                        </mu-list-item>
                        <mu-list-item button>
                            <mu-list-item-content>
                                <mu-list-item-title>Menu Item 2</mu-list-item-title>
                            </mu-list-item-content>
                        </mu-list-item>
                    </mu-list>
                </mu-menu>
            </mu-appbar>
            <mu-list>
                <mu-sub-header>今日热点</mu-sub-header>
                <mu-list-item avatar button :ripple="true" class="word-list muse-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/1000053.jpg" />
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Mike Li</mu-list-item-title>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list muse-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/325543.jpg" />
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Maco Mai</mu-list-item-title>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list muse-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/325571.jpg" />
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Alex Qin</mu-list-item-title>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list muse-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/325572.jpg" />
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Allen Qun</mu-list-item-title>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list muse-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/1000046.jpg" />
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Myron Liu888</mu-list-item-title>
                </mu-list-item>
                <!-- <mu-divider></mu-divider> -->
            </mu-list>
        </mu-paper>
    </div>
</template>
<script>
import "../../assets/js/mui.js";
export default {
    data() {
        return {
            size: "36",
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
        }
    }
};
</script>
<style scoped>
.demo-list-wrap {
    width: 100%;
}
.notice {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
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
