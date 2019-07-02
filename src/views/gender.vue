<template>
    <div class="gender">
        <mu-appbar style="width: 100%;" color="#ff5242">
            <mu-button icon slot="left" @click="outPage">
                <mu-icon value="keyboard_arrow_left" size="40"></mu-icon>
            </mu-button>性别
            <mu-button flat slot="right" style="font-size: 16px">提交</mu-button>
        </mu-appbar>
        <mu-flex class="flex-wrapper" justify-content="start">
            <mu-flex class="flex-demo" justify-content="center"></mu-flex>
        </mu-flex>
        <mu-container>
            <div class="select-control-group">
                <!-- 性别: {{radio.value1}} -->
                <mu-flex class="select-control-row" :key="i.gender" v-for="i in item">
                    <mu-radio
                        :value="i.gender"
                        v-model="radio.value1"
                        :label="i.gender"
                        label-left
                        color="#ff5242"
                    ></mu-radio>
                </mu-flex>
            </div>
        </mu-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: {
                value1: [],
                value2: "heart",
                value3: "disable"
            },
            item: [{ gender: "男" }, { gender: "女" }]
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
.flex-wrapper {
    width: 100%;
}
.flex-demo {
    width: 200px;
    height: 16px;
    background-color: #e0e0e0;
    text-align: center;
}
.select-control-row {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
}
.mu-list {
    padding: 0;
}
.select-control-group {
    margin: 16px 0;
}
.word-list {
    border-bottom: 1px solid #ccc;
}
</style>
