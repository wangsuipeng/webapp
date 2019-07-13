<template>
    <div class="myLove">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>我的爱心
            <mu-button icon slot="right" @click="release">
                <!-- <mu-icon size="30" value="add"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-container>
                <mu-tabs :value.sync="active2" color="#F8F8F8" indicator-color="#ff5242" full-width>
                    <mu-tab style="color: #898989">进行中</mu-tab>
                    <mu-tab style="color: #898989">待评估</mu-tab>
                    <mu-tab style="color: #898989">已完成</mu-tab>
                </mu-tabs>
                <div class="demo-text" v-if="active2 === 0">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list>
                            <!-- <mu-sub-header>Today</mu-sub-header> -->
                            <mu-list-item avatar button :ripple="false">
                                <span style="font-size: 18px;margin-right: 15px">1</span>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>爱在天涯</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon color="#ff5242" value="favorite"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                            <mu-list-item avatar button :ripple="false">
                                <span style="font-size: 18px;margin-right: 15px">2</span>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>爱在天涯</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon color="#ff5242" value="favorite"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                            <mu-list-item avatar button :ripple="false">
                                <span style="font-size: 18px;margin-right: 15px">3</span>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>爱在天涯</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon color="#ff5242" value="favorite"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                            <mu-list-item avatar button :ripple="false">
                                <span style="font-size: 18px;margin-right: 15px">4</span>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>爱在天涯</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon color="#ff5242" value="favorite"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                            <mu-list-item avatar button :ripple="false">
                                <span style="font-size: 18px;margin-right: 15px">5</span>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-title>爱在天涯</mu-list-item-title>
                                <mu-list-item-action>
                                    <mu-icon color="#ff5242" value="favorite"></mu-icon>
                                </mu-list-item-action>
                            </mu-list-item>
                        </mu-list>
                        <mu-divider></mu-divider>
                    </mu-paper>
                </div>
                <div class="demo-text" v-if="active2 === 1">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list textline="three-line">
                            <!-- <mu-sub-header>今天</mu-sub-header> -->
                            <mu-list-item avatar :ripple="false" button @click="loveProgress">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title
                                        style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 10px"
                                    >陪宠物金毛散步</mu-list-item-title>
                                    <mu-list-item-sub-title>
                                        <div style="color: #ff5242;display: inline-block">爱心币 5/次</div>
                                        <div class="public" @click="alert">做公益</div>
                                    </mu-list-item-sub-title>
                                </mu-list-item-content>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                            <mu-list-item avatar :ripple="false" button>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title
                                        style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 10px"
                                    >陪宠物金毛散步</mu-list-item-title>
                                    <mu-list-item-sub-title>
                                        <div style="color: #ff5242;display: inline-block">爱心币 5/次</div>
                                        <div class="public" @click="alert">做公益</div>
                                    </mu-list-item-sub-title>
                                </mu-list-item-content>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                            <mu-list-item avatar :ripple="false" button>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title
                                        style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 10px"
                                    >陪宠物金毛散步</mu-list-item-title>
                                    <mu-list-item-sub-title>
                                        <div style="color: #ff5242;display: inline-block">爱心币 5/次</div>
                                        <div class="public" @click="alert">做公益</div>
                                    </mu-list-item-sub-title>
                                </mu-list-item-content>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                        </mu-list>
                    </mu-paper>
                </div>
                <div class="demo-text" v-if="active2 === 2">
                    <mu-paper :z-depth="0" class="demo-list-wrap">
                        <mu-list textline="three-line">
                            <!-- <mu-sub-header>今天</mu-sub-header> -->
                            <mu-list-item avatar :ripple="false" button>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title
                                        style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 10px"
                                    >小区公园垃圾处理</mu-list-item-title>
                                    <mu-list-item-sub-title>
                                        <div style="color: #ff5242;display: inline-block">爱心币 5/次</div>
                                        <div class="public" @click="alert">做公益</div>
                                    </mu-list-item-sub-title>
                                </mu-list-item-content>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                            <mu-list-item avatar :ripple="false" button>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title
                                        style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 10px"
                                    >小区公园垃圾处理</mu-list-item-title>
                                    <mu-list-item-sub-title>
                                        <div style="color: #ff5242;display: inline-block">爱心币 5/次</div>
                                        <div class="public" @click="alert">做公益</div>
                                    </mu-list-item-sub-title>
                                </mu-list-item-content>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                            <mu-list-item avatar :ripple="false" button>
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/images/1000046.jpg" />
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title
                                        style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 10px"
                                    >小区公园垃圾处理</mu-list-item-title>
                                    <mu-list-item-sub-title>
                                        <div style="color: #ff5242;display: inline-block">爱心币 5/次</div>
                                        <div class="public" @click="alert">做公益</div>
                                    </mu-list-item-sub-title>
                                </mu-list-item-content>
                            </mu-list-item>
                            <mu-divider></mu-divider>
                        </mu-list>
                    </mu-paper>
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
        },
        release() {
            this.$router.push("/releasePublic");
        },
        loveProgress() {
            this.$router.push("/loveProgress")
        },
        alert () {
            this.$alert('恭喜您提交成功', '提示', {
              okLabel: '知道了'
            }).then(() => {
            //   this.$toast.message('提示信息');
            });
        },
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
.demo-text {
    padding: 0 !important;
}
.container {
    padding: 0 !important;
}
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.public {
    /* float: right; */
    position: absolute;
    top: 49px;
    right: 10px;
    width: 4rem;
    height: 1.5rem;
    line-height: 1.5rem;
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    background-color: #ff5242;
}
</style>
