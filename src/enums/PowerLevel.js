/* eslint-disable camelcase */
export const PowerLevel = {
  level_1_primary: 'level_1_primary',
  level_1_secondary: 'level_1_secondary',
  level_2: 'level_2',
  level_4: 'level_4',
  level_6: 'level_6',
  level_8: 'level_8',
  level_10: 'level_10',
  level_12: 'level_12',
  level_14: 'level_14',
  level_16: 'level_16',
  level_18: 'level_18',
  level_20: 'level_20',
  level_22: 'level_22',
  level_24: 'level_24',
  level_26: 'level_26',
  level_28: 'level_28',
  level_30: 'level_30',
  level_32: 'level_32',
  level_35: 'level_35',
  level_38: 'level_38',
  level_41: 'level_41',
  level_44: 'level_44',
  level_47: 'level_47',
  level_49: 'level_49',
  health: 'health',
  stamina: 'stamina',
  swift: 'swift',
  hurdle: 'hurdle',
  sprint: 'sprint',
  prestige_power_slide: 'prestige_power_slide',
  brawl: 'brawl',
  level_1_kheldian: 'level_1_kheldian',
  level_10_kheldian: 'level_10_kheldian',
  nova_1: 'nova_1',
  nova_2: 'nova_2',
  nova_3: 'nova_3',
  nova_4: 'nova_4',
  dwarf_1: 'dwarf_1',
  dwarf_2: 'dwarf_2',
  dwarf_3: 'dwarf_3',
  dwarf_4: 'dwarf_4',
  dwarf_5: 'dwarf_5',
  dwarf_6: 'dwarf_6'
}

export const getPowerLevel = function(power_level_enum, archetype_id) {
  if (power_level_enum === 'level_1_primary') return 1
  if (power_level_enum === 'level_1_secondary') return 1
  if (power_level_enum === 'level_2') return 2
  if (power_level_enum === 'level_4') return 4
  if (power_level_enum === 'level_6') return 6
  if (power_level_enum === 'level_8') return 8
  if (power_level_enum === 'level_10') return 10
  if (power_level_enum === 'level_12') return 12
  if (power_level_enum === 'level_14') return 14
  if (power_level_enum === 'level_16') return 16
  if (power_level_enum === 'level_18') return 18
  if (power_level_enum === 'level_20') return 20
  if (power_level_enum === 'level_22') return 22
  if (power_level_enum === 'level_24') return 24
  if (power_level_enum === 'level_26') return 26
  if (power_level_enum === 'level_28') return 28
  if (power_level_enum === 'level_30') return 30
  if (power_level_enum === 'level_32') return 32
  if (power_level_enum === 'level_35') return 35
  if (power_level_enum === 'level_38') return 38
  if (power_level_enum === 'level_41') return 41
  if (power_level_enum === 'level_44') return 44
  if (power_level_enum === 'level_47') return 47
  if (power_level_enum === 'level_49') return 49
  if (power_level_enum === 'health') return 1
  if (power_level_enum === 'stamina') return 1
  if (power_level_enum === 'brawl') return 1
  if (power_level_enum === 'prestige_power_slide') return 1
  if (power_level_enum === 'sprint') return 2
  if (power_level_enum === 'hurdle') return 2
  if (power_level_enum === 'swift') return 2
  return 0
}
