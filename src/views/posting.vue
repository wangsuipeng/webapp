<template>
    <div class="container-main">
        <div :style="{height: `${height}px`}" class="top-nav"></div>
        <mu-appbar style="width: 100%;" color="#ff5242" z-depth="0">
            <mu-button icon slot="left" @click="outPage">
                <mu-icon value="keyboard_arrow_left" :size="size" color="#fff"></mu-icon>
            </mu-button>
            <span style="color: #fff">新帖子</span>
            <mu-button
                flat
                slot="right"
                @click="postingMsg"
                style="display: inline-block;color: #fff;font-size: 18px"
            >发布</mu-button>
        </mu-appbar>
        <div class="content">
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="center"></mu-flex>
            </mu-flex>
            <div class="content-text">
                <input
                    type="text"
                    v-model="postForm.title"
                    placeholder="请输入标题..."
                    class="input-text"
                />
                <textarea
                    name
                    id
                    cols="30"
                    v-model="postForm.content"
                    rows="10"
                    class="textarea-text"
                    placeholder="说点什么..."
                ></textarea>
                <span class="upload-btn">
                    <img src="../assets/images/add-pload.png" alt />
                </span>
            </div>
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="center"></mu-flex>
            </mu-flex>
            <van-cell-group>
                <van-switch-cell active-color="#ff5242" v-model="checked" title="仅本小区可见" />
            </van-cell-group>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checked: true,
            size: "46",
            labelPosition: "top",
            form: {
                input: "",
                select: "",
                date: "",
                radio: "",
                checkbox: [],
                switch: false,
                slider: 30,
                textarea: ""
            },
            height: "",
            labelPosition: "top",
            postForm: {
                title: "",
                content: "",
                category: "",
                authorId: sessionStorage.getItem("userId")
            },
            lineBool: false
        };
    },
    mounted() {
        // if (window.plus) {
        //     this.height = plus.navigator.getStatusbarHeight();
        // }
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        // 发帖
        postingMsg() {
            this.$axios({
                url: "admin/mobile/article/publishMsg",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: this.postForm
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data.respCode == 1000) {
                        this.$router.push("/familyD");
                    } else {
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style scoped>
.van-switch-cell {
    background-color: rgba(204, 204, 204, 0.452);
}
.flex-demo {
    width: 100%;
    height: 16px;
    background-color: #f8f8f8;
}
.top-nav {
    background-color: #2196f3;
}
.content {
    height: calc(100vh - 56px);
}
.container-main {
    background-color: #fff;
}
.content-text {
    width: 100%;
    height: 22.5rem;
    background-color: #fff;
}
.textarea-text {
    width: 100%;
    height: 10rem;
    outline: none;
    padding: 5px 10px;
}
.upload-btn {
    display: inline-block;
    width: 8rem;
    height: 8rem;
    margin-left: 15px;
    border-radius: 5px;
    text-align: center;
    line-height: 10.5rem;
    border: 2px solid #eaeaea;
    box-shadow: 0 3px -1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.upload-btn img {
    display: inline-block;
    width: 50px;
    height: 50px;
}
.input-text {
    width: 100%;
    height: 46px;
    padding-left: 10px;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    outline: none;
}
.flex-wrapper {
    width: 100%;
}
.jurisdiction {
    height: 41px;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    line-height: 41px;
}
.container {
    padding: 0 !important;
}
.title-tip {
    font-size: 16px !important;
}
.mu-form-item {
    margin-bottom: 0;
    padding-bottom: 0;
}
.text-prompts {
    float: left;
    margin-left: 15px;
}
.choice {
    width: 10px !important;
    margin-top: 3px;
}
.clearfix:after {
    content: "."; /*加一段内容*/
    display: block; /*让生成的元素以块级元素显示，占满剩余空间*/
    height: 0; /*避免生成的内容破坏原有布局高度*/
    clear: both; /*清除浮动*/
    visibility: hidden; /*让生成的内容不可见*/
}
.clearfix {
    zoom: 1; /*为IE6，7的兼容性设置*/
}
</style>
