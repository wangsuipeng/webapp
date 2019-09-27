<template>
  <div class="personalCenter">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>个人资料
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <mu-flex class="flex-wrapper" justify-content="start">
      <mu-flex class="flex-demo" justify-content="center">
        <mu-row justify-content="center">
          <h2 class="nickname">{{nickName}}</h2>
          <mu-avatar :size="size" class="avatar-person" @click="uploadHeadImg">
            <img :src="imgName" />
          </mu-avatar>
          <input type="file" accept="image/*" @change="onRead" class="hiddenInput dn" />
        </mu-row>
      </mu-flex>
    </mu-flex>
    <mu-container>
      <mu-row gutter>
        <mu-col span="12">
          <mu-paper>
            <mu-list>
              <mu-divider shallow-inset></mu-divider>
              <mu-list-item v-ripple @click.native="nickNames">
                <div class="title-info">
                  <span>昵称</span>
                </div>
                <div style="position: absolute; right: -15px;">
                  <span class="content-text">{{nickName}}</span>
                  <mu-list-item-action>
                    <mu-icon value="keyboard_arrow_right" color="#ccc"></mu-icon>
                  </mu-list-item-action>
                </div>
              </mu-list-item>
              <mu-divider shallow-inset></mu-divider>
              <mu-list-item v-ripple @click.native="mobilePhone">
                <div class="title-info">
                  <span>手机</span>
                </div>
                <div style="position: absolute; right: -15px;">
                  <span class="content-text">{{phone}}</span>
                  <mu-list-item-action>
                    <mu-icon value="keyboard_arrow_right" color="#ccc"></mu-icon>
                  </mu-list-item-action>
                </div>
              </mu-list-item>
              <mu-divider shallow-inset></mu-divider>
              <mu-list-item v-ripple @click.native="gender">
                <div class="title-info">
                  <span>性别</span>
                </div>
                <div style="position: absolute; right: -15px">
                  <span class="content-text">{{sex}}</span>
                  <mu-list-item-action>
                    <mu-icon value="keyboard_arrow_right" color="#ccc"></mu-icon>
                  </mu-list-item-action>
                </div>
              </mu-list-item>
              <mu-divider shallow-inset></mu-divider>
              <mu-list-item v-ripple @click.native="changePassword">
                <mu-list-item-content>
                  <mu-list-item-title style="font-size: 14px">修改密码</mu-list-item-title>
                </mu-list-item-content>
                <mu-list-item-action>
                  <mu-icon value="keyboard_arrow_right" color="#ccc"></mu-icon>
                </mu-list-item-action>
              </mu-list-item>
              <mu-divider shallow-inset></mu-divider>
              <mu-list-item v-ripple @click.native="outLogin">
                <mu-list-item-content>
                  <mu-list-item-title style="color: #ff5242;font-size: 14px">退出登录</mu-list-item-title>
                </mu-list-item-content>
                <mu-list-item-action>
                  <mu-icon value="keyboard_arrow_right" color="#ccc"></mu-icon>
                </mu-list-item-action>
              </mu-list-item>
            </mu-list>
          </mu-paper>
        </mu-col>
      </mu-row>
    </mu-container>

    <mu-container>
      <mu-bottom-sheet :open.sync="open">
        <mu-list @item-click="closeBottomSheet">
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="camera_alt" color="orange"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>拍照</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="photo_size_select_actual" color="blue"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>选取照片</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </mu-container>
  </div>
