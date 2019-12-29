<template>
  <q-page class="flex flex-center page">
    <Animation/>
  </q-page>
</template>

<script>
import Animation from '../components/Animation'
import Messages from '../util/messages'
import Queue from '../util/queue'
export default {
  name: 'PageIndex',
  components: {
    Animation
  },
  created () {
    Queue.broadcast(Messages.SHOW_HEADER)
  }
}
</script>
<style>
.page {
  overflow: hidden;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
}
</style>
