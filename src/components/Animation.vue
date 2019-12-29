// https://css-tricks.com/animate-to-an-inline-style/
// https://stackoverflow.com/questions/50585880/how-to-play-multiple-animations-back-to-back-in-css
<template>
  <div>
    <img v-if="characters[0]" class="character" v-bind:style="{ height: getHeight(0), 'z-index': getZ(0), 'left': getLeft(0), 'opacity': getOpacity(0)}" v-bind:src="characters[0].image">
    <img v-if="characters[1]" class="character" v-bind:style="{ height: getHeight(1), 'z-index': getZ(1), 'left': getLeft(1), 'opacity': getOpacity(1)}" v-bind:src="characters[1].image">
    <img v-if="characters[2]" class="character" v-bind:style="{ height: getHeight(2), 'z-index': getZ(2), 'left': getLeft(2), 'opacity': getOpacity(2)}" v-bind:src="characters[2].image">
  </div>
</template>

<script>
const animation = require('../data/animation.json')
export default {
  name: 'Animation',
  data: function() {
    return {
      characters: []
    }
  },
  created () {
    this.characters = animation.characters
    setInterval(() => { this.animate() }, 5000)
  },
  methods: {
    // mobile, tablet, laptop, and desktop defined in router/index.js
    getHeight (index) {
      let position = this.characters[index].position
      if ('cf' === position) {
        if (this.$mq === 'mobile') return '206px'
        if (this.$mq === 'tablet') return '413px'
        if (this.$mq === 'laptop') return '573px'
        if (this.$mq === 'desktop') return '819px'
      }
      if ('lf' === position || 'rf' === position) {
        if (this.$mq === 'mobile') return '152px'
        if (this.$mq === 'tablet') return '305px'
        if (this.$mq === 'laptop') return '423px'
        if (this.$mq === 'desktop') return '637px'
      }
      if ('cr' === position || 'lr' === position || 'rr' === position) {
        if (this.$mq === 'mobile') return '98px'
        if (this.$mq === 'tablet') return '197px'
        if (this.$mq === 'laptop') return '273px'
        if (this.$mq === 'desktop') return '455px'
      }
      return 0 // Should never happen
    },
    getZ (index) {
      let position = this.characters[index].position
      if ('cf' === position || 'lf' === position || 'rf' === position) return 10
      return 5
    },
    getLeft (index) {
      let position = this.characters[index].position
      if ('cf' === position || 'cr' === position) return '40%'
      if ('lf' === position) return '-40%'
      if ('rf' === position) return '95%'
      if ('rr' === position) return '75%'
      if ('lr' === position) return '10px'
      return 0 // should never happen
    },
    getOpacity (index) {
      let position = this.characters[index].position
      if ('cf' === position || 'lf' === position || 'rf' === position) return 1.0
      if ('cr' === position || 'lr' === position || 'rr' === position) return 0.5
      return 0 // should never happen
    },
    animate () {
      for (let i = 0; i < this.characters.length; i++) {
        if ('cf' === this.characters[i].position) this.characters[i].position = 'lr'
        else if ('lr' === this.characters[i].position) this.characters[i].position = 'rr'
        else if ('rr' === this.characters[i].position) this.characters[i].position = 'cf'
      }
    }
  }
}
</script>
<style>
.character {
  position: absolute;
  top: 0%;
  width: auto;
  transition: z-index 2s linear, left 2s linear, height 2s linear, opacity 2s linear;
}
</style>
