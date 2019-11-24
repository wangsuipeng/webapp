<template>
  <div class="container-main">
    <div :style="{height: `${height}px`}" class="top-nav"></div>
    <mu-appbar style="width: 100%;" color="#ff5242" z-depth="0">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
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
          @keyup="btKeyUp"
          @keydown="btKeyDown"
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
          <van-uploader
            id="input"
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
import Exif from "exif-js";
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
        authorId: sessionStorage.getItem("userId"),
        communityId: localStorage.getItem("communityId"),
        isPrivate: ""
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
      postData: [], // 上传的图片的集合
      imgData: [], // 删除的图片名称集合
      formImg: "",
      files: {
        name: "",
        type: ""
      },
      headerImage: null,
      picValue: null,
      upImgUrl: "",
      previewList: [],
      uploadList: [],
      quality: "0.7",
      imgLength: 0
    };
  },
  created() {},
  mounted() {
    // if (window.plus) {
    //     this.height = plus.navigator.getStatusbarHeight();
    // }
    var file = document.getElementById("input");
    if (this.getIos()) {
      file.removeAttribute("capture");
    }
    mui.back = function() {
      history.go(-1); //回退到上一页面
    };
  },
  watch: {
    "uploadList.length": {
      handler(newValue, oldValue) {
        if (newValue == this.imgLength) {
          this.releaseApi(this.uploadList);
        }
      }
    }
  },
  methods: {
    getIos() {
      if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true;
      } else {
        return false;
      }
    },
    //限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
    },
    // 只能输入汉字、英文、数字
    btKeyDown(e) {
      e.target.value = e.target.value.replace(
        /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,
        ""
      );
    },
    outPage() {
      this.$router.goBack();
    },
    // 发帖
    postingMsg() {
      console.log(this.imgLength);
      if (this.imgLength === 0) {
        this.releaseApi([]);
        return;
      }
      if (this.checked) {
        this.postForm.isPrivate = 1;
      } else {
        this.postForm.isPrivate = 0;
      }
      let imgData = this.postData.filter(
        item =>
          !this.imgData.some(
            ele => ele.file.lastModified === item.file.lastModified
          )
      );
      let compressImg = [];
      for (let i = 0; i < imgData.length; i++) {
        compressImg.push(imgData[i].file);
      }
      this.preview(compressImg);
    },
    releaseApi(list) {
      let files = JSON.parse(JSON.stringify(list));
      let formData = new FormData();
      list.forEach((item, index) => {
        formData.append("file" + index, item); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      });
      formData.append("title", this.postForm.title);
      formData.append("content", this.postForm.content);
      formData.append("category", this.postForm.category);
      formData.append("authorId", this.postForm.authorId);
      formData.append("communityId", this.postForm.communityId);
      formData.append("isPrivate", this.postForm.isPrivate);
      this.$axios({
        url: "admin/mobile/article/publishMsg",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: formData
      })
        .then(result => {
          if (result.data.respCode == "1000") {
            this.$toast({
              message: "发布成功",
              position: "middle",
              duration: 1500
            });
            this.$router.goBack();
          } else if (result.data.respCode === "1001") {
            this.$toast.fail(result.data.errorMsg);
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
      this.imgLength = this.postData.length;
    },
    deleteImg(file, index) {
      this.imgData.push(file);
    },
    preview(files) {
      files.forEach((file, i) => {
        const size = file.size / 1024;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (size > 1024) {
            this.canvasDataURL(
              reader.result,
              { quality: this.quality },
              base64 => {
                this.previewList.push(base64);
                this.uploadList.push(
                  this.convertBase64UrlToBlob(base64, file.name)
                );
              }
            );
          } else {
            this.previewList.push(reader.result);
            this.uploadList.push(
              this.convertBase64UrlToBlob(reader.result, file.name)
            );
          }
          if (i === files.length - 1) {
          }
        };
      });
    },
    canvasDataURL(path, obj, callback) {
      const img = new Image();
      img.src = path;
      img.onload = e => {
        // 默认按比例压缩
        let w = img.width;
        let h = img.height;
        const scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        let quality = 0.7; // 默认图片质量为0.7
        // 生成canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        // 创建属性节点
        const anw = document.createAttribute("width");
        anw.nodeValue = w;
        const anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(img, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        const base64 = canvas.toDataURL("image/jpeg", quality);
        // 回调函数返回base64的值
        callback(base64);
      };
    },
    convertBase64UrlToBlob(urlData, name) {
      const arr = urlData.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], name, {
        type: mime
      });
    },
    delPreviewImg(e) {
      this.previewList.splice(e, 1);
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
