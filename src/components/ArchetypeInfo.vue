<template>
    <div :class="getInfoCardClass">
        <div class="ImageBox">
            <img :src="resolve_img_url(avatar)" alt="">
            <div class="Extras">
                <div class="ExtrasTitle"> {{ title }}</div>
                <img class="Chart" :src="resolve_img_url(chart)" alt="">
            </div>
            <div class="IconBox">
                <img class="Icon" :src="resolve_img_url(icon)" alt="">
            </div>
        </div>
        <div class="Info">
            <div class="Title">{{ title }}</div>
            <div>{{ description }}</div>
            <div class="Button" @click="buildArchetype(archetype_id)" >Build {{article}} {{ title }}</div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'ArchetypeInfo',
  props: {
    archetype_id: { type: String, default: '' },
    avatar: { type: String, default: '' },
    chart: { type: String, default: '' },
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    article: { type: String, default: '' }
  },
  computed: {
    getInfoCardClass: function () {
      return (this.$mq === 'max_power_entry_columns_1' || this.$mq === 'max_power_entry_columns_2') ? 'InfoCardColumn' : 'InfoCardRow'
    }
  },
  methods: {
    buildArchetype: function (archetypeId) {
      this.$store.commit('builder/toonCreate', archetypeId, this.$router)
      this.$router.push('/Toon/' + archetypeId + '/New')
    },
    resolve_img_url: function (path) {
      const images = require.context('../assets/', false, /\.png$|\.jpg$/)
      return images('./' + path)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/app.sass';

.InfoCardRow {
    @include row;
}

.InfoCardColumn {
    @include column;
}

.ImageBox {
    position: relative;
    margin: 30px;
    box-shadow: var(--theme_box_shadow_small_active) !important;
}

.Extras {
    position: absolute;
    bottom: 15px;
    left: 280px;
    width: auto !important;
    height: 100px !important;
    box-shadow: var(--theme_box_shadow_small_active) !important;
}

.ExtrasTitle {
    color: var(--theme_text_color_label) !important;
    background: var(--theme_background_color) !important;
    font-family: var(--theme_font_family) !important;
    font-size: var(--theme_font_size_large) !important;
}

.Chart {
    width: auto !important;
    height: 100% !important;
}

.IconBox {
    position: absolute;
    top: 0px;
    left: 480px;
    width: 20px !important;
    height: 20px !important;
}

.Icon {
    position: relative;
    width: 50px !important;
    height: 50px !important;
    border-radius: var(--theme_border_radius_image_button_image) !important;
    box-shadow: var(--theme_box_shadow_small_active) !important;
}

.Info {
    @include column;
    color: var(--theme_text_color_label) !important;
    background: var(--theme_background_color) !important;
    font-family: var(--theme_font_family) !important;
    font-size: var(--theme_font_size_small) !important;
    margin: 30px;
}

.Title {
    color: var(--theme_text_color_label) !important;
    background: var(--theme_background_color) !important;
    font-family: var(--theme_font_family) !important;
    font-size: var(--theme_font_size_large) !important;
}

.Button {
    @include cursor-pointer;
    @include rise;
    color: var(--theme_text_color_image_button) !important;
    background: var(--theme_background_color) !important;
    font-family: var(--theme_font_family) !important;
    font-size: var(--theme_font_size_large) !important;
    margin-top: 50px;
    text-align: center;
    box-shadow: var(--theme_box_shadow_small) !important;
    &:active {
        box-shadow: var(--theme_box_shadow_small_active) !important;
        border: 2px solid var(--theme_text_color_image_button) !important;
    }
}

</style>
