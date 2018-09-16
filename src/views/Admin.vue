
<template>
  <div class="layout">

    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1" class="title">
            <h2>后台管理系统</h2>
          </MenuItem>
          <MenuItem name="1-2">
            <router-link to="/admin/users">用户管理</router-link>
          </MenuItem>
          <MenuItem name="1-3">

            <router-link to="/admin/sort">分类管理</router-link>
          </MenuItem>
          <MenuItem name="1-4">

            <router-link to="/admin/article">文章管理</router-link>
          </MenuItem>
          <MenuItem name="1-5">
            <a href="javascript:" @click="logout">退出登录</a>
          </MenuItem>
        </Menu>

      </Sider>
        <router-view v-if="isRouterAlive" :childreload="reload"></router-view>
    </Layout>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Admin',
    data () {
      return {
        isCollapsed: false,
        isRouterAlive: true
      };
    },
    methods : {
      logout() {
          axios.post('/api/logout').then((response)=>{
              let res = response.data;
              if(res.status == '0'){
                  this.$router.push('/');
                this.$Message.success('退出成功');
              }
          })
      },
      reload () {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
    }
  }
</script>
<style scoped>
  .layout-con{
    height: 100%;
    width: 100%;
  }
  .layout a{
    color: rgba(255,255,255,.7);
    display: block;
  }
  .layout a:hover,.ivu-menu-item-active{
    color: rgba(255,255,255,1);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .title{
      margin-top: 20px;
      color: #fff;
      font-size: 14px;
  }
</style>
