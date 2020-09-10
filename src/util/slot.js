import { EnhancementGrade } from '../enums/EnhancementGrade.js'
import { EnhancementRelativeLevel } from '../enums/EnhancementRelativeLevel.js'

export default class Slot {
  constructor() {
    this.enhancement_id = ''
    this.relative_level = EnhancementRelativeLevel.None
    this.grade = EnhancementGrade.None
    this.level = 0
    this.enhancement_level = 0
  }
}
