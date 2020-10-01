<template>
  <div>
    <div class="SlotBadgeColumn">
        <div class="Pill" :class="getLevelBadgeClass">{{slot_level}}</div>
        <SVGCircleButton class="Slot"
            :class="getSlotClass"
            :width=40
            :height=40
            :cx=20
            :cy=20
            :r=19
            :text="getSlotsRemaining"
            text_x="12"
            text_y="24"
        />
        <div class="PillAlt" :class="getEnhancemenBadgeClass">{{enhancement_level}}</div>
    </div>
  </div>
</template>

<script>
import SVGCircleButton from 'components/SVG/SVGCircleButton.vue'
import { PowerSetType } from '../enums/PowerSetType'
import { SlotState } from '../enums/SlotState'
export default {
  components: { SVGCircleButton },
  name: 'EnhancementSlot',
  props: {
    slot_level: { type: Number, default: 0 },
    enhancement_level: { type: Number, default: 0 },
    power_set_type: { type: String, default: PowerSetType.NO_POWER },
    slot_state: { type: String, default: SlotState.NO_POWER },
    show_slots_remaining: { type: Boolean, default: true }
  },
  computed: {
    getEnhancemenBadgeClass: function () {
      if (this.enhancement_level === 0) {
        return 'Hidden'
      }
      return 'SlotEnhancementBadge'
    },
    getLevelBadgeClass: function () {
      if (this.slot_level === 0) {
        return 'Hidden'
      }
      return 'SlotLevelBadge'
    },
    getSlotClass: function () {
      let classes = ''
      if (this.power_set_type === PowerSetType.NO_POWER || this.slot_state === SlotState.NO_POWER) {
        classes = 'SlotNoPower'
      } else if (this.slot_state === SlotState.UNSLOTTED) {
        classes = 'SlotNoPowerRise'
      } else if (this.power_set_type === PowerSetType.PRIMARY) {
        classes = 'SlotPrimary'
      } else if (this.power_set_type === PowerSetType.SECONDARY) {
        classes = 'SlotSecondary'
      } else if (this.power_set_type === PowerSetType.POOL) {
        classes = 'SlotPool'
      } else if (this.power_set_type === PowerSetType.EPIC) {
        classes = 'SlotEpic'
      } else if (this.power_set_type === PowerSetType.INHERENT) {
        classes = 'SlotInherent'
      }
      return classes
    },
    getSlotsRemaining: function () {
      if (this.power_set_type === PowerSetType.NO_POWER || this.slot_state === SlotState.NO_POWER) {
        return ' '
      } else if (this.slot_state === SlotState.UNSLOTTED) {
        let toon = this.$store.getters['builder/getToon']
        let slotsRemaining = toon.getExtraSlotsRemaining()
        return slotsRemaining.toString()
      } else {
        return ' '
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.Hidden {
  display: none;
}

.Slot {
  @include cursor-pointer;
  width: 42px;
  height: 42px;
  margin-right: 2px;
  border-radius: 50% !important;
  box-shadow: var(--theme_box_shadow_small) !important;
  &:active {
    box-shadow: var(--theme_box_shadow_small_active) !important;
  }
}

.SlotNoPower {
  margin-right: 5px;
  --svg-circle-stroke: var(--theme_no_power_set) !important;
  --svg-circle-fill: var(--theme_power_set_background_color) !important;
  --svg-circle-stroke-width: 1;
  --svg-circle-stroke-dasharray: 8;
  --svg-text-fill: var(--theme_text_color_slots_remaining) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 5;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.SlotNoPowerRise {
  @include rise;
  margin-right: 5px;
  --svg-circle-stroke: var(--theme_no_power_set) !important;
  --svg-circle-fill: var(--theme_power_set_background_color) !important;
  --svg-circle-stroke-width: 1;
  --svg-circle-stroke-dasharray: 8;
  --svg-text-fill: var(--theme_text_color_slots_remaining) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 5;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.SlotPrimary {
  @include rise;
  margin-right: 5px;
  --svg-circle-stroke: var(--theme_primary_power_set) !important;
  --svg-circle-fill: var(--theme_primary_power_set) !important;
  --svg-circle-stroke-width: 1;
  --svg-circle-stroke-dasharray: 0;
  --svg-text-fill: var(--theme_text_color_slots_remaining) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 5;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.SlotSecondary {
  @include rise;
  margin-right: 5px;
  --svg-circle-stroke: var(--theme_secondary_power_set) !important;
  --svg-circle-fill: var(--theme_secondary_power_set) !important;
  --svg-circle-stroke-width: 1;
  --svg-circle-stroke-dasharray: 0;
  --svg-text-fill: var(--theme_text_color_slots_remaining) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 5;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.SlotPool {
  @include rise;
  margin-right: 5px;
  --svg-circle-stroke: var(--theme_pool_power_set) !important;
  --svg-circle-fill: var(--theme_pool_power_set) !important;
  --svg-circle-stroke-width: 1;
  --svg-circle-stroke-dasharray: 0;
  --svg-text-fill: var(--theme_text_color_slots_remaining) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 5;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.SlotEpic {
  @include rise;
  margin-right: 5px;
  --svg-circle-stroke: var(--theme_epic_power_set) !important;
  --svg-circle-fill: var(--theme_epic_power_set) !important;
  --svg-circle-stroke-width: 1;
  --svg-circle-stroke-dasharray: 0;
  --svg-text-fill: var(--theme_text_color_slots_remaining) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 5;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.SlotInherent {
  @include rise;
  margin-right: 5px;
  --svg-circle-stroke: var(--theme_inherent_power_set) !important;
  --svg-circle-fill: var(--theme_inherent_power_set) !important;
  --svg-circle-stroke-width: 1;
  --svg-circle-stroke-dasharray: 0;
  --svg-text-fill: var(--theme_text_color_slots_remaining) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 5;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.SlotBadgeColumn {
  position: relative;
}

.SlotLevelBadge {
  @include cursor-default;
    position: absolute;
    width: 20px;
    top: 32px;
    color: white;
    background-color: #6495ED;
    border-radius: 4px;
    text-align: center;
    z-index: 1;
}

.SlotEnhancementBadge {
  @include cursor-default;
    position: absolute;
    width: 20px;
    top: 32px;
    left: 22px;
    color: white;
    background-color: #FF4500;
    border-radius: 4px;
    text-align: center;
    z-index: 1;
}

.Pill {
  color: var(--theme_pill_color) !important;
  background-color: var(--theme_pill_background_color) !important;
  text-align: var(--theme_pill_text_align) !important;
  overflow: var(--theme_pill_overflow) !important;
  font-family: var(--theme_pill_font_family) !important;
  font-size: var(--theme_pill_font_size) !important;
  width: 15px;
  height: 15px;
}

.PillAlt {
  color: var(--theme_pill_color) !important;
  background-color: var(--theme_pill_alt_background_color) !important;
  text-align: var(--theme_pill_text_align) !important;
  overflow: var(--theme_pill_overflow) !important;
  font-family: var(--theme_pill_font_family) !important;
  font-size: var(--theme_pill_font_size) !important;
  width: 15px;
  height: 15px;
}
</style>
