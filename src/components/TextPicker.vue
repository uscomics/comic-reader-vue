<template>
    <div class="TextPicker">
        <div class="TextPickerTitleBar">
          <div class="TextPickerPowerSetTitle">{{title}}</div>
        </div>
        <div class="TextPickerList">
            <div v-for="(item, index) in list" :key="getKey(index)">
              <div
                  :class="getItemClass(index)"
                  @click="doClick(index)"
              >
                  {{item}}
              </div>
              <q-tooltip v-if="getHoverText(index) !== ''">{{getHoverText(index)}}</q-tooltip>
            </div>
       </div>
    </div>
</template>

<script>
export default {
  name: 'PowerText',
  props: {
    title: { type: String, default: 'Title' },
    click_event: { type: String, default: 'selected-item' },
    list: { type: Array, default: function () { return ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'] } },
    hoverList: { type: Array, default: function () { return ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'] } },
    initialSelection: { type: Number, default: -1 }
  },
  data () {
    return {
      currentSelection: this.initialSelection
    }
  },
  methods: {
    getHoverText: function(index) {
      return this.hoverList[index]
    },
    getItemClass: function(index) {
      if (index === this.currentSelection) {
        return 'TextPickerListItemSelected'
      } else {
        return 'TextPickerListItem'
      }
    },
    getKey: function(index) {
      return this.click_event + index
    },
    doClick: function (index) {
      this.currentSelection = index
      this.$emit(this.click_event, index)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.TextPicker{
    @include column;
    width: 140px;
    height: 140px;
    border-width: 1px;
    border-color: var(--theme_power_set_text_color) !important;
}

.TextPickerTitleBar{
    @include row;
    @include cursor-move;
    background-color: var(--theme_power_set_background_color) !important;
    margin-left: 3px;
    margin-right: 3px;
}

.TextPickerPowerSetTitle{
    width: 138px;
    height: 25px;
     text-align: center;
   color: var(--theme_power_set_text_color) !important;
}

.TextPickerList {
    @include column;
    width: 136px;
    height: 115px;
    overflow-y: scroll;
    margin-left: 2px;
}

.TextPickerListItem {
    @include cursor-pointer;
    width: 120px;
    min-height: 18px;
    max-height: 18px;
    color: var(--theme_text_color_label) !important;
    background-color: var(--theme_background_color) !important;
    text-align: left;
    font-size: 10pt;
    overflow: hidden;
    word-break: break-all;
    &:hover{
        font-weight: bold;
    }
}

.TextPickerListItemSelected {
    @include cursor-pointer;
    width: 120px;
    min-height: 18px;
    max-height: 18px;
    color: var(--theme_background_color) !important;
    background-color: var(--theme_text_color_label) !important;
    text-align: left;
    font-size: 10pt;
    overflow: hidden;
    word-break: break-all;
    &:hover{
        font-weight: bold;
    }
}
</style>
