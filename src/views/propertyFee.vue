<template>
    <div class="propertyFee">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 2.8rem">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>物业费
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="more_horiz"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <van-checkbox-group v-model="result">
                <van-cell-group>
                    <van-cell
                        v-for="(item, index) in list"
                        clickable
                        :key="index"
                        :title="`复选框 ${item}`"
                        @click="toggle(index)"
                    >
                        <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
            <div class="partition-line"></div>
            <mu-list>
                <mu-sub-header>Today</mu-sub-header>
                <mu-list-item avatar button v-ripple class="muse-list">
                    <mu-list-item-action>
                        <div class="img-avatr">
                            <img src="../assets/images/weixin.png" />
                        </div>
                    </mu-list-item-action>
                    <mu-list-item-title>微信支付</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon value="keyboard_arrow_right"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item avatar button v-ripple class="muse-list">
                    <mu-list-item-action>
                        <div class="img-avatr">
                            <img src="../assets/images/zhifubao.png" />
                        </div>
                    </mu-list-item-action>
                    <mu-list-item-title>支付宝</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon value="keyboard_arrow_right"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            result: [],
            list: [1, 2, 3]
        };
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
        }
    }
};
</script>
<style scoped>
.propertyFee {
    background-color: #fff;
}
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
    overflow-y: auto;
}
.partition-line {
    width: 100%;
    height: 0.6rem;
    background-color: #f9f9f9;
}
.muse-list {
    position: relative;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .muse-list:before {
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        /* border-radius: 8px; */
        border-bottom: 1px solid #dcdcdc;
        -webkit-transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform: scale(0.5);
        transform-origin: 0 0;
    }
}
.img-avatr {
    width: 40px;
    height: 40px;
}
.img-avatr img {
    display: inline-block;
    width: 100%;
    height: 100%;
}
</style>
