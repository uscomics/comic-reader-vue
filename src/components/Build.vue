
<template>
    <div class="Build">
        <div class="BuildButtons">
            <SVGCircleButton :class="getBuild1Class" @click.native="onBuild1Clicked" text="1" text_x="8"></SVGCircleButton>
            <SVGCircleButton :class="getBuild2Class" @click.native="onBuild2Clicked" text="2" text_x="8"></SVGCircleButton>
            <SVGCircleButton :class="getBuild3Class" @click.native="onBuild3Clicked" text="3" text_x="8"></SVGCircleButton>
        </div>
        <div class="BuildText">Build</div>
    </div>
</template>

<script>
import SVGCircleButton from 'components/SVG/SVGCircleButton.vue'
export default {
  components: { SVGCircleButton },
  name: 'Build',
  computed: {
    getBuild1Class: function () {
      if (this.$store.getters['builder/getToonCurrentBuildNumber'] === 0) { return 'BuildSelected' } else { return 'BuildNotSelected' }
    },
    getBuild2Class: function () {
      if (this.$store.getters['builder/getToonCurrentBuildNumber'] === 1) { return 'BuildSelected' } else { return 'BuildNotSelected' }
    },
    getBuild3Class: function () {
      if (this.$store.getters['builder/getToonCurrentBuildNumber'] === 2) { return 'BuildSelected' } else { return 'BuildNotSelected' }
    }
  },
  methods: {
    onBuild1Clicked: function() {
      this.buildClicked(0)
    },
    onBuild2Clicked: function() {
      this.buildClicked(1)
    },
    onBuild3Clicked: function() {
      this.buildClicked(2)
    },
    buildClicked: function(buildNumber) {
      this.$emit('selected-build', 0)
      this.$store.commit('builder/toonSelectBuild', buildNumber)
    }

  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.Build{
    @include column;
    width: 100px;
    margin-top: 14px;
    margin-left: 14px;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
}

.BuildButtons{
    @include row;
    justify-content: space-between;
    justify-items: center;
    width: 100%;
    height: 25px;
    margin-left: 5px;
    margin-right: 5px;
}

.BuildSelected {
  @include rise;
  @include cursor-pointer;
  width: 25px;
  height: 25px;
  --svg-circle-stroke: var(--theme_power_set_background_color) !important;
  --svg-circle-fill: var(--theme_power_set_text_color) !important;
  --svg-circle-stroke-width: 2;
  --svg-circle-stroke-dasharray: 0;
  --svg-text-fill: var(--theme_power_set_background_color) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 2;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.BuildNotSelected {
  @include rise;
  @include cursor-pointer;
  width: 25px;
  height: 25px;
  --svg-circle-stroke: var(--theme_power_set_text_color) !important;
  --svg-circle-fill: var(--theme_power_set_background_color) !important;
  --svg-circle-stroke-width: 2;
  --svg-circle-stroke-dasharray: 0;
  --svg-text-fill: var(--theme_power_set_text_color) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 2;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.BuildText {
    font-size: 11px;
    width: 100px;
    height: 16px;
    text-align: center;
    color: var(--theme_text_color_label);
    background-color: var(--theme_background_color);
}
</style>
