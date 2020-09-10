/* eslint-disable camelcase */
import _ from 'lodash'
import { BuildPowerSets } from '../../enums/BuildPowerSets.js'
import { getPowerLevel, PowerLevel } from '../../enums/PowerLevel.js'
import { PowerSetType } from '../../enums/PowerSetType.js'

export const errorMessageCount = state => {
  return state.errorMessages.length
}

export const getArchetype = (state, getters) => (id) => {
  return state.dbArchetypesData[id]
}

export const getDBArchetypes = state => {
  return state.dbArchetypesData
}

export const getDBEffects = state => {
  return state.dbEffectsData
}

export const getDBEnhancementSets = state => {
  return state.dbEnhancementSetsData
}

export const getDBEnhancements = state => {
  return state.dbEnhancementsData
}

export const getDBPowerSets = state => {
  return state.dbPowerSetsData
}

export const getDBPowers = state => {
  return state.dbPowersData
}

export const getDBLoaded = state => {
  return state.dbLoaded
}

export const getEffect = (state, getters) => (id) => {
  return state.dbEffectsData[id]
}

export const getEnhancementSet = (state, getters) => (id) => {
  return state.dbEnhancementSetsData[id]
}

export const getEnhancement = (state, getters) => (id) => {
  return state.dbEnhancementsData[id]
}

export const getEpicPowerSetsFromArchetype = (state, getters) => (id) => {
  let archetype = getters.getArchetype(id)
  let powerSets = []
  if (!archetype || !archetype.powersets_ancillary) { return powerSets }

  archetype.powersets_ancillary.forEach((powerSetId) => {
    let powerSet = getters.getPowerSet(powerSetId)
    if (!powerSet) { return }
    powerSets.push(powerSet)
  })
  return powerSets
}

export const getPoolPowerSetsFromArchetype = (state, getters) => (id) => {
  let powerSets = []
  let dbPowerSets = getters.getDBPowerSets
  _.forIn(dbPowerSets, function(powerSet, powerSetId) {
    if (!powerSet.id.startsWith('Pool.')) { return }
    if ('Pool.Leadership_beta' === powerSet.id) { return }
    if ('Class_Warshade' === id || 'Class_Peacebringer' === id) {
      if ('Pool.Flight' === powerSet.id || 'Pool.Teleportation' === powerSet.id) {
        return
      }
    }
    powerSets.push(powerSet)
  })
  return powerSets
}

export const getPower = (state, getters) => (id) => {
  return state.dbPowersData[id]
}

export const getPowerName = (state, getters) => (powerId) => {
  let mapped = state.powerNames.map(x => (x.powerId === powerId) ? x : null)
  if (0 === mapped.length) return null
  let reduced = mapped.reduce((accumulator, currentValue) => (currentValue) || accumulator)
  if (!reduced) return null
  return reduced.powerName
}

export const getPowerNames = state => {
  return state.powerNames
}

export const getPowerSet = (state, getters) => (id) => {
  return state.dbPowerSetsData[id]
}

export const getPowersFromPowerSet = (state, getters) => (id) => {
  let powerSets = getters.getDBPowerSets
  let powerSet = powerSets[id]
  let power_ids = powerSet.power_ids
  let getPower = (powerId) => { return state.dbPowersData[powerId] }
  let powers = power_ids.map(getPower)
  return powers
}

export const getPrimaryPowerSetsFromArchetype = (state, getters) => (id) => {
  let archetype = getters.getArchetype(id)
  let powerSets = []
  if (!archetype || !archetype.powersets_primary) { return powerSets }

  archetype.powersets_primary.forEach((powerSetId) => {
    let powerSet = getters.getPowerSet(powerSetId)
    if (!powerSet) { return }
    powerSets.push(powerSet)
  })
  return powerSets
}

export const getSecondaryPowerSetsFromArchetype = (state, getters) => (id) => {
  let archetype = getters.getArchetype(id)
  let powerSets = []
  if (!archetype || !archetype.powersets_secondary) { return powerSets }

  archetype.powersets_secondary.forEach((powerSetId) => {
    let powerSet = getters.getPowerSet(powerSetId)
    if (!powerSet) { return }
    powerSets.push(powerSet)
  })
  return powerSets
}

export const getToon = state => {
  return state.toon
}

