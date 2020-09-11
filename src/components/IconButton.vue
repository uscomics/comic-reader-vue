<template>
    <q-btn
        :class="getIconButtonClass"
        dense
        flat
        round
        :icon="icon"
        @click="doClicked"
        />
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    event: { type: String, default: 'icon-button-event' },
    icon: { type: String, default: 'menu' },
    pressed: { type: Boolean, default: false },
    toggle: { type: Boolean, default: true }
  },
  computed: {
    getIconButtonClass: function () {
      let style = 'IconButtonNoToggle'
      if (this.toggle) {
        if (this.pressed) {
          style = 'IconButtonPressed'
        } else {
          style = 'IconButton'
        }
      }
      return style
    }
  },
  methods: {
    doClicked () {
      this.$emit(this.event, this.pressed)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.IconButton {
  @include small-box;
  @include rise;
  @include cursor-pointer;
  margin:           var(--theme_icon_button_margin) !important;
  color:            var(--theme_icon_button_color) !important;
  background-color: var(--theme_icon_button_background_color) !important;
  font-family:      var(--theme_icon_button_font_family) !important;
  border-radius:    var(--theme_icon_button_border_radius) !important;
  box-shadow:       var(--theme_icon_button_box_shadow) !important;
}

.IconButtonPressed {
  @include small-box;
  @include rise;
  @include cursor-pointer;
  margin:           var(--theme_icon_button_margin) !important;
  color:            var(--theme_icon_button_color_down) !important;
  background-color: var(--theme_icon_button_background_color_down) !important;
  font-family:      var(--theme_icon_button_font_family) !important;
  border-radius:    var(--theme_icon_button_border_radius) !important;
  box-shadow:       var(--theme_icon_button_box_shadow_down) !important;
}

.IconButtonNoToggle {
  @include small-box;
  @include rise;
  @include cursor-pointer;
  margin:           var(--theme_icon_button_margin) !important;
  color:            var(--theme_icon_button_color) !important;
  background-color: var(--theme_icon_button_background_color) !important;
  font-family:      var(--theme_icon_button_font_family) !important;
  border-radius:    var(--theme_icon_button_border_radius) !important;
  box-shadow:       var(--theme_icon_button_box_shadow) !important;
  &:active {
    box-shadow:     var(--theme_icon_button_box_shadow_down) !important;
  }
}

</style>
