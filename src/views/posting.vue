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
      upImgUrl: ""
    };
  },
  created() {},
  mounted() {
    // if (window.plus) {
    //     this.height = plus.navigator.getStatusbarHeight();
    // }
    mui.back = function() {
      history.go(-1); //回退到上一页面
    };
  },
  methods: {
    //限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,"");
    },
    // 只能输入汉字、英文、数字
    btKeyDown(e) {
       e.target.value = e.target.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,"");
    },
    outPage() {
      this.$router.goBack();
    },
    // 发帖
    postingMsg() {
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
      let fd = new FormData();
      imgData.forEach((item, index) => {
        fd.append("file" + index, item.file); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      });
      fd.append("title", this.postForm.title);
      fd.append("content", this.postForm.content);
      fd.append("category", this.postForm.category);
      fd.append("authorId", this.postForm.authorId);
      fd.append("communityId", this.postForm.communityId);
      fd.append("isPrivate", this.postForm.isPrivate);
      this.$axios({
        url: "admin/mobile/article/publishMsg",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: fd
      })
        .then(result => {
          if (result.data.respCode == "1000") {
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

    // // 组件方法 获取 流
    // async onRead(file) {
    //     console.log(file);
    //     console.log(file.file);
    //     this.files.name = file.file.name; // 获取文件名
    //     this.files.type = file.file.type; // 获取类型
    //     this.picValue = file.file; // 文件流
    //     this.imgPreview(this.picValue);
    // },
    // // 处理图片
    // imgPreview(file) {
    //     let self = this;
    //     let Orientation;
    //     //去获取拍照时的信息，解决拍出来的照片旋转问题
    //     Exif.getData(file, function() {
    //         Orientation = Exif.getTag(this, "Orientation");
    //     });
    //     // 看支持不支持FileReader
    //     if (!file || !window.FileReader) return;
    //     if (/^image/.test(file.type)) {
    //         // 创建一个reader
    //         let reader = new FileReader();
    //         // 将图片2将转成 base64 格式
    //         reader.readAsDataURL(file);
    //         // 读取成功后的回调
    //         reader.onloadend = function() {
    //             // console.log(this.result);
    //             let result = this.result;
    //             let img = new Image();
    //             img.src = result;
    //             //判断图片是否大于500K,是就直接上传，反之压缩图片
    //             if (this.result.length <= 500 * 1024) {
    //                 self.headerImage = this.result;
    //                 self.postImg();
    //             } else {
    //                 img.onload = function() {
    //                     let data = self.compress(img, Orientation);
    //                     self.headerImage = data;
    //                     self.postImg();
    //                 };
    //             }
    //         };
    //     }
    // },
    // // 压缩图片
    // compress(img, Orientation) {
    //     let canvas = document.createElement("canvas");
    //     let ctx = canvas.getContext("2d");
    //     //瓦片canvas
    //     let tCanvas = document.createElement("canvas");
    //     let tctx = tCanvas.getContext("2d");
    //     // let initSize = img.src.length;
    //     let width = img.width;
    //     let height = img.height;
    //     //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    //     let ratio;
    //     if ((ratio = (width * height) / 4000000) > 1) {
    //         // console.log("大于400万像素");
    //         ratio = Math.sqrt(ratio);
    //         width /= ratio;
    //         height /= ratio;
    //     } else {
    //         ratio = 1;
    //     }
    //     canvas.width = width;
    //     canvas.height = height;
    //     //    铺底色
    //     ctx.fillStyle = "#fff";
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    //     //如果图片像素大于100万则使用瓦片绘制
    //     let count;
    //     if ((count = (width * height) / 1000000) > 1) {
    //         // console.log("超过100W像素");
    //         count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
    //         //      计算每块瓦片的宽和高
    //         let nw = ~~(width / count);
    //         let nh = ~~(height / count);
    //         tCanvas.width = nw;
    //         tCanvas.height = nh;
    //         for (let i = 0; i < count; i++) {
    //             for (let j = 0; j < count; j++) {
    //                 tctx.drawImage(
    //                     img,
    //                     i * nw * ratio,
    //                     j * nh * ratio,
    //                     nw * ratio,
    //                     nh * ratio,
    //                     0,
    //                     0,
    //                     nw,
    //                     nh
    //                 );
    //                 ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
    //             }
    //         }
    //     } else {
    //         ctx.drawImage(img, 0, 0, width, height);
    //     }
    //     //修复ios上传图片的时候 被旋转的问题
    //     if (Orientation != "" && Orientation != 1) {
    //         switch (Orientation) {
    //             case 6: //需要顺时针（向左）90度旋转
    //                 this.rotateImg(img, "left", canvas);
    //                 break;
    //             case 8: //需要逆时针（向右）90度旋转
    //                 this.rotateImg(img, "right", canvas);
    //                 break;
    //             case 3: //需要180度旋转
    //                 this.rotateImg(img, "right", canvas); //转两次
    //                 this.rotateImg(img, "right", canvas);
    //                 break;
    //         }
    //     }
    //     //进行最小压缩
    //     let ndata = canvas.toDataURL("image/jpeg", 0.1);
    //     tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    //     return ndata;
    // },
    // // 旋转图片
    // rotateImg(img, direction, canvas) {
    //     //最小与最大旋转方向，图片旋转4次后回到原方向
    //     const min_step = 0;
    //     const max_step = 3;
    //     if (img == null) return;
    //     //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    //     let height = img.height;
    //     let width = img.width;
    //     let step = 2;
    //     if (step == null) {
    //         step = min_step;
    //     }
    //     if (direction == "right") {
    //         step++;
    //         //旋转到原位置，即超过最大值
    //         step > max_step && (step = min_step);
    //     } else {
    //         step--;
    //         step < min_step && (step = max_step);
    //     }
    //     //旋转角度以弧度值为参数
    //     let degree = (step * 90 * Math.PI) / 180;
    //     let ctx = canvas.getContext("2d");
    //     switch (step) {
    //         case 0:
    //             canvas.width = width;
    //             canvas.height = height;
    //             ctx.drawImage(img, 0, 0);
    //             break;
    //         case 1:
    //             canvas.width = height;
    //             canvas.height = width;
    //             ctx.rotate(degree);
    //             ctx.drawImage(img, 0, -height);
    //             break;
    //         case 2:
    //             canvas.width = width;
    //             canvas.height = height;
    //             ctx.rotate(degree);
    //             ctx.drawImage(img, -width, -height);
    //             break;
    //         case 3:
    //             canvas.width = height;
    //             canvas.height = width;
    //             ctx.rotate(degree);
    //             ctx.drawImage(img, -width, 0);
    //             break;
    //     }
    // },
    // //将base64转换为文件
    // dataURLtoFile(dataurl) {
    //     var arr = dataurl.split(","),
    //         bstr = atob(arr[1]),
    //         n = bstr.length,
    //         u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new File([u8arr], this.files.name, {
    //         type: this.files.type
    //     });
    // },
    // //这里写接口
    // async postImg() {
    //     let file = this.dataURLtoFile(this.headerImage);
    //     console.log("这里是最终的结果")
    //     console.log(file)
    //     let formData = new window.FormData();
    //     formData.append("file", file);
    //     // toast_loding(this, "图片上传中···");
    //     try {
    //         let res = await util.ajax.post(this.upImgUrl, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // },

    deleteImg(file) {
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