</template>
<script>
import Qs from "qs";
import imgSrc from "../assets/images/avatar.png";
import { Dialog } from "vant";
import Exif from "exif-js";
export default {
  data() {
    return {
      size: 56,
      open: false,
      imgName: "", // 头像
      nickName: "", // 昵称
      sex: "", // 性别
      phone: "", // 手机
      imagesId: "", // 查询图片的id
      files: {
        name: "",
        type: ""
      },
      headerImage: null,
      picValue: null,
      upImgUrl: null
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  created() {
    if (localStorage.getItem("nickName") == "null") {
      this.nickName = "";
    } else {
      this.nickName = localStorage.getItem("nickName");
    }
    if (this.$store.getters.headPortrait == "") {
      this.imgName = imgSrc;
    } else {
      this.imgName =
        "http://103.26.76.116:9999/" +
        "admin/welfare/sysFile/showPicForMany?id=" +
        this.$store.getters.headPortrait;
    }
    this.sex = localStorage.getItem("sex");
    this.phone = localStorage.getItem("phone");
    this.getUserInfoByUser();
  },
  mounted() {
    mui.back = function() {
      history.go(-1); //回退到上一页面
    };
  },
  methods: {
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    outPage() {
      this.$router.goBack();
    },
    nickNames() {
      this.$router.push("/nickName");
    },
    mobilePhone() {
      this.$router.push("/mobilePhone");
    },
    gender() {
      this.$router.push("/gender");
    },
    changePassword() {
      this.$router.push("/changePassword");
    },
    // 上传图片
    // upload(e) {
    //   let files = e.target.files || e.dataTransfer.files;
    //   if (!files.length) return;
    //   this.picValue = files[0];
    //   this.imgPreview(this.picValue);
    // },
    uploadHeadImg() {
      this.$el.querySelector(".hiddenInput").click();
    },

    // 组件方法 获取 流
    async onRead(e) {
      let target = e.target || e.srcElement;
      let file = target.files[0];
      this.files.name = file.name; // 获取文件名
      this.files.type = file.type; // 获取类型
      this.picValue = file; // 文件流
      this.imgPreview(this.picValue);
    },
    // 处理图片
    imgPreview(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          // console.log(this.result);
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于500K,是就直接上传，反之压缩图片
          if (this.result.length <= 500 * 1024) {
            self.headerImage = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage = data;
              self.postImg();
            };
          }
        };
      }
    },
    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      // let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
    // 旋转图片
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    //将base64转换为文件
    dataURLtoFile(dataurl) {
      var arr = dataurl.split(","),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], this.files.name, {
        type: this.files.type
      });
    },
    //这里写接口
    async postImg() {
      let file = this.dataURLtoFile(this.headerImage);
      console.log("最终结果start");
      console.log(file);
      console.log("最终结果end");
      let formData = new window.FormData();
      formData.append("file", file);
      this.$axios({
        url: "admin/welfare/sysFile/upload",
        method: "post",
        data: formData
      })
        .then(result => {
          this.imagesId = result.data.id;
          this.imgName =
            "http://103.26.76.116:9999/" +
            "admin/welfare/sysFile/showPicForMany?id=" +
            result.data.id;
          this.$store.dispatch("HAND_PORTRAIT", this.imagesId);
          this.editImg();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // // 将头像显示
    // handleFile(e) {
    //   let target = e.target || e.srcElement;
    //   let file = target.files[0];
    //   console.log(file);
    //   let formImg = new FormData(); //创建form对象
    //   formImg.append("file", file); //通过append向form对象添加数据
    //   this.$axios({
    //     url: "admin/welfare/sysFile/upload",
    //     method: "post",
    //     data: formImg
    //   })
    //     .then(result => {
    //       this.imagesId = result.data.id;
    //       this.imgName =
    //         "http://103.26.76.116:9999/" +
    //         "admin/welfare/sysFile/showPicForMany?id=" +
    //         result.data.id;
    //       this.$store.dispatch("HAND_PORTRAIT", this.imagesId);
    //       this.editImg();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    editImg() {
      this.$axios({
        url: "admin/mobile/user/setPersonalCenter",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          nickName: "",
          userPhone: localStorage.getItem("phone"),
          newPhone: "",
          sex: "",
          imgId: this.imagesId
        })
      })
        .then(result => {})
        .catch(err => {
          console.log(err);
        });
    },
    // 查询个人资料
    getUserInfoByUser() {
      this.$axios({
        url: "admin/mobile/user/getUserInfoByUserId",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId")
        })
      })
        .then(result => {
          if (result.status === 200) {
            console.log(result.data.data.nickName);
            this.nickName = result.data.data.nickName; // 昵称
            this.sex = result.data.data.sex; // 性别
            this.phone = result.data.data.username; // 手机
            localStorage.setItem("nickName", this.nickName);
            sessionStorage.setItem("sex", this.sex);
            sessionStorage.setItem("phone", this.phone);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 退出登录
    outLogin() {
      Dialog.confirm({
        title: "提示",
        message: "你确定退出吗？"
      })
        .then(() => {
          // on confirm
          this.$axios({
            url: "admin/mobile/user/setPersonalCenter",
            method: "post",
            data: Qs.stringify({})
          })
            .then(result => {
              if (result.status === 200) {
                console.log(result);
                this.$router.push("/login");
                sessionStorage.removeItem("bottomNav");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style scoped>
.dn {
  display: none;
}
.container {
  padding: 0 !important;
}
.ret-btn {
  display: inline-block;
  color: #fff;
  font-size: 30px;
}
.flex-wrapper {
  width: 100%;
  height: 76px;
  line-height: 87px;
  background-color: #fff;
}
.content-text {
  float: left;
  margin-right: 10px;
  margin-top: 2px;
  color: #c0c0c0;
}
.nickname {
  position: absolute;
  left: 15px;
}
.avatar-person {
  position: absolute;
  right: 30px;
  top: 69px;
}
.box {
  /* display: none; */
}
</style>
