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
                <img class="images" src="../assets/images/325571.jpg" alt="">
            </div>
            <button class="mylove" @click="myLove">我的爱心</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            postContent: "222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"
        };
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        myLove() {
            this.$router.push("/myLove")
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
    min-height: 13rem;
    text-indent: 20px;
    outline: none;
    padding: 5px 10px;
}
.love-img {
    width: 100%;
    height: 200px;
}
.love-img img {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
}
.images {
    display: inline-block;
    margin-bottom: 15px;
}
.mylove {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    background-color: #ff5242;
    color: #fff;
    font-size: 20px;
    border-radius: 6px;
}
</style>
