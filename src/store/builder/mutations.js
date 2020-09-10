/* eslint-disable */
import _ from 'lodash'
import Build from '../../util/build.js'
import { BuildPowerSets } from '../../enums/BuildPowerSets.js'
import Toon from '../../util/toon.js'

export function addErrorMessage (state, errorMessage) {
    state.errorMessages.push(errorMessage)
}

export function addStatusMessage (state, statusMessage) {
    state.statusMessages.push(statusMessage)
}

export function removeOldestErrorMessage (state) {
    if (state.errorMessages.length > 0) {
        state.errorMessages.shift()
    }
}

export function removeOldestStatusMessage (state) {
    if (state.statusMessages.length > 0) {
        state.statusMessages.shift()
    }
}

export function setDBArchetypes (state, archetypes) {
    state.dbArchetypesData = archetypes
}

export function setDBEffects (state, effects) {
    state.dbEffectsData = effects
}

export function setDBEnhancements (state, enhancements) {
    state.dbEnhancementsData = enhancements
}

export function setDBEnhancementSets (state, enhancementSets) {
    state.dbEnhancementSetsData = enhancementSets
}

export function setDBLoaded (state, loaded) {
    state.dbLoaded = loaded
}

export function setDBPowers (state, powers) {
    state.dbPowersData = powers
}

export function setDBPowerSets (state, powerSets) {
    state.dbPowerSetsData = powerSets
}

export function setPowerName (state, powerIdAndName) {
    state.powerNames.push(powerIdAndName)
}

export function toonCreate (state, archetype_id) {
    let toon = Toon.fromArchetype(archetype_id)
    state.toon = toon
}

export function toonSelectBuild (state, buildNumber) {
    if (!state.toon)
        return
    let toon = state.toon
    let build = toon.builds[toon.current_build]
    while (buildNumber > toon.builds.length - 1) {
        let newBuild = Build.fromArchetype(toon.archetype_id)
        newBuild.power_sets[BuildPowerSets.primary] = build.power_sets[BuildPowerSets.primary]
        newBuild.power_sets[BuildPowerSets.secondary] = build.power_sets[BuildPowerSets.secondary]

        if (2 < toon.level) {
        Build.add_level_2_powers(newBuild)
        }  
        toon.builds.push(newBuild)
    }
    toon.current_build = buildNumber
    build = toon.builds[toon.current_build]
    if (2 < toon.level) {
        Build.add_level_2_powers(build)
    }  
}

export function toonSet (state, toon) {
    state.toon = toon
}

export function toonSetArchetypeName (state, name) {
    if (!state.toon)
        return
    state.toon_archetype_name = name
}

export function toonSetLevel (state, level) {
    if (!state.toon)
        return
    state.toon.level = level
}

export function toonSetName (state, name) {
    if (!state.toon)
        return
    state.toon.name = name
}

export function toonSetPowerEntry (state, payload) {
    if (!state.toon)
        return
    let toon = state.toon
    let build = state.toon.builds[state.toon.current_build]
    build.power_entries[payload.buildPowerLevel] = payload.powerEntry

    if (payload.powerEntry.level > toon.level)
        toon.level = payload.powerEntry.level

    if (2 < toon.level) {
        Build.add_level_2_powers(build)
    }

    let power = state.dbPowersData[payload.powerEntry.power_id]
    if (power) {
        let powerSet = state.dbPowerSetsData[power.power_set_id]
        if (powerSet) {
        if (powerSet.set_type === 'Pool') {
            if (build.power_sets[BuildPowerSets.pool_1] !== powerSet.id
            && build.power_sets[BuildPowerSets.pool_2] !== powerSet.id
            && build.power_sets[BuildPowerSets.pool_3] !== powerSet.id
            && build.power_sets[BuildPowerSets.pool_4] !== powerSet.id) {
            if (!build.power_sets[BuildPowerSets.pool_1])
                build.power_sets[BuildPowerSets.pool_1] = powerSet.id
            else if (!build.power_sets[BuildPowerSets.pool_2])
                build.power_sets[BuildPowerSets.pool_2] = powerSet.id
            else if (!build.power_sets[BuildPowerSets.pool_3])
                build.power_sets[BuildPowerSets.pool_3] = powerSet.id
            else if (!build.power_sets[BuildPowerSets.pool_4])
                build.power_sets[BuildPowerSets.pool_4] = powerSet.id
            }
        } else if (powerSet.set_type === 'Ancillary') {
            if (build.power_sets[BuildPowerSets.epic] !== powerSet.id) {
            build.power_sets[BuildPowerSets.epic] = powerSet.id
            }
        }
        }
    }
    state.toon = toon

    let primary = build.power_sets.primary
    let secondary = build.power_sets.secondary
    let pool_1 = build.power_sets.pool_1
    let pool_2 = build.power_sets.pool_2
    let pool_3 = build.power_sets.pool_3
    let pool_4 = build.power_sets.pool_4
    let epic = build.power_sets.epic
    let toonMetadata = {
        primaryPowerCount: 0,
        secondaryPowerCount: 0,
        pool1PowerCount: 0,
        pool2PowerCount: 0,
        pool3PowerCount: 0,
        pool4PowerCount: 0,
        epicPowerCount: 0,
    }

    for (let powerEntryIndex = 0; powerEntryIndex < build.power_entries.length; powerEntryIndex++) {
        let powerEntry = build.power_entries[powerEntryIndex]
        if (!powerEntry || !powerEntry.power_id)
        continue
        let powerSet = state.dbPowerSetsData[powerEntry.power_id]
        if (!powerSet)
        continue
        if (powerSet.id === primary)
        toonMetadata.primaryPowerCount++
        else if (powerSet.id === secondary)
        toonMetadata.secondaryPowerCount++
        else if (powerSet.id === pool_1)
        toonMetadata.pool1PowerCount++
        else if (powerSet.id === pool_2)
        toonMetadata.pool2PowerCount++
        else if (powerSet.id === pool_3)
        toonMetadata.pool3PowerCount++
        else if (powerSet.id === pool_4)
        toonMetadata.pool4PowerCount++
        else if (powerSet.id === epic)
        toonMetadata.epicPowerCount++
    }
    state.toonMetadata = toonMetadata
}

export function toonSetPrimaryPowerSet (state, power_set_id) {
    if (!state.toon)
        return
    let build = state.toon.builds[state.toon.current_build]
    build.power_sets.primary = power_set_id
}

export function toonSetSecondaryPowerSet (state, power_set_id) {
    if (!state.toon)
        return
    let build = state.toon.builds[state.toon.current_build]
    build.power_sets.secondary = power_set_id
}

export function toonUpdate (state, toon) {
    state.toon = toon
}
