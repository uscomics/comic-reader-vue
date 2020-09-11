<template>
  <vue-draggable-resizable class="DraggableWrapper" :draggable="true" :resizable="false" :handles="[]" :z="10" :w="1" :h="1">
    <div class="Center">
    <div class="PowerSetPicker" >
      <div class="PowerSetPickerTitlebar">
          <div class="PowerSetPickerTitle">Select Power Sets</div>
          <SVGCircleButton class="PowerSetPickerInfoButton"></SVGCircleButton>
      </div>
      <div class="PowerSetPickerBody">
          <TextPicker
            :list="primaryPowerSets.map(x => x.display_name)"
            @selected-primary="doPrimaryClicked"
            click_event='selected-primary'
            title="Primary"
          />
          <TextPicker
            :list="secondaryPowerSets.map(x => x.display_name)"
            @selected-secondary="doSecondaryClicked"
            click_event='selected-secondary'
            title="Secondary"
          />
      </div>
      <div class="PowerSetPickerButtons">
        <Button
          class="PowerSetPickerButton"
          :dense="true"
          label="Cancel"
          :stretch="true"
          type="button"
          @button-event="onCancelClicked"
        />
        <Button
          class="PowerSetPickerButton"
          :dense="true"
          :disabled="getSelectDisabled"
          label="Select"
          :stretch="true"
          type="button"
          @button-event="onSelectClicked"
        />
      </div>
    </div>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import Button from '../components/Button'
import SVGCircleButton from 'components/SVG/SVGCircleButton.vue'
import TextPicker from './TextPicker'
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  components: { Button, SVGCircleButton, TextPicker, VueDraggableResizable },
  name: 'PowerSetPicker',
  created: function () {
    this.fetchPrimaryPowerSets()
    this.fetchSecondaryPowerSets()
  },
  props: {
    title: { type: String, default: '' }
  },
  data () {
    return {
      primaryPowerSets: [],
      secondaryPowerSets: [],
      selectedPrimaryPowerSetIndex: -1,
      selectedSecondaryPowerSetIndex: -1
    }
  },
  computed: {
    getSelectDisabled: function() {
      return (-1 === this.selectedPrimaryPowerSetIndex || -1 === this.selectedSecondaryPowerSetIndex)
    }
  },
  methods: {
    fetchPrimaryPowerSets() {
      let archetypeId = this.$store.getters['builder/getToonArchetypeId']
      this.primaryPowerSets = this.$store.getters['builder/getPrimaryPowerSetsFromArchetype'](archetypeId)
    },
    fetchSecondaryPowerSets() {
      let archetypeId = this.$store.getters['builder/getToonArchetypeId']
      this.secondaryPowerSets = this.$store.getters['builder/getSecondaryPowerSetsFromArchetype'](archetypeId)
    },
    doPrimaryClicked: function(index) {
      this.selectedPrimaryPowerSetIndex = index
    },
    doSecondaryClicked: function(index) {
      this.selectedSecondaryPowerSetIndex = index
    },
    onCancelClicked: function () {
      this.selectedPrimaryPowerSetIndex = -1
      this.selectedSecondaryPowerSetIndex = -1
      this.$emit('power-set-picker-cancel', '')
    },
    onSelectClicked: function (index) {
      if (-1 === this.selectedPrimaryPowerSetIndex) { return }
      if (-1 === this.selectedSecondaryPowerSetIndex) { return }
      let event = {
        primary_power_set_index: this.selectedPrimaryPowerSetIndex,
        primary_power_set: this.primaryPowerSets[this.selectedPrimaryPowerSetIndex],
        secondary_power_set_index: this.selectedSecondaryPowerSetIndex,
        secondary_power_set: this.secondaryPowerSets[this.selectedSecondaryPowerSetIndex]
      }
      this.selectedPrimaryPowerSetIndex = -1
      this.selectedSecondaryPowerSetIndex = -1
      this.$emit('power-set-picker-select', event)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.DraggableWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}

.Center {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}

.PowerSetPicker {
    @include column;
    width: 280px;
    height: 205px;
    background: var(--theme_power_set_background_color);
    color: var(--theme_text_color_field);
    z-index: 10;
}

.PowerSetPickerTitlebar {
    @include row;
    @include cursor-move;
    justify-content: space-between;
    align-content: center;
    width: 280px;
    height: 30px;
    color: var(--theme_text_color_label);
    background-color: var(--theme_background_color);
    border-left: 1px solid var(--theme_text_color_label);
    border-top: 1px solid var(--theme_text_color_label);
    border-right: 1px solid var(--theme_text_color_label);
}

.PowerSetPickerTitle {
    width: 200px;
    height: 20px;
    text-align: left;
    margin-left: 3px;
}

.PowerSetPickerInfoButton {
  @include rise;
  @include cursor-pointer;
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

.PowerSetPickerBody{
    @include row;
    @include cursor-default;
    width: 280px;
    height: 140px;
    background-color: var(--theme_power_set_background_color);
    border-left: 1px solid var(--theme_text_color_label);
    border-right: 1px solid var(--theme_text_color_label);
}

.PowerSetPickerButtons{
    @include row;
    width: 280px;
    height: 35px;
}

.PowerSetPickerButton{
    @include rise;
    @include cursor-pointer;
    width: 140px;
    height: 35px;
    color: var(--theme_buton_text_color);
    background-color: var(--theme_buton_background_color);
    border: 1px solid var(--theme_power_set_background_color);
    text-align: center;
}

</style>
