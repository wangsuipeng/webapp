<template>
    <div class="content">
        <content-main></content-main>  
        <footer-nav></footer-nav>  
    </div>
</template>
<script>
import footerNav from './main/footerNav.vue'
import contentMain from './main/contentMain.vue'
export default {
    name: 'index',
    data() {
        return {

        }
    },
    components: {
        footerNav,
        contentMain
    }
}
</script>
<style scoped>
.content {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
</style>
