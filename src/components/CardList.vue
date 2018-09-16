<template>
  <div class="cardList">
    <ul class="card-list">
      <li v-for="(essay, index) in propEssayList">
        <Card style="clear: left">
          <a ref="titles" :id="essay._id" :index="index" class="title" @click="handdetails(essay._id,essay.scan)" slot="title">{{essay.essaysTitle}}</a>
          <Row>
            <Col :xs="24" :sm="24" :md="8" :lg="8">
              <img class="card-img" :src= '"http://localhost:8081/images/" + essay.essaysImg' />
            </Col>
            <Col :xs="24" :sm="24" :md="16" :lg="16">
              <div style="  text-align: left">
                <div class="card-depict" v-html="essay.summary">
                </div>
              </div>
              <div>
                <div class="list-ul">
                    <span>作者 : {{essay.author}}</span>
                    <span>日期 : {{essay.date}}</span>
                    <span :scan="essay.scan">浏览 : {{essay.scan}}</span>
                    <span>分类 : {{essay.sort}}</span>
                </div>
              </div>
            </Col>

          </Row>
        </Card>
      </li>
    </ul>
    <Page :page-size="limit" style="clear: both; padding-bottom: 20px" @on-change="handChange" :total="pages"></Page>
  </div>
</template>

<script>
  import 'iview/dist/styles/iview.css';
  import utils from './../utils'
  import axios from 'axios'
    export default {
        props : {
          propEssayList : Array,
          pages : Number,
          limit : Number,

        },
        name: "CardList",
        data() {
            return {
              scan : 0
            }
        },
        methods : {
            handChange(page){
                this.$emit('pageChange', page)
            },
          handdetails(id,scan){

              axios.get('/api/detailscan',{
                  params : {
                    _id : id,
                    scan : ++scan
                  }
              }).then((response)=>{
                  let res = response.data;
                  console.log(res)
                  if(res.status == '0'){
                      this.$router.push('/details?_id='+ id)
                  }
              })
          }
        },
        mounted(){

        }

    }
</script>

<style scoped>

      .card-img{
          width: 220px;
          height: 150px;
      }
      .card-depict{
          line-height: 30px;
          margin-left: 20px;
          margin-top: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .list-ul{
          clear: both;
          text-align: left;
          margin-left: 20px;
          margin-top: 20px;
      }
      .card-list li{
        list-style: none;
        margin-bottom: 20px;
      }
      .card-list li span{
        margin-right: 15px;
      }
      .title{
        font-size: 16px;
        color: #000;
        display: block;
      }

</style>
