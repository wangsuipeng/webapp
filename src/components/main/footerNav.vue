<template>
    <div class="footer">
        <div style="height:56px">
            <mu-bottom-nav :value.sync="bottomNav" @change="handleChange" color="rgb(255, 82, 66)">
                <mu-bottom-nav-item v-ripple value="notice" title="公告" icon="turned_in"></mu-bottom-nav-item>
                <mu-bottom-nav-item v-ripple value="widgets" title="功能" icon="widgets"></mu-bottom-nav-item>
                <mu-bottom-nav-item v-ripple value="person" title="我的" icon="person"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </div>
    </div>
</template>
<script>
export default {
    name: "footerNav",
    data() {
        return {
            bottomNav: sessionStorage.getItem('bottomNav')
        };
    },
    created() {
        console.log(this.bottomNav)
    },
    mounted () {
        this.bottomNav = this.$store.getters.bottomNav; 
    },
    methods: {
        handleChange(val) {
            this.$store.dispatch('CHANGE_NAV',val)
            this.$router.push(`/layout/${val}`)
        }
    }
};
</script>
<style scoped>

</style>
