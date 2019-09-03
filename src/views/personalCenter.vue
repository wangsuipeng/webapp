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
                    <input type="file" accept="image/*" @change="handleFile" class="hiddenInput dn" />
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
                            <mu-list-item v-ripple>
                                <mu-list-item-content @click="outLogin">
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
import { Dialog } from 'vant';
export default {
    data() {
        return {
            size: 56,
            open: false,
            imgName: "",
            nickName: "", // 昵称
            sex: "", // 性别
            phone: "", // 手机
            imagesId: "" // 查询图片的id
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
        upload(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.picValue = files[0];
            this.imgPreview(this.picValue);
            console.log(this.picValue);
        },
        uploadHeadImg() {
            this.$el.querySelector(".hiddenInput").click();
        },
        // 将头像显示
        handleFile(e) {
            let target = e.target || e.srcElement;
            let file = target.files[0];
            console.log(file);
            let formImg = new FormData(); //创建form对象
            formImg.append("file", file); //通过append向form对象添加数据
            this.$axios({
                url: "admin/welfare/sysFile/upload",
                method: "post",
                data: formImg
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
                .then(result => {
                    i;
                })
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
                        sessionStorage.setItem("nickName", this.nickName);
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
