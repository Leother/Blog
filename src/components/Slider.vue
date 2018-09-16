<template>
  <Carousel class="carouselSliber" v-model="value1" loop>
    <CarouselItem>
      <div class="demo-carousel"><img src="./../assets/img/001.jpg" /></div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel"><img src="./../assets/img/002.jpg" /></div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel"><img src="./../assets/img/003.jpg" /></div>
    </CarouselItem>
  </Carousel>
</template>
<script>
  export default {
    data () {
      return {
        value1: 0
      }
    }
  }
</script>
<style>
  .carouselSliber .demo-carousel,.ivu-carousel{
    height: 400px;
  }
  .ivu-carousel-list{
    position: absolute;
    height: 400px;
    width: 100%;
    overflow: hidden;
  }
  .demo-carousel img{
    height: 400px;
    width: 100%;
    height: 400px;
  }
</style>
