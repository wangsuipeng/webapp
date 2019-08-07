<template>
    <div class="myApplication">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>我的申请
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-list>
                <mu-sub-header>我的申请</mu-sub-header>
                <mu-list-item avatar button :ripple="false" class="muse-list" v-for="(item,index) in postContent" :key="index">
                    <!-- <mu-list-item-action>
                        <mu-avatar>
                            <img src="../../assets/images/avatar1.jpg" />
                        </mu-avatar>
                    </mu-list-item-action> -->
                    <mu-list-item-title>{{item.location}}</mu-list-item-title>
                    <mu-list-item-action>
                        <span v-if="item.type === '0'">待处理</span>
                        <span v-else>已完成</span>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
            <mu-list>
                <mu-sub-header>我的处理</mu-sub-header>
                <mu-list-item avatar button :ripple="false" class="muse-list" v-for="(item,index) in postContent" :key="index">
                    <!-- <mu-list-item-action>
                        <mu-avatar>
                            <img src="../../assets/images/avatar1.jpg" />
                        </mu-avatar>
                    </mu-list-item-action> -->
                    <mu-list-item-title>{{item.location}}</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon value="chat_bubble"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            postContent: []
        };
    },
    created() {
        this.getUserApplyWorkflowInfo();
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        getUserApplyWorkflowInfo() {
            this.$axios({
                url: "admin/mobile/processCheck/getUserApplyWorkflowInfo",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: sessionStorage.getItem("userId"),
                    communityId: localStorage.getItem("communityId")
                })
            })
                .then(result => {
                    if (result.status === 200) {
                        if (result.data.respCode == "1000") {
                            this.postContent = result.data.data;
                        }
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
.muse-list {
    position: relative;
}
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
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
