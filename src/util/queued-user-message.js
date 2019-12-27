export default class QueuedUserMessage {
  constructor (message, sound, lifetime, hasImage) {
    this.message = message
    this.sound = sound
    this.lifetime = lifetime
    this.hasImage = hasImage
  }
}
