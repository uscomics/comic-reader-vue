<template>
    <div class="GridWrapper">
        <div class="Title">Open</div>
        <div class="Row">
            <ImageButton id="Open_Mids" source="Reborn.png" label="Mid's Reborn" @image-button-event="doClick"/>
            <ImageButton id="Open_Dropbox" source="Dropbox.png" label="Dropbox" @image-button-event="doClick"/>
            <ImageButton id="Open_HeroBase" source="HeroBase.png" label="HeroBase" @image-button-event="doClick"/>
        </div>
        <div class="Spacer"> </div>
        <div class="Title">Create</div>
        <div class="Row">
            <ImageButton id="Class_Arachnos_Solider" source="Arachnos Soldier.png" label="Arachnos Soldier" @image-button-event="doClick"/>
            <ImageButton id="Class_Arachnos_Widow" source="Arachnos Widow.png" label="Arachnos Widow" @image-button-event="doClick"/>
            <ImageButton id="Class_Blaster" source="Blaster.png" label="Blaster" @image-button-event="doClick"/>
            <ImageButton id="Class_Brute" source="Brute.png" label="Brute" @image-button-event="doClick"/>
            <ImageButton id="Class_Controller" source="Controller.png" label="Controller" @image-button-event="doClick"/>
        </div>
        <div class="Spacer2"> </div>
        <div class="Row">
            <ImageButton id="Class_Corruptor" source="Corruptor.png" label="Corruptor" @image-button-event="doClick"/>
            <ImageButton id="Class_Defender" source="Defender.png" label="Defender" @image-button-event="doClick"/>
            <ImageButton id="Class_Dominator" source="Dominator.png" label="Dominator" @image-button-event="doClick"/>
            <ImageButton id="Class_Mastermind" source="Mastermind.png" label="Mastermind" @image-button-event="doClick"/>
            <ImageButton id="Class_Peacebringer" source="Peacebringer.png" label="Peacebringer" @image-button-event="doClick"/>
        </div>
        <div class="Spacer2"> </div>
        <div class="Row">
            <ImageButton id="Class_Scrapper" source="Scrapper.png" label="Scrapper" @image-button-event="doClick"/>
            <ImageButton id="Class_Sentinel" source="Sentinel.png" label="Sentinel" @image-button-event="doClick"/>
            <ImageButton id="Class_Stalker" source="Stalker.png" label="Stalker" @image-button-event="doClick"/>
            <ImageButton id="Class_Tanker" source="Tanker.png" label="Tanker" @image-button-event="doClick"/>
            <ImageButton id="Class_Warshade" source="Warshade.png" label="Warshade" @image-button-event="doClick"/>
        </div>
        <div class="Spacer"> </div>
        <Link class="ATLink" text="Tell Me About the Archetypes" @link-event="doTellMeClick" />
    </div>
</template>

<script>
import ImageButton from './ImageButton.vue'
import Link from './Link.vue'
import Toon from '../util/toon'

export default {
  name: 'ArchetypeGrid',
  components: { ImageButton, Link },
  methods: {
    doClick: function (message) {
      if (message === 'Open_Mids') {
        this.doOpenLocal()
      } else if (message === 'Open_Dropbox' || message === 'Open_HeroBase') {
        alert('Open ' + message)
      } else {
        this.$store.commit('builder/toonCreate', message, this.$router)
        this.$router.push('/Toon/' + message + '/New')
      }
    },
    doOpenLocal: function() {
      var input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', '.hero')
      input.style.display = 'none'
      input.addEventListener('change', (e) => {
        const reader = new FileReader()
        reader.onload = () => {
          const toonObj = JSON.parse(reader.result)
          const toon = Toon.fromObject(toonObj)
          this.$store.commit('builder/toonSet', toon)
          this.$router.push('/Toon/' + toon.archetype_id + '/Existing')
        }
        reader.readAsText(input.files[0])
        input.remove()
      })
      document.body.appendChild(input)

      var event = document.createEvent('MouseEvent')
      event.initMouseEvent('click', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      input.dispatchEvent(event)
    },
    doTellMeClick: function (message) {
      this.$router.push('/AT')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.GridWrapper{
  padding: 10px 15px 10px 10px;
  box-shadow: var(--theme_box_shadow_image_button) !important;
}

.Title {
  @include cursor-default;
  @include column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  font-family: var(--theme_font_family);
  font-size: var(--theme_font_size_medium);
  color: var(--theme_text_color_label);
  background-color: var(--theme_background_color);
  box-shadow: var(--theme_box_shadow_small_active) !important;
  margin: 5px;
}

.Row{
    @include row;
    justify-content: center;
    width: 100%;
    height: 120px;
}

.Spacer{
    @include cursor-pointer;
    width: 100%;
    height: 10px;
}

.Spacer2{
    @include cursor-pointer;
    width: 100%;
    height: 20px;
}

.ATLink {
  width: 100% !important;
  height: 20px !important;
}

</style>
