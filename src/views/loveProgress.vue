<template>
    <div class="loveProgress">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;margin-bottom: 10px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>爱心进展
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="add"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="center">陪宠物金毛散步</mu-flex>
            </mu-flex>
            <textarea
                readonly
                name="text"
                id
                cols="20"
                v-model="postContent"
                rows="6"
                class="textarea-text"
            ></textarea>
            <div class="love-img">
                <!-- <img class="images" src="../assets/images/325571.jpg" alt=""> -->
            </div>
            <mu-dialog
                title="提示"
                width="600"
                max-width="80%"
                :esc-press-close="false"
                :overlay-close="false"
                :open.sync="openAlert"
            >
                您确定领取该任务吗？
                <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
                <mu-button slot="actions" flat color="primary" @click="getTask">确定</mu-button>
            </mu-dialog>
            <button class="publicWelf" @click="openAlertDialog">做公益</button>
            <button class="mylove" @click="myLove">我的爱心</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            postContent: "",
            openAlert: false
        };
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        myLove() {
            this.$router.push("/myLove");
        },
        alert() {
            this.$alert("恭喜您提交成功", "提示", {
                okLabel: "知道了"
            }).then(() => {
                //   this.$toast.message('提示信息');
            });
        },
        openAlertDialog() {
            this.openAlert = true;
        },
        closeAlertDialog() {
            this.openAlert = false;
        },
        // 领取任务
        getTask() {
            this.$axios({
                url: "admin/mobile/welfare/getTask",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: {
                    receiveUserId: sessionStorage.getItem("userId"),
                    serviceId: ""
                }
            })
                .then(result => {
                    if (result.data.respCode == 1000) {
                        console.log(result);
                        
                    }
                })
                .catch(err => {
                    console.log(err);
                });
                this.openAlert = false;
        }
    }
};
</script>
<style scoped>
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
    padding: 0 15px;
}
.flex-demo {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgb(204, 204, 204, 0.6);
}
.textarea-text {
    width: 100%;
    min-height: 10rem;
    text-indent: 20px;
    outline: none;
    padding: 5px 10px;
}
.love-img {
    width: 100%;
    /* height: 200px; */
}
.love-img img {
    display: inline-block;
    width: 100%;
    height: 180px;
    background-size: 100% 100%;
}
.images {
    display: inline-block;
    margin-bottom: 15px;
}
.mylove {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    background-color: #ff5242;
    color: #fff;
    font-size: 18px;
    border-radius: 6px;
}
.publicWelf {
    width: 80px;
    height: 25px;
    margin-top: 5px;
    background-color: blue;
    line-height: 25px;
    border-radius: 6px;
    color: #fff;
    float: right;
}
</style>
