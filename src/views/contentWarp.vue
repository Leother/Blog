<template>
    <div class="content-warp">
        <Row>
            <Col :xs="24" :sm="24" :md="16" :lg="16">
                <card-list :propEssayList = "essayList" :limit="limit" :pages="pages" @pageChange="pageChange"></card-list>
            </Col>
            <Col :xs="0" :sm="0" :md="8" :lg="8">
                <content-right></content-right>
                <reading :content-right-title="parentTile"></reading>
                <latest :content-right-title="popularTile" ></latest>
            </Col>
        </Row>
    </div>
</template>

<script>
    import CardList from './../components/CardList'
    import ContentRight from './../views/contentRight'
    import Reading from '../components/reading'
    import Latest from '../components/latest'
    import utils from './../utils'
    import axios from 'axios'
    export default {

        name: "Content",
        data() {
          return {
            parentTile : '推荐阅读',
            popularTile : '最新发布',
            ascending : [],
            random : [],
            essayList : [],
            page : 1,
            pages : 0,
            limit : 0
          }
        },
        mounted() {
          this.getList()
        },
        methods : {
          getList() {
            axios.get('/api',{
              params : {
                page : this.page
              }
            }).then((response)=>{
              let res = response.data;
              if(res.status == '0') {
                for(let i of res.result.list){
                  i.date = utils.timeChange(i.date)
                }
                this.essayList = res.result.list;
                this.pages = res.result.pages
                this.limit = res.result.limit
              }else{
                this.essayList = []
              }
            })

          },
          pageChange(page){
            this.page = page
            this.getList()
          }

        },
        components: {
          CardList,
          ContentRight,
          Reading,
          Latest
        }

    }
</script>

<style scoped>
    .content-warp{
        padding: 0 30px;
        clear: both;
        margin-top: 20px;
    }
</style>