export const getToonAllowedPowers = (state, getters) => (payload) => {
  let powers = getters.getPowersFromPowerSet(payload.powerSetId)
  let powers_meet_requirements = []

  powers.forEach((power) => {
    if (power.level > payload.powerLevel) { return }
    if (getters.getToonHasPower(power.id)) { return }
    if (!getters.getToonMeetsPowerRequirements(power)) { return }
    powers_meet_requirements.push(power)
  })

  return powers_meet_requirements
}

export const getToonAllowedPowerSets = (state, getters) => (power_level_enum) => {
  let toon = getters.getToon
  let build = getters.getToonCurrentBuild
  let power_level = getPowerLevel(power_level_enum, toon.archetype_id)
  let power_sets = []
  if (!build.power_sets[BuildPowerSets.primary] ||
    !build.power_sets[BuildPowerSets.secondary]) {
    return power_sets
  }

  let primary_id = build.power_sets[BuildPowerSets.primary]
  let primary = getters.getPowerSet(primary_id)
  let secondary_id = build.power_sets[BuildPowerSets.secondary]
  let secondary = getters.getPowerSet(secondary_id)
  if (power_level_enum !== PowerLevel.level_1_secondary &&
    !getters.getToonHasAllPowersForSet(primary_id)) {
    power_sets.push(primary)
  }
  if (power_level_enum !== PowerLevel.level_1_primary &&
    !getters.getToonHasAllPowersForSet(secondary_id)) {
    power_sets.push(secondary)
  }

  if (power_level_enum !== PowerLevel.level_1_primary &&
    power_level_enum !== PowerLevel.level_1_secondary &&
    power_level_enum !== PowerLevel.level_2) {
    let pool_1_id = build.power_sets[BuildPowerSets.pool_1]
    let pool_2_id = build.power_sets[BuildPowerSets.pool_2]
    let pool_3_id = build.power_sets[BuildPowerSets.pool_3]
    let pool_4_id = build.power_sets[BuildPowerSets.pool_4]
    if (!pool_1_id ||
        !pool_2_id ||
        !pool_3_id ||
        !pool_4_id) {
      let pools = getters.getPoolPowerSetsFromArchetype(toon.archetype_id)
      pools.forEach((powerSet) => {
        if (!getters.getToonHasAllPowersForSet(powerSet)) {
          power_sets.push(powerSet)
        }
      })
    } else {
      let pool_1 = getPowerSet(pool_1_id)
      let pool_2 = getPowerSet(pool_2_id)
      let pool_3 = getPowerSet(pool_3_id)
      let pool_4 = getPowerSet(pool_4_id)
      if (!getters.getToonHasAllPowersForSet(pool_1.power_ids)) {
        power_sets.push(pool_1)
      }
      if (!getters.getToonHasAllPowersForSet(pool_2.power_ids)) {
        power_sets.push(pool_2)
      }
      if (!getters.getToonHasAllPowersForSet(pool_3.power_ids)) {
        power_sets.push(pool_3)
      }
      if (!getters.getToonHasAllPowersForSet(pool_4.power_ids)) {
        power_sets.push(pool_4)
      }
    }
  }

  if (power_level >= 35) {
    if (!build.power_sets[BuildPowerSets.epic]) {
      let epic_power_sets = getters.getEpicPowerSetsFromArchetype(toon.archetype_id)
      epic_power_sets.forEach((epic_power_set) => {
        if (!getters.getToonHasAllPowersForSet(epic_power_set.id)) {
          let epic = getters.getPowerSet(epic_power_set.id)
          power_sets.push(epic)
        }
      })
    } else {
      let epic_id = build.power_sets[BuildPowerSets.epic]
      if (!getters.getToonHasAllPowersForSet(epic_id)) {
        let epic = getters.getPowerSet(epic_id)
        power_sets.push(epic)
      }
    }
  }

  let power_sets_meet_requirements = []
  power_sets.forEach((power_set) => {
    let powers = getters.getPowersFromPowerSet(power_set.id)
    let powers_meet_requirements = []

    if (power_level_enum === PowerLevel.level_1_primary &&
        power_set.set_type !== PowerSetType.PRIMARY) {
      return
    }
    if (power_level_enum === PowerLevel.level_1_secondary &&
        power_set.set_type !== PowerSetType.SECONDARY) {
      return
    }

    powers.forEach((power) => {
      if (power.level > power_level) {
        return
      }
      if (!getters.getToonMeetsPowerRequirements(power)) {
        return
      }
      powers_meet_requirements.push(power)
    })
    if (0 === powers_meet_requirements.length) {
      return
    }

    power_sets_meet_requirements.push(power_set)
  })
  return power_sets_meet_requirements
}

