<template>
    <div class="water">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;margin-bottom: 10px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>供水报修
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
                    <mu-form-item prop="workflowId" label="处理流程">
                        <mu-select v-model="submitForm.workflowId" full-width>
                            <mu-option
                                v-for="(item,index) in options"
                                avatar
                                :key="index"
                                :label="item.processName"
                                :value="item.id"
                            >
                                <mu-list-item-content>
                                    <mu-list-item-title>{{item.processName}}</mu-list-item-title>
                                </mu-list-item-content>
                            </mu-option>
                        </mu-select>
                    </mu-form-item>
                    <mu-form-item prop="serviceDate" label="可上门时间">
                        <mu-select v-model="submitForm.serviceDate" full-width>
                            <mu-option
                                v-for="(language,index) in languages"
                                avatar
                                :key="index"
                                :label="language"
                                :value="language"
                            >
                                <mu-list-item-action avatar>
                                    <mu-icon size="36" value="timer" color="blue"></mu-icon>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title>{{language}}</mu-list-item-title>
                                </mu-list-item-content>
                            </mu-option>
                        </mu-select>
                    </mu-form-item>
                    <mu-form-item label="问题描述">
                        <mu-text-field multi-line :rows="1" :rows-max="6" v-model="submitForm.detail"></mu-text-field>
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
            languages: [
                "9:00-11:00",
                "11:00-13:00",
                "13:00-15:00",
                "15:00-17:00"
            ],
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
                workflowType: '1',
                communityId: 14
            },
            fileList: [],
            postData: [],// 上传的图片的集合
            imgData: [],// 删除的图片名称集合
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
        onRead(file) {
            if (file.constructor == Object) {
                this.postData.push(file);
            } else if (file.constructor == Array) {
                this.postData = this.postData.concat(file);
            }
        },
        deleteImg(file) {
            this.imgData.push(file);
        },
        close(index) {
            this.list.splice(index, 1);
            this.maxStatus = this.list == this.max ? false : true;
        },
        // 报修申请
        saveWorkflow() {
            let imgData = this.postData.filter(item => !this.imgData.some(ele=>ele.file.lastModified===item.file.lastModified));
            let fd = new FormData();
            imgData.forEach((item,index) => {
                fd.append("file"+index, item.file); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
            });
            // fd.append("userId", this.submitForm.userId);
            fd.append("location", this.submitForm.location);
            fd.append("detail", this.submitForm.detail);
            fd.append("serviceDate", this.submitForm.serviceDate);
            fd.append("communityId", this.submitForm.communityId);
            fd.append("workflowId", this.submitForm.workflowId);
            fd.append("userId", sessionStorage.getItem("userId"));
            this.$axios({
                url: "admin/mobile/processCheck/saveWorkflowInfo",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: fd
            }).then((result) => {
                if (result.data.respCode === '1000') {
                    this.$router.goBack();
                }
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
                    communityId: localStorage.getItem("communityId"),
                    workflowType: '1',
                    userId: sessionStorage.getItem("userId"),
                })
            }).then((result) => {
                if (result.data.respCode == 1000) {
                    this.options = result.data.data;
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
    height: 2.2rem;
    background-color: #ff5242;
    color: #fff;
    line-height: 2.2rem;
    text-align: center;
    border-radius: 6px;
    margin-top: 15px;
}
</style>
