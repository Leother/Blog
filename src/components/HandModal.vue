<template>
    <div class="hand-modal" v-if="isShow">
        <div class="modal">
          <h4 style="font-size: 16px; margin-bottom: 20px">{{title}}</h4>
          <div class="modal-content">
            <slot></slot>

          </div>
          <div class="modal-footer">
            <Button @click="handonCancel">取消</Button>
            <Button type="primary" @click="handOnOk">确定</Button>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            isShow : Boolean,
            title : String,
        },
        name: "HandModal",
        data() {
            return {

            }
        },
        methods : {
            handOnOk() {

                this.$emit('childAddSort')
            },
            handonCancel() {
              this.$emit('childModal')
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .hand-modal{
      width: 8rem;
      height: auto;
      text-align: left;
      background: #fff;
      border: 1px solid #9da0a4;
      padding: 40px;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index : 1000;
    }
  .modal-footer{
    text-align: center;
    padding-top: 20px;
  }
    .modal-footer button{
        margin-right: 10px;
        margin-left : 10px
    }
</style>
