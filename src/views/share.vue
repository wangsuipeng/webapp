<template>
    <div class="share">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>闲置分享
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list>
                            <!-- <mu-sub-header>Today</mu-sub-header> -->
                            <mu-list-item avatar button :ripple="false">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/325543.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>Mike Li</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon value="chat_bubble"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-list-item avatar button :ripple="false">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/325543.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>Maco Mai</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon value="chat_bubble"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-list-item avatar button :ripple="false">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/325543.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>Alex Qin</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon value="chat_bubble"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-list-item avatar button :ripple="false">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/325543.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>Allen Qun</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon value="chat_bubble"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-list-item avatar button :ripple="false" v-ripple>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/325543.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>Myron Liu</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon value="chat_bubble"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                        </mu-list>
                        <!-- <mu-divider></mu-divider> -->
                    </mu-paper>
            <!-- <mu-container>
                <mu-tabs
                    :value.sync="active"
                    color="#cccccccb"
                    text-color="#ff5242"
                    style="heigth: 40px"
                >
                    <mu-tab>最新回复</mu-tab>
                    <mu-tab>最新发帖</mu-tab>
                    <mu-tab>最多回复</mu-tab>
                </mu-tabs>
                <div class="demo-text" v-if="active === 0">
                    
                    
                </div>
                <div class="demo-text" v-if="active === 1">
                    <p>“我的心从来没有这么坚定过，所以我会为了补偿而死，也可以为了补偿而死……一辈子，急辈子都无所谓，我绝不后退！”</p>
                    <p>“如果我后退呢？如果我想要死呢？我不想你再次背对着我逃跑了……”</p>
                    <p>“那么就去地狱找到你，我绝对不逃！”</p>
                    <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
                </div>
                <div class="demo-text" v-if="active === 2">
                    <p>“不，这泪水……是因为勇气，因为力量，因为信任，……你不会懂的！”</p>
                    <p>“我不会帮你，想要什么样的未来……自己去追寻吧！”</p>
                    <p>“我不需要你的帮忙！未来我会一手开启，什么样的敌人我也不会惧怕……还有，其实我们可以成为朋友的……”</p>
                    <p>“也许吧，未来……给你了。”</p>
                </div>
            </mu-container> -->
            <mu-button fab color="#FF5242" class="create-articles">
                <mu-icon size="28" value="border_color"></mu-icon>
            </mu-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            size: "36",
            active: 0,
            postContent: []
        };
    },
    created() {
        this.articleQueryAll();
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        //查询所有新闻或公告
        articleQueryAll() {
            this.$axios({
                url: "admin/mobile/article/queryAll",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: {}
            })
                .then(result => {
                    if (result.status === 200) {
                        if (result.data.respCode == 1000) {
                            this.postContent = result.data.data;
                        }
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
.container {
    padding: 0 !important;
}
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
    margin-top: 10px;
}
.mu-tabs {
    height: 40px !important;
}
.create-articles {
    position: absolute;
    right: 20px;
    bottom: 90px;
    z-index: 9999;
}
</style>
