export default function () {
  return {
    statusMessages: [],
    errorMessages: [],
    toon: null,
    toonMetadata: {
      primaryPowerCount: 0,
      secondaryPowerCount: 0,
      pool1PowerCount: 0,
      pool2PowerCount: 0,
      pool3PowerCount: 0,
      pool4PowerCount: 0,
      epicPowerCount: 0
    },
    powerNames: [],
    dbArchetypesData: {},
    dbEffectsData: {},
    dbEnhancementSetsData: {},
    dbEnhancementsData: {},
    dbPowerSetsData: {},
    dbPowersData: {},
    dbLoaded: false }
}
