<template>
    <Card class="card-right" style="width: 90%; float: right" >
        <p class="title" slot="title">
          热门标签
        </p>
        <ul class="popular-list">
            <li><a href="javascript:">JavaScript</a></li>
            <li><a href="javascript:">NodeJS</a></li>
            <li><a href="javascript:">CSS</a></li>
            <li><a href="javascript:">React</a></li>
            <li><a href="javascript:">Vue</a></li>
            <li><a href="javascript:">Angular</a></li>
            <li><a href="javascript:">Ajax</a></li>
            <li><a href="javascript:">鸡汤</a></li>
        </ul>
    </Card>
</template>
<script>
  export default {

    name : 'contentRight',
    data () {
      return {


    }
    },
    methods: {

    },
    mounted () {

    }
  }
</script>
<style>
  .ivu-card-head p{
      text-align: left;
  }
  .popular-list{
    clear: both;
  }
  .popular-list li{
    list-style: none;
    float: left;
  }
  .popular-list a{
    display: block;
    padding: 5px 10px;
    border: 1px solid #cccccc;
    margin: 0 20px 20px 0;
    border-radius: 10px;
  }
  .card-right .ivu-card-head{
    background: #e9e9e9;
  }
  .card-right{
    margin-bottom: 20px;
  }
</style>
