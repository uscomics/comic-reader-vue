'use strict'
import Build from '../../../src/util/build'

test('get extra slot sum', () => {
  expect(Build.getExtraSlotSumForLevel(1)).toBe(0)
  expect(Build.getExtraSlotSumForLevel(2)).toBe(0)
  expect(Build.getExtraSlotSumForLevel(3)).toBe(2)
  expect(Build.getExtraSlotSumForLevel(5)).toBe(4)
  expect(Build.getExtraSlotSumForLevel(11)).toBe(10)
  expect(Build.getExtraSlotSumForLevel(15)).toBe(14)
  expect(Build.getExtraSlotSumForLevel(21)).toBe(20)
  expect(Build.getExtraSlotSumForLevel(25)).toBe(24)
  expect(Build.getExtraSlotSumForLevel(31)).toBe(31)
  expect(Build.getExtraSlotSumForLevel(36)).toBe(40)
  expect(Build.getExtraSlotSumForLevel(40)).toBe(49)
  expect(Build.getExtraSlotSumForLevel(45)).toBe(58)
  expect(Build.getExtraSlotSumForLevel(50)).toBe(67)
})
