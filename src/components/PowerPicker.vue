<template>
  <vue-draggable-resizable class="DraggableWrapper" :draggable="true" :resizable="false" :handles="[]" :z="10" :w="1" :h="1">
    <div class="Center">
    <div class="PowerPicker" >
      <div class="PowerPickerTitlebar">
          <div class="PowerPickerTitle">Select Power For Level {{powerLevel}}</div>
          <SVGCircleButton class="PowerPickerInfoButton"></SVGCircleButton>
      </div>
      <div class="PowerPickerBody">
          <TextPicker
            :list="availablePowerSets.map(x => x.display_name)"
            @selected-power-set="doPowerSetClicked"
            click_event='selected-power-set'
            title="Power Sets"
          />
          <TextPicker
            :list="availablePowers.map(x => x.display_name)"
            @selected-power="doPowerClicked"
            click_event='selected-power'
            title="Powers"
          />
      </div>
      <div class="PowerPickerButtons">
        <Button
          class="PowerPickerButton"
          :dense="true"
          label="Cancel"
          :stretch="true"
          type="button"
          @button-event="onCancelClicked"
        />
        <Button
          class="PowerPickerButton"
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
  name: 'PowerPicker',
  created: function () {
  },
  props: {
    title: { type: String, default: '' },
    availablePowerSets: { type: Array, default: function () { return [] } },
    powerLevel: { type: Number, default: 0 },
    powerEntry: { type: Object, default: function () { return {} } }
  },
  data () {
    return {
      availablePowers: [],
      selectedPowerSetIndex: -1,
      selectedPowerIndex: -1
    }
  },
  computed: {
    getSelectDisabled: function() {
      return (-1 === this.selectedPowerSetIndex || -1 === this.selectedPowerIndex)
    }
  },
  methods: {
    doPowerSetClicked: function(index) {
      this.selectedPowerSetIndex = index
      let payload = { powerLevel: this.powerLevel, powerSetId: this.availablePowerSets[index].id }
      this.availablePowers = this.$store.getters['builder/getToonAllowedPowers'](payload)
    },
    doPowerClicked: function(index) {
      this.selectedPowerIndex = index
    },
    onCancelClicked: function () {
      this.availablePowers = []
      this.selectedPowerSetIndex = -1
      this.selectedPowerIndex = -1
      this.$emit('power-picker-cancel', '')
    },
    onSelectClicked: function () {
      if (-1 === this.selectedPowerSetIndex) { return }
      if (-1 === this.selectedPowerIndex) { return }
      let event = {
        power_set_index: this.selectedPowerSetIndex,
        power_set: this.availablePowerSets[this.selectedPowerSetIndex],
        power_index: this.selectedPowerIndex,
        power: this.availablePowers[this.selectedPowerIndex]
      }
      this.availablePowers = []
      this.selectedPowerSetIndex = -1
      this.selectedPowerIndex = -1
      this.$emit('power-picker-select', event)
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

.PowerPicker {
    @include column;
    width: 280px;
    height: 205px;
    background: var(--theme_power_set_background_color);
    color: var(--theme_text_color_field);
    z-index: 10;
}

.PowerPickerTitlebar {
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

.PowerPickerTitle {
    width: 200px;
    height: 20px;
    text-align: left;
    margin-left: 3px;
}

.PowerPickerInfoButton {
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

.PowerPickerBody{
    @include row;
    @include cursor-default;
    width: 280px;
    height: 140px;
    background-color: var(--theme_power_set_background_color);
    border-left: 1px solid var(--theme_text_color_label);
    border-right: 1px solid var(--theme_text_color_label);
}

.PowerPickerButtons{
    @include row;
    width: 280px;
    height: 25px;
}

.PowerPickerButton{
    @include rise;
    @include cursor-pointer;
    width: 140px;
    height: 35px;
    color: var(--theme_text_color_label);
    background-color: var(--theme_background_color);
    border: 1px solid var(--theme_power_set_background_color);
    text-align: center;
}

</style>
