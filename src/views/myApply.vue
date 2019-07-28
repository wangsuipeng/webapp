<template>
    <div class="myApply">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>爱心审核
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-paper :z-depth="0" class="demo-list-wrap">
                <mu-list>
                    <div v-for="(item,index) in queryAllSubmitData" :key="index">
                        <mu-list-item avatar button v-ripple @click.native="auditContents(item.serviceId)">
                            <!-- <span style="font-size: 18px;margin-right: 15px">{{index+1}}</span> -->
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
    </div>
</template>
<script>
import Qs from "qs";

export default {
    data() {
        return {
            queryAllSubmitData: [] // 审核中的任务
        };
    },
    
    created() {
        this.queryAllSubmitReviewTask();
    },
    methods: {
        outPage() {
            this.$router.push('/layout/person');
        },
        auditContents(id) {
            localStorage.setItem("applyId",id)
            this.$router.push('/auditContents');
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
<style scoped>
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
</style>
