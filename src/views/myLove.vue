<template>
    <div class="myLove">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>我的爱心
            <mu-button icon slot="right" @click="release">
                <!-- <mu-icon size="30" value="add"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-container>
                <mu-tabs :value.sync="active2" color="#F8F8F8" indicator-color="#ff5242" full-width>
                    <mu-tab style="color: #898989">进行中</mu-tab>
                    <mu-tab style="color: #898989">待评估</mu-tab>
                    <mu-tab style="color: #898989">已完成</mu-tab>
                </mu-tabs>
                <div class="demo-text" v-if="active2 === 0">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list>
                            <mu-sub-header>我领取的爱心</mu-sub-header>
                            <div v-for="(item,index) in releaseLove" :key="index">
                                <mu-list-item avatar button v-ripple @click.native="submitAudit(item.serviceId)">
                                    <span style="font-size: 18px;margin-right: 15px">{{index+1}}</span>
                                    <mu-list-item-action>
                                        <mu-avatar>
                                            <img src="../assets/images/1000046.jpg" />
                                        </mu-avatar>
                                    </mu-list-item-action>
                                    <mu-list-item-title>{{item.serviceName}}</mu-list-item-title>
                                    <mu-list-item-action>
                                        <mu-icon color="#ff5242" value="favorite"></mu-icon>
                                    </mu-list-item-action>
                                </mu-list-item>
                                <mu-divider></mu-divider>
                            </div>
                        </mu-list>
                        <mu-list>
                            <mu-sub-header>我发布的爱心</mu-sub-header>
                            <div v-for="(item,index) in allRuningTask" :key="index">
                                <mu-list-item avatar button v-ripple @click.native="submitAudit(item.serviceId)">
                                    <span style="font-size: 18px;margin-right: 15px">{{index+1}}</span>
                                    <mu-list-item-action>
                                        <mu-avatar>
                                            <img src="../assets/images/1000046.jpg" />
                                        </mu-avatar>
                                    </mu-list-item-action>
                                    <mu-list-item-title>{{item.serviceName}}</mu-list-item-title>
                                    <mu-list-item-action>
                                        <mu-icon color="#ff5242" value="favorite"></mu-icon>
                                    </mu-list-item-action>
                                </mu-list-item>
                                <mu-divider></mu-divider>
                            </div>
                        </mu-list>
                    </mu-paper>
                </div>
                <div class="demo-text" v-if="active2 === 1">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list textline="three-line">
                            <div v-for="(item,index) in allunReviewTask" :key="index">
                                <mu-list-item avatar v-ripple button @click="loveProgress">
                                    <mu-list-item-action>
                                        <mu-avatar>
                                            <img src="../assets/images/1000046.jpg" />
                                        </mu-avatar>
                                    </mu-list-item-action>
                                    <mu-list-item-content>
                                        <mu-list-item-title
                                            style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 10px"
                                        >{{item.serviceName}}</mu-list-item-title>
                                        <mu-list-item-sub-title>
                                            <div
                                                style="color: #ff5242;display: inline-block"
                                            >爱心币 {{item.points}}/次</div>
                                        </mu-list-item-sub-title>
                                    </mu-list-item-content>
                                </mu-list-item>
                                <mu-divider></mu-divider>
                            </div>
                        </mu-list>
                    </mu-paper>
                </div>
                <div class="demo-text" v-if="active2 === 2">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list textline="three-line">
                            <div v-for="(item,index) in queryAllData" :key="index">
                                <mu-list-item avatar :ripple="false" button>
                                    <mu-list-item-action>
                                        <mu-avatar>
                                            <img src="../assets/images/1000046.jpg" />
                                        </mu-avatar>
                                    </mu-list-item-action>
                                    <mu-list-item-content>
                                        <mu-list-item-title
                                            style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 10px"
                                        >{{item.serviceName}}</mu-list-item-title>
                                        <mu-list-item-sub-title>
                                            <div
                                                style="color: #ff5242;display: inline-block"
                                            >爱心币 {{item.points}}/次</div>
                                        </mu-list-item-sub-title>
                                    </mu-list-item-content>
                                </mu-list-item>
                                <mu-divider></mu-divider>
                            </div>
                        </mu-list>
                    </mu-paper>
                </div>
            </mu-container>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            active2: 0,
            queryAllData: [], // 所有已完成的任务
            allRuningTask: [], // 所有进行中的任务
            releaseLove: [],
            allunReviewTask: [] // 所有审核中的任务
        };
    },
    created() {
        this.queryAllCompleteTask();
        this.queryAllRuningTask();
        this.queryAllunReviewTask();
    },
    methods: {
        outPage() {
            this.$router.push('/layout/person');
        },
        release() {
            this.$router.push("/releasePublic");
        },
        loveProgress() {
            this.$router.push("/loveProgress");
        },
        alert() {
            this.$alert("恭喜您提交成功", "提示", {
                okLabel: "知道了"
            }).then(() => {
                //   this.$toast.message('提示信息');
            });
        },
        submitAudit(id) {
            localStorage.setItem('serviceIds',id)
            this.$router.push('/submitAudit');
        },
        // 查询所有已完成的任务
        queryAllCompleteTask() {
            this.$axios({
                url: "admin/mobile/welfare/queryAllCompleteTask",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: localStorage.getItem("userId")
                })
            })
                .then(result => {
                    if (result.data.respCode == 1000) {
                        this.queryAllData = result.data.data;
                        console.log(result);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 查询所有进行中的任务
        queryAllRuningTask() {
            this.$axios({
                url: "admin/mobile/welfare/queryAllRuningTask",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: sessionStorage.getItem("userId")
                })
            })
                .then(result => {
                    if (result.data.respCode == 1000) {
                        this.allRuningTask = result.data.data.receiveTasks;
                        this.releaseLove = result.data.data.publishTasks;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 查询所有待审核的任务
        queryAllunReviewTask() {
            this.$axios({
                url: "admin/mobile/welfare/queryAllunReviewTask",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: localStorage.getItem("userId")
                })
            })
                .then(result => {
                    if (result.data.respCode == 1000) {
                        this.allunReviewTask = result.data.data;
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
.demo-text {
    padding: 16px;
    background: #fff;
    p {
        margin: 8px 0;
    }
}
</style>
<style scoped>
.demo-text {
    padding: 0 !important;
}
.container {
    padding: 0 !important;
}
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.public {
    position: absolute;
    top: 49px;
    right: 10px;
    width: 4rem;
    height: 1.5rem;
    line-height: 1.5rem;
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    background-color: #ff5242;
}
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
}
</style>
