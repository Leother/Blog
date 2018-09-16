<template>

  <div>
    <div class="demo-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <div>提示: 该图片为首页列表图片(不上传图片则显示默认图片)</div>
    <span>上传图片</span>
    <Input v-model="originalname" disabled placeholder="" style="width: 65%"></Input>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      action="/api/fileupload"
      style="display: inline-block;width:58px; margin-left: 20px;position: relative; top: 20px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="camera" size="20"></Icon>上传图片
      </div>
      <Modal title="View Image" v-model="visible">
        <img :src=" imgName " v-if="visible" style="width: 100%">
      </Modal>
    </Upload>
  </div>

</template>
<script>
  export default {
    props : {
      childImg : String
    },
    data () {
      return {
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        originalname : 'default.jpg'
      }
    },
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        this.originalname = res.result.originalname

        this.$emit('childImgName', this.originalname)
        file.url = 'http://localhost:8081/images/'+ res.result.name;
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '上传失败',
          desc: '您上传的文件 ' + file.name + ' 是不受支持的, 请上传jpg 或 png格式.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '上传失败',
          desc: '您上传的文件  ' + file.name + ' 太大了, 不能超过 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: '不能上传超过5张图片'
          });
        }
        return check;
      },

    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }
  }
  </script>
<style>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
