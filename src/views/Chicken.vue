<template>
    <div>
        <nav-header></nav-header>
        <content-warp></content-warp>
        <nav-footer></nav-footer>
        <BackTop></BackTop>
    </div>
</template>

<script>
    import NavHeader from '@/components/NavHeader'
    import ContentWarp from '@/views/contentWarp'
    import NavFooter from '@/components/NavFooter'
    export default {
        name: "Chicken",
        data() {
          return {

          }
        },
        components : {
          NavHeader,
          ContentWarp,
          NavFooter
        }
    }
</script>

<style scoped>

</style>
