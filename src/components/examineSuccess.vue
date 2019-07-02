<template>
    <div class="success">
        <mu-flex class="flex-wrapper" justify-content="center">
            <i class="iconfont icon-fanhui ret-btn" @click="outPage"></i>
            <mu-flex class="flex-demo fast-register" justify-content="center">审核</mu-flex>
        </mu-flex>
        <div class="content">
            <h2 class="success-text">
                恭喜您，审核成功
                <i class="iconfont icon-duihao"></i>
            </h2>
            <mu-button class="nextStep" color="#FF5242" @click="nextStep">确定</mu-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        nextStep() {
            sessionStorage.setItem('bottomNav','widgets')
            this.$router.push('/layout')
        }
    }
};
</script>
<style scoped>
.success {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.success-text {
    text-align: center;
}
.fast-register {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #ff5242;
    font-size: 18px;
    color: #fff;
}
.ret-btn {
    display: inline-block;
    position: absolute;
    left: 10px;
    top: 3px;
    color: #fff;
    font-size: 30px;
}
.nextStep {
    width: 100%;
    height: 40px;
    margin-top: 40px;
    border-radius: 5px;
    font-size: 18px;
}
.content {
    padding: 0 10px;
    margin-top: 10vh;
}
.icon-duihao {
    font-size: 35px;
    color: #00ef00;
    margin-left: 10px;
}
</style>
