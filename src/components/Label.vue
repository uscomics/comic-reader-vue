<template>
    <div :class="getLabelClass" class="Label">{{text}}</div>
</template>
<script>
export default {
  name: 'Label',
  props: {
    text: { type: String, default: 'Label Text' },
    size: { type: String, default: 'medium' },
    color: { type: String, default: 'default' },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    getLabelClass: function () {
      let labelClass = ''
      if (this.size.toLowerCase() === 'small') {
        if (this.disabled) {
          labelClass = 'LabelSmallDisabled'
        } else if (this.color.toLowerCase() === 'default') {
          labelClass = 'LabelSmallDefault'
        } else {
          labelClass = 'LabelSmallAlt'
        }
      } else if (this.size.toLowerCase() === 'medium') {
        if (this.disabled) {
          labelClass = 'LabelMediumDisabled'
        } else if (this.color.toLowerCase() === 'default') {
          labelClass = 'LabelMediumDefault'
        } else {
          labelClass = 'LabelMediumAlt'
        }
      } else {
        if (this.disabled) {
          labelClass = 'LabelLargeDisabled'
        } else if (this.color.toLowerCase() === 'default') {
          labelClass = 'LabelLargeDefault'
        } else {
          labelClass = 'LabelLargeAlt'
        }
      }
      return labelClass
    }
  }
}
</script>
<style scoped lang="scss">
@import '../css/app.sass';

.Label {
    @include cursor-default;
    background-color:   var(--theme_label_background_color) !important;
    text-align:         var(--theme_label_text_align) !important;
    overflow:           var(--theme_label_overflow) !important;
    font-family:        var(--theme_label_font_family) !important;
}

.LabelSmallDefault {
    color:              var(--theme_label_color) !important;
    font-size:          var(--theme_label_small_font_size) !important;
}

.LabelMediumDefault {
    color:              var(--theme_label_color) !important;
    font-size:          var(--theme_label_medium_font_size) !important;
}

.LabelLargeDefault {
    color:              var(--theme_label_color) !important;
    font-size:          var(--theme_label_large_font_size) !important;
}

.LabelSmallAlt {
    color:              var(--theme_label_alt_color) !important;
    font-size:          var(--theme_label_small_font_size) !important;
}

.LabelMediumAlt {
    color:              var(--theme_label_alt_color) !important;
    font-size:          var(--theme_label_medium_font_size) !important;
}

.LabelLargeAlt {
    color:              var(--theme_label_alt_color) !important;
    font-size:          var(--theme_label_large_font_size) !important;
}

.LabelSmallDisabled {
    color:              var(--theme_label_disabled_color) !important;
    font-size:          var(--theme_label_small_font_size) !important;
}

.LabelMediumDisabled {
    color:              var(--theme_label_disabled_color) !important;
    font-size:          var(--theme_label_medium_font_size) !important;
}

.LabelLargeDisabled {
    color:              var(--theme_label_disabled_color) !important;
    font-size:          var(--theme_label_large_font_size) !important;
}

</style>
