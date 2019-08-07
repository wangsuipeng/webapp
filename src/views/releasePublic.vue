<template>
    <div class="container-main">
        <div :style="{height: `${height}px`}" class="top-nav"></div>
        <mu-appbar style="width: 100%;" color="#ff5242" z-depth="0">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>
            <span style="color: #fff">爱心发布</span>
            <mu-button
                flat
                slot="right"
                @click="postingLove"
                style="display: inline-block;color: #fff;font-size: 18px"
            >发布</mu-button>
        </mu-appbar>
        <div class="content">
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="center"></mu-flex>
            </mu-flex>
            <div class="content-text">
                <input
                    type="text"
                    v-model="postForm.serviceName"
                    placeholder="请输入标题..."
                    class="input-text"
                />
                <textarea
                    name
                    id
                    cols="30"
                    v-model="postForm.seviceDetail"
                    rows="10"
                    class="textarea-text"
                    placeholder="说点什么..."
                ></textarea>
                <div class="content-img">
                    <van-uploader
                        :after-read="onRead"
                        @delete="deleteImg"
                        v-model="fileList"
                        accept="image/*"
                        preview-size="60px"
                        multiple
                        :max-count="9"
                        capture
                    />
                </div>
            </div>
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="center"></mu-flex>
            </mu-flex>
            <van-cell-group>
                <van-switch-cell active-color="#ff5242" v-model="checked" title="仅本小区可见" />
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            checked: true,
            size: "46",
            labelPosition: "top",
            form: {
                input: "",
                select: "",
                date: "",
                radio: "",
                checkbox: [],
                switch: false,
                slider: 30,
                textarea: ""
            },
            height: "",
            labelPosition: "top",
            postForm: {
                serviceName: "",// 标题
                seviceDetail: "",// 内容
                points: "2",// 金币
                publishUserId: sessionStorage.getItem("userId"),
            },
            lineBool: false,
            imgsrc: "", //上传的·图片的地址
            show: true, //图片放大预览
            previewImg: "", //预览图片的地址
            isPreview: false, //是否预览当前图片
            isPhoto: true,
            uploadFile: null,
            maxStatus: true,
            list: [],
            images: "",
            imagesId: "",
            dialogImageUrl: "",
            dialogVisible: false,
            fileList: [],
            imgList: [],// 上传的图片集合
            postData: [],// 上传图片的集合
            imgData: [],// 删除的图片名称集合
            formImg: ''
        };
    },
    mounted() {
        // if (window.plus) {
        //     this.height = plus.navigator.getStatusbarHeight();
        // }
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        // 发布公益任务
        postingLove() {
            let imgData = this.postData.filter(item => !this.imgData.some(ele=>ele.file.lastModified===item.file.lastModified));
            let fd = new FormData();
            imgData.forEach((item,index) => {
                fd.append("file"+index, item.file); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
            });
            fd.append("serviceName", this.postForm.serviceName);
            fd.append("seviceDetail", this.postForm.seviceDetail);
            fd.append("points", this.postForm.points);
            fd.append("publishUserId", this.postForm.publishUserId);
            fd.append("communityId", localStorage.getItem("communityId"));
            this.$axios({
                url: "admin/mobile/welfare/publishTask",
                method: "post",
                headers: {
                    "Authorization": sessionStorage.getItem("token")
                },
                data: fd
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data.respCode == 1000) {
                        // this.$router.push("/loveBank");
                        this.$router.goBack();
                    } else {

                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        onRead(file) {
            if (file.constructor == Object) {
                this.postData.push(file)
            } else if (file.constructor == Array) {
                this.postData = this.postData.concat(file)
            }
        },
        deleteImg(file) {
            console.log(file.file.lastModified)
            this.imgData.push(file)
        },
        close(index) {
            this.list.splice(index, 1);
            this.maxStatus = this.list == this.max ? false : true;
        },
        // 查询图片
        getImage() {
            this.$axios({
                url: `admin/mobile/sysFile/showPicForMany?id=${this.imagesId}`,
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: {}
            })
                .then(result => {
                    this.images = result;
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style scoped>
.van-switch-cell {
    background-color: rgba(204, 204, 204, 0.452);
}
.flex-demo {
    width: 100%;
    height: 16px;
    background-color: #f8f8f8;
}
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.top-nav {
    background-color: #2196f3;
}
.content {
    height: calc(100vh - 56px);
    overflow-y: auto;
}
.container-main {
    background-color: #fff;
}
.content-text {
    width: 100%;
    min-height: 16.5rem;
    background-color: #fff;
}
.textarea-text {
    width: 100%;
    height: 10rem;
    outline: none;
    padding: 5px 10px;
}
.upload-btn {
    display: inline-block;
    width: 7rem;
    height: 7rem;
    border-radius: 5px;
    text-align: center;
    line-height: 9.5rem;
    border: 2px dashed #eaeaea;
    box-shadow: 0 3px -1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.input-text {
    width: 100%;
    height: 46px;
    padding-left: 10px;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    outline: none;
}
.flex-wrapper {
    width: 100%;
}
.jurisdiction {
    height: 41px;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    line-height: 41px;
}
.container {
    padding: 0 !important;
}
.title-tip {
    font-size: 16px !important;
}
.mu-form-item {
    margin-bottom: 0;
    padding-bottom: 0;
}
.text-prompts {
    float: left;
    margin-left: 15px;
}
.choice {
    width: 10px !important;
    margin-top: 3px;
}
.clearfix:after {
    content: "."; /*加一段内容*/
    display: block; /*让生成的元素以块级元素显示，占满剩余空间*/
    height: 0; /*避免生成的内容破坏原有布局高度*/
    clear: both; /*清除浮动*/
    visibility: hidden; /*让生成的内容不可见*/
}
.clearfix {
    zoom: 1; /*为IE6，7的兼容性设置*/
}
.img-content {
    width: 100%;
}
.img-content span {
    display: inline-block;
    width: 7rem;
    height: 7rem;
}
.img-content span img {
    display: inline-block;
    width: 100%;
    height: 100%;
}
.content-img {
    width: 100%;
    padding: 0 10px;
}
.flex-box {
    width: 30.3%;
    height: 7rem;
    margin-left: 0.6rem;
    margin-bottom: 0.5rem;
    float: left;
    border: 1px solid red;
    text-align: center;
}
.images {
    position: relative;
}
.images img {
    width: 100%;
    height: 100%;
}
.close {
    position: absolute;
    top: -85px;
    right: 0;
}
</style>
<style>
.content-img .el-upload--picture-card {
    width: 30% !important;
    height: 7.5rem !important;
    line-height: 8.5rem !important;
}
.el-upload-list--picture-card .el-upload-list__item {
    width: 30% !important;
    height: 7.5rem !important;
}
</style>
