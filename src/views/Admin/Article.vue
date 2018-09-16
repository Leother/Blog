<template>
  <Layout>
    <Content :style="{padding: '0 16px 16px'}">
      <Breadcrumb :style="{margin: '16px 0'}" style="text-align: left">
        <BreadcrumbItem>文章列表</BreadcrumbItem>
        <Button @click="modalIsShow">添加文章</Button>
        <BreadcrumbItem class="adminRight" style="float: right">您好，尊敬的管理员{{nickName}}</BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <Table ellipsis="true" border class="table" :columns="columns7" :data="data6"></Table>
        <Page  :page-size="limit" @on-change="handChange" :total="pages" style="margin-top: 20px"></Page>
      </Card>
    </Content>
    <hand-modal style="width: 60%" :isShow="handIsShow" :title="handTitle" v-on:childModal="modalIsShow" v-on:childAddSort="modalAddSort">

        <ul class="sort-modal">
          <li v-if="sortErrTopShow">
            <span style="color: red; width: 100%; margin-left: 25%" v-text="sortErrTop"></span>
          </li>
          <li>
            <span>文章标题</span>
            <Input v-model="sortTitleValue" placeholder="请输入文章标题" style="width: 65%"></Input>
          </li>
          <li>
            <span>作者</span>
            <Input v-model="autherValue" placeholder="请输入作者" style="width: 65%"></Input>
          </li>
          <li>
            <span>类型</span>
            <Select v-model="typesValue" v-on:on-change="onChange" class="types">
              <Option v-for="(item,index) in cityList"  :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
              <Upload :childImg="imageName" v-on:childImgName="handImageName"></Upload>

          </li>
          <li>
            <span style="width: 100%; margin-bottom: 10px">简介(请输入200字以内)</span>
            <Input :autosize="{minRows: 2,maxRows: 4}" v-model="summaryValue" :maxlength='200' type="textarea" :rows="2" placeholder="Enter something..."></Input>
          </li>
          <li>
            <span style="width: 100%; margin-bottom: 10px">内容</span>
            <Input v-model="contentValue" type="textarea" :rows="8"  placeholder="Enter something..."></Input>
          </li>
        </ul>

    </hand-modal>
    <hand-modal style="width: 60%" :isShow="editHandIsShow" :title="ediThandTitle" v-on:childModal="editModalIsShow" v-on:childAddSort="editModalAddSort">
      <ul class="sort-modal">
        <li v-if="sortErrTopShow">
          <span style="color: red; width: 100%; margin-left: 25%" v-text="sortErrTop"></span>
        </li>
        <li>
          <span>文章标题</span>
          <Input v-model="sortTitleValue" placeholder="请输入文章标题" style="width: 65%"></Input>
        </li>
        <li>
          <span>作者</span>
          <Input v-model="autherValue" placeholder="请输入作者" style="width: 65%"></Input>
        </li>
        <li>
          <span>类型</span>
          <Select v-model="typesValue" v-on:on-change="onChange" class="types">
            <Option v-for="(item,index) in cityList"  :value="item.value" :key="index">{{ item.label }}</Option>
          </Select>
        </li>

        <li>
          <span style="width: 100%; margin-bottom: 10px">简介(请输入200字以内)</span>
          <Input :autosize="{minRows: 2,maxRows: 4}" v-model="summaryValue" :maxlength='200' type="textarea" :rows="2" placeholder="Enter something..."></Input>
        </li>
        <li>
          <span style="width: 100%; margin-bottom: 10px">内容</span>
          <Input v-model="contentValue" type="textarea" :rows="8"  placeholder="Enter something..."></Input>
        </li>
      </ul>
    </hand-modal>
  </Layout>
</template>

