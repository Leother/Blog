<template>
    <div>
        <nav-header></nav-header>
        <content-warp></content-warp>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import ContentWarp from '@/views/contentWarp'
  import NavFooter from '@/components/NavFooter'
    export default {
        name: "webStudy",
        data(){
          return {
            isTrue : false
          }
        },
      methods : {
        login() {
          this.isTrue = !this.isTrue
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
