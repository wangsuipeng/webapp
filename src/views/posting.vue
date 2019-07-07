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
                <!-- <div class="content">
                    <div class="flex-box" v-ripple>
                        <mu-icon size="50" value="local_parking" color="#ff5242"></mu-icon>
                        <div class="text">车位分享</div>
                    </div>
                    <div class="flex-box" v-ripple>
                        <mu-icon size="50" value="local_see" color="#ff5242"></mu-icon>
                        <div class="text">闲置分享</div>
                    </div>
                    <div class="flex-box" v-ripple @click="loveBank">
                        <mu-icon
                            class="icon-explain"
                            size="50"
                            value="local_shipping"
                            color="#ff5242"
                        ></mu-icon>
                        <div class="text">爱心银行</div>
                    </div>
                </div> -->
                <div class="img-content">
                    <span class="upload-btn" ref="divGenres" @click="choiceImg">
                        <mu-icon value="add_a_photo" :size="size" color="#ddd"></mu-icon>
                        <input
                            type="file"
                            ref="uploadImage"
                            @change="onFileChange"
                            accept="image/*"
                            capture="camera"
                            style="display: none;"
                        />
                    </span>
                    <!-- <span>
                        <img src="../assets/images/325543.jpg" alt srcset />
                    </span> -->
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
            uploadFile: null
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
        choiceImg() {
            let self = this;
            if (!window.plus) {
                self.addPic(); //如果不支持plus,就用本地相册上传即可
                return;
            }
            let title = "选择照片";
            let btns = ["拍照", "相册"];

            var func = function(e) {
                var index = e.index;

                if (index == 1) self.choiceCamera();
                if (index == 2) self.choicePic();
            };
            if (title && btns && btns.length > 0) {
                var btnArray = [];
                for (var i = 0; i < btns.length; i++) {
                    btnArray.push({ title: btns[i] });
                }
                plus.nativeUI.actionSheet(
                    {
                        title: title,
                        cancel: "取消",
                        buttons: btnArray
                    },
                    function(e) {
                        if (func) func(e);
                    }
                );
            }
        },
        choiceCamera() {
            let self = this;
            var cmr = plus.camera.getCamera();
            cmr.captureImage(
                function(path) {
                    plus.io.resolveLocalFileSystemURL(
                        path,
                        function(entry) {
                            self.imgsrc = entry.toLocalURL();
                            self.show = true;
                        },
                        function(e) {
                            plus.nativeUI.toast(
                                "读取拍照文件错误：" + e.message
                            );
                        }
                    );
                },
                function(e) {},
                { index: 1, filename: "_doc/camera/" }
            );
        },

        choicePic() {
            let self = this;
            plus.gallery.pick(
                function(p) {
                    plus.io.resolveLocalFileSystemURL(
                        p,
                        function(entry) {
                            self.imgsrc = entry.toLocalURL();
                            self.show = true;
                        },
                        function(e) {
                            plus.nativeUI.toast(
                                "读取拍照文件错误：" + e.message
                            );
                        }
                    );
                },
                function(e) {
                    plus.nativeUI.toast("读取拍照文件错误：" + e.message);
                },
                {
                    filename: "_doc/camera/",
                    filter: "image"
                }
            );
        },
        upload() {
            var self = this;
            var wt;
            if (window.plus) wt = plus.nativeUI.showWaiting();
            var img = new Image(),
                width = 512, //image resize   压缩后的宽
                quality = 0.5, //image quality  压缩质量
                canvas = document.createElement("canvas"),
                drawer = canvas.getContext("2d");
            img.src = self.imgsrc;
            img.onload = function() {
                //利用canvas压缩图片
                canvas.width = width;
                canvas.height = width * (img.height / img.width);
                drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                var base64 = canvas.toDataURL("image/*", quality);
                var pic = base64.split(",")[1]; //图片的base64编码内容
                var f = self.imgsrc;
                var filename = f.replace(
                    f.substring(0, f.lastIndexOf("/") + 1),
                    ""
                ); //图片名称
                if (self.uploadFile !== null) {
                    //addPic方法得到的图片文件
                    filename = self.uploadFile.name;
                    let reader = new FileReader();
                    reader.readAsDataURL(self.uploadFile);
                    reader.onload = function(e) {
                        img.src = e.target.result;
                    };
                    img.onload = function() {
                        canvas.width = width;
                        canvas.height = width * (img.height / img.width);
                        drawer.drawImage(
                            img,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );
                        base64 = canvas.toDataURL("image/*", quality);
                        pic = base64.split(",")[1];
                    };
                } //此处是将图片上传到服务器的代码，略过
            };
        },
        onFileChange(e) {
            let self = this;
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            let file = files[0]; //File对象
            self.uploadFile = file;
            let reader = new FileReader(); //FileReader对象
            reader.readAsDataURL(file); //该方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyStat变成已完成（DONE），并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读的内容。

            reader.onload = function(e) {
                self.imgsrc = e.target.result; //图片内容的base64编码
                self.show = true;
            };
        },

        addPic: function(e) {
            let els = this.$refs.divGenres.querySelectorAll("input[type=file]");
            els[0].click();
            return false;
        },

        delImage: function() {
            this.imgsrc = "";
            this.show = false;
            this.isPreview = false;
        },

        previewImage: function(url) {
            let vm = this;
            vm.isPreview = true;
            vm.previewImg = url;
        },

        closePreview: function() {
            let vm = this;
            vm.isPreview = false;
            vm.previewImg = "";
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
    margin-left: 15px;
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
</style>
