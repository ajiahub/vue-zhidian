<template>
  <div class="panel-title">
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
