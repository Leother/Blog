
<template>
  <div style="height: 100%">


    <router-view></router-view>
  </div>


</template>
<script>
    import NavHeader from '@/components/NavHeader'
    import Slider from '@/components/Slider'
    import Login from '@/components/Login'
    export default {
        name: "index",
        data(){
            return {
                isTrue : false,
                value : '',
                isShow : false,
            }
        },

        methods : {
            login() {
                this.isTrue = !this.isTrue
            },
          HandisShow() {
            this.isShow = !this.isShow
          }
        },
      components:{
          NavHeader,
          Slider,
          Login
      }
    }
</script>

<style scoped>
  html,
  body,
  #app{
    height: 100%;
  }
  .ivu-menu-item>i{
    margin-top: -4px;
  }
  .login{
    color: #fff;
    float: right;
    font-size: 16px;
    margin-left: 40px;
    margin-top: 3px;
  }
  .input-warp{
    position: absolute;
    top: 15px;
    right: 100px;
    z-index: 1001;
    max-width: 200px;
  }
  .layout-logo img{
    vertical-align: middle;
  }
  .layout-nav {
    margin-top: 5px;
  }
  .layout-nav a{
    color: rgba(255,255,255,.7);
  }
  .unfold-warp{
    position: absolute;
    right: -.6rem;
    top: .2rem;
  }
  .header-list li{ list-style: none  }
  .modal-nav{
    position: absolute;
    background: #515a6e;
    width: 100%;
    z-index: 11;
    text-align: left;

    border-top: 1px solid #fff;
  }
  .modal-nav li{
    padding: 0 50px;
    line-height: 30px;
    border-bottom: 1px solid #fff;
  }
  .modal-nav a{ color: #fff;
    display: block; }
  @media screen and (max-width: 768px){
    .login {
      margin-right: .8rem;
    }
    .unfold-warp {
      width: auto;
      height: auto;
    }
  }
  @media screen and (max-width: 540px){
    .unfold-warp {
      top: .28rem;
    }
  }
  @media screen and (max-width: 480px){
    .unfold-warp {
      top: .3rem;
    }
    .ivu-layout-header{
      padding: 0 20px;
    }
  }
</style>
