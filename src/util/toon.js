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
}
