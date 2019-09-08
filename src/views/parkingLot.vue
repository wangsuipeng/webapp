<template>
    <div class="parking-lot">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>车位分享
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-container>
                <mu-tabs
                    :value.sync="active4"
                    color="#F8F8F8"
                    full-width
                    indicator-color="#ff5242"
                    @change="tabChange(active4)"
                >
                    <mu-tab style="color: #898989">出租车位</mu-tab>
                    <mu-tab style="color: #898989">求租车位</mu-tab>
                    <mu-tab style="color: #898989">车位出售</mu-tab>
                </mu-tabs>
                <div class="demo-text" v-if="active4 === 0">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list>
                            <div v-for="(item,index) in leaseParking" :key="index">
                                <mu-list-item avatar button v-ripple class="muse-list" @click="leasePark(item)">
                                    <mu-list-item-action>
                                        <mu-avatar>
                                            <img :src="item.handImg" />
                                        </mu-avatar>
                                    </mu-list-item-action>
                                    <mu-list-item-title>{{item.title}}</mu-list-item-title>
                                    <mu-list-item-action>
                                        <mu-icon value="chat_bubble"></mu-icon>
                                    </mu-list-item-action>
                                </mu-list-item>
                            </div>
                        </mu-list>
                    </mu-paper>
                </div>
                <div class="demo-text" v-if="active4 === 1">
                    <mu-list>
                        <div v-for="(item,index) in seekGroup" :key="index">
                            <mu-list-item avatar button v-ripple class="muse-list" @click="rentSeeking(item)">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img :src="item.handImg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>{{item.title}}</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon value="chat_bubble"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                        </div>
                    </mu-list>
                </div>
                <div class="demo-text" v-if="active4 === 2">
                    <mu-list>
                        <div v-for="(item,index) in sellvehicle" :key="index">
                            <mu-list-item avatar button v-ripple class="muse-list" @click="sellVehicle(item)">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img :src="item.handImg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>{{item.title}}</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon value="chat_bubble"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                        </div>
                    </mu-list>
                </div>
            </mu-container>
            <mu-button fab color="#FF5242" class="create-articles" @click="vehicle">
                <mu-icon size="28" value="add"></mu-icon>
            </mu-button>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            active4: 0,
            leaseParking: [], // 出租车位
            seekGroup: [], // 求租车位
            sellvehicle: [],
        };
    },
    created() {
        this.getAll();
        this.seekGetAll();
        this.sellvehicleGetAll();
        this.active4 = parseInt(localStorage.getItem("active4"))
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        vehicle() {
            this.$router.push("/parkingLotCart");
        },
        tabChange() {
            console.log();
        },
        leasePark(item) {
            localStorage.setItem("active4",this.active4)
            localStorage.setItem("parkingLot",JSON.stringify(item))
            this.$router.push('/leasePark')
        },
        rentSeeking(item) {
            localStorage.setItem("active4",this.active4)
            localStorage.setItem("parkingLot",JSON.stringify(item))
            this.$router.push('/rentSeeking')
        },
        sellVehicle(item) {
            localStorage.setItem("active4",this.active4)
            localStorage.setItem("parkingLot",JSON.stringify(item))
            this.$router.push('/sellVehicle')
        },
        // 获取出租车位信息
        getAll() {
            this.$axios({
                url: "admin/mobile/carport/getAll",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: sessionStorage.getItem("userId"),
                    communityId: localStorage.getItem("communityId"),
                    type: "1"
                })
            })
                .then(result => {
                    if (result.data.respCode == "1000") {
                        this.leaseParking = result.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取求租车位信息
        seekGetAll() {
            this.$axios({
                url: "admin/mobile/carport/getAll",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: sessionStorage.getItem("userId"),
                    communityId: localStorage.getItem("communityId"),
                    type: "2"
                })
            })
                .then(result => {
                    if (result.data.respCode == "1000") {
                        this.seekGroup = result.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取出售车位信息
        sellvehicleGetAll() {
            this.$axios({
                url: "admin/mobile/carport/getAll",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: sessionStorage.getItem("userId"),
                    communityId: localStorage.getItem("communityId"),
                    type: "3"
                })
            })
                .then(result => {
                    if (result.data.respCode == "1000") {
                        this.sellvehicle = result.data.data;
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
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.demo-text {
    padding: 0 !important;
}
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
}
.container {
    padding: 0 !important;
}
.create-articles {
    position: absolute;
    right: 20px;
    bottom: 28px;
    /* z-index: 9999; */
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
