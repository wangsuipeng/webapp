<template>
  <div class="changePass">
    <mu-appbar style="width: 100%;" color="#ff5242">
      <mu-button icon slot="left" @click="outPage">
        <mu-icon value="keyboard_arrow_left" size="40"></mu-icon>
      </mu-button>修改密码
      <mu-button flat slot="right" style="font-size: 16px" @click="updateUser">提交</mu-button>
    </mu-appbar>
    <div class="password">
      <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
        <mu-form-item prop="input">
          <mu-text-field v-model="form.usedPassword" placeholder="输入旧密码"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input">
          <mu-text-field v-model="form.newPassword" placeholder="输入新密码"></mu-text-field>
        </mu-form-item>
        <!-- <mu-form-item prop="input">
                    <mu-text-field class="text" v-model="form.input" placeholder="输入旧密码"></mu-text-field>
        </mu-form-item>-->
      </mu-form>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      form: {
        usedPassword: "",
        newPassword: ""
      },
      labelPosition: "top"
    };
  },
  mounted() {
    mui.back = function() {
      history.go(-1); //回退到上一页面
    };
  },
  methods: {
    outPage() {
      this.$router.goBack();
    },
    // 修改资料
    updateUser() {
      this.$axios({
        url: "admin/mobile/user/modifyPassword",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId"),
          password: this.form.usedPassword,
          newPassword: this.form.newPassword
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.$router.goBack();
          } else {
            this.$toast.error("修改失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.password {
  margin-top: 18px;
}
</style>
<style>
.password .mu-text-field-input {
  padding-left: 15px !important;
}
</style>
