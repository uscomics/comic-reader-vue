import Slot from './slot.js'

export default class PowerEntry {
  constructor() {
    this.level = 0
    this.power_id = ''
    this.tag = false
    this.stat_include = false
    this.variable_value = 0
    this.slots = []
    this.sub_powers = []
  }

  addEmptySlot(level) {
    if (this.slots.length === 6) { return false }
    let slot = new Slot()
    slot.level = level
    this.slots.push(slot)
    return true
  }
}
