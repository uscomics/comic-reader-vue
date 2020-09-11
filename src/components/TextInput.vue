<template>
    <q-input
        :autogrow="autogrow"
        :borderless="borderless"
        class="TextInput"
        :clearable="clearable"
        :dense="dense"
        :disable="disabled"
        :fill-mask="fillmask ? fillmask : ''"
        :filled="filled"
        :form="form ? form : ''"
        :hide-bottom-space="hidebottomspace"
        :hide-hint="hidehint"
        :hint="hint ? hint : ''"
        :label="label ? label : ''"
        :mask="mask ? mask : ''"
        :minlength="minlength ? minlength : 0"
        :name="name ? name : ''"
        :outlined="outlined"
        :pattern="pattern ? pattern : ''"
        :placeholder="placeholder ? placeholder : ''"
        :prefix="prefix ? prefix : ''"
        :readonly="readonly"
        :required="required"
        :reverse-fill-mask="reversefillmask ? reversefillmask : ''"
        :rounded="rounded"
        :shadow-text="shadowtext ? shadowtext : ''"
        :square="square"
        :standout="standout ? standout : ''"
        :suffix="suffix ? suffix : ''"
        :type="type"
        :unmasked-value="unmaskedvalue"
        :value="value"
    />
</template>
<script>
export default {
  name: 'TextInput',
  props: {
    autogrow: { type: Boolean, default: false },
    borderless: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    filled: { type: Boolean, default: false },
    fillmask: { type: String, default: '' },
    form: { type: String, default: '' }, // form name
    hidebottomspace: { type: Boolean, default: false },
    hidehint: { type: Boolean, default: true },
    hint: { type: String, default: '' },
    label: { type: String, default: '' },
    mask: { type: String, default: '' },
    minlength: { type: Number, default: 0 },
    name: { type: String, default: '' },
    outlined: { type: Boolean, default: false },
    pattern: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    prefix: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    reversefillmask: { type: String, default: '' },
    rounded: { type: Boolean, default: false },
    shadowtext: { type: String, default: '' },
    size: { type: Number, default: 0 },
    square: { type: Boolean, default: false },
    standout: { type: String, default: '' },
    suffix: { type: String, default: '' },
    type: { type: String, default: 'text' }, // email, hidden, number, password, range, search, tel, text, url
    unmaskedvalue: { type: Boolean, default: false }
  },
  data: function() {
    return {
      value: ''
    }
  }
}
</script>
<style scoped lang="scss">
@import '../css/app.sass';

.TextInput {
    @include rise;
    color:              var(--theme_text_input_color) !important;
    background-color:   var(--theme_text_input_background_color) !important;
    text-align:         var(--theme_text_input_text_align) !important;
    overflow:           var(--theme_text_input_overflow) !important;
    font-family:        var(--theme_text_input_font-family) !important;
    font-size:          var(--theme_text_input_font) !important;
    box-shadow:         var(--theme_text_input_box_shadow_active) !important;
}
</style>
