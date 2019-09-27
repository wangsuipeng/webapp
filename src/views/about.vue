<template>
    <div class="about">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>关于
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <div class="box-list">
                当前版本
                <span style="margin-left: 40px" id="version">1.5.7</span>
            </div>
            <div class="box-list">
                最新版本
                <span style="margin-left: 40px">{{newVersions}}</span>
            </div>
            <div class="upgrade" @click="downloadApk">
                <button>在线升级</button>
            </div>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            appVersion: "",
            version: "1.5.6",
            newVersions: ''
        };
    },
    created() {
        this.newVersion();
    },
    mounted () {
        mui.back = function () {
            history.go(-1); //回退到上一页面
        };
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        newVersion() {
            // let version = document.getElementById("version").innerText;
            this.$axios({
                url: "admin/mobile/isNeedUpdate",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    version: '1.5.5',
                    clientType: "a"
                })
            }).then((result) => {
                this.newVersions = result.data.appVersion;
            }).catch((err) => {
                console.log(err)
            });
        },
        downloadApk() {
            let version = document.getElementById("version").innerText;
            this.$axios({
                url: "admin/mobile/isNeedUpdate",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    version: version,
                    clientType: "a"
                })
            })
                .then(result => {
                    if (result.data.respCode == "1000") {
                        if (result.data.isNeedUpdate == "1") {
                            this.version = result.data.appVersion;
                            let url = result.data.appUrl;
                            plus.nativeUI.showWaiting("下载中...");
                            //创建下载管理对象
                            var SX_down = plus.downloader.createDownload(
                                url,
                                {},
                                function(d, status) {
                                    // 下载完成
                                    if (status == 200) {
                                        plus.nativeUI.closeWaiting();
                                        //下载成功后的回调函数
                                        plus.nativeUI.toast(
                                            "下载成功，准备安装" + d.filename
                                        );
                                        plus.runtime.install(
                                            d.filename,
                                            {},
                                            function() {
                                                // plus.nativeUI.toast("安装成功");
                                                plus.runtime.restart();
                                            },
                                            function(e) {
                                                plus.nativeUI.toast(
                                                    d.filename + "安装失败"
                                                );
                                                // alert(JSON.stringify(e));
                                            }
                                        );
                                    } else {
                                        alert("下载失败 " + status);
                                    }
                                }
                            );
                            //开始下载任务
                            SX_down.start();
                        } else {
                            this.$toast("当前已是最新版本");
                        }
                    } else {
                        this.$toast.error("下载失败");
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
    height: 2.4rem;
    border: 1px solid #ccc;
    text-align: left;
    padding-left: 25px;
    line-height: 2.4rem;
}
.box-list:first-child {
    border-bottom: none;
}
.upgrade {
    margin-top: 2rem;
    width: 100%;
    height: 2.2rem;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 2.2rem;
    border-radius: 6px;
    background-color: #ff5242;
}
.upgrade button {
    width: 100%;
    height: 2.2rem;
}
</style>
