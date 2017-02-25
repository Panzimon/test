
<template>
  <div id="render-editor">
    {{{getRenderHtml}}}
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters([
      'getRenderHtml'
    ])
  }

</script>

<style>
  #render-editor {
    float:right;
    width:50%;
    height:100%;
    overflow: scroll;
  }
</style>
