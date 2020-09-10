<template>
    <q-btn
        :class="getIconButtonClass"
        dense
        flat
        round
        icon="menu"
        @click="doClicked"
        />
</template>

<script>
export default {
  props: {
    pressed_initial: { type: Boolean },
    event: { type: String, default: 'icon-button-event' }
  },
  data () {
    return { pressed: false }
  },
  computed: {
    getIconButtonClass: function () {
      if (this.right) {
        return 'MenuButtonPressed'
      }
      return 'MenuButton'
    }
  },
  methods: {
    doClicked () {
      this.pressed = !this.pressed
      this.$emit(this.event, this.pressed)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.IconButton {
  @include cursor-default;
  @include small-box;
  @include rise;
  @include cursor-pointer;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
  font-family: var(--theme_font_family) !important;
  box-shadow: var(--theme_box_shadow_small) !important;
  border-radius: var(--theme_border_radius_image_button_image) !important;
  margin-right: 20px;
  &:active {
    box-shadow: var(--theme_box_shadow_small_active) !important;
  }
}

.IconButtonButtonPressed {
  @include cursor-default;
  @include small-box;
  @include rise;
  @include cursor-pointer;
  color: var(--theme_text_color_button_down) !important;
  background-color: var(--theme_background_color_button_down) !important;
  font-family: var(--theme_font_family) !important;
  box-shadow: var(--theme_box_shadow_small_active) !important;
  border-radius: var(--theme_border_radius_image_button_image) !important;
  margin-right: 20px;
  &:active {
    box-shadow: var(--theme_box_shadow_small) !important;
  }
}

</style>
