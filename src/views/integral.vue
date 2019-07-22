<template>
    <div class="integral">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px;margin-bottom: 10px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>我的积分
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-list>
                <mu-list-item :ripple="false">
                    <mu-list-item-title style="width: 100px">{{nickName}}</mu-list-item-title>
                    <mu-icon value="star" color="pink"></mu-icon>
                    <mu-icon value="star" color="pink"></mu-icon>
                    <mu-icon value="star" color="pink"></mu-icon>
                </mu-list-item>
                <mu-divider></mu-divider>
            </mu-list>
            <mu-list>
                <mu-list-item :ripple="false">
                    <mu-list-item-title style="width: 100px">用户积分</mu-list-item-title>
                    <div>{{points}}</div>
                </mu-list-item>
                <mu-divider></mu-divider>
            </mu-list>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            points: "",
            nickName: "",
        }
    },
    created () {
        this.nickName = localStorage.getItem("nickName");
        this.statisticGold();  
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        //统计个人金币
        statisticGold() {
            this.$axios({
                url: "admin/mobile/welfare/statisticGold",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: localStorage.getItem("userId")
                })
            }).then((result) => {
                if (result.data.respCode == 1000) {
                    this.points = result.data.points.points;
                }
            }).catch((err) => {
                console.log(err)
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
.mu-item-title{
    flex: inherit!important;
}
</style>
