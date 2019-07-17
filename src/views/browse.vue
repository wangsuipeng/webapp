<template>
    <div class="browse">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>浏览页面
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="more_horiz"></mu-icon> -->
                <mu-menu>
                    <mu-icon size="30" value="more_horiz"></mu-icon>
                    <mu-list slot="content">
                        <mu-list-item button @click="editPost">
                            <mu-list-item-title>编辑</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button @click="deleteArticle">
                            <mu-list-item-title>删除</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button>
                            <mu-list-item-title>投诉</mu-list-item-title>
                        </mu-list-item>
                    </mu-list>
                </mu-menu>
            </mu-button>
        </mu-appbar>

        <div class="container-main">
            <div class="content-browse">
                <h1 class="title">{{this.articleTitle}}</h1>
                <textarea
                    readonly
                    name="text"
                    id
                    v-model="postContent"

                    class="textarea-text"
                ></textarea>
                <div class="images" v-for="(item,index) in imageUrls" :key="index">
                    <img :src="item" alt />
                </div>
            </div>
            <mu-flex class="flex-wrapper" align-items="center">
                <mu-flex class="flex-demo reading-volume" justify-content="start" fill>阅读：{{number}}</mu-flex>
                <mu-flex class="flex-demo" justify-content="center" fill>
                    <ul class="share">
                        <li @click="giveThumbs">
                            <mu-icon
                                v-show="loveBool"
                                :size="size"
                                value="favorite_border"
                                color="#ff5242"
                            ></mu-icon>
                            <mu-icon
                                v-show="isloveBool"
                                :size="size"
                                value="favorite"
                                color="#ff5242"
                            ></mu-icon>
                            <p>{{praiseNum}}</p>
                        </li>
                        <li>
                            <!-- <mu-icon :size="size" value="textsms" color="#ff5242"></mu-icon> -->
                            <mu-icon :size="size" value="textsms" color="#ff5242"></mu-icon>
                            <p>90</p>
                        </li>
                        <li>
                            <mu-icon :size="size" value="share" color="#ff5242"></mu-icon>
                            <p>105</p>
                        </li>
                    </ul>
                </mu-flex>
            </mu-flex>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            number: "9999",
            size: "25",
            articleTitle: "", // 发帖标题
            postContent: "", // 帖子内容
            articleId: "", // 文章id
            loveBool: true,
            isloveBool: false,
            open: true,
            praiseNum: "0",
            imageUrls: [],// 发帖图片
        };
    },
    created() {
        this.articleTitle = this.$store.getters.articleTitle;
        this.praiseNum = localStorage.getItem('praiseNum') || 0;
        this.articleQueryAll();
    },
    mounted() {},
    methods: {
        editPost() {
            this.$router.push("/editPost");
            console.log(this.postContent);
            this.$store.dispatch("ARTICLE_CONTENT", this.postContent);
        },
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
                            let imgData = {};
                            for (var i = 0; i < content.length; i++) {
                                if (content[i].title == this.articleTitle) {
                                    this.postContent = content[i].content;
                                    this.articleId = content[i].articleId;
                                    imgData = JSON.parse(content[i].imageUrls)
                                    localStorage.setItem(
                                        "articleId",
                                        this.articleId
                                    );
                                }
                            }
                            for (var i in imgData) {
                                this.imageUrls.push(imgData[i])
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
            if (!this.isloveBool && this.loveBool) {
                this.isloveBool = true;
                this.loveBool = false;
            } else {
                this.isloveBool = false;
                this.loveBool = true;
            }
            
            this.$axios({
                url: "admin/mobile/article/addPraiseNum",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: sessionStorage.getItem("userId"),
                    articleId: this.articleId
                })
            })
                .then(result => {
                    if (result.status === 200) {
                        this.praiseNum = result.data.data.praiseNum;
                        console.log(result);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 删除帖子
        deleteArticle() {
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning"
            }).then(({ result }) => {
                if (result) {
                    this.$axios({
                        url: "admin/mobile/article/deleteArticleByArticleId",
                        method: "post",
                        headers: {
                            Authorization: sessionStorage.getItem("token")
                        },
                        data: Qs.stringify({
                            articleId: this.articleId
                        })
                    })
                        .then(result => {
                            if (result.status === 200) {
                                if (result.data.respCode == 1000) {
                                    this.$router.push("/familyD")
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            });
        }
    }
};
</script>
<style scoped>
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
}
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
    text-align: center;
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
    padding: 15px 0;
    background-color: rgb(204, 204, 204,0.3);
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
    height: 230px;
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
.textarea-text {
    width: 100%;
    min-height: 15rem;
    text-indent: 20px;
    outline: none;
    padding: 5px 10px;
}
</style>
