<template>
    <div class="BasicInfo">
        <div >
            <q-input borderless dense hide-bottom-space bg-color="grey-3" class="BasicInfoName" v-model="name" label="Name" />
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
export default {
  name: 'BasicInfo',
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
    doPowerSetClicked: function () {
      this.$emit('power-set-clicked', '')
    },
    getArchetypeName: function () {
      let archtype = this.$store.getters['builder/getArchetype'](this.archetype_id)
      this.archetype_name = archtype.display_name
    }
  },
  watch: {
    'name': function(val, preVal) {
      this.$store.commit('builder/changedName', val)
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
    @include rise;
    height: 19px;
    width: 175px;
    text-align: left;
    overflow: hidden;
    margin-bottom: 3px;
    color: var(--theme_power_set_text_color);
    border-bottom-width: 1px;
    border-bottom-color: var(--theme_power_set_text_color);
    box-shadow: var(--theme_box_shadow_small_active) !important;
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
