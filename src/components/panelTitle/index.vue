<template>
  <div class="panel-title">
    <span v-if="title" v-text="title"></span>
    <div class="fl">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    props: {
      title: {
        type: String
      }
    }
  }
</script>
