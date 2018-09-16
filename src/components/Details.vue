<template>
    <div>
        <nav-header></nav-header>
        <Row class="details-row">
            <Col :xs="24" :sm="24" :md="16" :lg="16">
                <div class="details-warp">
                    <h2>{{title}}</h2>
                    <div class="list-ul">
                        <span>作者 : {{other}}</span>
                        <span>日期 : {{newDate}}</span>
                        <span>浏览 : {{scan}}</span>
                        <span>分类 : {{sort}}</span>
                    </div>
                  <div class="details-content" v-html="content">

                  </div>
                </div>
            </Col>
            <Col  :xs="0" :sm="0" :md="8" :lg="8">
              <content-right></content-right>
              <reading :content-right-title="parentTile"></reading>
            </Col>
        </Row>
        <nav-footer></nav-footer>
        <BackTop></BackTop>
    </div>
</template>

<script>
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import ContentWarp from './../views/contentWarp'
  import ContentRight from './../views/contentRight'
  import Reading from './../components/reading'
  import axios from 'axios'
    export default {
        name: "Details",
        data(){
            return {
                content : '',
                parentTile : '推荐阅读',
                id : '',
                title : '',
                other : '',
                newDate : '',
                scan : 0,
                sort : ''
            }
        },
        methods : {
            getDetails(){
                let id = this.$router.history.current.query._id
                axios.get('/api/details',{
                  params : {
                    _id : id
                  }
                }).then((response)=>{
                    let res = response.data;
                    if(res.status == '0'){

                      this.content = res.result.content.conent
                      this.title = res.result.content.essaysTitle
                      this.newDate = res.result.content.date
                      this.scan = res.result.content.scan
                      this.sort = res.result.content.sort
                    }
                })
            }
        },
        mounted() {
            this.getDetails()
        },
        components : {
          ContentWarp,
          NavHeader,
          NavFooter,
          ContentRight,
          Reading
        }
    }
</script>

<style scoped>
    .details-row{
        padding: 20px 0;
    }
    .details-warp{
      width: 100%;
      margin-top: 20px;
    }
    .details-warp h2{
      padding-bottom: 20px;
    }
    .details-content{
        padding: 20px;
        font-size: 14px;
        text-align: left;
    }
    .details-warp span{
       margin: 0 20px;
       font-size: 14px;
    }
    content-text{

    }
</style>
