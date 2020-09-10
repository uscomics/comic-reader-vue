/* eslint-disable camelcase */
import { BuildPowerSets } from '../enums/BuildPowerSets.js'
import PowerEntry from './power_entry.js'
import { PowerLevel } from '../enums/PowerLevel.js'

export default class Build {
  constructor() {
    this.power_sets = {}
    this.power_entries = {}
    this.power_sets[BuildPowerSets.fitness] = 'Inherent.Fitness'
    this.power_sets[BuildPowerSets.inherent] = 'Inherent.Inherent'

    let brawl = new PowerEntry()
    brawl.level = 1
    brawl.power_id = 'Inherent.Inherent.Brawl'
    brawl.addEmptySlot()
    this.power_entries[PowerLevel.brawl] = brawl

    let health = new PowerEntry()
    health.level = 1
    health.power_id = 'Inherent.Fitness.Health'
    health.addEmptySlot()
    this.power_entries[PowerLevel.health] = health

    let stamina = new PowerEntry()
    stamina.level = 1
    stamina.power_id = 'Inherent.Fitness.Stamina'
    stamina.addEmptySlot()
    this.power_entries[PowerLevel.stamina] = stamina

    let prestige_power_slide = new PowerEntry()
    prestige_power_slide.level = 1
    prestige_power_slide.power_id = 'Inherent.Inherent.prestige_DVD_Glidep'
    prestige_power_slide.addEmptySlot()
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

  static fromArchetype(archetype) {
    let build = new Build()
    if (archetype === 'Class_Peacebringer') {
      let level_1_kheldian = new PowerEntry()
      level_1_kheldian.level = 1
      level_1_kheldian.power_id = 'Inherent.Inherent.Energy_Flight'
      level_1_kheldian.addEmptySlot()
      this.power_entries[PowerLevel.level_1_kheldian] = level_1_kheldian
    } else if (archetype === 'Class_Warshade') {
      let level_1_kheldian = new PowerEntry()
      level_1_kheldian.level = 1
      level_1_kheldian.power_id = 'Inherent.Inherent.Shadow_Step'
      level_1_kheldian.addEmptySlot()
      this.power_entries[PowerLevel.level_1_kheldian] = level_1_kheldian
    }
    return build
  }

  static add_level_2_powers(build) {
    let power_entries = build.power_entries
    if (!power_entries.sprint || 0 === power_entries.sprint.level) {
      let sprint = new PowerEntry()
      sprint.level = 2
      sprint.power_id = 'Inherent.Inherent.Sprint'
      sprint.addEmptySlot()
      power_entries.sprint = sprint
    }
    if (!power_entries.hurdle || 0 === power_entries.hurdle.level) {
      let hurdle = new PowerEntry()
      hurdle.level = 2
      hurdle.power_id = 'Inherent.Fitness.Hurdle'
      hurdle.addEmptySlot()
      power_entries.hurdle = hurdle
    }
    if (!power_entries.swift || 0 === power_entries.swift.level) {
      let swift = new PowerEntry()
      swift.level = 2
      swift.power_id = 'Inherent.Fitness.Swift'
      swift.addEmptySlot()
      power_entries.swift = swift
    }
  }
}
