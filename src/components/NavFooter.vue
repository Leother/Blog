<template>
    <div class="footer">
      <ul class="footer-list">
        <li><a href="javascript:"> 首 页 </a> |</li>
        <li><a href="javascript:"> 前 端 教 程 </a> |</li>
        <li><a href="javascript:"> 鸡 汤 </a> |</li>
        <li><a href="javascript:"> 枫 林 吧 </a> |</li>
        <li><a href="http://www.miitbeian.gov.cn">粤ICP备16026845号</a></li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .footer{
      padding: 40px 20px;
      background: #515a6e;
    }
  .footer-list li{
    list-style: none;
    float: left;
    color: #fff;
  }
  .footer-list a{
    color: #fff;
    padding: 0 10px;
  }
</style>
