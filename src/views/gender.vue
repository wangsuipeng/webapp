<template>
    <div class="gender">
        <mu-appbar style="width: 100%;" color="#ff5242">
            <mu-button icon slot="left" @click="outPage">
                <mu-icon value="keyboard_arrow_left" size="40"></mu-icon>
            </mu-button>性别
            <mu-button flat slot="right" style="font-size: 16px" @click="updateUser">提交</mu-button>
        </mu-appbar>
        <mu-flex class="flex-wrapper" justify-content="start">
            <mu-flex class="flex-demo" justify-content="center"></mu-flex>
        </mu-flex>
        <mu-container>
            <div class="select-control-group">
                <!-- 性别: {{radio.value1}} -->
                <mu-flex class="select-control-row" :key="i.gender" v-for="i in item">
                    <mu-radio
                        :value="i.gender"
                        v-model="radio.sex"
                        :label="i.gender"
                        label-left
                        color="#ff5242"
                    ></mu-radio>
                </mu-flex>
            </div>
        </mu-container>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            radio: {
                sex: [],
                value3: "disable"
            },
            item: [{ gender: "男" }, { gender: "女" }]
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
                    newPhone: "",
                    sex: this.radio.sex,
                    imgId: ""
                })
            })
                .then(result => {
                    if (result.data.status == "success") {
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
.select-control-row {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
}
.mu-list {
    padding: 0;
}
.select-control-group {
    margin: 16px 0;
}
.word-list {
    border-bottom: 1px solid #ccc;
}
</style>
