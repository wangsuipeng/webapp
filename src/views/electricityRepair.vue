<template>
    <div class>
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;margin-bottom: 10px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>电力报修
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="add"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-container>
                <mu-form
                    :model="submitForm"
                    class="mu-demo-form"
                    :label-position="labelPosition"
                    label-width="100"
                >
                    <mu-form-item prop="location" label="报修位置">
                        <mu-text-field v-model="submitForm.location"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="workflowId" label="处理人员">
                        <mu-select v-model="submitForm.workflowId">
                            <mu-option
                                v-for="(item,index) in options"
                                :key="index"
                                :label="item.phoneOneName"
                                :value="item.id"
                            ></mu-option>
                        </mu-select>
                    </mu-form-item>
                    <mu-form-item prop="serviceDate" label="可上门时间">
                        <mu-date-input v-model="submitForm.serviceDate" type="dateTime" actions></mu-date-input>
                    </mu-form-item>
                    <mu-form-item label="问题描述">
                        <mu-text-field multi-line :rows="2" :rows-max="6" v-model="submitForm.detail"></mu-text-field>
                    </mu-form-item>
                    <div class="content-img">
                        <van-uploader
                            v-model="fileList"
                            accept="image/*"
                            preview-size="60px"
                            multiple
                            :max-count="9"
                            capture
                        />
                    </div>
                    <div>
                        <div class="submit" @click="saveWorkflow">提交</div>
                    </div>
                </mu-form>
            </mu-container>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            options: [],
            labelPosition: "top",
            submitForm: {
                userId: sessionStorage.getItem("userId"),
                location: "",// 位置
                detail: "",// 事件详情
                pictureId: "",//图片
                serviceDate: "",// 时间
                workflowId: "",// 社区或者物业工作流ID
                communityId: localStorage.getItem("communityId"),// 社区id
            },
            processForm: {
                userId: sessionStorage.getItem("userId"),
                workflowType: '2',
                communityId: 14
            },
            fileList: [],
        };
    },
    created () {
        // this.getUserApplyWorkflowInfo();  
        this.getCompanyCommunityWorkFlowInfo();
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        // 报修申请
        saveWorkflow() {
            this.$axios({
                url: "admin/mobile/processCheck/saveWorkflowInfo",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify(this.submitForm)
            }).then((result) => {
                if (result.data.respCode === '1000') {
                    this.$router.goBack();
                }
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });
        },
        // 获取维修人员
        getCompanyCommunityWorkFlowInfo() {
            this.$axios({
                url: "admin/mobile/processCheck/getCompanyCommunityWorkFlowInfo",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    communityId: localStorage.getItem("communityId")
                })
            }).then((result) => {
                if (result.data.respCode == 1000) {
                    this.options = result.data.data.list;
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        //获取用户申请流程信息
        getUserApplyWorkflowInfo() {
            this.$axios({
                url: "admin/mobile/processCheck/getUserApplyWorkflowInfo",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify(this.processForm)
            }).then((result) => {
                console.log(result)
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
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
}
.submit {
    width: 100%;
    height: 2.1rem;
    background-color: #ff5242;
    color: #fff;
    line-height: 2.1rem;
    text-align: center;
    border-radius: 6px;
    margin-top: 15px;
}
</style>
