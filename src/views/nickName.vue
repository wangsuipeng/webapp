<template>
    <div class="nickName">
        <mu-appbar style="width: 100%;" color="#ff5242">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>昵称
            <mu-button flat slot="right" style="font-size: 16px" @click="editName">提交</mu-button>
        </mu-appbar>
        <mu-flex class="flex-wrapper" justify-content="start">
            <mu-flex class="flex-demo" justify-content="center"></mu-flex>
        </mu-flex>
        <div class="demo-container is-stripe">
            <mu-row>
                <mu-col span="12">
                    <div class="grid-cell">
                        <input type="text" class="nickInput" placeholder="昵称" v-model="nickName">
                    </div>
                </mu-col>
            </mu-row>
        </div>
        <mu-flex class="flex-wrapper" justify-content="start">
            <mu-flex class="text-info" justify-content="center">
                将用于住在这儿社区交流，昵称不能超过8位，包涵汉字、字母、或数字，且不能与别人重复
            </mu-flex>
        </mu-flex>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            nickName: "",
        }
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        editName() {
            this.$axios({
                url: "admin/mobile/user/setPersonalCenter",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    nickName: this.nickName,
                    userPhone: localStorage.getItem("phone"),
                    newPhone: "",
                    sex: "",
                    imgId: ""
                })
            }).then((result) => {
                if (result.data.status == "success") {
                    this.$router.push("/personalCenter")
                } else {
                    this.$toast.error("修改失败");
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }
};
</script>
<style lang="less" scoped>
.demo-container {
  .row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-cell {
    // border-radius: 4px;
    padding: 0 10px;
    height: 36px;
    // background: rgba(255, 255, 255, 0.8);
    background-color: #fff;
  }
}

</style>
<style scoped>
.flex-wrapper {
    width: 100%;
}
.flex-demo {
    width: 200px;
    height: 16px;
    background-color: #e0e0e0;
    text-align: center;
}
.nickName {
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
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
</style>
