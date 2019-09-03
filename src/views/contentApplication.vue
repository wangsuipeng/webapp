<template>
    <div class="contentApplication">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>报修内容
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-container>
                <mu-row gutter>
                    <mu-col span="12">
                        <mu-paper :z-depth="0">
                            <mu-list>
                                <mu-list-item>
                                    <mu-list-item-content>
                                        <mu-list-item-title>
                                            位置：
                                            <span>{{title}}</span>
                                        </mu-list-item-title>
                                    </mu-list-item-content>
                                </mu-list-item>
                                <mu-divider shallow-inset></mu-divider>
                                <mu-list-item>
                                    <mu-list-item-content>
                                        <mu-list-item-title>
                                            事项：
                                            <span>{{processName}}</span>
                                        </mu-list-item-title>
                                    </mu-list-item-content>
                                </mu-list-item>
                                <mu-divider shallow-inset></mu-divider>
                                <mu-list-item>
                                    <mu-list-item-content>
                                        <mu-list-item-title>
                                            描述：
                                            <span>{{content}}</span>
                                        </mu-list-item-title>
                                    </mu-list-item-content>
                                </mu-list-item>
                            </mu-list>
                        </mu-paper>
                    </mu-col>
                </mu-row>
            </mu-container>
            <mu-flex justify-content="center" class="evaluatebtn">
                <span v-if="type == 0"></span>
                <van-button v-else type="danger" @click="openFullscreenDialog">评价</van-button>
            </mu-flex>
            <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
                <mu-appbar title="报修评价" color="#ff5242">
                    <mu-button slot="left" icon @click="closeFullscreenDialog">
                        <mu-icon value="close"></mu-icon>
                    </mu-button>
                    <mu-button
                        slot="right"
                        style="font-size: 16px"
                        flat
                        @click="updateUserWorkflowInfo"
                    >发表</mu-button>
                </mu-appbar>
                <div>
                    <div class="partition-line"></div>
                    <div class="evaluate">
                        <div class="evaluate-title">报修评价</div>
                        <div style="margin-top: 20px">
                            <mu-container>
                                <mu-form :model="form" class="mu-demo-form" label-width="100">
                                    <mu-form-item prop="textarea">
                                        <mu-text-field
                                            placeholder="用户意见"
                                            multi-line
                                            :rows="1"
                                            :rows-max="6"
                                            v-model="form.userOpinion"
                                        ></mu-text-field>
                                    </mu-form-item>
                                </mu-form>
                            </mu-container>
                        </div>
                        <ul>
                            <li>
                                <span style="display: inline-block;float: left;margin-top: 5px">星级评价</span>
                                <span>
                                    <van-rate
                                        style="display: inline-block;margin-left: 20px"
                                        v-model="form.starType"
                                        size="25"
                                        color="#f44"
                                        void-icon="star"
                                        void-color="#eee"
                                    />
                                </span>
                                <span
                                    style="float: right;margin-right: 60px;margin-top: 4px"
                                    v-if="form.starType == 1"
                                >非常差</span>
                                <span
                                    style="float: right;margin-right: 60px;margin-top: 4px"
                                    v-else-if="form.starType == 2"
                                >差</span>
                                <span
                                    style="float: right;margin-right: 60px;margin-top: 4px"
                                    v-else-if="form.starType == 3"
                                >一般</span>
                                <span
                                    style="float: right;margin-right: 60px;margin-top: 4px"
                                    v-else-if="form.starType == 4"
                                >好</span>
                                <span
                                    style="float: right;margin-right: 60px;margin-top: 4px"
                                    v-else-if="form.starType == 5"
                                >非常好</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </mu-dialog>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
import { Dialog } from "vant";
export default {
    data() {
        return {
            good: "",
            openFullscreen: false,
            content: "",
            title: "",
            processName: "",
            type: "",
            form: {
                userId: sessionStorage.getItem("userId"),
                communityId: localStorage.getItem("communityId"),
                userOpinion: "",
                type: "2",
                id: JSON.parse(localStorage.getItem("process")).id,
                starType: 0
            }
        };
    },
    components: {
        [Dialog.Component.name]: Dialog.Component
    },
    created() {
        this.content = JSON.parse(localStorage.getItem("process")).detail;
        this.title = JSON.parse(localStorage.getItem("process")).location;
        this.processName = JSON.parse(
            localStorage.getItem("process")
        ).processName;
        this.type = JSON.parse(localStorage.getItem("process")).type;
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        openFullscreenDialog() {
            this.openFullscreen = true;
        },
        closeFullscreenDialog() {
            this.openFullscreen = false;
        },
        // 用户评价
        updateUserWorkflowInfo() {
            console.log(this.form.starType);
            this.$axios({
                url: "admin/mobile/processCheck/updateUserWorkflowInfo",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify(this.form)
            })
                .then(result => {
                    if (result.status === 200) {
                        if (result.data.respCode == "1000") {
                            this.openFullscreen = false;
                            this.$toast("评论成功");
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
.contentApplication {
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
.partition-line {
    width: 100%;
    height: 0.6rem;
    background-color: #f4f4f4;
}
.evaluate-title {
    margin-top: 0.3rem;
    font-size: 14px;
}
.evaluate {
    padding: 0 0.8rem;
}
.evaluate ul {
    padding-left: 0 !important;
}
.evaluate ul li {
    width: 100%;
    height: 40px;
}
.evaluate ul li:nth-child(1) {
    margin-top: 0.8rem;
}
.textarea-evaluate {
    width: 100%;
    border-bottom: 1px solid #333;
}
.container {
    padding: 0 !important;
}
.evaluatebtn {
    padding: 0 0.5rem;
    margin-top: 0.6rem;
}
</style>
