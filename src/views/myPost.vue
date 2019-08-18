<template>
    <div class="myPost">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 2.8rem">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>我的帖子
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="add"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-list>
                <mu-list-item avatar button :ripple="false" class="muse-list">
                    <mu-list-item-action>
                        <mu-avatar>
                            <img src="../assets/images/325543.jpg" />
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Mike Li</mu-list-item-title>
                </mu-list-item>
            </mu-list>
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
            this.$router.push("/layout/person");
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
</style>