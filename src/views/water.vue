<template>
    <div class="water">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;margin-bottom: 10px">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>供水报修
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="add"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <mu-container>
                <mu-form
                    :model="form"
                    class="mu-demo-form"
                    :label-position="labelPosition"
                    label-width="100"
                >
                    <mu-form-item prop="input" label="报修位置">
                        <mu-text-field v-model="form.input"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="select" label="处理人员">
                        <mu-select v-model="form.select">
                            <mu-option
                                v-for="option,index in options"
                                :key="option"
                                :label="option"
                                :value="option"
                            ></mu-option>
                        </mu-select>
                    </mu-form-item>
                    <mu-form-item prop="date" label="可上门时间">
                        <mu-date-input v-model="form.date" type="dateTime" actions></mu-date-input>
                    </mu-form-item>
                    <mu-form-item prop="textarea" label="问题描述">
                        <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.textarea"></mu-text-field>
                    </mu-form-item>
                    <div class="content-img">
                        <van-uploader
                            v-model="fileList"
                            accept="image/*"
                            preview-size="60px"
                            multiple
                            :max-count="9"
                            capture
                        />
                    </div>
                    <button class="submit">提交</button>
                </mu-form>
            </mu-container>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: [
                "Option 1",
                "Option 2",
                "Option 3",
                "Option 4",
                "Option 5",
                "Option 6",
                "Option 7",
                "Option 8",
                "Option 9",
                "Option 10"
            ],
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
            fileList: [],
        };
    },
    methods: {
        outPage() {
            this.$router.goBack();
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
    overflow-y: auto;
}
.submit {
    width: 100%;
    height: 40px;
    background-color: #ff5242;
    color: #fff;
    line-height: 40px;
    text-align: center;
    border-radius: 6px;
    margin-top: 15px;
}
</style>
