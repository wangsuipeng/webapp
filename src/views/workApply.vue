<template>
    <div class="workApply">
        <mu-appbar style="width: 100%;" color="#ff5242" z-depth="0">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>
            <span style="color: #fff">报修处理</span>
            <mu-button
                flat
                slot="right"
                @click="updateUserWorkflowInfo"
                style="display: inline-block;color: #fff;font-size: 18px"
            >提交</mu-button>
        </mu-appbar>
        <div class="container-main">
            <div class="partition-line"></div>
            <div class="evaluate">
                <div class="evaluate-title">处理意见</div>
                <div style="margin-top: 20px">
                    <mu-container>
                        <mu-form
                            :model="form"
                            class="mu-demo-form"
                            label-width="100"
                        >
                            <mu-form-item prop="textarea">
                                <mu-text-field
                                    placeholder="工作人员意见"
                                    multi-line
                                    :rows="1"
                                    :rows-max="6"
                                    v-model="form.opinionOne"
                                ></mu-text-field>
                            </mu-form-item>
                        </mu-form>
                    </mu-container>
                </div>
                <!-- <ul>
                    <li>
                        <span style="display: inline-block;float: left;margin-top: 5px">星级评价</span>
                        <span>
                            <van-rate
                                style="display: inline-block;margin-left: 20px"
                                v-model="form.starType"
                                allow-half
                                size="25"
                                color="#f44"
                                void-icon="star"
                                void-color="#eee"
                            />
                        </span>
                        <span style="float: right;margin-right: 60px">非常好</span>
                    </li>
                </ul> -->
            </div>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            form: {
                userId: sessionStorage.getItem("userId"),
                communityId: localStorage.getItem("communityId"),
                opinionOne: "",
                type: "1",
                id: localStorage.getItem("processId"),
            }
        };
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        // 用户评价
        updateUserWorkflowInfo() {
            console.log(this.form.starType)
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
                            // this.$router.goBack();
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
.workApply {
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
    /* line-height: 40px; */
    /* border: 1px solid red; */
}
.evaluate ul li:nth-child(1) {
    margin-top: 0.8rem;
}
.textarea-evaluate {
    width: 100%;
    border-bottom: 1px solid #333;
}
.container {
    padding: 0!important;
}
</style>
