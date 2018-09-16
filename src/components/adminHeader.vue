<template>
  <Breadcrumb :style="{margin: '16px 0'}"  style="text-align: left">
    <BreadcrumbItem>用户列表</BreadcrumbItem>

    <BreadcrumbItem style="float: right"><a href="javascript:"> 退出 </a></BreadcrumbItem>
    <BreadcrumbItem style="float: right">您好，尊敬的管理员{{nickName}}, </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
    import utils from './../utils'
    import Sort from "../views/Admin/Sort";
    export default {
        name: "admin_header",
      components: {Sort},
      data() {
          return {
            nickName : ''
          }
        },
        methods : {
          getCookies() {
            let cookies = utils.getCookies('userId')
            if(cookies){
              this.nickName = cookies;
            }else{

              this.$router.push('/')
              this.$Message.warning('您的登录已经过期，请重新登录');
            }

          }
        },
        mounted() {
          this.getCookies()
        }
    }
</script>

<style scoped>

</style>
