/* eslint-disable camelcase */
import { BuildPowerSets } from '../enums/BuildPowerSets.js'
import PowerEntry from './power_entry.js'
import { PowerLevel } from '../enums/PowerLevel.js'

export default class Build {
  static fromArchetype(archetype) {
    let build = new Build()
    if (archetype === 'Class_Peacebringer') {
      let level_1_kheldian = new PowerEntry()
      level_1_kheldian.level = 1
      level_1_kheldian.power_id = 'Inherent.Inherent.Energy_Flight'
      level_1_kheldian.addEmptySlot(1)
      build.power_entries[PowerLevel.level_1_kheldian] = level_1_kheldian
    } else if (archetype === 'Class_Warshade') {
      let level_1_kheldian = new PowerEntry()
      level_1_kheldian.level = 1
      level_1_kheldian.power_id = 'Inherent.Inherent.Shadow_Step'
      level_1_kheldian.addEmptySlot(1)
      build.power_entries[PowerLevel.level_1_kheldian] = level_1_kheldian
    }
    return build
  }

  static fromObject(obj) {
    let build = new Build()
    build.power_sets = obj.power_sets
    build.power_entries = obj.power_entries
    const keys = Object.keys(build.power_entries)
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      let powerEntryObj = build.power_entries[keys[keyIndex]]
      const powerEntry = PowerEntry.fromObject(powerEntryObj)
      build.power_entries[keyIndex] = powerEntry
    }
    return build
  }

  static addLevel2Powers(build) {
    let power_entries = build.power_entries
    if (!power_entries.sprint || 0 === power_entries.sprint.level) {
      let sprint = new PowerEntry()
      sprint.level = 2
      sprint.power_id = 'Inherent.Inherent.Sprint'
      sprint.addEmptySlot(2)
      power_entries.sprint = sprint
    }
    if (!power_entries.hurdle || 0 === power_entries.hurdle.level) {
      let hurdle = new PowerEntry()
      hurdle.level = 2
      hurdle.power_id = 'Inherent.Fitness.Hurdle'
      hurdle.addEmptySlot(2)
      power_entries.hurdle = hurdle
    }
    if (!power_entries.swift || 0 === power_entries.swift.level) {
      let swift = new PowerEntry()
      swift.level = 2
      swift.power_id = 'Inherent.Fitness.Swift'
      swift.addEmptySlot(2)
      power_entries.swift = swift
    }
  }

  static EXTRA_SLOTS = [
    { level: 3, slots: 2 },
    { level: 5, slots: 2 },
    { level: 7, slots: 2 },
    { level: 9, slots: 2 },
    { level: 11, slots: 2 },
    { level: 13, slots: 2 },
    { level: 15, slots: 2 },
    { level: 17, slots: 2 },
    { level: 19, slots: 2 },
    { level: 21, slots: 2 },
    { level: 23, slots: 2 },
    { level: 25, slots: 2 },
    { level: 27, slots: 2 },
    { level: 29, slots: 2 },
    { level: 31, slots: 3 },
    { level: 33, slots: 3 },
    { level: 34, slots: 3 },
    { level: 36, slots: 3 },
    { level: 37, slots: 3 },
    { level: 39, slots: 3 },
    { level: 40, slots: 3 },
    { level: 42, slots: 3 },
    { level: 43, slots: 3 },
    { level: 45, slots: 3 },
    { level: 46, slots: 3 },
    { level: 48, slots: 3 },
    { level: 50, slots: 3 }
  ]

  static getExtraSlotCountForLevel(level) {
    let extraSlotCount = 0
    if (3 > level) {
      return extraSlotCount
    }
    for (let slotIndex = 0; slotIndex < Build.EXTRA_SLOTS.length; slotIndex++) {
      let slotInfo = Build.EXTRA_SLOTS[slotIndex]
      if (slotInfo.level === level) {
        return slotInfo.slots
      }
    }
    return extraSlotCount
  }

  static getExtraSlotSumForLevel(level) {
    let extraSlotCount = 0
    if (3 > level) {
      return extraSlotCount
    }
    for (let slotIndex = 0; slotIndex < Build.EXTRA_SLOTS.length; slotIndex++) {
      let slotInfo = Build.EXTRA_SLOTS[slotIndex]
      if (slotInfo.level > level) {
        return extraSlotCount
      }
      extraSlotCount += slotInfo.slots
    }
    return extraSlotCount
  }

  constructor() {
    this.power_sets = {}
    this.power_entries = {}
    this.power_sets[BuildPowerSets.fitness] = 'Inherent.Fitness'
    this.power_sets[BuildPowerSets.inherent] = 'Inherent.Inherent'

    let brawl = new PowerEntry()
    brawl.level = 1
    brawl.power_id = 'Inherent.Inherent.Brawl'
    brawl.addEmptySlot(1)
    this.power_entries[PowerLevel.brawl] = brawl

    let health = new PowerEntry()
    health.level = 1
    health.power_id = 'Inherent.Fitness.Health'
    health.addEmptySlot(1)
    this.power_entries[PowerLevel.health] = health

    let stamina = new PowerEntry()
    stamina.level = 1
    stamina.power_id = 'Inherent.Fitness.Stamina'
    stamina.addEmptySlot(1)
    this.power_entries[PowerLevel.stamina] = stamina

    let prestige_power_slide = new PowerEntry()
    prestige_power_slide.level = 1
    prestige_power_slide.power_id = 'Inherent.Inherent.prestige_DVD_Glidep'
    prestige_power_slide.addEmptySlot(1)
    this.power_entries[PowerLevel.prestige_power_slide] = prestige_power_slide

    this.power_entries[PowerLevel.level_1_primary] = new PowerEntry()
    this.power_entries[PowerLevel.level_1_secondary] = new PowerEntry()
    this.power_entries[PowerLevel.level_2] = new PowerEntry()
    this.power_entries[PowerLevel.level_4] = new PowerEntry()
    this.power_entries[PowerLevel.level_6] = new PowerEntry()
    this.power_entries[PowerLevel.level_8] = new PowerEntry()
    this.power_entries[PowerLevel.level_10] = new PowerEntry()
    this.power_entries[PowerLevel.level_12] = new PowerEntry()
    this.power_entries[PowerLevel.level_14] = new PowerEntry()
    this.power_entries[PowerLevel.level_16] = new PowerEntry()
    this.power_entries[PowerLevel.level_18] = new PowerEntry()
    this.power_entries[PowerLevel.level_20] = new PowerEntry()
    this.power_entries[PowerLevel.level_22] = new PowerEntry()
    this.power_entries[PowerLevel.level_24] = new PowerEntry()
    this.power_entries[PowerLevel.level_26] = new PowerEntry()
    this.power_entries[PowerLevel.level_28] = new PowerEntry()
    this.power_entries[PowerLevel.level_30] = new PowerEntry()
    this.power_entries[PowerLevel.level_32] = new PowerEntry()
    this.power_entries[PowerLevel.level_35] = new PowerEntry()
    this.power_entries[PowerLevel.level_38] = new PowerEntry()
    this.power_entries[PowerLevel.level_41] = new PowerEntry()
    this.power_entries[PowerLevel.level_44] = new PowerEntry()
    this.power_entries[PowerLevel.level_47] = new PowerEntry()
    this.power_entries[PowerLevel.level_49] = new PowerEntry()
  }

  getUsedExtraSlotCount() {
    let extraSlotCount = 0
    let powerEntries = Object.keys(this.power_entries)
    for (let powerEntryIndex = 0; powerEntryIndex < powerEntries.length; powerEntryIndex++) {
      const powerEntryName = powerEntries[powerEntryIndex]
      const powerEntry = this.power_entries[powerEntryName]
      extraSlotCount = Math.max(0, powerEntry.slots.length - 1)
    }
    return extraSlotCount
  }

  getUsedExtraSlotCountForLevel(level) {
    let usedSlots = 0
    const keys = Object.keys(this.power_entries)
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      const powerEntry = this.power_entries[keys[keyIndex]]
      for (let slotIndex = 1; slotIndex < powerEntry.slots.length; slotIndex++) {
        const slot = powerEntry.slots[slotIndex]
        if (slot.level === level) {
          usedSlots++
        }
      }
    }
    return usedSlots
  }
}
