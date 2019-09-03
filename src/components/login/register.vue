<template>
    <div id="register">
        <mu-flex class="flex-wrapper" justify-content="center">
            <i class="iconfont icon-fanhui ret-btn" @click="outPage"></i>
            <mu-flex class="flex-demo fast-register" justify-content="center">快速注册</mu-flex>
        </mu-flex>
        <div class="register-input">
            <mu-container style="padding: 46px 0;">
                <mu-row justify-content="center">
                    <mu-avatar :size="size">
                        <img src="../../assets/images/avatar1.png" />
                    </mu-avatar>
                </mu-row>
            </mu-container>
            <mu-container>
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
                            placeholder="请输入密码"
                        ></mu-text-field>
                    </mu-form-item>
                </mu-form>
            </mu-container>
            <mu-button class="signIn" color="primary" @click="submit">注 册</mu-button>
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
                password: ""
                // isAgree: false
            }
        };
    },
    methods: {
        toast(msg) {
            this.$toast.error(msg);
        },
        outPage() {
            this.$router.goBack();
        },
        submit() {
            this.$refs.form.validate().then(result => {
                console.log("form valid: ", result);
                if (result) {
                    this.$axios({
                        url: "admin/mobile/user/register",
                        method: "post",
                        data: Qs.stringify(this.validateForm)
                    })
                        .then(result => {
                            console.log(result);
                            if (result.data.data === 0) {
                                console.log(result.data.data);
                                this.$router.push("/login/loginSuccess");
                            } else {
                                this.toast(result.data.data);
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
                phone: "",
                password: ""
                // isAgree: false
            };
        },
        goSign() {
            this.$router.push("/layout/login");
        }
    }
};
</script>
<style scoped>
#register {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.ret-btn {
    display: inline-block;
    position: absolute;
    left: 10px;
    top: 3px;
    color: #fff;
    font-size: 30px;
}
.fast-register {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #ff5242;
    font-size: 18px;
    color: #fff;
}
.register-input {
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
    border-radius: 20px;
    font-size: 16px;
    background-color: #ff5242;
}
.another-sign .message {
    display: inline-block;
    color: #969799;
    margin-top: 8px;
}
.another-sign .register {
    display: block;
    float: right;
    color: #969799;
    margin-top: 8px;
}
</style>