export const getToonArchetypeId = state => {
  if (!state.toon) { return null }
  return state.toon.archetype_id
}

export const getToonCurrentBuild = state => {
  if (!state.toon) { return null }
  return state.toon.builds[state.toon.current_build]
}

export const getToonCurrentBuildNumber = state => {
  if (!state.toon) { return null }
  return state.toon.current_build
}

export const getToonHasAllPowersForSet = (state, getters) => (powerSetId) => {
  let build = getters.getToonCurrentBuild
  let powerSet = getters.getDBPowerSets[powerSetId]
  let primary = build.power_sets.primary
  let secondary = build.power_sets.secondary
  let pool_1 = build.power_sets.pool_1
  let pool_2 = build.power_sets.pool_2
  let pool_3 = build.power_sets.pool_3
  let pool_4 = build.power_sets.pool_4
  let epic = build.power_sets.epic
  if (powerSetId === primary) {
    return state.toonMetadata.primaryPowerCount === powerSet.power_ids.length
  } else if (powerSetId === secondary) {
    return state.toonMetadata.secondaryPowerCount === powerSet.power_ids.length
  } else if (powerSetId === pool_1) {
    return state.toonMetadata.pool1PowerCount === powerSet.power_ids.length
  } else if (powerSetId === pool_2) {
    return state.toonMetadata.pool2PowerCount === powerSet.power_ids.length
  } else if (powerSetId === pool_3) {
    return state.toonMetadata.pool3PowerCount === powerSet.power_ids.length
  } else if (powerSetId === pool_4) {
    return state.toonMetadata.pool4PowerCount === powerSet.power_ids.length
  } else if (powerSetId === epic) {
    return state.toonMetadata.epicPowerCount === powerSet.power_ids.length
  }
  return false
}

export const getToonHasPower = (state, getters) => (powerId) => {
  return !!getters.getToonPowerEntryFromPowerId(powerId)
}

export const getToonLevel = state => {
  if (!state.toon) { return null }
  return state.toon.level
}

export const getToonMeetsPowerRequirements = (state, getters) => (power) => {
  let meets = true
  for (let requiresIndex = 0; requiresIndex < power.requires.power_id.length; requiresIndex++) {
    let or_list = power.requires.power_id[requiresIndex]
    let and_meets = true
    for (let orIndex = 0; orIndex < or_list.length; orIndex++) {
      let and_power_id = or_list[orIndex]
      if ('' === and_power_id) { continue }
      if (!getters.getToonPowerEntryFromPowerId(and_power_id)) {
        and_meets = false
        break
      }
    }
    meets = and_meets
    if (meets) { break }
  }
  return meets
}

export const getToonName = state => {
  if (!state.toon) { return null }
  return state.toon.name
}

export const getToonPowerEntryFromPowerId = (state, getters) => (powerId) => {
  let build = getters.getToonCurrentBuild
  let powerEntry = _.find(build.power_entries, function(powerEntry) { return powerEntry.power_id === powerId })
  return powerEntry
}

