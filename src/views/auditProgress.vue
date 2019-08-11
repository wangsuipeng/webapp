<template>
    <div class="audit-Contents">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>审核内容
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <h3 class="title">{{title}}</h3>
            <p class="textarea-text">{{content}}</p>
            <div style="padding: 0 15px" class="btn">
                <button class="examineBtn" @click="reviewSuccess">通过</button>
                <button class="examineBtn" @click="reviewFail">不通过</button>
            </div>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
import { Dialog } from "vant";
export default {
    data() {
        return {
            serviceId: "",
            queryAllSubmitData: [],
            title: "",
            content: ""
        };
    },
    components: {
        [Dialog.Component.name]: Dialog.Component
    },
    created() {
        this.serviceId = localStorage.getItem("applyId");
        this.queryAllSubmitReviewTask();
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        // 所有审核中的任务
        queryAllSubmitReviewTask() {
            this.$axios({
                url: "admin/mobile/welfare/queryAllSubmitReviewTask",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    receiveUserId: sessionStorage.getItem("userId")
                })
            })
                .then(result => {
                    if (result.data.respCode == 1000) {
                        this.queryAllSubmitData = result.data.data;
                        for (
                            let i = 0;
                            i < this.queryAllSubmitData.length;
                            i++
                        ) {
                            if (
                                this.serviceId ==
                                this.queryAllSubmitData[i].serviceId
                            ) {
                                this.title = this.queryAllSubmitData[
                                    i
                                ].serviceName;
                                this.content = this.queryAllSubmitData[
                                    i
                                ].seviceDetail;
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 审核通过
        reviewSuccess() {
            Dialog.confirm({
                title: "提示",
                message: "是否通过审核"
            })
                .then(() => {
                    // on confirm
                    this.$axios({
                        url: "admin/mobile/welfare/reviewSuccess",
                        method: "post",
                        headers: {
                            Authorization: sessionStorage.getItem("token")
                        },
                        data: Qs.stringify({
                            serviceId: this.serviceId
                        })
                    })
                        .then(result => {
                            if (result.data.respCode == 1000) {
                                this.$router.goBack();
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {
                    // on cancel
                });
        },
        // 审核不通过
        reviewFail() {
            Dialog.confirm({
                title: "提示",
                message: "是否不通过审核"
            })
                .then(() => {
                    // on confirm
                    this.$axios({
                        url: "admin/mobile/welfare/reviewFail",
                        method: "post",
                        headers: {
                            Authorization: sessionStorage.getItem("token")
                        },
                        data: Qs.stringify({
                            serviceId: this.serviceId
                        })
                    })
                        .then(result => {
                            if (result.data.respCode == 1000) {
                                this.$router.goBack();
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {
                    // on cancel
                });
        }
    }
};
</script>
<style scoped>
.audit-Contents {
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
}
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: scroll;
}
.title-sub {
    width: 100%;
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 18px;
    background-color: aquamarine;
}
.textarea-text {
    width: 100%;
    text-indent: 20px;
    outline: none;
    padding: 5px 10px;
}
.title {
    width: 100%;
    padding: 15px 0;
    background-color: rgb(204, 204, 204, 0.3);
    text-align: center;
    margin: 0 !important;
}
.btn button:nth-child(2) {
    background-color: #fff;
    border: 1px solid #F4F4F4;
    box-shadow: #F8F8F8;
    color: black;
}
.btn button:nth-child(1) {
    background-color: #ff5242;
    color: #fff;
}
.examineBtn {
    width: 100%;
    height: 2.3rem;
    line-height: 2.3rem;
    border-radius: 2px;
    margin-bottom: 0.5rem;
}
</style>
