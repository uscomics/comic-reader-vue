<template>
  <vue-draggable-resizable class="DraggableWrapper" :draggable="true" :resizable="false" :handles="[]" :z="10" :w="1" :h="1">
    <div class="Center">
    <div class="SaveLocal">
        <div class="SaveLocalTitleBar">
          <div class="SaveLocalTitle">{{title}}</div>
        </div>
        <div class="SaveLocalList">
            <div 
                v-for="(item, index) in list" 
                :class="getItemClass(index)"
                @click="doClick(index)"
                :key="getKey(index)">
                {{item}}
            </div>
        </div>
        <div >
            <q-input borderless dense hide-bottom-space bg-color="grey-3" class="SaveLocalName" v-model="name" label="Name" />
        </div>
        <div class="SaveLocalButtons">
            <div class="SaveLocalButton " @click="onCancelClicked">Cancel</div>
            <div :class="getSaveButtonClass" @click="onSaveClicked">Save</div>
        </div>
    </div>
    </div>
  </vue-draggable-resizable>
</template>

<script>
export default {
  name: 'PowerText',
  props: {
    title: { type: String, default: 'Save' },
    list: { type: Array, default: function () { return ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'] }}
  },
  data () {
    return {
        name: 'Toon.hero',
        currentSelection: -1
    }
  },
  computed: {
    getSaveButtonClass: function() {
      if ('' === this.name)
        return 'SaveLocalButtonDisabled'
      else
        return 'SaveLocalButton'
    },
  },
  methods: {
    getItemClass: function(index) {
        if (index === this.currentSelection)
            return 'SaveLocalListItemSelected'
        else
            return 'SaveLocalListItem'
    },
    getKey: function(index) {
        this.click_event + index
    },
    doClick: function (index) {
        this.currentSelection = index
        this.name = this.list[index]
        this.$emit(this.click_event, index)
    },
    onCancelClicked: function () {
        this.$emit('save-local-cancel', '')
    },
    onSaveClicked: function () {
        if ('' === this.name)
            return
        this.$emit('save-local-save', this.name)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';
.DraggableWrapper {
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}

.Center {
position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}

.SaveLocal{
    @include column;
    width: 280px;
    height: 205px;
    background-color: var(--theme_background_color);
    color: var(--theme_text_color_field);
    z-index: 10;
    border: 1px solid var(--theme_text_color_label) !important;
}

.SaveLocalBar{
    @include row;
    @include cursor-move;
    margin-left: 3px;
    margin-right: 3px;
    background-color: var(--theme_background_color);
    width: 100%;
}

.SaveLocalTitle{
    @include cursor-move;
    width: 100%;
    height: 25px;
    text-align: left;
    color: var(--theme_text_color_label) !important;
    background-color: var(--theme_background_color);
    border-bottom: 1px solid var(--theme_text_color_label) !important;
}

.SaveLocalList {
    @include column;
    @include cursor-pointer;
    width: 100%;
    height: 125px;
    overflow-y: scroll;
    margin-left: 2px;
}

.SaveLocalListItem {
    @include cursor-pointer;
    width: 99%;
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

.SaveLocalListItemSelected {
    @include cursor-pointer;
    width: 99%;
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

.SaveLocalName {
    @include rise;
    height: 30px;
    width: 98%;
    text-align: left;
    overflow: hidden;
    margin-bottom: 3px;
    border-bottom-width: 1px;
    color: var(--theme_power_set_text_color);
    border-top: 1px solid var(--theme_text_color_label) !important;
    box-shadow: var(--theme_box_shadow_small_active) !important;
    transform: translateX(1%);
}

.SaveLocalButtons{
    @include row;
    width: 280px;
    height: 25px;
}

.SaveLocalButton{
    @include rise;
    @include cursor-pointer;
    width: 139px;
    height: 25px;
    color: var(--theme_text_color_label);
    background-color: var(--theme_background_color);
    border: 1px solid var(--theme_power_set_background_color);
    text-align: center;
}

.SaveLocalButtonDisabled{
    @include cursor-default;
    width: 139px;
    height: 25px;
    background-color: var(--theme_text_color_image_button_disabled);
    color: var(--theme_background_color_button_down);
    border: 1px solid var(--theme_background_color_button_down);
    text-align: center;
}

</style>
