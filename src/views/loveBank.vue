<template>
    <div class="loveBank">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>爱心银行
            <mu-button icon slot="right" @click="release">
                <mu-icon size="30" value="add"></mu-icon>
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-container>
                <mu-tabs :value.sync="active2" color="#F8F8F8" indicator-color="#ff5242" full-width>
                    <mu-tab style="color: #898989">爱心榜</mu-tab>
                    <mu-tab style="color: #898989">爱心大厅</mu-tab>
                </mu-tabs>
                <div class="demo-text" v-if="active2 === 0">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list>
                            <div v-for="(item,index) in rankByGoldData" :key="index">
                                <mu-list-item avatar button :ripple="false">
                                    <span style="font-size: 18px;margin-right: 15px;font-style:italic">{{index + 1}}</span>
                                    <mu-list-item-action>
                                        <mu-avatar>
                                            <img :src="item.headUrl" />
                                        </mu-avatar>
                                    </mu-list-item-action>
                                    <mu-list-item-title>{{item.realName}}</mu-list-item-title>
                                    <!-- <span style="font-size: 18px;">{{index + 1}}</span> -->
                                    <mu-list-item-action style="margin-left: 25px">
                                        <mu-icon color="#ff5242" value="favorite"></mu-icon>
                                    </mu-list-item-action>
                                    <span class="loveNum">{{item.point}}</span>
                                </mu-list-item>
                                <mu-divider></mu-divider>
                            </div>
                        </mu-list>
                    </mu-paper>
                </div>
                <div class="demo-text" v-if="active2 === 1">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list textline="three-line">
                            <div v-for="(item,index) in queryAllTaskData" :key="index">
                                <mu-list-item avatar :ripple="false" button @click="loveProgress(item.serviceId)">
                                    <mu-list-item-action>
                                        <mu-avatar>
                                            <img :src="item.headUrl" />
                                        </mu-avatar>
                                    </mu-list-item-action>
                                    <mu-list-item-content>
                                        <mu-list-item-title id="text"
                                            style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 10px"
                                        >{{item.serviceName}}</mu-list-item-title>
                                        <mu-list-item-sub-title>
                                            <div
                                                style="color: #ff5242;display: inline-block"
                                            >爱心币{{item.points}}/次</div>
                                            <div class="public">
                                                <span v-if="item.status == '未领取'" class="receive">做公益</span>
                                                <span v-else class="notreceive">做公益</span>
                                            </div>
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
            rankByGoldData: [], // 爱心榜数据
            queryAllTaskData: [] // 爱心大厅数据
        };
    },
    created() {
        this.queryAllCreatedTask();
        this.rankByGold();
        this.queryAllTask();
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        release() {
            this.$router.push("/releasePublic");
        },
        loveProgress(serviceId) {
            // let text = document.getElementById("text");
            sessionStorage.setItem("serviceId",serviceId)
            console.log(serviceId)
            this.$router.push("/loveProgress");
        },
        alert() {
            this.$alert("恭喜您提交成功", "提示", {
                okLabel: "知道了"
            }).then(() => {
                //   this.$toast.message('提示信息');
            });
        },
        queryAllCreatedTask() {
            this.$axios({
                url: "admin/mobile/welfare/queryAllCreatedTask",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: {
                    publishUserId: sessionStorage.getItem("userId")
                }
            })
                .then(result => {
                    if (result.data.respCode == 1000) {
                        console.log(result);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 爱心大厅
        queryAllTask() {
            this.$axios({
                url: "admin/mobile/welfare/queryAllTask",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    communityId: localStorage.getItem("communityId")
                })
            })
                .then(result => {
                    if (result.data.respCode == 1000) {
                        this.queryAllTaskData = result.data.data;
                        console.log(result.data.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 爱心榜
        rankByGold() {
            this.$axios({
                url: "admin/mobile/welfare/rankByGold",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    communityId: localStorage.getItem("communityId")
                })
            })
                .then(result => {
                    if (result.data.respCode == 1000) {
                        this.rankByGoldData = result.data.data;
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
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
}
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
    /* float: right; */
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
}
.receive {
    display: inline-block;
    width: 4rem;
    height: 1.3rem;
    line-height: 1.3rem;
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    background-color: #ff5242;
}
.notreceive {
    display: inline-block;
    width: 4rem;
    height: 1.3rem;
    line-height: 1.3rem;
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    background-color: #ccc;
}
.loveNum {
    display: inline-block;
    width: 80px;
    height: 20px;
    /* border: 1px solid #ff5242; */
    margin-left: 10px;
}
</style>
