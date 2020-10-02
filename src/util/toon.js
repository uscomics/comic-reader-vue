import Build from './build.js'

export default class Toon {
  constructor() {
    this.version = '0.0.0'
    this.name = ''
    this.level = 1
    this.archetype_id = ''
    this.current_build = 0
    this.builds = []
    this.builds.push(new Build())
    this.notes = ''
  }

  static fromArchetype(archetype) {
    let toon = new Toon()
    let build = Build.fromArchetype(archetype)
    toon.archetype_id = archetype
    toon.builds = []
    toon.builds.push(build)
    return toon
  }

  static fromObject(obj) {
    let toon = new Toon()
    toon.version = obj.version
    toon.name = obj.name
    toon.level = obj.level
    toon.archetype_id = obj.archetype_id
    toon.current_build = obj.current_build
    toon.notes = obj.notes
    toon.builds = []
    for (let buildIndex = 0; buildIndex < obj.builds.length; buildIndex++) {
      const objBuild = obj.builds[buildIndex]
      const build = Build.fromObject(objBuild)
      toon.builds.push(build)
    }
    return toon
  }

  getExtraSlotsRemaining() {
    const build = this.builds[this.current_build]
    if (!build) {
      return 0
    }
    const level = (this.level === 49) ? 50 : this.level
    const slotsForLevel = Build.getExtraSlotCountForLevel(level)
    const slotsUsed = build.getExtraSlotCount()
    return slotsForLevel - slotsUsed
  }
}
