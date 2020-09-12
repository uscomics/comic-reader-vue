<template>
    <div class="q-pa-md q-gutter-sm EditorWrapper">
        <div class="ButtonRow">
            <Button type="button" class="q-mt-md Button" label="Cancel" @button-event="doCancel"/>
            <Button type="button" class="q-mt-md Button" label="Done" @button-event="doDone"/>
        </div>
        <q-editor class="Editor" v-model="editor" min-height="5rem" />
    </div>
</template>

<script>
import Button from '../components/Button.vue'
export default {
  name: 'PageNotes',
  components: { Button },
  created() {
    this.editor = this.getNotes
  },
  data () {
    return {
      editor: ''
    }
  },
  computed: {
    getNotes: function () {
      let toon = this.$store.getters['builder/getToon']
      if (toon.notes && toon.notes.length > 0) {
        return toon.notes
      }
      return 'Add notes about your build.'
    }
  },
  methods: {
    doCancel: function () {
      let toon = this.$store.getters['builder/getToon']
      this.$router.push('/Toon/' + toon.archetype_id + '/Existing')
    },
    doDone: function () {
      let toon = this.$store.getters['builder/getToon']
      toon.notes = this.editor
      this.$router.push('/Toon/' + toon.archetype_id + '/Existing')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.EditorWrapper{
    @include column;
    position:           absolute !important;
    top:                40px !important;
    bottom:             0px !important;
    min-width:          100% !important;
    min-height:         100% !important;
    color:              var(--theme_notes_color) !important;
    background-color:   var(--theme_notes_background_color) !important;
}

.Editor{
    color:              var(--theme_notes_editor_color) !important;
    box-shadow:         var(--theme_notes_box_shadow) !important;
}

.ButtonRow{
    @include row;
    width: 100% !important;
}

.Button{
    margin-right: 15px;
}
</style>
