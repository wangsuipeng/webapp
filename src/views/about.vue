<template>
    <div class="about">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>关于
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <div class="box-list">当前版本 <span style="margin-left: 40px">1.2.1</span></div>
            <div class="box-list">最新版本 <span style="margin-left: 40px">1.2.2</span></div>
            <div class="upgrade" @click="downloadApk">
                <button>在线升级</button>
            </div>
        </div>
    </div>
</template>
<script>
import Qs from 'qs';
export default {
    data() {
        return {};
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        downloadApk() {
            this.$axios({
                url: "admin/mobile/isNeedUpdate",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    version: '1.2.2',
                    clientType: 'a'
                })
            })
                .then(result => {
                    if (result.data.respCode) {
                        // console.log(result.data.appUrl)
                        window.open(result.data.appUrl);
                    } else {
                        this.$toast.error("目前是最新版本");
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
.container-main {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
}
.box-list {
    width: 100%;
    height: 3rem;
    border: 1px solid #ccc;
    text-align: left;
    padding-left: 25px;
    line-height: 3rem;
}
.box-list:first-child {
    border-bottom: none;
}
.upgrade {
    margin-top: 50px;
    width: 100%;
    height: 3.2rem;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 3.2rem;
    border-radius: 6px;
    background-color: #ff5242;
}
</style>
