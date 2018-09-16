<template>
    <div class="mask" v-show="isShow">
        <div class="mask-login">
            <h2>管理员登录</h2>
            <hr />
            <ul class="mask-list">
              <li v-show="errorTop">
                <div><small style="color: red">{{errorText}}</small></div>
              </li>
              <li>
                <span>用户名 : </span>
                <Input placeholder="Enter something..." v-model="userName" clearable style="width: 200px"></Input>
              </li>
              <li>
                <span>密 码 : </span>
                <Input type="password" v-model="userPwd" placeholder="Enter something..." clearable style="width: 200px"></Input>
              </li>
            </ul>
            <div class="btn-warp">

              <Button type="primary" @click="HandLogin"> 登 录   </Button>
              <Button @click="isLogin"> 取 消   </Button>
            </div>
            <a class="close" @click="isLogin"> X </a>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        props : {
          isShow : Boolean
        },
        name: "Login",
        data() {
            return {
                userName : '',
                userPwd : '',
                errorText : '',
                errorTop : false
            }
        },
        methods : {
            isLogin() {

              this.$emit('HandisShow')
            },
            HandLogin() {
                if(this.userName == '' || this.userPwd == '') {

                    this.errorText = '登录名或密码不能为空'
                    this.errorTop = true;
                    return;
                }
                axios.post('/api/login',{
                    userName : this.userName,
                    userPwd : this.userPwd
                }).then((response)=>{
                    let res = response.data;
                    if(res.status == '0') {
                        this.errorTop = false;
                        this.$Message.success('登录成功');
                        this.$router.push({path: '/admin'})
                    }else{
                      this.errorText = res.msg;
                      this.errorTop = true
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
    }
</script>

<style scoped>
    html,body{
      height: 100%;
    }
    .mask{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
    }
  .mask-login{
    width: 8rem;
    height: 5rem;
    background: #fff;
    border-radius: .2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: .5rem;
  }
  .mask-login h2{
    padding-bottom: 10px;
  }
  .mask-list{
    margin-top: 20px;
  }
  .mask-list li{
    list-style: none;
    margin-top: 10px;
    margin-bottom: 10px;
  }
    .mask-list li span{
      display: inline-block;
      text-align: left;
      font-size: 14px;
      width: 1.5rem;
    }
  .btn-warp{
    margin-top: 20px;
  }
    .btn-warp Button{
      margin-right: .5rem;
      margin-left: .5rem;
    }
  .close{
      position: absolute;
      top: .2rem;
      right : .4rem;
      font-size: 18px;
  }
    @media screen and (max-width: 440px){
        .mask-login{
            height: 6rem;
        }
    }
</style>