export const getToonSortedPowerEntries = state => {
  if (!state.toon) { return null }
  let toon = state.toon
  const powerEntries = state.toon.builds[state.toon.current_build].power_entries
  const level = state.toon.level
  let sortedPowerEntries = []
  sortedPowerEntries.push({ level: 'level_1_primary', power_entry: powerEntries.level_1_primary })
  sortedPowerEntries.push({ level: 'level_1_secondary', power_entry: powerEntries.level_1_secondary })
  sortedPowerEntries.push({ level: 'level_2', power_entry: powerEntries.level_2 })
  sortedPowerEntries.push({ level: 'level_4', power_entry: powerEntries.level_4 })
  sortedPowerEntries.push({ level: 'level_6', power_entry: powerEntries.level_6 })
  sortedPowerEntries.push({ level: 'level_8', power_entry: powerEntries.level_8 })
  sortedPowerEntries.push({ level: 'level_10', power_entry: powerEntries.level_10 })
  sortedPowerEntries.push({ level: 'level_12', power_entry: powerEntries.level_12 })
  sortedPowerEntries.push({ level: 'level_14', power_entry: powerEntries.level_14 })
  sortedPowerEntries.push({ level: 'level_16', power_entry: powerEntries.level_16 })
  sortedPowerEntries.push({ level: 'level_18', power_entry: powerEntries.level_18 })
  sortedPowerEntries.push({ level: 'level_20', power_entry: powerEntries.level_20 })
  sortedPowerEntries.push({ level: 'level_22', power_entry: powerEntries.level_22 })
  sortedPowerEntries.push({ level: 'level_24', power_entry: powerEntries.level_24 })
  sortedPowerEntries.push({ level: 'level_26', power_entry: powerEntries.level_26 })
  sortedPowerEntries.push({ level: 'level_28', power_entry: powerEntries.level_28 })
  sortedPowerEntries.push({ level: 'level_30', power_entry: powerEntries.level_30 })
  sortedPowerEntries.push({ level: 'level_32', power_entry: powerEntries.level_32 })
  sortedPowerEntries.push({ level: 'level_35', power_entry: powerEntries.level_35 })
  sortedPowerEntries.push({ level: 'level_38', power_entry: powerEntries.level_38 })
  sortedPowerEntries.push({ level: 'level_41', power_entry: powerEntries.level_41 })
  sortedPowerEntries.push({ level: 'level_44', power_entry: powerEntries.level_44 })
  sortedPowerEntries.push({ level: 'level_47', power_entry: powerEntries.level_47 })
  sortedPowerEntries.push({ level: 'level_49', power_entry: powerEntries.level_49 })
  sortedPowerEntries.push({ level: 'health', power_entry: powerEntries.health })
  sortedPowerEntries.push({ level: 'stamina', power_entry: powerEntries.stamina })
  sortedPowerEntries.push({ level: 'brawl', power_entry: powerEntries.brawl })
  sortedPowerEntries.push({ level: 'prestige_power_slide', power_entry: powerEntries.prestige_power_slide })
  if (2 <= level) sortedPowerEntries.push({ level: 'sprint', power_entry: powerEntries.sprint })
  if (2 <= level) sortedPowerEntries.push({ level: 'hurdle', power_entry: powerEntries.hurdle })
  if (2 <= level) sortedPowerEntries.push({ level: 'swift', power_entry: powerEntries.swift })
  if ('Class_Peacebringer' === state.toon.archetype_id || 'Class_Warshade' === state.toon.archetype_id) {
    for (let buildIndex = 0; buildIndex < toon.builds.length; buildIndex++) {
      sortedPowerEntries.push({ level: 'level_1_kheldian', power_entry: powerEntries.level_1_kheldian })
      if (10 <= level) sortedPowerEntries.push({ level: 'level_10_kheldian', power_entry: powerEntries.level_10_kheldian })
      if (null !== powerEntries.nova_1) sortedPowerEntries.push({ level: 'nova_1', power_entry: powerEntries.nova_1 })
      if (null !== powerEntries.nova_2) sortedPowerEntries.push({ level: 'nova_2', power_entry: powerEntries.nova_2 })
      if (null !== powerEntries.nova_3) sortedPowerEntries.push({ level: 'nova_3', power_entry: powerEntries.nova_3 })
      if (null !== powerEntries.nova_4) sortedPowerEntries.push({ level: 'nova_4', power_entry: powerEntries.nova_4 })
      if (null !== powerEntries.dwarf_1) sortedPowerEntries.push({ level: 'dwarf_1', power_entry: powerEntries.dwarf_1 })
      if (null !== powerEntries.dwarf_2) sortedPowerEntries.push({ level: 'dwarf_2', power_entry: powerEntries.dwarf_2 })
      if (null !== powerEntries.dwarf_3) sortedPowerEntries.push({ level: 'dwarf_3', power_entry: powerEntries.dwarf_3 })
      if (null !== powerEntries.dwarf_4) sortedPowerEntries.push({ level: 'dwarf_4', power_entry: powerEntries.dwarf_4 })
      if (null !== powerEntries.dwarf_5) sortedPowerEntries.push({ level: 'dwarf_5', power_entry: powerEntries.dwarf_5 })
      if (null !== powerEntries.dwarf_6) sortedPowerEntries.push({ level: 'dwarf_6', power_entry: powerEntries.dwarf_6 })
    }
  }
  let filteredPowerEntries = _.filter(sortedPowerEntries, function(pe, index, collection) {
    if (!pe.power_entry) { return true }
    return pe.power_entry.level <= level
  })
  return filteredPowerEntries
}

export const hasPowerName = (state, getters) => (powerId) => {
  let mapped = state.powerNames.map(x => (x.powerId === powerId) ? x : null)
  if (0 === mapped.length) return false
  let reduced = mapped.reduce((accumulator, currentValue) => (currentValue) || accumulator)
  if (!reduced) return false
  return !!reduced.powerName
}

export const statusMessageCount = state => {
  return state.statusMessages.length
}
