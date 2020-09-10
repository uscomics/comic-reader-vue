<template>
  <div class="SlotRow">
    <EnhancementSlot :class="getSlotClass(1)" :power_set_type="getPowerSetType" :slot_state="getSlotState(1)" :slot_level="slot1_slot_level" :enhancement_level="slot1_enhancement_level"></EnhancementSlot>
    <EnhancementSlot :class="getSlotClass(2)" :power_set_type="getPowerSetType" :slot_state="getSlotState(2)" :slot_level="slot2_slot_level" :enhancement_level="slot2_enhancement_level"></EnhancementSlot>
    <EnhancementSlot :class="getSlotClass(3)" :power_set_type="getPowerSetType" :slot_state="getSlotState(3)" :slot_level="slot3_slot_level" :enhancement_level="slot3_enhancement_level"></EnhancementSlot>
    <EnhancementSlot :class="getSlotClass(4)" :power_set_type="getPowerSetType" :slot_state="getSlotState(4)" :slot_level="slot4_slot_level" :enhancement_level="slot4_enhancement_level"></EnhancementSlot>
    <EnhancementSlot :class="getSlotClass(5)" :power_set_type="getPowerSetType" :slot_state="getSlotState(5)" :slot_level="slot5_slot_level" :enhancement_level="slot5_enhancement_level"></EnhancementSlot>
    <EnhancementSlot :class="getSlotClass(6)" :power_set_type="getPowerSetType" :slot_state="getSlotState(6)" :slot_level="slot6_slot_level" :enhancement_level="slot6_enhancement_level"></EnhancementSlot>
  </div>
</template>

<script>
import EnhancementSlot from 'components/EnhancementSlot.vue'
import { PowerSetType } from '../enums/PowerSetType'
import { SlotState } from '../enums/SlotState'
export default {
  components: { EnhancementSlot },
  name: 'EnhancementSlotRow',
  props: {
    power_set_type: { type: String, default: PowerSetType.NO_POWER },
    slot1_slot_level: { type: Number, default: 0 },
    slot1_enhancement_level: { type: Number, default: 0 },
    slot2_slot_level: { type: Number, default: 0 },
    slot2_enhancement_level: { type: Number, default: 0 },
    slot3_slot_level: { type: Number, default: 0 },
    slot3_enhancement_level: { type: Number, default: 0 },
    slot4_slot_level: { type: Number, default: 0 },
    slot4_enhancement_level: { type: Number, default: 0 },
    slot5_slot_level: { type: Number, default: 0 },
    slot5_enhancement_level: { type: Number, default: 0 },
    slot6_slot_level: { type: Number, default: 0 },
    slot6_enhancement_level: { type: Number, default: 0 }
  },
  computed: {
    slotsRemaining: function () {
      return 62
    },
    getPowerSetType: function () {
      return this.power_set_type
    },
    getSlotCount: function () {
      if (this.slot6_slot_level > 0) {
        return 6
      } else if (this.slot5_slot_level > 0) {
        return 5
      } else if (this.slot4_slot_level > 0) {
        return 4
      } else if (this.slot3_slot_level > 0) {
        return 3
      } else if (this.slot2_slot_level > 0) {
        return 2
      } else if (this.slot1_slot_level > 0) {
        return 1
      }
      return 0
    }
  },
  methods: {
    getSlotClass: function (slot) {
      if (this.power_set_type === PowerSetType.NO_POWER) {
        return ''
      }
      const slotCount = this.getSlotCount + 2
      if (slot <= slotCount) {
        return ''
      }
      return 'Hidden'
    },
    getSlotState: function (slot) {
      let state = SlotState.UNSLOTTED
      if (this.power_set_type === PowerSetType.NO_POWER) {
        state = SlotState.NO_POWER
      }
      if (slot === 1 || slot <= this.getSlotCount) {
        state = SlotState.SLOTTED
      } else if (slot <= 6 && slot === this.getSlotCount + 2) {
        state = SlotState.UNSLOTTED
      }
      return state
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.Hidden {
  display: hidden;
}

.SlotRow {
  @include row;
}

</style>
