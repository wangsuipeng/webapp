<template>
    <div class="about">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>关于
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <div class="box-list">当前版本V100R001C00SPC109</div>
            <div class="box-list">当前版本V100R001C00SPC109</div>
            <div class="upgrade">
                <button>在线升级</button>
            </div>  
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
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
    padding: 10px;
    margin-top: 10px;
}
.box-list {
    width: 100%;
    height: 3rem;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 3rem;
}
.box-list:first-child {
    border-bottom: none;
}
.upgrade {
    margin-top: 50px;
    width: 100%;
    height: 3.2rem;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 3.2rem;
    border-radius: 6px;
    background-color: #ff5242;
}
</style>
