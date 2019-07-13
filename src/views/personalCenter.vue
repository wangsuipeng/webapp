<template>
    <div class="personalCenter">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center">
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
                    <h2 class="nickname">乔木社区</h2>
                    <mu-avatar :size="size" class="avatar-person" @click="uploadHeadImg">
                        <img :src="imaName" />
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
                            <mu-list-item v-ripple @click.native="nickName">
                                <div class="title-info">
                                    <span>昵称</span>
                                </div>
                                <div style="position: absolute; right: -15px;">
                                    <span class="content-text">乔木社区</span>
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
                                    <span class="content-text">15216613489</span>
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
                                    <span class="content-text">男</span>
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
                            <!-- <mu-divider shallow-inset></mu-divider> -->
                        </mu-list>
                    </mu-paper>
                </mu-col>
            </mu-row>
        </mu-container>
        <!-- <input class="box" type="file" id="upload" accept="image/jpg" @change="upload" /> -->
        <mu-container>
            <mu-bottom-sheet :open.sync="open">
                <mu-list @item-click="closeBottomSheet">
                    <!-- <mu-sub-header>Select One</mu-sub-header> -->
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
export default {
    data() {
        return {
            size: 56,
            open: false,
            imaName: ""
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
        nickName() {
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
            console.log(file)
            let formImg = new FormData(); //创建form对象
            formImg.append("file", file); //通过append向form对象添加数据
            this.$axios({
                url: "admin/mobile/sysFile/upload",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: formImg
            }).then((result) => {
                this.imaName = result.data.name;
                console.log(result.data.name)
            }).catch((err) => {
                console.log(err)
            });
        },
        // 退出登录
        outLogin() {
            this.$confirm("确定要退出？", "提示", {
                type: "warning"
            }).then(({ result }) => {
                if (result) {
                    // this.$toast.message("点击了确定");
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
                } else {
                    this.$toast.message("取消退出");
                }
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
