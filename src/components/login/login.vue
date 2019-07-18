<template>
    <div id="sign">
        <mu-container style="padding: 46px 0;">
            <mu-row justify-content="center">
                <mu-avatar :size="size">
                    <img src="../../assets/images/avatar.png" />
                </mu-avatar>
            </mu-row>
        </mu-container>
        <div>
            <mu-container v-if="loginMode">
                <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                    <mu-form-item prop="phone" :rules="usernameRules">
                        <mu-text-field
                            class="title"
                            v-model="validateForm.phone"
                            prop="phone"
                            placeholder="请输入用户名"
                        ></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="password" :rules="passwordRules">
                        <mu-text-field
                            class="title"
                            type="password"
                            v-model="validateForm.password"
                            prop="password"
                            placeholder="请输入密码"
                        ></mu-text-field>
                    </mu-form-item>
                    <span class="forget-pass">忘记密码</span>
                    <mu-form-item prop="isAgree" :rules="argeeRules">
                        <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
                    </mu-form-item>
                </mu-form>
            </mu-container>
            <mu-container v-else>
                <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                    <mu-form-item prop="phone" :rules="usernameRules">
                        <mu-text-field
                            class="title"
                            v-model="validateForm.phone"
                            prop="phone"
                            placeholder="请输入手机号"
                        ></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="password" :rules="passwordRules">
                        <mu-text-field
                            class="title"
                            type="password"
                            v-model="validateForm.password"
                            prop="password"
                            placeholder="请输入验证码"
                        >
                            <button class="send-out" color="success">发送验证码</button>
                        </mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="isAgree" :rules="argeeRules">
                        <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
                    </mu-form-item>
                </mu-form>
            </mu-container>
        </div>
        <mu-button class="signIn" color="#ff5242" @click="submit" v-ripple>登 录</mu-button>
        <div class="another-sign">
            <span class="message" @click="signCode">{{signText}}</span>
            <span class="register" @click="newRegister">新用户注册</span>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            size: 100,
            usernameRules: [
                { validate: val => !!val, message: "必须填写用户名" },
                { validate: val => val.length >= 3, message: "用户名长度大于3" }
            ],
            passwordRules: [
                { validate: val => !!val, message: "必须填写密码" },
                {
                    validate: val => val.length >= 3 && val.length <= 10,
                    message: "密码长度大于3小于10"
                }
            ],
            argeeRules: [
                { validate: val => !!val, message: "必须同意用户协议" }
            ],
            validateForm: {
                phone: "",
                password: "",
                isAgree: true
            },
            loginMode: true,
            signText: "短信验证码登录"
        };
    },
    created () {
        this.validateForm.phone = this.$store.getters.phoneNumber 
    },
    methods: {
        toast(msg) {
            this.$toast.error(msg);
        },
        submit() {
            this.$refs.form.validate().then(result => {
                if (result) {
                    this.$axios({
                        url: "admin/mobile/user/login",
                        method: "post",
                        data: Qs.stringify(this.validateForm)
                    })
                        .then(result => {
                            if (result.status === 200) {
                                if (result.data.status == "success") {
                                    sessionStorage.setItem("token",result.data.data.sessionId);
                                    sessionStorage.setItem("userId",result.data.data.userId);
                                    localStorage.setItem('phone',this.validateForm.phone)
                                    localStorage.setItem('nickName',result.data.data.nickName)
                                    localStorage.setItem('sex',result.data.data.sex)
                                    localStorage.setItem('handImgId',result.data.data.handImgId)
                                    this.$store.dispatch("REMEMBER_PHONE",this.validateForm.phone)
                                    this.$router.push("/community");
                                } else {
                                    this.toast(result.data.data);
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            });
        },
        clear() {
            this.$refs.form.clear();
            this.validateForm = {
                username: "",
                password: "",
                isAgree: false
            };
        },
        newRegister() {
            this.$router.push("/login/register");
        },
        signCode() {
            // this.loginMode = false;
            if (this.loginMode) {
                this.loginMode = false;
                this.signText = "用户名登录";
            } else {
                this.loginMode = true;
                this.signText = "短信验证码登录";
            }
        },
        // 登录
        signIn() {}
    }
};
</script>
<style>
#sign {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 20px;
}
.title {
    font-size: 14px !important;
    border-bottom: 1px solid #ff5242;
}
.signIn {
    width: 100%;
    height: 40px;
    border-radius: 20px !important;
    font-size: 16px;
}
.forget-pass {
    display: block;
    float: right;
    margin-top: -23px;
    color: #969799;
}
.another-sign .message {
    display: inline-block;
    color: #969799;
    margin-top: 8px;
}
.another-sign .register {
    float: right;
    color: #969799;
    margin-top: 8px;
}
.send-out {
    height: 30px;
    color: #fff;
    background-color: #07c160;
    border: 1px solid #07c160;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    border-radius: 2px;
    font-size: 12px;
    line-height: 28px;
    padding: 0 8px;
    margin-bottom: 5px;
    outline: none;
}
.mu-text-field-input {
    font-size: 14px !important;
}
</style>
