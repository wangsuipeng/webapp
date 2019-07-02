<template>
    <div class="changePass">
        <mu-appbar style="width: 100%;" color="#ff5242">
            <mu-button icon slot="left" @click="outPage">
                <mu-icon value="keyboard_arrow_left" size="40"></mu-icon>
            </mu-button>修改密码
            <mu-button flat slot="right" style="font-size: 16px">提交</mu-button>
        </mu-appbar>
        <div class="password">
            <mu-form
                :model="form"
                class="mu-demo-form"
                :label-position="labelPosition"
                label-width="100"
            >
                <mu-form-item prop="input">
                    <mu-text-field v-model="form.input" placeholder="输入旧密码"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="input">
                    <mu-text-field v-model="form.input" placeholder="输入旧密码"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="input">
                    <mu-text-field class="text" v-model="form.input" placeholder="输入旧密码"></mu-text-field>
                </mu-form-item>
            </mu-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                input: ''
            },
            labelPosition: 'top',
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
.password {
    margin-top: 18px;
}
</style>
<style>
.password .mu-text-field-input {
    padding-left: 15px!important;
}
</style>
