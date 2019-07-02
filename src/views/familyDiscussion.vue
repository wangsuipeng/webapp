<template>
    <div class="family-D">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>家事讨论
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <mu-list>
            <mu-sub-header>
                <div>
                    <mu-container class="demo-container is-stripe">
                        <mu-row>
                            <mu-col span="9">
                                <div class="grid-cell">
                                    <input type="text" placeholder="搜索" class="search-value">
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
            <mu-list-item avatar button :ripple="true" class="word-list" v-ripple>
                <mu-list-item-action>
                    <mu-avatar :size="size">
                        <img src="../assets/images/1000053.jpg">
                    </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>Mike Li</mu-list-item-title>
            </mu-list-item>
            <mu-list-item avatar button :ripple="true" class="word-list" v-ripple>
                <mu-list-item-action>
                    <mu-avatar :size="size">
                        <img src="../assets/images/325543.jpg">
                    </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>Maco Mai</mu-list-item-title>
            </mu-list-item>
            <mu-list-item avatar button :ripple="true" class="word-list" v-ripple>
                <mu-list-item-action>
                    <mu-avatar :size="size">
                        <img src="../assets/images/325571.jpg">
                    </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>Alex Qin</mu-list-item-title>
            </mu-list-item>
            <mu-list-item avatar button :ripple="true" class="word-list" v-ripple>
                <mu-list-item-action>
                    <mu-avatar :size="size">
                        <img src="../assets/images/325572.jpg">
                    </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>Allen Qun</mu-list-item-title>
            </mu-list-item>
            <mu-list-item avatar button :ripple="true" class="word-list" v-ripple @click="browsePost">
                <mu-list-item-action>
                    <mu-avatar :size="size">
                        <img src="../assets/images/1000046.jpg">
                    </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>Myron Liu</mu-list-item-title>
            </mu-list-item>
        </mu-list>
        <mu-button fab color="#FF5242" class="create-articles" @click="postWord">
            <mu-icon value="add"></mu-icon>
        </mu-button>
    </div>
</template>
<script>
import Qs from 'qs'
export default {
    data() {
        return {
            samll: "30",
            size: "36",
            options: ["最多点击", "最多回复", "最新发帖", "最新回复"],
            open: false,
            selectValue: "最多点击"
        };
    },
    created() {
        this.articleQueryAll()
    },
    mounted() {
        // this.trigger = this.$refs.button.$el;
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        closeBottomSheet() {
            this.open = false;
            console.log(333);
        },
        openBotttomSheet() {
            this.open = true;
            console.log(111);
        },
        postWord() {
            this.$router.push("./post");
        },
        browsePost() {
            this.$router.push('/browse')
        },
        //查询所有新闻或公告
       articleQueryAll() {
           this.$axios({
                url: "admin/article/queryAll",
                method: "post",
                
                data: Qs.stringify({})
            })
                .then(result => {
                    if (result.status === 200) {
                        console.log(result);
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
        // border-radius: 4px;
        height: 36px;
        background: rgba(255, 255, 255, 0.8);
    }
}
.container {
    padding: 0 !important;
    // margin-top: 3px;
}
.demo-container.is-stripe .col:nth-child(1) .grid-cell {
    // background: red;
}
.demo-container.is-stripe .col:nth-child(2n) .grid-cell {
    // background: rgba(0, 0, 0, 0.54);
}
</style>

<style scoped>
.family-D {
    width: 100%;
    height: 100vh;
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
.word-list {
    border-bottom: 1px solid #ccc;
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
    padding-left: 5px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border: 1px solid #ccc;
    outline: none;
    color: black;
}
.create-articles {
    position: absolute;
    right: 20px;
    bottom: 90px;
    z-index: 9999;
}
</style>

