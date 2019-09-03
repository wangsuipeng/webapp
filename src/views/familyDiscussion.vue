<template>
    <div class="family-D">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>家事讨论
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="content-main">
            <mu-list>
                <mu-sub-header>
                    <div>
                        <mu-container class="demo-container is-stripe">
                            <mu-row>
                                <mu-col span="9">
                                    <div class="grid-cell">
                                        <input type="text" placeholder="搜索" class="search-value" />
                                        <mu-icon
                                            :size="samll"
                                            value="search"
                                            color="rgb(244, 67, 54)"
                                            class="magnifier"
                                        ></mu-icon>
                                    </div>
                                </mu-col>
                                <mu-col span="3">
                                    <div class="grid-cell">
                                        <select name id class="select-list">
                                            <option value="1">点击最多</option>
                                            <option value="2">最新回复</option>
                                            <option value="3">最新发帖</option>
                                            <option value="3">最多回复</option>
                                        </select>
                                    </div>
                                </mu-col>
                            </mu-row>
                        </mu-container>
                    </div>
                </mu-sub-header>
                <div class="list-content">
                    <div v-for="(item,index) in postContent" :key="index">
                        <mu-list-item
                            avatar
                            class="word-list muse-list"
                            v-ripple
                            @click.native="browsePost(item)"
                        >
                            <mu-list-item-action>
                                <mu-avatar :size="size">
                                    <img :src="item.headUrl" />
                                </mu-avatar>
                            </mu-list-item-action>
                            <mu-list-item-title>{{item.title}}</mu-list-item-title>
                        </mu-list-item>
                    </div>
                </div>
            </mu-list>
            <mu-button fab round color="#FF5242" class="create-articles" @click="postWord">
                <mu-icon size="28" value="edit"></mu-icon>
            </mu-button>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
import { Dialog } from "vant";
export default {
    components: {
        [Dialog.Component.name]: Dialog.Component
    },
    data() {
        return {
            fab: true,
            samll: "30",
            size: "36",
            open: false,
            postContent: [],
            articleTitle: "", // 文章标题
        };
    },
    created() {
        this.articleQueryAll();
    },
    mounted() {
        mui.back = function () {
            // history.go(-1); //回退到上一页面
            this.$router.goBack();
        };
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        postWord() {
            this.$router.push("./post");
        },
        browsePost(item) {
            localStorage.setItem('familyDiscussion',JSON.stringify(item))
            this.$router.push("/browse");
        },
        //查询所有新闻或公告
        articleQueryAll() {
            this.$axios({
                url: "admin/mobile/article/queryAllByCommunityIdAndCategary",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: sessionStorage.getItem("userId"),
                    communityId: localStorage.getItem("communityId"),
                    category: '2'
                })
            })
                .then(result => {
                    if (result.status === 200) {
                        if (result.data.respCode == 1000) {
                            this.postContent = result.data.data;
                        } else {
                            Dialog.alert({
                              title: '提示',
                              message: result.data.errorMsg
                            }).then(() => {
                                this.$router.goBack();
                              // on close
                            });
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
<style lang="less" scoped>
.demo-container {
    .row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .grid-cell {
        height: 36px;
        background: rgba(255, 255, 255, 0.8);
    }
}
.container {
    padding: 0 !important;
}
</style>

<style scoped>
.family-D {
    width: 100%;
    height: 100vh;
}
.content-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
}
.list-content {
    padding: 0 8px;
}
.material-icons {
    font-size: 40px;
}
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.demo-list-wrap {
    width: 100%;
}
.mu-sub-header {
    padding-left: 0;
}
.notice {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
.search-value {
    width: 100%;
    height: 100%;
    float: left;
    outline: none;
    padding: 0 10px 0 30px;
    background-color: rgba(204, 204, 204, 0.301);
}
.mu-input {
    padding-bottom: 0 !important;
    min-height: 40px;
}
.screen {
    line-height: 36px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    background-color: #0080ff;
}
.magnifier {
    position: absolute;
    top: 3px;
    left: 2px;
}
.select-list {
    float: right;
    font-size: 16px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #ccc;
    opacity: 0.4;
    outline: none;
    color: black;
}
.create-articles {
    position: absolute;
    right: 20px;
    bottom: 28px;
    /* z-index: 9999; */
}
option {
    text-align: center;
}
.has-avatar {
    height: 50px !important;
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

