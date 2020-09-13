<template>
    <div class="PowerText" @click="doClick">
        <Label class="PowerTextName" :text="power_name" size="small" color="default" :disabled="getDisabled" />
        <Label class="PowerTextLevel" :text="power_level" size="small" color="default" :disabled="getDisabled" />
    </div>
</template>

<script>
import Label from './Label.vue'
import { PowerSetType } from '../enums/PowerSetType'
export default {
  name: 'PowerText',
  components: { Label },
  props: {
    power_name: { type: String, default: '' },
    power_level: { type: String, default: '0' },
    power_set_type: { type: String, default: PowerSetType.NO_POWER }
  },
  computed: {
    getDisabled: function () {
      let powerSetType = this.power_set_type
      if (this.power_set) powerSetType = this.power_set.group_name
      return (powerSetType === PowerSetType.NO_POWER)
    },
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
    width: 195px;
    height: 19px;
    &:hover{
        cursor:pointer
    }
}

.PowerTextLevel{
    width: 45px;
    height: 16px;
    text-align: right !important;
    padding-right: 3px;
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
