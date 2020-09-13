<template>
    <div class="Link" @click="doClicked">{{text}}</div>
</template>
<script>
export default {
  name: 'Link',
  props: {
    event: { type: String, default: 'link-event' },
    text: { type: String, default: 'Link Text' }
  },
  methods: {
    doClicked () {
      this.$emit(this.event)
    }
  }
}
</script>
<style scoped lang="scss">
@import '../css/app.sass';

.Link {
    @include rise;
    @include cursor-pointer;
    color:              var(--theme_link_color) !important;
    background-color:   var(--theme_link_background_color) !important;
    text-align:         var(--theme_link_text_align) !important;
    text-decoration:    var(--theme_link_text_decoration) !important;
    overflow:           var(--theme_link_overflow) !important;
    font-family:        var(--theme_link_font_family) !important;
    font-size:          var(--theme_link_font_size) !important;
    box-shadow:         var(--theme_link_box_shadow) !important;
    &:active {
      box-shadow:       var(--theme_link_box_shadow_active) !important;
    }
    &:hover {
        filter:         var(--theme_link_filter) !important;
    }
}
</style>
