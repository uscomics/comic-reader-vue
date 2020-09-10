<template>
    <div>
        <div class="PowerEntryRows" :key="getCurrentBuildNumber">
            <span class="PowerEntryColumns" v-for="n in getColumnCount" :key="n">
                <span v-for="m in getPowerEntriesPerColumn" :key="((n-1) * getPowerEntriesPerColumn) + (m-1)">
                        <PowerEntry
                        class="PowerEntry"
                        v-if="((n-1) * getPowerEntriesPerColumn) + (m-1) < getPowerEntryCount"
                        @power-clicked="doPowerClicked"
                        :power_entry="getPowerEntry(((n-1) * getPowerEntriesPerColumn) + (m-1))"
                    />
                </span>
            </span>
        </div>
    </div>
</template>

<script>
import PowerEntry from 'components/PowerEntry.vue'
export default {
  name: 'PowerEntryGrid',
  components: { PowerEntry },
  updated: function() {
  },
  computed: {
    getCurrentBuildNumber: function () {
      return this.$store.getters['builder/getToonCurrentBuildNumber']
    },
    getPowerEntryCount: function () {
      let powerEntries = this.$store.getters['builder/getToonSortedPowerEntries']
      let powerEntryCount = powerEntries.length
      return powerEntryCount
    },
    getColumnCount: function () {
      if ('max_power_entry_columns_4' === this.$mq) { return 4 }
      if ('max_power_entry_columns_3' === this.$mq) { return 3 }
      if ('max_power_entry_columns_2' === this.$mq) { return 2 }
      if ('mobile' === this.$mq) { return 1 }
      if ('tablet' === this.$mq) { return 3 }
      if ('laptop' === this.$mq) { return 4 }
      if ('desktop' === this.$mq) { return 4 }
      return 1
    },
    getPowerEntriesPerColumn: function (columnWidth) {
      let columnCount = this.getColumnCount
      let powerEntryCount = this.getPowerEntryCount
      let powerEntriesPerColumn = Math.ceil(powerEntryCount / columnCount)
      return powerEntriesPerColumn
    }
  },
  methods: {
    getPowerEntry(index) {
      let powerEntries = this.$store.getters['builder/getToonSortedPowerEntries']
      return powerEntries[index]
    },
    doPowerClicked: function (powerEntry) {
      this.$emit('power-clicked', powerEntry)
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
.PowerEntryRows {
    @include row;
}

.PowerEntryColumns {
    @include column
}

.PowerEntry {
    margin-left: 3px;
    margin-right: 3px;
}
</style>
