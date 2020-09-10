<template>
  <q-page class="flex flex-center Page">
    <div class="ArchetypeInfo">
        <div v-for="archetype in archetypes" :key="archetype.archetype_id">
          <ArchetypeInfo
              v-if="archetype.archetype_id === current_archetype"
              :archetype_id="current_archetype"
              :avatar="archetype.avatar"
              :chart="archetype.chart"
              :icon="archetype.icon"
              :title="getTitle(archetype.archetype_id)"
              :description="getDescription(archetype.archetype_id)"
              :article="archetype.article"
          />
        </div>
        <div class="Spacer"> </div>
        <div class="ButtonRow">
            <div v-for="archetype in archetypes" class="ImageButtonWrapper" :key="archetype.avatar">
                <ImageButton
                    :id="archetype.archetype_id"
                    :source="archetype.icon"
                    :label="getTitle(archetype.archetype_id)"
                    @image-button-event="doClick"
                    size = 'medium'
                />
            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import ArchetypeInfo from 'components/ArchetypeInfo.vue'
import ImageButton from 'components/ImageButton.vue'

export default {
  components: { ArchetypeInfo, ImageButton },
  name: 'AT',
  created: function() {
    const fetchATInfo = (archetypeId) => {
      this.archetype_info[archetypeId] = this.$store.getters['builder/getArchetype'](archetypeId)
    }
    fetchATInfo('Class_Arachnos_Soldier')
    fetchATInfo('Class_Arachnos_Widow')
    fetchATInfo('Class_Blaster')
    fetchATInfo('Class_Brute')
    fetchATInfo('Class_Controller')
    fetchATInfo('Class_Corruptor')
    fetchATInfo('Class_Defender')
    fetchATInfo('Class_Dominator')
    fetchATInfo('Class_Mastermind')
    fetchATInfo('Class_Peacebringer')
    fetchATInfo('Class_Scrapper')
    fetchATInfo('Class_Sentinel')
    fetchATInfo('Class_Stalker')
    fetchATInfo('Class_Tanker')
    fetchATInfo('Class_Warshade')
  },
  props: {
    archetypes: { type: Array,
      default: function () {
        return [
          { avatar: 'Arachnos SoldierAvatar.png', chart: 'Arachnos SoldierChart.png', icon: 'Arachnos Soldier.png', article: 'An', archetype_id: 'Class_Arachnos_Soldier' },
          { avatar: 'Arachnos WidowAvatar.png', chart: 'Arachnos WidowChart.png', icon: 'Arachnos Widow.png', article: 'An', archetype_id: 'Class_Arachnos_Widow' },
          { avatar: 'BlasterAvatar.png', chart: 'BlasterChart.png', icon: 'Blaster.png', article: 'A', archetype_id: 'Class_Blaster' },
          { avatar: 'BruteAvatar.png', chart: 'BruteChart.png', icon: 'Brute.png', article: 'A', archetype_id: 'Class_Brute' },
          { avatar: 'ControllerAvatar.png', chart: 'ControllerChart.png', icon: 'Controller.png', article: 'A', archetype_id: 'Class_Controller' },
          { avatar: 'CorruptorAvatar.png', chart: 'CorruptorChart.png', icon: 'Corruptor.png', article: 'A', archetype_id: 'Class_Corruptor' },
          { avatar: 'DefenderAvatar.png', chart: 'DefenderChart.png', icon: 'Defender.png', article: 'A', archetype_id: 'Class_Defender' },
          { avatar: 'DominatorAvatar.png', chart: 'DominatorChart.png', icon: 'Dominator.png', article: 'A', archetype_id: 'Class_Dominator' },
          { avatar: 'MastermindAvatar.png', chart: 'MastermindChart.png', icon: 'Mastermind.png', article: 'A', archetype_id: 'Class_Mastermind' },
          { avatar: 'PeacebringerAvatar.png', chart: 'PeacebringerChart.png', icon: 'Peacebringer.png', article: 'A', archetype_id: 'Class_Peacebringer' },
          { avatar: 'ScrapperAvatar.png', chart: 'ScrapperChart.png', icon: 'Scrapper.png', article: 'A', archetype_id: 'Class_Scrapper' },
          { avatar: 'SentinelAvatar.png', chart: 'SentinelChart.png', icon: 'Sentinel.png', article: 'A', archetype_id: 'Class_Sentinel' },
          { avatar: 'StalkerAvatar.png', chart: 'StalkerChart.png', icon: 'Stalker.png', article: 'A', archetype_id: 'Class_Stalker' },
          { avatar: 'TankerAvatar.png', chart: 'TankerChart.png', icon: 'Tanker.png', article: 'A', archetype_id: 'Class_Tanker' },
          { avatar: 'WarshadeAvatar.png', chart: 'WarshadeChart.png', icon: 'Warshade.png', article: 'A', archetype_id: 'Class_Warshade' }
        ]
      } }
  },
  data () {
    return {
      current_archetype: 'Class_Arachnos_Soldier',
      archetype_info: {
        Class_Arachnos_Soldier: {},
        Class_Arachnos_Widow: {},
        Class_Blaster: {},
        Class_Brute: {},
        Class_Controller: {},
        Class_Corruptor: {},
        Class_Defender: {},
        Class_Dominator: {},
        Class_Mastermind: {},
        Class_Peacebringer: {},
        Class_Scrapper: {},
        Class_Sentinel: {},
        Class_Stalker: {},
        Class_Tanker: {},
        Class_Warshade: {}
      }
    }
  },
  methods: {
    doClick: function (message) {
      this.current_archetype = message
    },
    getTitle: function(archetypeId) {
      return this.archetype_info[archetypeId].display_name
    },
    getDescription: function(archetypeId) {
      return this.archetype_info[archetypeId].description_long
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/app.sass';

.Page {
  position: relative;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
  font-family: var(--theme_font_family) !important;
}

.ArchetypeInfo {
    @include column;
    align-items: center;
    color: var(--theme_text_color_label) !important;
    background: var(--theme_background_color) !important;
    font-family: var(--theme_font_family) !important;
    font-size: var(--theme_font_size_large) !important;
    width: 100% !important;
    height: 100% !important;
}

.ButtonRow {
    @include row;
    justify-content: center;
    flex-wrap: wrap;
    color: var(--theme_text_color_label) !important;
    background: var(--theme_background_color) !important;
    width: 80%;
    box-shadow: var(--theme_box_shadow_small_active) !important;
}

.ImageButtonWrapper{
    color: var(--theme_text_color_label) !important;
    background: var(--theme_background_color) !important;
    width: 100px;
    height: 80px;
}

.Spacer {
    width: 100%;
    height: 20px;
}
</style>
