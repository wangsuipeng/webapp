<template>
    <div class="notice">
        <mu-paper :z-depth="0" class="demo-list-wrap" style="text-align: center;">
            <mu-appbar color="#ff5242">
                <mu-button icon slot="left">
                    <!-- <mu-icon value="menu"></mu-icon> -->
                </mu-button>
                <div>{{community}}</div>
                <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
                </mu-button>
                <!-- <mu-menu slot="right">
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
                </mu-menu> -->
            </mu-appbar>
        </mu-paper>
        <div class="container-main">
            <van-notice-bar :text="content" left-icon="volume-o" />
            <mu-container ref="container" class="demo-loadmore-content">
                <mu-load-more
                    @refresh="refresh"
                    :refreshing="refreshing"
                    :loading="loading"
                    @load="load"
                >
                    <mu-list>
                        <div v-for="(item,index) in notData" :key="index">
                            <mu-list-item v-ripple class="muse-list" @click.native="noticPage(item)">
                                <mu-list-item-title>{{item.title}}</mu-list-item-title>
                            </mu-list-item>
                        </div>
                    </mu-list>
                </mu-load-more>
            </mu-container>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            size: "36",
            notData: [],
            refreshing: false,
            content: "",
            loading: false,
            community: localStorage.getItem("myCommunity")
        };
    },
    created() {
        console.log(11111)
        this.noticeData();
        this.community = localStorage.getItem("myCommunity");
    },
    mounted() {
        console.log(122)
        this.noticeData();
        this.community = localStorage.getItem("myCommunity");
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
    updated () {
        console.log("2222222222222")
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
        noticPage(item) {
            localStorage.setItem("notic",JSON.stringify(item))
            this.$router.push("/noticePage")
        },
        refresh() {
            this.refreshing = true;
            this.$refs.container.scrollTop = 0;
            setTimeout(() => {
                this.refreshing = false;
                this.text = this.text === "List" ? "Menu" : "List";
                this.pageSize = 10;
                this.currentPage = 1;
            }, 2000);
        },
        load() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.pageSize = 10;
                this.currentPage++;
            }, 2000);
        },
        noticeData() {
            this.$axios({
                url: "admin/mobile/invitation/pageList",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    communityId: localStorage.getItem("communityId")
                })
            })
                .then(result => {
                    if (result.status === 200) {
                        this.notData = result.data.page.list;
                        this.content = result.data.page.list[0].content;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
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
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
}
.container {
    padding: 0!important;
}
</style>
