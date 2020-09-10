<template>
  <q-page class="flex flex-center Page">
    <img v-if="showSplash" src="../assets/Splash.png" style="height: auto; width: 100vw;"/>
    <ArchetypeGrid v-if="!showSplash"></ArchetypeGrid>
  </q-page>
</template>

<script>
import ArchetypeGrid from 'components/ArchetypeGrid.vue'

export default {
  components: { ArchetypeGrid },
  name: 'PageBuilder',
  computed: {
    showSplash: function () {
      return !this.$store.getters['builder/getDBLoaded']
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.Page {
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
  font-family: var(--theme_font_family) !important;
}

</style>
