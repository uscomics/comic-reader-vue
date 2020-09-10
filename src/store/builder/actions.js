
export function loadDatabase (context) {
  let archetypes = require('../../database/archetypes.map.json')
  // let effects = require('../database/effects.map.json')
  let enhancementSets = require('../../database/enhancement-sets.map.json')
  let enhancemments = require('../../database/enhancements.map.json')
  let powerSets = require('../../database/power-sets.map.json')
  let powers = require('../../database/powers.map.json')

  context.commit('setDBArchetypes', archetypes)
  // context.commit('setDBEffects', effects)
  context.commit('setDBEnhancementSets', enhancementSets)
  context.commit('setDBEnhancements', enhancemments)
  context.commit('setDBPowerSets', powerSets)
  context.commit('setDBPowers', powers)
  setTimeout(function() { context.commit('setDBLoaded', true) }, 3000)
}
