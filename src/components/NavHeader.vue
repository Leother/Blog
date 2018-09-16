<template>
    <div>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <Row>
            <Col :xs="4" :sm="4" :md="4" :lg="4" class="layout-logo"><img src="./../assets/img/logo.png" /></Col>
            <Col :xs="0" :sm="14" :md="16" :lg="16" class="layout-nav">
              <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>

                <router-link to="/home">首页</router-link>
              </MenuItem>
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                <router-link to="/study">前端教程</router-link>
              </MenuItem>
              <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>
                <router-link to="/chicken">鸡汤</router-link>
              </MenuItem>
              <MenuItem name="4">
                <Icon type="ios-paper"></Icon>
                <router-link to="/fenglin">枫林吧</router-link>
              </MenuItem>
            </Col>
            <a class="login" @click="HandisShow">
              登录
            </a>
            <Col class="unfold-warp" :xs="6" :sm="0" :md="0" :lg="0">
              <a class="unfold" v-on:click.stop="HandisTrue"><img src="./../assets/img/unfold.png" /></a>
            </Col>
          </Row>
        </Menu>
        <Col :xs="0" :sm="4" :md="6" :lg="6" class="input-warp" >
          <Input v-model="value" placeholder="Enter something..." clearable>
          <Button slot="append" icon="ios-search"></Button>
          </Input>
        </Col>

      </Header>
      <Row class="modal-nav" v-show="isTrue">
        <Col :xs="24" :sm="0" :md="0" :lg="0">
          <ul class="header-list" @click.stop="HandisTrue">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/study">前端教程</router-link></li>
            <li><router-link to="/chicken">鸡汤</router-link></li>
            <li><router-link to="/">枫林吧</router-link></li>
          </ul>
        </Col>
      </Row>
      <login :isShow="isShow" @HandisShow="HandisShow"></login>
    </div>
</template>

<script>
    import Login from '@/components/Login'
    export default {

        name: "NavHeader",
        data() {
          return {
              value : '',
              isShow : false,
              isTrue : false
          }
        },
        methods : {
            HandisTrue() {
              this.isTrue = !this.isTrue
            },
            HandisShow() {
              this.isShow = !this.isShow
            }
        },
        components : {
          Login
        }
    }
</script>

<style scoped>
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
