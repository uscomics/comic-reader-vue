<template>
    <div class="PowerText" @click="doClick">
        <div class="PowerTextName" :class="getPowerTextClass">{{power_name}}</div>
        <div class="PowerTextLevel" :class="getPowerTextClass">Level {{power_level}}</div>
    </div>
</template>

<script>
import { PowerSetType } from '../enums/PowerSetType'
export default {
  name: 'PowerText',
  props: {
    power_name: { type: String, default: '' },
    power_level: { type: String, default: '0' },
    power_set_type: { type: String, default: PowerSetType.NO_POWER }
  },
  computed: {
    getPowerTextClass: function () {
      let classes = ''
      let powerSetType = this.power_set_type
      if (this.power_set) powerSetType = this.power_set.group_name
      if (powerSetType === PowerSetType.NO_POWER) {
        classes = 'PowerTextNoPower'
      } else if (powerSetType === PowerSetType.PRIMARY) {
        classes = 'PowerTextPrimary'
      } else if (powerSetType === PowerSetType.SECONDARY) {
        classes = 'PowerTextSecondary'
      } else if (powerSetType === PowerSetType.POOL) {
        classes = 'PowerTextPool'
      } else if (powerSetType === PowerSetType.EPIC) {
        classes = 'PowerTextEpic'
      } else if (powerSetType === PowerSetType.INHERENT) {
        classes = 'PowerTextInherent'
      }
      return classes
    }
  },
  methods: {
    doClick: function () {
      this.$emit('power-entry-event', { power_name: this.power_name, power_level: this.power_level, power_set_type: this.power_set_type })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.PowerText{
    @include row;
    justify-content: space-between;
    align-items: baseline;
    width: 245px;
    height: 35px;
}

.PowerTextName{
    font-size: 13px;
    width: 195px;
    height: 19px;
    text-align: left;
    overflow: hidden;
    &:hover{
        cursor:pointer
    }
}

.PowerTextLevel{
    @include cursor-pointer;
    font-size: 11px;
    width: 45px;
    height: 16px;
}

.PowerTextNoPower {
    color: var(--theme_no_power_set) !important;
}

.PowerTextPrimary {
    color: var(--theme_power_set_text_color) !important;
}

.PowerTextSecondary {
    color: var(--theme_power_set_text_color) !important;
}

.PowerTextPool {
    color: var(--theme_power_set_text_color) !important;
}

.PowerTextEpic {
    color: var(--theme_power_set_text_color) !important;
}

.PowerTextInherent {
    color: var(--theme_power_set_text_color) !important;
}

</style>
