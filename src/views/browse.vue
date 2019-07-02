<template>
    <div class="browse">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center">
            <mu-button icon slot="left">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>浏览页面
            <mu-button icon slot="right">
                <mu-icon size="30" value="more_horiz"></mu-icon>
            </mu-button>
        </mu-appbar>
        <div class="content-browse">
            <h1 class="title">顾村龙现代艺术馆开放日活动</h1>
            <p
                class="text"
            >据小新最新消息，顾村文化新基地———龙现代艺术馆经过5年建设，已经基本建成，将于近期开门迎客，碧岭的聚缘文化街也正在如火如荼的建设中，不久的将来，在顾村地区将会建成一条文化走廊，提升宝山齐文化城镇面貌</p>
            <div class="images">
                <img src="../assets/images/1000100.jpg" alt>
            </div>
        </div>
        <mu-container class="demo-container is-stripe">
            <mu-row>
                <mu-col span="4">
                    <div class="grid-cell">55</div>
                </mu-col>
                <mu-col span="8">
                    <div class="grid-cell">66</div>
                </mu-col>
            </mu-row>
        </mu-container>
        <mu-flex class="flex-wrapper" align-items="center">
            <mu-flex class="flex-demo reading-volume" justify-content="left" fill>阅读：{{number}}</mu-flex>
            <mu-flex class="flex-demo" justify-content="center" fill>
                <ul class="share">
                    <li>
                        <mu-icon :size="size" value="favorite" color="red"></mu-icon>
                        <p>589</p>
                    </li>
                    <li>
                        <mu-icon :size="size" value="textsms" color="red"></mu-icon>
                        <p>90</p>
                    </li>
                    <li>
                        <mu-icon :size="size" value="share" color="green"></mu-icon>
                        <p>1005</p>
                    </li>
                </ul>
            </mu-flex>
        </mu-flex>
    </div>
</template>
<script>
export default {
    data() {
        return {
            number: "9999",
            size: "30"
        };
    }
};
</script>
<style scoped>
.flex-wrapper {
    width: 100%;
    height: 56px;
    margin-top: 8px;
}
.reading-volume {
    line-height: 40px;
    padding-left: 10px;
    color: #808080;
    font-size: 18px;
}
.flex-demo {
    width: 200px;
    height: 52px;
    /* background-color: #e0e0e0; */
    text-align: center;
    /* line-height: 32px; */
    margin-left: 8px;
}
.flex-wrapper:first-child {
    margin-top: 0;
}
.flex-demo:first-child {
    margin-left: 0;
}
.ret-btn {
    display: inline-block;
    color: #fff;
    font-size: 30px;
}
.title {
    width: 100%;
    /* line-height: 60px; */
    padding: 20px 0;
    /* border-bottom: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #000; */
    background-color: #ccc;
    text-align: center;
    margin: 0 !important;
}
.text {
    padding: 0 5px;
    text-indent: 25px;
    font-size: 18px;
    margin: 10px;
}
.images {
    width: 100%;
    height: 120px;
}
.images img {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
}
.share li {
    float: left;
    margin-left: 15px;
}
</style>
