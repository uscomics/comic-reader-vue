import Slot from './slot.js'

export default class PowerEntry {
  static fromObject(obj) {
    let powerEntry = new PowerEntry()
    powerEntry.level = obj.level
    powerEntry.power_id = obj.power_id
    powerEntry.tag = obj.tag
    powerEntry.stat_include = obj.stat_include
    powerEntry.variable_value = obj.variable_value
    powerEntry.slots = obj.slots
    powerEntry.sub_powers = obj.sub_powers
    return powerEntry
  }

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
