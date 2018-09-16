<template>
  <Layout>
    <Content :style="{padding: '0 16px 16px'}">
      <Breadcrumb :style="{margin: '16px 0'}" style="text-align: left">
        <BreadcrumbItem>分类列表</BreadcrumbItem>
        <Button @click="modalIsShow">添加分类</Button>
        <BreadcrumbItem style="float: right">您好，尊敬的管理员{{nickName}}</BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <Table border :columns="columns7" :data="data6"></Table>
        <Modal
          v-model="modal1"
          title="Common Modal dialog box title"
          @on-ok="ok(value)"
          @on-cancel="cancel">
          <Input v-model="value" placeholder="Enter something..." clearable style="width: 200px"></Input>
        </Modal>
        <Page :page-size="limit" @on-change="handChange" :total="pages" style="margin-top: 20px"></Page>
      </Card>
    </Content>
    <hand-modal :isShow="handIsShow" :title="handTitle" v-on:childModal="modalIsShow" v-on:childAddSort="modalAddSort">
        <ul class="sort-modal">
          <li v-if="sortErrTopShow">
              <span style="color: red; width: 100%; margin-left: 25%" v-text="sortErrTop"></span>
          </li>
          <li>
              <span>分类名称</span>
              <Input v-model="sortTitleValue" placeholder="Enter something..." style="width: 65%"></Input>
          </li>
        </ul>
    </hand-modal>
  </Layout>
</template>

<script>
    import axios from 'axios'
    import utils from './../../utils'
    import HandModal from './../../components/HandModal'
    export default {
        inject : ['reload'],
        name: "Sort",
        data() {
            return {
              value : '',
              handIsShow : false,
              modalErr : '',
              valueID : '',
              columns7: [
                {
                  title: '分类名称',
                  key: 'sortName',
                  render: (h, params) => {
                    return h('div', [
                      h('Icon', {
                        props: {
                          type: 'person'
                        }
                      }),
                      h('strong', params.row.sortName)
                    ]);
                  }
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
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.show(params.index)
                          }
                        }
                      }, '编辑'),
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
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
              modal1 : false,
              nickName : '',
              modal5 : false,
              handTitle : '添加分类',
              sortErrTop : '',
              sortTitleValue : '',
              sortErrTopShow : false,
              editIndex : 0,
              pages : 0,
              page : 1,
              limit : 1
            }
        },
        methods: {
            getSortList() {
                axios.get('/api/sort',{
                  params : {
                    page : this.page
                  }
                }).then((response)=>{
                    let res = response.data;
                    let cookies = utils.getCookies('userId')
                    if(cookies) {
                      this.nickName = cookies
                      if( res.status == '0' ){
                        this.data6 = res.result.list;
                        this.pages = res.result.pages;
                        this.limit = res.result.limit;
                      }else{
                        this.data6 = []
                      }
                    }else{
                      this.$Message.warning('您的登录已经过期，请重新登录');
                      this.$router.push('/')
                    }
                })
            },
            ok (value) {
                if(value == this.data6[this.editIndex].sortName){
                    return;
                }else{
                    axios.post('/api/editsort',{
                        sortName : this.data6[this.editIndex].sortName,
                        newSortName : value,

                    }).then((response)=>{
                        let res = response.data;
                        if(res.status == '0') {
                          this.$Message.info(`${res.result}`);
                          this.reload()
                        }
                    })
                }
            },
            cancel () {
            this.modal1 = !this.modal1
          },
            show(index) {
                this.modal1 = !this.modal1
                this.editIndex = index;
                this.value = this.data6[index].sortName
            },
            modalIsShow() {
                this.handIsShow = !this.handIsShow;
                this.sortTitleValue = '';
                this.sortErrTopShow = false;
            },
            modalAddSort() {
                if(this.sortTitleValue == '') {
                      this.sortErrTopShow = true;
                      this.sortErrTop = '分类名称不能为空';
                      return;
                }
                axios.post('/api/addsort',{
                  sortName : this.sortTitleValue
                }).then((response)=>{
                    let res = response.data;
                    if(res.status == '0') {
                      this.reload()
                    }else if(res.status == '2') {
                        this.sortErrTopShow = true
                        this.sortErrTop = res.msg
                    }
                })

            },
            remove(index) {
                let users = utils.getCookies('userId');
                axios.get('/api/isgetadmin',{
                    params : {
                        users : users
                    }
                }).then((response)=>{
                    let res = response.data;
                    if(res.status == '0'){
                      axios.post('/api/delsort',{
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
            handChange(page){
                this.page = page;
                this.getSortList()
            }
        },
        mounted() {
            this.getSortList()

        },
        components : {
          HandModal
        }
    }
</script>

<style scoped>
  .modal-list{ padding: 20px }
  .modal-list li, .sort-modal li{ list-style: none; margin-bottom: 20px; }
  .modal-list li span{ margin-bottom: 20px; display: inline-block; width: 20%;}
  .modal-list li div { width: 70% }
  .sort-modal li span{ display: inline-block; width: 25% }

</style>
