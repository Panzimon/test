<template>
  <div id="raw-editor">
    <textarea
      :value="getRawHtml"
      @input="MARKDOWN_SUCCESS"
      class="form-control">
    </textarea>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

    export default {
      computed: mapGetters([
        'getRawHtml'
      ]),
      methods: mapActions([
        'MARKDOWN_SUCCESS'
      ])
    }
</script>

<style>
  #raw-editor {
    float:left;
    width:50%;
    height:100%;
  }

  textarea{
    width: 100%;
    height:100%;
    border: 0;
    border-radius: 0;
  }
</style>
