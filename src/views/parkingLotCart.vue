<template>
    <div class="container-main">
        <div :style="{height: `${height}px`}" class="top-nav"></div>
        <mu-appbar style="width: 100%;height: 2.8rem" color="#ff5242" z-depth="0">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>
            <span style="color: #fff">车位发布</span>
            <mu-button
                flat
                slot="right"
                @click="publishParkingSpaces"
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
                    v-model="postForm.title"
                    placeholder="请输入标题..."
                    class="input-text"
                />
                <textarea
                    name
                    id
                    cols="30"
                    v-model="postForm.content"
                    rows="10"
                    class="textarea-text"
                    placeholder="输入车位详情..."
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
            <van-radio-group v-model="postForm.type">
                <van-cell-group>
                    <van-cell title="出租车位" clickable @click="postForm.type = '1'">
                        <van-radio checked-color="#ff5242" slot="right-icon" name="1" />
                    </van-cell>
                    <van-cell title="求租车位" clickable @click="postForm.type = '2'">
                        <van-radio checked-color="#ff5242" slot="right-icon" name="2" />
                    </van-cell>
                    <van-cell title="车位出售" clickable @click="postForm.type = '3'">
                        <van-radio checked-color="#ff5242" slot="right-icon" name="3" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
                title: "",// 标题
                content: "",// 内容
                userId: sessionStorage.getItem("userId"),
                communityId: localStorage.getItem("communityId"),
                type: "",// 类型
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
            imgList: [], // 上传的图片集合
            postData: [], // 上传的图片的集合
            imgData: [], // 删除的图片名称集合
            formImg: ""
        };
    },
    created() {
        
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
        // 发布车位
        publishParkingSpaces() {
            let imgData = this.postData.filter(
                item =>
                    !this.imgData.some(
                        ele => ele.file.lastModified === item.file.lastModified
                    )
            );
            let fd = new FormData();
            imgData.forEach((item, index) => {
                fd.append("file" + index, item.file); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
            });
            fd.append("title", this.postForm.title);
            fd.append("content", this.postForm.content);
            fd.append("userId", this.postForm.userId);
            fd.append("communityId", this.postForm.communityId);
            fd.append("type", this.postForm.type);
            this.$axios({
                url: "admin/mobile/carport/save",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: fd
            })
                .then(result => {
                    if (result.data.respCode == '1000') {
                        this.$router.goBack();
                    } else if (result.data.respCode === "1001") {
                        this.$toast.warning(result.data.errorMsg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        onRead(file) {
            if (file.constructor == Object) {
                this.postData.push(file);
            } else if (file.constructor == Array) {
                this.postData = this.postData.concat(file);
            }
        },
        deleteImg(file) {
            console.log(file.file.lastModified);
            this.imgData.push(file);
        },
        close(index) {
            this.list.splice(index, 1);
            this.maxStatus = this.list == this.max ? false : true;
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
    height: 0.6rem;
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
