<template>
    <div class="leasePark">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 2.8rem">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>出售车位
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-list textline="three-line">
                <mu-list-item avatar :ripple="false" button>
                    <mu-list-item-action>
                        <mu-avatar>
                            <img :src="parkingLot.handImg" />
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>{{parkingLot.title}}</mu-list-item-title>
                        <mu-list-item-sub-title>
                            <!-- <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span>  -->
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                </mu-list-item>
            </mu-list>
            <p class="text-context">{{parkingLot.content}}</p>
            <div class="comment-number">
                <ul class="share">
                    <li>
                        <mu-icon :size="size" value="visibility" color="#B9B9B9"></mu-icon>
                        <p style="display: inline-block">{{browsePerson}}</p>
                    </li>
                    <li>
                        <mu-icon
                            :size="size"
                            value="chat_bubble_outline"
                            color="#B9B9B9"
                            @click="comment"
                        ></mu-icon>
                        <p style="display: inline-block">900</p>
                    </li>
                </ul>
            </div>
            <div class="partition-line"></div>
            <div class="commentList">
                <ul>
                    <li v-for="(item,index) in commData" :key="index">
                        <div class="avat-img">
                            <img :src="handImg" alt />
                        </div>
                        <div class="content-comm">
                            <p>科比</p>
                            <p>{{item.content}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="comment">
                <div class="avatia">
                    <img :src="handImg" alt />
                </div>
                <div class="comment-text">
                    <input type="text" placeholder="评论" v-model="commeText" id="inputText" />
                    <span @click="addComment">发送</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            size: "25",
            parkingLot: {},
            handImg: "",
            commData: [],
            commeText: '',
            browsePerson: '',// 浏览人数
        };
    },
    created() {
        this.parkingLot = JSON.parse(localStorage.getItem("parkingLot"));
        this.handImg = JSON.parse(localStorage.getItem("parkingLot")).handImg;
        this.browsePerson = JSON.parse(localStorage.getItem("parkingLot")).browsePerson || 0;
        this.queryComment();
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        comment() {
            document.getElementById("inputText").focus();
        },
        // 发表评论
        addComment() {
            this.$axios({
                url: "admin/mobile/article/addComment",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                    "Content-Type": "application/json;charset=utf8"
                },
                data: {
                    content: this.commeText,
                    userId: sessionStorage.getItem("userId"),
                    articleId: this.parkingLot.id,
                    communityId: localStorage.getItem("communityId"),
                }
            })
                .then(result => {
                    if (result.data.respCode === "1000") {
                        this.commeText = "",
                        this.queryComment();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 查询评论
        queryComment() {
            this.$axios({
                url: "admin/mobile/article/queryComment",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
                data: Qs.stringify({
                    articleId: this.parkingLot.id,
                })
            })
                .then(result => {
                    if (result.data.respCode === "1000") {
                        this.commData = result.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
    }
};
</script>

<style scoped>
.leasePark {
    background-color: #fff;
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
}
.mu-item-sub-title,
.mu-item-title {
    margin-bottom: 10px;
}

.text-context {
    padding: 0 15px;
}
.comment {
    width: 100%;
    border-top: 0.5px solid #e9e9e9;
    background-color: #fff;
    position: fixed;
    line-height: 0 !important;
    padding: 2.8%;
    bottom: 0;
    left: 0;
}
.avatia {
    float: left;
    width: 10%;
}
.comment-text {
    float: left;
    width: 90%;
}
.comment img {
    display: block;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
}
.comment input {
    display: block;
    width: 98%;
    height: 2rem;
    border-radius: 1.25rem;
    margin-left: 0.4rem;
    background-color: #fefbfa;
    border: 1px solid #e9e9e9;
    /* box-shadow:inset 0 0 2px 2px #E9E9E9; */
    border-color: #e9e9e9;
    /* outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #e9e9e9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #e9e9e9; */
    padding-left: 0.5rem;
    padding-right: 2.7rem;
    position: relative;
    background-color: white;
    caret-color: red;
}
.comment input:after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #d9d9d9;
    content: " ";
    display: block;
    transform: scaley(0.5);
}
.comment span {
    display: inline-block;
    position: absolute;
    color: red;
    top: 1.6rem;
    right: 1.6rem;
    font-weight: 600;
}
.avat-img {
    display: inline-block;
    width: 15%;
    vertical-align: top;
}
.avat-img img {
    margin-top: 3px;
    margin-left: 10px;
    display: inline-block;
    width: 2rem;
    height: 2rem;

    border-radius: 50%;
}
.content-comm {
    padding: 8px;
    display: inline-block;
    width: 82%;
    border-radius: 1rem;
    background-color: #f1f1f1;
}
.content-comm p {
    margin-bottom: 0 !important;
}
.content-comm p:nth-child(1) {
    color: #474747;
    font-weight: bold;
}
.content-comm p:nth-child(2) {
    color: #474747;
}
.commentList ul {
    padding-left: 0 !important;
}
.commentList ul li {
    margin-bottom: 8px;
}
.comment-number {
    width: 100%;
    height: 50px;
}
.share {
    float: right;
    margin-right: 1rem;
}
.comment-number ul li {
    float: left;
}
.comment-number ul li:nth-child(1) {
   margin-right: 10px;
}
.comment-number ul li p{
    margin-top: 2px;
    vertical-align: top;
}
.partition-line {
    width: 100%;
    height: 0.6rem;
    margin-bottom: 0.5rem;
    background-color: #F9F9F9;
}
</style>
<style>
.leasePark .mu-list-three-line .mu-item {
    height: 70px !important;
    margin-bottom: -13px;
}
</style>
 