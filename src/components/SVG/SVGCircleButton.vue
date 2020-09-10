// https://frontstuff.io/multi-colored-svg-symbol-icons-with-css-variables
<template>
    <svg :height="getHeight" :width="getWidth">
        <circle
            :cx="getCX"
            :cy="getCY"
            :r="getR"
            stroke="var(--svg-circle-stroke)"
            stroke-width="var(--svg-circle-stroke-width)"
            fill="var(--svg-circle-fill)"
            stroke-dasharray="var(--svg-circle-stroke-dasharray)"
        />
        <text
            dominant-baseline="var(--svg-text-dominant-baseline)"
            text-anchor="var(--svg-text-anchor)"
            :x="getTextX"
            :y="getTextY"
            fill="var(--svg-text-fill)"
            font-family="var(--svg-text-font-family)"
            font-size="var(--svg-text-font-size)"
            font-weight="var(--svg-text-font-weight)"
            stroke-width="var(--svg-text-stroke-width)"
        >
            {{getText}}
        </text>
    </svg>
</template>

<script>
export default {
  name: 'SVGCircleButton',
  props: {
    width: { type: Number, default: 25 },
    height: { type: Number, default: 25 },
    cx: { type: Number, default: 12 },
    cy: { type: Number, default: 12 },
    r: { type: Number, default: 10 },
    text: { type: String, default: 'i' },
    text_x: { type: String, default: '10' },
    text_y: { type: String, default: '17' }
  },
  computed: {
    getWidth: function () { if ((typeof this.width) === 'string') return Number(this.width); else return this.width },
    getHeight: function () { if ((typeof this.height) === 'string') return Number(this.height); else return this.height },
    getCX: function () { if ((typeof this.cx) === 'string') return Number(this.cx); else return this.cx },
    getCY: function () { if ((typeof this.cy) === 'string') return Number(this.cy); else return this.cy },
    getR: function () { if ((typeof this.r) === 'string') return Number(this.r); else return this.r },
    getText: function () { return this.text },
    getTextX: function () { return this.text_x },
    getTextY: function () { return this.text_y }
  }
}
</script>
