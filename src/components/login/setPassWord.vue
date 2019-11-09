<template>
  <div class="set-password">
    <mu-flex class="flex-wrapper" justify-content="center">
      <i class="iconfont icon-fanhui ret-btn" @click="outPage"></i>
      <mu-flex class="flex-demo fast-register" justify-content="center">设置密码</mu-flex>
    </mu-flex>
    <div class="content">
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
              placeholder="请输入新密码"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="securityCode" :rules="passwordRules">
            <mu-text-field
              class="title"
              type="password"
              v-model="validateForm.securityCode"
              prop="password"
              placeholder="请确认密码"
            >
            </mu-text-field>
          </mu-form-item>
        </mu-form>
      </mu-container>
      <mu-button class="signIn" color="primary" @click="setPassWord">确 定</mu-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      size: 100,
      usernameRules: [
        { validate: val => !!val, message: "密码长度大于等于八位数" },
        { validate: val => val.length >= 8, message: "密码长度大于等于8" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "填写验证码" },
        {
          validate: val => val.length <= 6,
          message: "验证码长度等于6"
        }
      ],
      validateForm: {
        phone: "",
        securityCode: "",
      }
    }
  },
  methods: {
    outPage() {
      this.$router.goBack();
    },
    setPassWord() {

    }
  }
}
</script>

<style scoped>
.content {
  padding: 0 20px;
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
.signIn {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  font-size: 16px;
  background-color: #ff5242;
}
</style>