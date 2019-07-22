<template>
    <div class="parking-lot">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>车位分享
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-container>
                <mu-tabs :value.sync="active2" color="#F8F8F8" indicator-color="#ff5242">
                    <mu-tab style="color: #898989">出租车位</mu-tab>
                    <mu-tab style="color: #898989">求租车位</mu-tab>
                    <mu-tab style="color: #898989">车位出售</mu-tab>
                </mu-tabs>
                <div class="demo-text" v-if="active2 === 0">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list>
                            <mu-list-item avatar button :ripple="false">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <!-- <img src="../../assets/images/avatar1.jpg" /> -->
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>A区308地库车位出租</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon value="chat_bubble"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                        </mu-list>
                        <mu-divider></mu-divider>
                    </mu-paper>
                </div>
                <div class="demo-text" v-if="active2 === 1">
                    <mu-list>
                        <mu-list-item avatar button :ripple="false">
                            <mu-list-item-action>
                                <mu-avatar>
                                    <!-- <img src="../../assets/images/avatar1.jpg" /> -->
                                </mu-avatar>
                            </mu-list-item-action>
                            <mu-list-item-title>A区308地库车位出租</mu-list-item-title>
                            <mu-list-item-action>
                                <mu-icon value="chat_bubble"></mu-icon>
                            </mu-list-item-action>
                        </mu-list-item>
                    </mu-list>
                    <mu-divider></mu-divider>
                </div>
                <div class="demo-text" v-if="active2 === 2">
                    <mu-list>
                        <mu-list-item avatar button :ripple="false">
                            <mu-list-item-action>
                                <mu-avatar>
                                    <!-- <img src="../../assets/images/avatar1.jpg" /> -->
                                </mu-avatar>
                            </mu-list-item-action>
                            <mu-list-item-title>A区308地库车位出租</mu-list-item-title>
                            <mu-list-item-action>
                                <!-- <mu-icon value="chat_bubble"></mu-icon> -->
                            </mu-list-item-action>
                        </mu-list-item>
                    </mu-list>
                    <mu-divider></mu-divider>
                </div>
            </mu-container>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active2: 0
        };
    },
    methods: {
        outPage() {
            this.$router.goBack();
        }
    }
};
</script>
<style lang="less" scoped>
.demo-text {
    padding: 16px;
    background: #fff;
    p {
        margin: 8px 0;
    }
}
</style>
<style scoped>
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.demo-text {
    padding: 0 !important;
}
.container-main {
    width: 100%;
    height: calc(100vh - 56px);
}
.container {
    padding: 0 !important;
}
</style>
