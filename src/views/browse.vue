<template>
    <div class="browse">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>浏览页面
            <mu-button icon slot="right">
                <mu-icon size="30" value="more_horiz"></mu-icon>
            </mu-button>
        </mu-appbar>
        <div class="content-browse">
            <h1 class="title">{{this.articleTitle}}</h1>
            <p
                class="text"
            >{{postContent}}</p>
            <div class="images">
                <img src="../assets/images/1000100.jpg" alt />
            </div>
        </div>
        <!-- <mu-container class="demo-container is-stripe">
            <mu-row>
                <mu-col span="4">
                    <div class="grid-cell">55</div>
                </mu-col>
                <mu-col span="8">
                    <div class="grid-cell">66</div>
                </mu-col>
            </mu-row>
        </mu-container>-->
        <mu-flex class="flex-wrapper" align-items="center">
            <mu-flex class="flex-demo reading-volume" justify-content="left" fill>阅读：{{number}}</mu-flex>
            <mu-flex class="flex-demo" justify-content="center" fill>
                <ul class="share">
                    <li @click="giveThumbs">
                        <mu-icon :size="size" value="favorite" color="#ff5242"></mu-icon>
                        <p>589</p>
                    </li>
                    <li>
                        <mu-icon :size="size" value="textsms" color="#ff5242"></mu-icon>
                        <p>90</p>
                    </li>
                    <li>
                        <mu-icon :size="size" value="share" color="#ff5242"></mu-icon>
                        <p>1005</p>
                    </li>
                </ul>
            </mu-flex>
        </mu-flex>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            number: "9999",
            size: "30",
            articleTitle: "", // 发帖标题
            postContent: "", // 帖子内容
            articleId: ""// 文章id
        };
    },
    created() {
        this.articleTitle = this.$store.getters.articleTitle;
        this.articleQueryAll();
    },
    mounted() {},
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
                            let content = result.data.data;
                            for (var i = 0; i < content.length; i++) {
                                if (content[i].title == this.articleTitle) {
                                    this.postContent = content[i].content;
                                    this.articleId = content[i].articleId;
                                }
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 点赞文章
        giveThumbs() {
            this.$axios({
                url: "admin/mobile/article/addPraiseNum",
                method: "post",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: sessionStorage.getItem('userId'),
                    articleId: this.articleId
                })
            })
                .then(result => {
                    if (result.status === 200) {
                        console.log(result)
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
.flex-wrapper {
    width: 100%;
    height: 56px;
    margin-top: 8px;
}
.reading-volume {
    line-height: 40px;
    padding-left: 10px;
    color: #808080;
    font-size: 18px;
}
.flex-demo {
    width: 200px;
    height: 52px;
    /* background-color: #e0e0e0; */
    text-align: center;
    /* line-height: 32px; */
    margin-left: 8px;
}
.flex-wrapper:first-child {
    margin-top: 0;
}
.flex-demo:first-child {
    margin-left: 0;
}
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.title {
    width: 100%;
    /* line-height: 60px; */
    padding: 20px 0;
    /* border-bottom: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #000; */
    background-color: #ccc;
    text-align: center;
    margin: 0 !important;
}
.text {
    padding: 0 5px;
    text-indent: 25px;
    font-size: 18px;
    margin: 10px;
}
.images {
    width: 100%;
    height: 120px;
}
.images img {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
}
.share li {
    float: left;
    margin-left: 15px;
}
</style>
