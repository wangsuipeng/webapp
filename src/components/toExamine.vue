<template>
    <div class="toExamine">
        <mu-appbar
            style="width: 100%; text-align: center;background-color: #FF5242;"
            color="primary"
        >
            <i class="iconfont icon-fanhui ret-btn" @click="outPage"></i>
            <span>我的社区</span>
        </mu-appbar>
        <div class="content">
            <mu-flex class="flex-wrapper">
                <mu-flex class="flex-demo" justify-content="center" style="margin-top: 0.5rem">请核对您提交的创建社区信息：</mu-flex>
            </mu-flex>
            <mu-container>
                <mu-paper class="demo-paper" :z-depth="1">{{communityName}}</mu-paper>
            </mu-container>
            <span class="exam-text">后台工作人员将审核您提交的信息，审核完成后我们将会联系你</span>
            <mu-button color="#FF5242" class="step-next" @click="submission">提交审核</mu-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            communityName: localStorage.getItem('communityName')
        };
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        // 提交审核
        submission() {
            this.$router.push('/examineSuccess')
        }
    }
};
</script>
<style scoped>
.toExamine {
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
    color: #fff;
    font-size: 30px;
}
.flex-demo {
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: 1vh;
}
.content {
    padding: 0 10px;
}
.demo-paper {
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    font-weight: bold;
    text-align: center;
}
.exam-text {
    display: inline-block;
    font-size: 16px;
    margin-top: 8px;
}
.step-next {
    width: 100%;
    margin-top: 5vh;
}
</style>
