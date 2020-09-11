<template>
    <q-btn
        :align="align ? align : ''"
        class="Button"
        :dense="dense"
        :disable="disabled"
        :fab="fab"
        :fabMini="fabmini"
        :flat="flat"
        :form="form ? form : ''"
        :formaction="formaction ? form : ''"
        :formmethod="formmethod ? form : ''"
        :formtarget="formtarget ? form : ''"
        :glossy="glossy"
        :icon="icon ? icon : ''"
        :icon-right="iconright ? iconright : ''"
        :label="label ? label : ''"
        :no-caps="nocaps"
        :outline="outline"
        :push="push"
        :ripple="ripple"
        :round="round"
        :rounded="rounded"
        :stretch="stretch"
        :tabindex="tabindex"
        :type="type"
        :unelevated="unelevated"
        v-on:click="doClicked"
    />
</template>
<script>
export default {
  name: 'Button',
  props: {
    align: { type: String, default: 'center' },
    dense: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    event: { type: String, default: 'button-event' },
    fab: { type: Boolean, default: false },
    fabmini: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    form: { type: String, default: '' }, // form name
    formaction: { type: String, default: '' }, // /my-url
    formmethod: { type: String, default: '' }, // GET, POST
    formtarget: { type: String, default: '' }, // _blank, _self, _parent, _top, framename
    glossy: { type: Boolean, default: false },
    label: { type: String, default: 'Button Text' },
    icon: { type: String, default: '' }, // ion-add, img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg
    iconright: { type: String, default: '' },
    nocaps: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    push: { type: Boolean, default: false },
    ripple: { type: Boolean, default: true },
    round: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    stretch: { type: Boolean, default: false },
    tabindex: { type: Number, default: 0 },
    type: { type: String, default: 'button' }, // a, submit, button, reset
    unelevated: { type: Boolean, default: false }
  },
  computed: {
    getForm: function () {
      if (this.form.length > 0) {
        return this.form
      }
      return ''
    },
    getFormAction: function () {
      if (this.formaction.length > 0) {
        return this.formaction
      }
      return ''
    },
    getFormMethod: function () {
      if (this.formmethod.length > 0) {
        return this.formmethod
      }
      return ''
    },
    getFormTarget: function () {
      if (this.formtarget.length > 0) {
        return this.formtarget
      }
      return ''
    },
    getIcon: function () {
      if (this.icon.length > 0) {
        return this.icon
      }
      return ''
    },
    getIconRight: function () {
      if (this.iconright.length > 0) {
        return this.iconright
      }
      return ''
    }
  },
  methods: {
    doClicked () {
      this.$emit(this.event, this.pressed)
    }
  }
}
</script>
<style scoped lang="scss">
@import '../css/app.sass';

.Button {
  @include rise;
  color:            var(--theme_button_color) !important;
  background-color: var(--theme_button_background_color) !important;
  box-shadow:       var(--theme_button_box_shadow) !important;
  &:active {
    box-shadow:     var(--theme_button_box_shadow_active) !important;
  }
}
</style>
