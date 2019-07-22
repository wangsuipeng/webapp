<template>
    <div class="person">
        <div class="avatar">
            <mu-container style="padding: 16px 0;">
                <mu-row justify-content="center" @click="personalCenter">
                    <mu-avatar :size="size">
                        <img :src="avatar">
                    </mu-avatar>
                </mu-row>
                <p style="text-align: center;font-size: 20px;margin-top: 10px;color: #fff">{{nickName}}</p>
            </mu-container>
        </div>
        <mu-paper :z-depth="0" class="demo-list-wrap">
            <mu-list>
                <!-- <mu-sub-header>Today</mu-sub-header> -->
                <mu-list-item avatar button :ripple="true" class="word-list" @click.native="integral">
                    <mu-list-item-action>
                        <img class="picture-img" src="../../assets/images/integral.png">
                    </mu-list-item-action>
                    <mu-list-item-title>我的积分</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon size="25" value="chevron_right"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list">
                    <mu-list-item-action>
                        <img class="picture-img" src="../../assets/images/apply.png">
                    </mu-list-item-action>
                    <mu-list-item-title>我的申请</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon size="25" value="chevron_right"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list" @click.native="myLove">
                    <mu-list-item-action>
                        <img class="picture-img" src="../../assets/images/love.png">
                    </mu-list-item-action>
                    <mu-list-item-title>我的爱心</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon size="25" value="chevron_right"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list" @click.native="authentication">
                    <mu-list-item-action>
                        <img class="picture-img" src="../../assets/images/authentication.png">
                    </mu-list-item-action>
                    <mu-list-item-title>我的认证</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon size="25" value="chevron_right"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list">
                    <mu-list-item-action>
                        <img class="picture-img" src="../../assets/images/security.png">
                    </mu-list-item-action>
                    <mu-list-item-title>安全设置</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon size="25" value="chevron_right"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list" @click="about">
                    <mu-list-item-action>
                        <img class="picture-img" src="../../assets/images/about.png">
                    </mu-list-item-action>
                    <mu-list-item-title>关于</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon size="25" value="chevron_right"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
        </mu-paper>
    </div>
</template>
<script>
import imgSrc from '../../assets/images/avatar.png';
export default {
    data() {
        return {
            size: 100,
            avatar: "",// 头像
            nickName: '',// 昵称
            imgSrc: '../../assets/images/avatar.png'
        };
    },
    created () {
        this.nickName = localStorage.getItem("nickName");
        if (this.$store.getters.headPortrait == "") {
            this.avatar = imgSrc
        } else {
            this.avatar = "http://103.26.76.116:9999/" + "admin/welfare/sysFile/showPicForMany?id=" + this.$store.getters.headPortrait;
        }
    },
    methods: {
        personalCenter() {
            this.$router.push('/personalCenter')
        },
        about() {
            this.$router.push('/about')
        },
        authentication() {
            this.$router.push('/authentication')
        },
        integral() {
            this.$router.push('/integral')
        },
        myLove() {
            this.$router.push("/myLove");
        },
    }
};
</script>
<style scoped>
.demo-list-wrap {
    width: 100%;
    margin-top: 0;
}
.mu-list {
    padding: 0;
}
.avatar {
    width: 100%;
    background-color: bisque;
    padding: 30px 0 0px;
}
.word-list {
    border-bottom: 1px solid #ccc;
}
.picture-img {
    width: 35px;
    height: 35px;
}
</style>
