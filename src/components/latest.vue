<template>
  <div>
    <Card class="card-right" style="width: 90%; float: right" >
      <p class="title" slot="title">
        {{contentRightTitle}}
      </p>
      <ul class="reading-list">
        <li v-for="item in propAscending">
          <a class="reading-list-warp" @click="LatestDetail(item._id,item.scan)">
            <div class="left">
              <img :src='"http://localhost:8081/images/" + item.essaysImg' />
            </div>
            <div class="right">
              <p>{{item.summary}}</p>
              <div>
                <span class="title">{{item.date}}</span>
                <span class="title">{{item.scan}}次阅读</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "reading",
    props : {
      contentRightTitle : String,
    },
    data() {
      return {
        propAscending : []
      }
    },
    methods : {
      getLatest(){
        axios.get('/api/latest').then((response)=>{
          let res = response.data;
          if(res.status == '0'){
            this.propAscending = res.result.list
          }
        })
      },
      LatestDetail(id,scan) {

        axios.get('/api/detailscan',{
          params : {
            _id : id,
            scan : ++scan
          }
        }).then((response)=>{
          let res = response.data;
          if(res.status == '0'){
            this.$router.push('/details?_id='+ id)
          }
        })
      }
    },
    mounted(){
      this.getLatest()
    }

  }
</script>

<style scoped>
  .reading-list li{
    list-style: none;
  }
  .reading-list-warp{
    height: 80px;
    display: block;
  }
  .reading-list li {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  .reading-list li p{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .reading-list li .left{
    float: left;
    width: 30%;
    overflow: hidden;
  }
  .reading-list li .right{
    float: right;
    width: 60%;
  }
  .reading-list li .right div{
    text-align: left;
    margin-top: 20px;
    margin-left: 5px;
  }
  .reading-list li .right div span{
    margin-right: 10px;
  }
  .reading-list li img{
    max-width: 120px;
    max-height: 80px;
  }
</style>
