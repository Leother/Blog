<template>
    <Layout>
      <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{margin: '16px 0'}"  style="text-align: left">
          <BreadcrumbItem>用户列表</BreadcrumbItem>
          <BreadcrumbItem style="float: right">您好，尊敬的管理员{{nickName}}</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div>
            <Table ellipsis="true" border :columns="columns7" :data="data6"></Table>
            <Page :page-size="limit" @on-change="handChange" :total="pages" style="margin-top: 20px"></Page>
          </div>
        </Card>
      </Content>
    </Layout>

</template>

<script>
  import axios from 'axios';
  import utils from './../../utils'
  export default {
    inject : ['reload'],
    name: 'Users',
    data () {
      return {
        columns7: [
          {
            title: '用户名',
            key: 'userName',
            ellipsis : true,
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.userName)
              ]);
            }
          },
          {
            title: '用户权限',
            key: 'jurisdiction'
          },
          {
            title: 'ID',
            key: '_id'
          },
          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [

                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',

                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data6: [],
        nickName : '',
        pages : 0,
        page : 1,
        limit : 0
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data6[index].userName}
                    <br>用户权限：${this.data6[index].jurisdiction}
                    <br>id：${this.data6[index]._id}`
        })
      },
      remove (index) {
        let users = utils.getCookies('userId')
        axios.get('/api/isgetadmin',{
          params : {
            users : users
          }
        }).then((response)=>{
          let res = response.data;
          if(res.status == '0'){
            axios.post('/api/delusers',{
              _id : this.data6[index]._id
            }).then((response)=>{
              let res = response.data;
              if(res.status == '0'){
                this.$Message.info('删除成功！');
                this.reload()
              }
            })
          }else{

            this.$Message.warning(res.result);
          }
        })
      },
      getUserName() {
        axios.get('/api/users',{
          params : {
            page : this.page
          }
        }).then((response)=> {
            let res = response.data;

            let cookies = utils.getCookies('userId')
            if(cookies){
              this.nickName = cookies;
              if(res.status == '0') {
                this.data6 = res.result.list;
                this.pages = res.result.pages;
                this.limit = res.result.limit
                for( let i of this.data6){
                  if(i.jurisdiction == '0') {
                    i.jurisdiction = '超级管理员'
                  }else{
                    i.jurisdiction = '普通管理员'
                  }

                }
              }else{
                this.data6 = []
              }
            }else{
              this.$Message.warning('您的登录已经过期，请重新登录');
              this.$router.push('/')
            }


        })
      },
      handChange(page){
        this.page = page
        this.getUserName()
      }
    },
    mounted() {
        this.getUserName()
    },
  }
</script>

<style scoped>

</style>
