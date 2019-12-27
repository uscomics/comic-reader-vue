<template>
  <q-page class="flex flex-center">
    <img alt="gold venus" class="character" src="~assets/rive/gold-venus.png">
  </q-page>
</template>

<script>
import Messages from '../util/messages'
import Queue from '../util/queue'
export default {
  name: 'PageIndex',
  created () {
    Queue.broadcast(Messages.SHOW_HEADER)
  }
}
</script>
<style>
.character {
  position: absolute;
  width: 910px;
  height: 728px;
  z-index: 10;
}
</style>
