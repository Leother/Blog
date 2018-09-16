<template>
    <div>
      <nav-header :isTrue="isTrue" @login="login"></nav-header>
      <slider></slider>
      <content-warp></content-warp>
      <nav-footer></nav-footer>
      <BackTop></BackTop>

    </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import Slider from '@/components/Slider'
  import ContentWarp from '@/views/contentWarp'
  import NavFooter from '@/components/NavFooter'

  export default {
    name: "Home",
    data(){
      return {
        isTrue : false,
        value : '',
        isShow : false
      }
    },

    methods : {
      login() {

        this.isTrue = !this.isTrue
      }
    },
    components:{
      NavHeader,
      Slider,
      ContentWarp,
      NavFooter,
    }
  }
</script>

<style scoped>

</style>