<script>
    import axios from 'axios';
    import utils from './../../utils'
    import HandModal from './../../components/HandModal'
    import Upload from './../../components/upload'
    import qs from 'qs'
    export default {
        inject : ['reload'],
        name: "Article",
        data() {
            return {
              columns7: [
                {
                  title: '标题',
                  key: 'essaysTitle',
                  ellipsis : true,
                  render: (h, params) => {
                    return h('div', [
                      h('Icon', {
                        props: {
                          type: 'person',
                          ellipsis : true,
                        }
                      }),
                      h('strong',{
                        class : 'ivu-table-cell-ellipsis',
                        style : 'display: inline-block; width: 90%'
                      }, params.row.essaysTitle)
                    ]);
                  }
                },
                {
                  title: '作者',
                  key: 'author',
                  ellipsis : true
                },
                {
                  title: '简介',
                  key: 'summary',
                  ellipsis : true
                },
                {
                  title: '分类',
                  key: 'sort',
                  ellipsis : true
                },
                {
                  title: 'ID',
                  key: '_id',
                  ellipsis : true
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
              nickName : '',
              handIsShow : false,
              handTitle : '添加文章',
              sortErrTopShow : false,
              sortTitleValue : '',
              autherValue : '',
              summaryValue : '',
              contentValue : '',
              typesValue : '',
              cityList : [],
              uploadList : [],
              editHandIsShow : false,
              ediThandTitle : '编辑文章',
              isHandChange : false,
              handIndex : 0,
              sortImgValue : '',
              imgs: [],
              imgData: {
                accept: 'image/gif, image/jpeg, image/png, image/jpg',
              },
              imageName : '',
              pages: 0,
              page : 1,
              limit : 0
            }
        },
        methods : {
            getArticleList(page) {
                axios.get('/api/article',{
                  params : {
                    page : this.page
                  }
                }).then((response)=>{
                    let res = response.data;
                    let cookies = utils.getCookies('userId')

                   if(cookies) {
                     if(res.status == '0') {
                       this.data6 = res.result.list;
                       this.pages = res.result.pages
                       this.limit = res.result.limit
                     }else{
                       this.data6 = []
                     }
                   }else{
                     this.$Message.warning('您的登录已经过期，请重新登录');
                     this.$router.push('/')
                   }
                })
            },
            show(index) {
                this.handIndex = index;
                this.editHandIsShow = !this.editHandIsShow;
                this.sortTitleValue = this.data6[index].essaysTitle
                this.autherValue = this.data6[index].author
                this.summaryValue = this.data6[index].summary
                this.contentValue = this.data6[index].conent
                this.typesValue = this.data6[index].sort
            },
            modalIsShow() {
              this.handIsShow = !this.handIsShow;
              this.sortTitleValue = '';
              this.sortErrTopShow = false;
            },
            editModalIsShow() {
                this.editHandIsShow = !this.editHandIsShow
            },
            modalAddSort() {
                if( this.sortTitleValue == '' || this.autherValue == '' || this.typesValue == '' || this.summaryValue == '' || this.contentValue == '' ){
                      this.sortErrTopShow = true;
                      this.sortErrTop = '内容不能为空'
                      return;
                }
                axios.post('/api/addessays',{
                  essaysTitle : this.sortTitleValue,
                  author : this.autherValue,
                  summary : this.summaryValue,
                  date : (new Date()).valueOf(),
                  sort : this.typesValue,
                  conent : this.contentValue,
                  scan : 0,
                  essaysImg : this.imageName
                }).then((response)=>{
                    let res = response.data;
                    console.log(res)
                    if(res.status == '0'){
                        this.reload()
                        this.$Message.info(res.result);
                    }
                })
            },
            editModalAddSort() {
              if(this.sortTitleValue == this.data6[this.handIndex].essaysTitle &&
              this.autherValue == this.data6[this.handIndex].author &&
              this.summaryValue == this.data6[this.handIndex].summary &&
              this.contentValue == this.data6[this.handIndex].conent &&
              this.typesValue == this.data6[this.handIndex].sort){
                  return;
              }
              axios.post('/api/editessay',{
                _id : this.data6[this.handIndex]._id,
                sortTitleValue : this.sortTitleValue,
                autherValue : this.autherValue,
                summaryValue : this.summaryValue,
                contentValue : this.contentValue,
                typesValue : this.typesValue,

                date : (new Date()).valueOf()
              }).then((response)=>{
                  let res = response.data;
                  if(res.status == '0'){
                      this.editHandIsShow = !this.editHandIsShow;
                      this.reload();
                      this.$Message.info(res.result);
                  }
              })


            },
            getSortList() {
                axios.get('/api/sort').then((response)=>{
                    let res = response.data;
                    if(res.status == '0'){
                        res.result.list.forEach((v,i)=>{
                            this.cityList.push({'value': v.sortName, 'label': v.sortName})
                        })
                    }
                })
            },
            onChange(value) {
                this.typesValue = value;
            },
            remove(index) {
              let users = utils.getCookies('userId')
              axios.get('/api/isgetadmin',{
                params : {
                  users : users
                }
              }).then((response)=>{
                let res = response.data;
                if(res.status == '0'){
                  axios.post('/api/delessay',{
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
            handImageName(name){

              this.imageName = name
            },
          handChange(page){
            this.page = page
            console.log(this.page)
            this.getArticleList()
          }
        },
        components : {
            HandModal,
            Upload
        },
        mounted() {
            this.getArticleList()
            this.getSortList()

        }

    }

</script>

<style scoped>
    .modal-list{ padding: 20px }
    .modal-list li, .sort-modal li{ list-style: none; margin-bottom: 20px; }
    .modal-list li span{ margin-bottom: 20px; display: inline-block; width: 20%;}
    .modal-list li div { width: 70% }
    .sort-modal li span{ display: inline-block; width: 25% }
    .types{ width: auto; }
    @media (min-width: 960px){
        .types{ min-width: 200px }
    }
    @media (max-width: 430px) {
        .adminRight{ display: inline-block; height: 21px; width: 2rem; overflow: hidden}
    }
</style>
