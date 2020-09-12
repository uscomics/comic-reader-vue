<template>
    <div class="BasicInfo">
        <div >
          <TextInput
            class="BasicInfoName"
            :dense="true"
            :hidebottomspace="true"
            id="toon_name"
            :initial_value="starting_name"
            label="Name"
            @text-input-changed-event="doNameChanged"
          />
        </div>
        <div class="BasicInfoArchetypeAndLevel">
            <div class="BasicInfoArchetype">
                {{archetype_name}}
            </div>
            <div class="BasicInfoLevel">
                Level {{getLevel}}
            </div>
        </div>
        <div class="BasicInfoPrimaryAndSecondaryPowerSets" @click="doPowerSetClicked">
            {{getPowerSetNames}}
        </div>
    </div>
</template>

<script>
import TextInput from './TextInput.vue'
export default {
  name: 'BasicInfo',
  components: { TextInput },
  created: function() {
    this.getArchetypeName()
  },
  props: {
    starting_name: { type: String, default: '' },
    archetype_id: { type: String, default: '' },
    primary_name: { type: String, default: '' },
    secondary_name: { type: String, default: '' }
  },
  data () {
    return {
      name: this.starting_name,
      archetype_name: this.starting_archetype_id
    }
  },
  computed: {
    getPowerSetNames: function () {
      if (!this.primary_name) { return 'Tap to set Primary/Secondary' }
      return this.primary_name + '/' + this.secondary_name
    },
    getLevel: function () {
      return this.$store.getters['builder/getToon'].level
    }
  },
  methods: {
    doNameChanged: function (newName) {
      this.$store.commit('builder/toonSetName', newName)
    },
    doPowerSetClicked: function () {
      this.$emit('power-set-clicked', '')
    },
    getArchetypeName: function () {
      let archtype = this.$store.getters['builder/getArchetype'](this.archetype_id)
      this.archetype_name = archtype.display_name
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.BasicInfo{
    @include column;
    width: 175px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.BasicInfoName {
    height: 30px;
    width: 175px;
    margin-bottom: 3px;
}

.BasicInfoArchetypeAndLevel{
    @include row;
    width: 175px;
}

.BasicInfoArchetype{
    @include cursor-default;
    font-size: 11px;
    height: 16px;
    width: 100px;
    text-align: left;
    overflow: hidden;
  }

.BasicInfoLevel{
    @include cursor-default;
    font-size: 11px;
    height: 16px;
    width: 85px;
    text-align: right;
    overflow: hidden;
}

.BasicInfoPrimaryAndSecondaryPowerSets{
    @include rise;
    @include cursor-pointer;
    font-size: 11px;
    height: 16px;
    width: 215px;
    text-align: left;
    overflow: hidden;
}
</style>
