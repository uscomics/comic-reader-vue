<template>
  <div class="PowerEntry" @click="doClick" :class="isNoPower ? 'Rise' : ''">
    <div class="PowerBar" :class="getPowerBarClass">
        <PowerText
          :power_set_type="getPowerSetType"
          :power_name="getPowerName"
          :power_level="getPowerLevel.toString()"
        />
        <SVGCircleButton :class="getPowerBarInfoButtonClass"></SVGCircleButton>
    </div>
    <q-tooltip v-if="getPowerShortDescription !== ''">{{getPowerShortDescription}}</q-tooltip>
    <EnhancementSlotRow
      class="PowerEntrySlotRow"
      :power_set_type="getPowerSetType"
      :slot1_slot_level="getSlot1Level"
      :slot2_slot_level="getSlot2Level"
      :slot3_slot_level="getSlot3Level"
      :slot4_slot_level="getSlot4Level"
      :slot5_slot_level="getSlot5Level"
      :slot6_slot_level="getSlot6Level"
      @add-slot="addSlot"
      @set-power="setPower"
    ></EnhancementSlotRow>
  </div>
</template>

<script>
import EnhancementSlotRow from 'components/EnhancementSlotRow.vue'
import { getPowerLevel } from '../enums/PowerLevel'
import { PowerSetType } from '../enums/PowerSetType'
import PowerText from 'components/PowerText.vue'
import SVGCircleButton from 'components/SVG/SVGCircleButton.vue'
export default {
  components: { EnhancementSlotRow, PowerText, SVGCircleButton },
  name: 'PowerEntry',
  props: {
    powerEntryLevel: { type: String, default: '' }
  },
  computed: {
    getCurrentBuildNumber: function () {
      return this.$store.getters['builder/getToonCurrentBuildNumber']
    },
    getPower: function () {
      if (!this.getPowerEntry || '' === this.getPowerEntry.power_id) {
        return null
      }
      let power = this.$store.getters['builder/getPower'](this.getPowerEntry.power_id)
      return power
    },
    getPowerBarClass: function () {
      let classes = ''
      let powerSetType = this.getPowerSetType
      if (powerSetType === PowerSetType.NO_POWER) {
        classes = 'PowerBarNoPower'
      } else if (powerSetType === PowerSetType.PRIMARY) {
        classes = 'PowerBarPrimary'
      } else if (powerSetType === PowerSetType.SECONDARY) {
        classes = 'PowerBarSecondary'
      } else if (powerSetType === PowerSetType.POOL) {
        classes = 'PowerBarPool'
      } else if (powerSetType === PowerSetType.EPIC) {
        classes = 'PowerBarEpic'
      } else if (powerSetType === PowerSetType.INHERENT) {
        classes = 'PowerBarInherent'
      }
      return classes
    },
    getPowerBarInfoButtonClass: function () {
      let classes = ''
      if (this.getPowerSetType === PowerSetType.NO_POWER) {
        classes = 'PowerBarInfoButtonDisabled'
      } else {
        classes = 'PowerBarInfoButton'
      }
      return classes
    },
    getPowerEntry: function () {
      if (!this.powerEntryLevel) {
        return null
      }
      let powerEntry = this.$store.getters['builder/getToonPowerEntryFromLevel'](this.powerEntryLevel)
      return powerEntry
    },
    getPowerLevel: function() {
      return getPowerLevel(this.powerEntryLevel)
    },
    getPowerName: function () {
      let power = this.getPower
      if (!power) {
        return 'Tap to select power.'
      }
      return power.display_name
    },
    getPowerSet: function () {
      let power = this.getPower
      if (!power) { return null }
      let powerSet = this.$store.getters['builder/getPowerSet'](power.power_set_id)
      return powerSet
    },
    getPowerSetType: function () {
      let powerSet = this.getPowerSet
      if (!powerSet) { return PowerSetType.NO_POWER }
      return powerSet.set_type
    },
    getPowerShortDescription: function () {
      const power = this.getPower
      if (!power) {
        return ''
      }
      return power.description_short
    },
    getSlot1Level: function () {
      return this.getSlotLevel(0)
    },
    getSlot2Level: function () {
      return this.getSlotLevel(1)
    },
    getSlot3Level: function () {
      return this.getSlotLevel(2)
    },
    getSlot4Level: function () {
      return this.getSlotLevel(3)
    },
    getSlot5Level: function () {
      return this.getSlotLevel(4)
    },
    getSlot6Level: function () {
      return this.getSlotLevel(5)
    },
    getToon: function () {
      return this.$store.getters['builder/getToon']
    },
    isNoPower: function () {
      return this.getPowerSetType === PowerSetType.NO_POWER
    }
  },
  methods: {
    addSlot: function () {
      if (this.getPowerEntry.slots.length === 6) {
        return
      }
      const toon = this.getToon
      const level = toon.getLowestLevelForExtraSlot(this.getPowerEntry.level)
      this.$store.commit('builder/toonAddEmptySlot', { powerEntryLevel: this.powerEntryLevel, slotLevel: level })
    },
    doClick: function (index) {
      let powerSetType = this.getPowerSetType
      if (powerSetType === PowerSetType.INHERENT) { return }
      this.$emit('power-clicked', { powerEntry: this.getPowerEntry, powerEntryLevel: this.powerEntryLevel })
    },
    getSlotLevel: function (index) {
      if (!this.getPowerEntry || !this.getPowerEntry.slots || this.getPowerEntry.slots.length <= index) {
        return 0
      }
      return this.getPowerEntry.slots[index].level
    },
    setPower: function () {
      let powerSetType = this.getPowerSetType
      if (powerSetType === PowerSetType.INHERENT) { return }
      this.$emit('power-clicked', { powerEntry: this.getPowerEntry, powerEntryLevel: this.powerEntryLevel })
    }
  },
  watch: {
    getCurrentBuildNumber (newBuildNumber, oldBuildNumber) {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.Rise {
  @include rise;
}

.PowerEntry {
  @include column;
  width: 280px;
  height: 75px;
}

.PowerBar {
  @include row;
  @include cursor-pointer;
  position: relative;
  border-radius: 10px;
  padding-left: 2px;
  background-color: var(--theme_power_set_background_color) !important;
  box-shadow: var(--theme_box_shadow_small) !important;
  &:active {
    box-shadow: var(--theme_box_shadow_small_active) !important;
  }
}

.PowerBarInfoButton {
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

.PowerBarInfoButtonDisabled {
  --svg-circle-stroke: var(--theme_text_color_label_disabled) !important;
  --svg-circle-fill: var(--theme_power_set_background_color) !important;
  --svg-circle-stroke-width: 2;
  --svg-circle-stroke-dasharray: 0;
  --svg-text-fill: var(--theme_text_color_label_disabled) !important;
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 2;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

.PowerBarNoPower {
    border: 2px solid var(--theme_no_power_set) !important;
}

.PowerBarPrimary {
    @include rise;
    border: 2px solid var(--theme_primary_power_set) !important;
}

.PowerBarSecondary {
    @include rise;
    border: 2px solid var(--theme_secondary_power_set) !important;
}

.PowerBarPool {
    @include rise;
    border: 2px solid var(--theme_pool_power_set) !important;
}

.PowerBarEpic {
    @include rise;
    border: 2px solid var(--theme_epic_power_set) !important;
}

.PowerBarInherent {
   @include rise;
   border: 2px solid var(--theme_inherent_power_set) !important;
}

.PowerEntrySlotRow {
  position: absolute;
  transform: translateY(25px);
}
</style>
