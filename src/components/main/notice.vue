<template>
    <div class="notice">
        <mu-paper :z-depth="0" class="demo-list-wrap">
            <mu-appbar color="#ff5242">
                <mu-button icon slot="left">
                    <mu-icon value="menu"></mu-icon>
                </mu-button>
                <div>海尚菊苑</div>
                <mu-menu slot="right">
                <mu-button flat>MENU</mu-button>
                <mu-list slot="content">
                    <mu-list-item button>
                        <mu-list-item-content>
                            <mu-list-item-title>Menu Item 1</mu-list-item-title>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-list-item button>
                        <mu-list-item-content>
                            <mu-list-item-title>Menu Item 2</mu-list-item-title>
                        </mu-list-item-content>
                    </mu-list-item>
                </mu-list>
            </mu-menu>
            </mu-appbar>
            <mu-list>
                <mu-sub-header>Today</mu-sub-header>
                <mu-list-item avatar button :ripple="true" class="word-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/1000053.jpg">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Mike Li</mu-list-item-title>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/325543.jpg">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Maco Mai</mu-list-item-title>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/325571.jpg">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Alex Qin</mu-list-item-title>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/325572.jpg">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Allen Qun</mu-list-item-title>
                </mu-list-item>
                <mu-list-item avatar button :ripple="true" class="word-list" v-ripple>
                    <mu-list-item-action>
                        <mu-avatar :size="size">
                            <img src="../../assets/images/1000046.jpg">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>Myron Liu</mu-list-item-title>
                </mu-list-item>
            </mu-list>
            <!-- <mu-divider></mu-divider> -->
        </mu-paper>
    </div>
</template>
<script>
export default {
    data() {
        return {
            size: "36"
        }
    }
};
</script>
<style scoped>
.demo-list-wrap {
  width: 100%;
}
.notice {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
.word-list {
    border-bottom: 1px solid #ccc;
}
</style>
