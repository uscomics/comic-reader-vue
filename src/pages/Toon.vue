<template>
  <q-page class="flex flex-center Page">
    <BasicInfo
      @power-set-clicked="showPowerSetPicker"
      :starting_name="getToonName"
      :archetype_id="getToonArchetypeId"
      :primary_name="getPrimaryPowerSetName"
      :secondary_name="getSecondaryPowerSetName"
    />
    <Build @selected-build="doBuildClicked"></Build>
    <PowerEntryGrid @power-clicked="doPowerClicked"/>
    <PowerSetPicker
      :class="getPowerSetPickerClass"
      @power-set-picker-select="doPowerSetPickerSelectClick"
      @power-set-picker-cancel="doPowerSetPickerCancelClick"
    />
    <PowerPicker
      :class="getPowerPickerClass"
      @power-picker-select="doPowerPickerSelectClick"
      @power-picker-cancel="doPowerPickerCancelClick"
      :availablePowerSets="availablePowerSets"
      :powerLevel="powerLevel"
      :powerEntry="powerEntry"
    />
    </q-page>
</template>

<script>
import BasicInfo from 'components/BasicInfo.vue'
import Build from 'components/Build.vue'
import { getPowerLevel } from '../enums/PowerLevel.js'
import Messages from '../util/messages'
import Queue from '../util/queue'
import PowerEntry from '../util/power_entry'
import PowerEntryGrid from 'components/PowerEntryGrid.vue'
import PowerPicker from 'components/PowerPicker.vue'
import PowerSetPicker from 'components/PowerSetPicker.vue'
export default {
  components: { BasicInfo, Build, PowerEntryGrid, PowerPicker, PowerSetPicker },
  name: 'PageToon',
  beforeCreate: function() {
    let toon = this.$store.getters['builder/getToon']
    if (null === toon) {
      window.location.assign('/')
    }
    while (Queue.isRegistered('PageToon', Messages.TOON_SAVE)) {
      Queue.unregister('PageToon', Messages.TOON_SAVE)
    }
    Queue.register('PageToon', Messages.TOON_SAVE, () => { this.doSave() })
    while (Queue.isRegistered('PageToon', Messages.TOON_NOTES)) {
      Queue.unregister('PageToon', Messages.TOON_NOTES)
    }
    Queue.register('PageToon', Messages.TOON_NOTES, () => { this.doNotes() })
  },
  data () {
    return {
      powerSetPickerVisible: false,
      powerPickerVisible: false,
      primary_power_set_display_name: '',
      secondary_power_set_display_name: '',
      availablePowerSets: [],
      powerLevel: 0,
      powerEntry: null,
      showSpinner: false
    }
  },
  computed: {
    getCurrentBuild: function () {
      let currentBuild = this.$store.getters['builder/getToonCurrentBuild']
      return currentBuild
    },
    getCurrentBuildNumber: function () {
      let currentBuildNumber = this.$store.getters['builder/getToonCurrentBuildNumber']
      return (null === currentBuildNumber) ? 0 : currentBuildNumber
    },
    getPowerPickerClass: function() {
      if (!this.powerPickerVisible) {
        return 'Hidden'
      }
      return ''
    },
    getPowerSetPickerClass: function() {
      if (!this.powerSetPickerVisible) {
        return 'Hidden'
      }
      return ''
    },
    getPrimaryPowerSetName: function () {
      if ('' === this.primary_power_set_display_name) {
        let toon = this.$store.getters['builder/getToon']
        if (toon) {
          let build = toon.builds[toon.current_build]
          if (build.power_sets.primary && build.power_sets.secondary) {
            let primary = this.$store.getters['builder/getPowerSet'](build.power_sets.primary)
            return primary.display_name
          }
        }
        return 'Tap to set Primary'
      }
      return this.primary_power_set_display_name
    },
    getSecondaryPowerSetName: function () {
      if ('' === this.secondary_power_set_display_name) {
        let toon = this.$store.getters['builder/getToon']
        if (toon) {
          let build = toon.builds[toon.current_build]
          if (build.power_sets.primary && build.power_sets.secondary) {
            let secondary = this.$store.getters['builder/getPowerSet'](build.power_sets.secondary)
            return secondary.display_name
          }
        }
        return 'Secondary'
      }
      return this.secondary_power_set_display_name
    },
    getToonArchetypeId: function () {
      let archetypeId = this.$store.getters['builder/getToonArchetypeId']
      return (null === archetypeId) ? '' : archetypeId
    },
    getToonLevel: function () {
      let level = this.$store.getters['builder/getToonLevel']
      return (null === level) ? 0 : level
    },
    getToonName: function () {
      let name = this.$store.getters['builder/getToonName']
      return (null === name) ? '' : name
    }
  },
  methods: {
    doBuildClicked: function (buildNumber) {
      this.$forceUpdate()
    },
    doClick: function(event) {
      alert(JSON.stringify(event))
    },
    doNotes: function() {
      this.$router.push('/Notes')
    },
    doPowerClicked: function (powerEntry) {
      this.powerLevel = this.getPowerLevel(powerEntry)
      this.powerEntry = powerEntry

      this.availablePowerSets = this.$store.getters['builder/getToonAllowedPowerSets'](powerEntry.level)
      if (this.primary_power_set_display_name === '') {
        this.showPowerSetPicker()
      } else {
        this.showPowerPicker()
      }
    },
    doPowerPickerCancelClick: function () {
      this.powerPickerVisible = false
    },
    doPowerPickerSelectClick: async function (powerSelection) {
      let level = getPowerLevel(this.powerEntry.level)
      let powerEntry = new PowerEntry()
      powerEntry.level = level
      powerEntry.power_id = powerSelection.power.id
      powerEntry.slots = []
      powerEntry.sub_powers = []
      powerEntry.variable_value = 0
      powerEntry.addEmptySlot(level)

      let payload = { buildPowerLevel: this.powerEntry.level, powerEntry: powerEntry }
      this.$store.commit('builder/toonSetPowerEntry', payload)
      this.powerPickerVisible = false
    },
    doPowerSetPickerCancelClick: function () {
      this.powerSetPickerVisible = false
    },
    doPowerSetPickerSelectClick: function (powerSetSelections) {
      this.$store.commit('builder/toonSetPrimaryPowerSet', powerSetSelections.primary_power_set.id)
      this.$store.commit('builder/toonSetSecondaryPowerSet', powerSetSelections.secondary_power_set.id)
      this.primary_power_set_display_name = powerSetSelections.primary_power_set.display_name
      this.secondary_power_set_display_name = powerSetSelections.secondary_power_set.display_name
      this.powerSetPickerVisible = false
    },
    doSave: function () {
      const toon = this.$store.getters['builder/getToon']
      const toonJSON = JSON.stringify(toon)
      var element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(toonJSON))
      element.setAttribute('download', 'MyHero.hero')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    getPowerLevel: function(powerEntry) {
      return getPowerLevel(powerEntry.level, this.getToonArchetypeId)
    },
    showPowerSetPicker: function() {
      this.powerSetPickerVisible = true
    },
    showPowerPicker: function() {
      this.powerPickerVisible = true
    }
  },
  watch: {
    getCurrentBuild (newBuild, oldBuild) {
      this.$forceUpdate()
    },
    getCurrentBuildNumber (newBuildNumber, oldBuildNumber) {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.Hidden {
  display: none;
}

.Page {
  position: absolute;
  width:100%;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
  font-family: var(--theme_font_family) !important;
}

.SVGInfoButtonEnabled {
  --svg-circle-stroke: var(--theme_text_color_label);
  --svg-circle-fill: var(--theme_background_color);
  --svg-circle-stroke-width: 2;
  --svg-circle-stroke-dasharray: 0;
  --svg-text-fill: var(--theme_text_color_label);
  --svg-text-font-family: var(--theme_font_family);
  --svg-text-font-size: var(--theme_font_size_medium);
  --svg-text-font-weight: 'bold';
  --svg-text-stroke-width: 5;
  --svg-text-dominant-baseline: 'middle';
  --svg-text-anchor: 'middle';
}

</style>
