<template>
  <div class="mobile-phone">
    <mu-appbar style="width: 100%;" color="#ff5242">
      <mu-button icon slot="left" @click="outPage">
        <mu-icon value="keyboard_arrow_left" size="40"></mu-icon>
      </mu-button>手机
      <mu-button flat slot="right" style="font-size: 16px" @click="updateUser">提交</mu-button>
    </mu-appbar>
    <mu-flex class="flex-wrapper" justify-content="start">
      <mu-flex class="flex-demo" justify-content="start">绑定新手机号</mu-flex>
    </mu-flex>
    <div class="mobile">
      <mu-form
        :model="userForm"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="100"
      >
        <mu-form-item prop="input" label="新手机号" style="font-size: 18px">
          <mu-text-field v-model="userForm.userPhone" class="phone"></mu-text-field>
        </mu-form-item>
      </mu-form>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      labelPosition: "top",
      userForm: {
        userPhone: localStorage.getItem("phone")
      }
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
        url: "admin/mobile/user/setPersonalCenter",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          nickName: "",
          userPhone: localStorage.getItem("phone"),
          newPhone: this.userForm.userPhone,
          sex: "",
          imgId: ""
        })
      })
        .then(result => {
          if (result.data.status == "success") {
            localStorage.setItem("phone", this.userForm.userPhone);
            this.$router.push("/personalCenter");
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
<style lang="less" scoped>
.mu-form-item {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
  min-height: 0 !important;
}
</style>

<style scoped>
.phone {
  padding-left: 15px;
}
.flex-wrapper {
  width: 100%;
}
.flex-demo {
  width: 200px;
  height: 50px;
  font-size: 22px;
  padding-left: 15px;
  line-height: 50px;
  text-align: center;
}
.mobile-phone {
  background-color: #fff;
}
.nickInput {
  width: 100%;
  height: 100%;
  outline: none;
}
.text-info {
  padding: 0 5px;
  color: #7a7a7a;
  background-color: rgba(221, 221, 221, 0.24);
}
</style>
<style>
.mobile .mu-form-item-label {
  font-size: 18px !important;
  padding-left: 15px !important;
}
</style>
