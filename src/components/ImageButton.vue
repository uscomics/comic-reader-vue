<template>
  <div :class="getButtonClass" @click="doClick" :aria-label="label">
    <img class="Image" :src="resolve_img_url(source)" :alt="label"/>
    <div class="Label">{{label}}</div>
  </div>
</template>

<script>
export default {
  name: 'ImageButton',
  props: ['id', 'source', 'label', 'size'],
  computed: {
    getButtonClass: function () {
      if (this.size === 'small') { return 'ButtonSmall' }
      if (this.size === 'medium') { return 'ButtonMedium' }
      return 'ButtonLarge'
    }
  },
  methods: {
    resolve_img_url: function (path) {
      const images = require.context('../assets/', false, /\.png$|\.jpg$/)
      return images('./' + path)
    },
    doClick: function () {
      this.$emit('image-button-event', this.id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.ButtonSmall {
  @include cursor-pointer;
  @include rise;
  @include column;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 5px;
}

.ButtonMedium {
  @include cursor-pointer;
  @include rise;
  @include column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 5px;
}

.ButtonLarge {
  @include cursor-pointer;
  @include rise;
  @include column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  margin: 10px;
}

.Image{
  width: 75%;
  height: 75%;
  z-index: 5;
  box-shadow: var(--theme__box_shadow_image_button) !important;
  border-radius: var(--theme_border_radius_image_button_image) !important;
  &:active {
    box-shadow: var(--theme_box_shadow_small_active) !important;
    border: 2px solid var(--theme_text_color_image_button) !important;
  }
}

.Label{
    @include cursor-pointer;
    text-align: var(--theme_text_align_image_button);
    width: 100%;
    height: 25%;
    z-index: 5;
    color: var(--theme_text_color_label);
    font-size: var(--theme_font_size_small);
}

</style>
