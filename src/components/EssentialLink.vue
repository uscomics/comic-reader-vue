<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
    class="DrawerItem"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <span class="DrawerItemCaption" caption>
        {{ caption }}
      </span>
    </q-item-section>
  </q-item>
</template>

<script>

export default {
  name: 'EssentialLink',
  props: ['title', 'caption', 'link', 'icon']
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.DrawerItem {
  @include rise;
  @include cursor-pointer;
  width: 95%;
  margin-bottom: 10px;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
  font-family: var(--theme_font_family) !important;
  box-shadow: var(--theme_box_shadow_small) !important;
  &:active {
    box-shadow: var(--theme_box_shadow_small_active) !important;
  }
}

.DrawerItemCaption {
  @include cursor-pointer;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
  font-family: var(--theme_font_family) !important;
}

</style>
