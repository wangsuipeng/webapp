<template>
    <div class="container-main">
        <div :style="{height: `${height}px`}" class="top-nav"></div>
        <mu-appbar style="width: 100%;" color="#ff5242" z-depth="0">
            <mu-button icon slot="left" @click="outPage">
                <mu-icon value="keyboard_arrow_left" :size="size" color="#fff"></mu-icon>
            </mu-button>
            <span style="color: #fff">新帖子</span>
            <mu-button
                flat
                slot="right"
                @click="postingMsg"
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
                    placeholder="说点什么..."
                ></textarea>
                <div class="content-img">
                    <!-- <div class="flex-box">
                        <span class="upload-btn" ref="divGenres" @click="chooseType">
                            <mu-icon value="add_a_photo" :size="size" color="#ddd"></mu-icon>
                            <input
                                type="file"
                                id="upload_file"
                                ref="uploadImage"
                                @change="inputChange"
                                accept="image/*"
                                capture="camera"
                                style="display: none;"
                            />
                        </span>
                    </div>
                    <div class="flex-box">
                        <span class="images">
                            <img src="images"/>
                        </span>
                    </div>-->
                    <van-uploader
                        :after-read="onRead"
                        v-model="fileList"
                        accept="image/*"
                        preview-size="88px"
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
                title: "",
                content: "",
                category: "2",
                authorId: sessionStorage.getItem("userId")
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
            postData: []
        };
    },
    mounted() {
        // if (window.plus) {
        //     this.height = plus.navigator.getStatusbarHeight();
        // }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        outPage() {
            this.$router.goBack();
        },
        // 发帖
        postingMsg() {
            this.$axios({
                url: "admin/mobile/article/publishMsg",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: this.postForm
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data.respCode == 1000) {
                        this.$router.push("/familyD");
                    } else {
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        chooseType() {
            document.getElementById("upload_file").click();
        },
        onRead(file) {
            // 上传图片到图片服务器
            // this.$refs.clothImg.src = file.content
            console.log(file);
            this.postData.push(file); // postData是一个数组
            // let url = API + "/upload?type=99";
            let fd = new FormData();
            fd.append("upImgs", file.file);
            console.log(fd);
            this.$axios({
                url: "admin/mobile/sysFile/upload",
                method: "post",
                headers: {
                    'Authorization': sessionStorage.getItem('token')
                },
                data: fd
            }).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });
            // this.axios
            // .post(url, fd, {
            // headers: {
            // "Content-Type": "multipart/form-data"
            // }
            // })
            // .then(res => {
            // this.imgUrlListValue.push(res.data.urls[0].image); //这里上传到指定的图片服务器，成功后会返回图片的url
            // })
            // .catch(err => {
            // alert(err);
            // });
        },
        close(index) {
            this.list.splice(index, 1);
            this.maxStatus = this.list == this.max ? false : true;
        },
        async inputChange(e) {
            let files = e.target.files;
            let len = this.list.length + files.length;
            if (len > this.max) {
                document.getElementById("upload_file").value = "";
                this.$toast.info(`最多允许上传${this.max}张`);
                return;
            }

            let uploadAll = [].slice.call(files, 0).map(this.upload);
            //使用object.values(files)，测试安卓存在兼容性问题，替换为[].slice.call(files ,0)

            // this.$ui.loading.open({
            //     //上传中效果，可自行替换。
            //     text: "上传中...",
            //     spinnerType: "fading-circle"
            // });
            let result = await Promise.all(uploadAll);
            document.getElementById("upload_file").value = "";
            // this.$ui.loading.close();
        },
        upload(file, index) {
            return new Promise(async (resolve, reject) => {
                let form = new FormData();
                form.append("file", file);
                // form.append("***"); //根据上传入参添加参数

                let result = await this.$axios({
                    url: "admin/mobile/sysFile/upload",
                    method: "post",
                    headers: {
                        Authorization: sessionStorage.getItem("token")
                    },
                    data: form
                });
                // this.images = result.data.name;
                this.imagesId = result.data.id;
                this.getImage();
                console.log(result);
                // if (result.cd != 0) {
                //     //失败处理
                //     this.$toast.info(
                //         `第${index + 1}张(${file.name})上传出错(已忽略)`
                //     );
                //     resolve(result);
                //     return;
                // }
                // this.list.push(result.data.url);
                // if (this.list.length == this.max) {
                //     this.maxStatus = false;
                // }
                resolve(result);
            });
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
    min-height: 21.5rem;
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
