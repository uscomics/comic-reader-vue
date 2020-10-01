'use strict'
import Build from '../../../src/util/build'

test('get extra slot count', () => {
  expect(Build.getExtraSlotCountForLevel(1)).toBe(0)
  expect(Build.getExtraSlotCountForLevel(2)).toBe(0)
  expect(Build.getExtraSlotCountForLevel(3)).toBe(2)
  expect(Build.getExtraSlotCountForLevel(5)).toBe(4)
  expect(Build.getExtraSlotCountForLevel(11)).toBe(10)
  expect(Build.getExtraSlotCountForLevel(15)).toBe(14)
  expect(Build.getExtraSlotCountForLevel(21)).toBe(20)
  expect(Build.getExtraSlotCountForLevel(25)).toBe(24)
  expect(Build.getExtraSlotCountForLevel(31)).toBe(31)
  expect(Build.getExtraSlotCountForLevel(36)).toBe(40)
  expect(Build.getExtraSlotCountForLevel(40)).toBe(49)
  expect(Build.getExtraSlotCountForLevel(45)).toBe(58)
  expect(Build.getExtraSlotCountForLevel(50)).toBe(67)
})
